import React, { FormEvent, useEffect, useRef, useState } from "react";
import { FLAGS, MAX_TIME } from "../../constants";
import { Dictionary, Flag, GameResults } from "../../types";

import "./Game.css";

type GameProps = {
  onComplete: (results: GameResults) => void;
};

const getNextFlag = (
  remainingFlags: ReadonlyArray<Flag>,
  currentFlag: Flag | null,
  isSkip: boolean
) => {
  let flagOptions = remainingFlags;

  if (isSkip && currentFlag) {
    flagOptions = remainingFlags.filter((flag) => flag.id !== currentFlag?.id);
  }

  const nextFlag = flagOptions[Math.floor(Math.random() * flagOptions.length)];

  return nextFlag;
};

const ARROW_PATH = "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3";
const CROSS_PATH = "M6 18L18 6M6 6l12 12";

function Game({ onComplete }: GameProps) {
  const [remainingTime, setRemainingTime] = useState<number>(MAX_TIME);
  const [score, setScore] = useState<number>(0);
  const [remainingFlags, setRemainingFlags] =
    useState<ReadonlyArray<Flag>>(FLAGS);
  const [skippedFlags, setSkippedFlags] = useState<Dictionary<Flag>>({});
  const [currentFlag, setCurrentFlag] = useState<Flag | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [isAnswerWrong, setIsAnswerWrong] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(remainingTime - 1);

      if (remainingTime <= 0) {
        onComplete({ score, completed: false, skippedFlags });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, setRemainingTime, onComplete, score, skippedFlags]);

  useEffect(() => {
    const nextFlag = getNextFlag(remainingFlags, currentFlag, false);
    setCurrentFlag(nextFlag);
  }, [setCurrentFlag, remainingFlags, currentFlag]);

  const isCorrectAnswer: () => boolean = () => {
    return !!currentFlag?.names.find(
      (name) => name.toLowerCase() === answer.toLowerCase()
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!currentFlag) {
      return;
    }

    if (isCorrectAnswer()) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
  };

  const handleSkipClicked = (event: FormEvent) => {
    event.preventDefault();
    skipFlag();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const skipFlag = () => {
    if (currentFlag && !skippedFlags[currentFlag.id]) {
      const newSkippedFlags = {
        ...skippedFlags,
        [currentFlag.id]: currentFlag,
      };

      setSkippedFlags(newSkippedFlags);
    }

    const nextFlag = getNextFlag(remainingFlags, currentFlag, true);
    setCurrentFlag(nextFlag);
  };

  const handleIncorrectAnswer = () => {
    setIsAnswerWrong(true);
  };

  const handleCorrectAnswer = () => {
    if (currentFlag && skippedFlags[currentFlag.id]) {
      const newSkippedFlags = {
        ...skippedFlags,
      };
      delete newSkippedFlags[currentFlag.id];

      setSkippedFlags(newSkippedFlags);
    }

    const newRemainingFlags = remainingFlags.filter(
      (flag) => flag.id !== currentFlag?.id
    );

    if (newRemainingFlags.length === 0) {
      onComplete({ score: score + 1, completed: true, skippedFlags });
    }

    setScore(score + 1);
    setAnswer("");

    setRemainingFlags(newRemainingFlags);

    const nextFlag = getNextFlag(remainingFlags, currentFlag, true);
    setCurrentFlag(nextFlag);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAnswerWrong(false);
    setAnswer(event.target.value);
  };

  const submitButtonClass = isAnswerWrong
    ? "submit-button submit-button--error text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
    : "submit-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

  return (
    <>
      <div className="container mb-8">
        <div className="flex content-center justify-center  mb-8">
          <h1 className="text-4xl font-bold">NAME THE FLAG!</h1>
        </div>
        <div className="flex content-center justify-center">
          <span className="countdown font-mono text-6xl">
            <span>{remainingTime}</span>
          </span>
        </div>
      </div>
      <div className="container">
        <div>
          <img className="w-full" src={currentFlag?.icon} alt="flag" />
        </div>
      </div>
      <div className="container py-8">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex-1">
              <input
                onChange={handleInputChange}
                value={answer}
                autoFocus
                ref={inputRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flag"
              />
            </div>
            <div className="flex flex-none pl-4 content-end">
              <button type="submit" className={submitButtonClass}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={isAnswerWrong ? CROSS_PATH : ARROW_PATH}
                    />
                  </svg>
                </span>
              </button>
              <button
                type="button"
                onClick={handleSkipClicked}
                className="text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Skip
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Game;
