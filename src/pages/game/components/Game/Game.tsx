import React, { FormEvent, useEffect, useState } from "react";
import { FLAGS, MAX_TIME } from "../../constants";
import { Flag, GameResults } from "../../types";

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

function Game({ onComplete }: GameProps) {
  const [remainingTime, setRemainingTime] = useState<number>(MAX_TIME);
  const [score, setScore] = useState<number>(0);
  const [remainingFlags, setRemainingFlags] =
    useState<ReadonlyArray<Flag>>(FLAGS);
  const [currentFlag, setCurrentFlag] = useState<Flag | null>(null);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(remainingTime - 1);

      if (remainingTime <= 0) {
        onComplete({ score, completed: false });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, setRemainingTime, onComplete, score]);

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
  };

  const skipFlag = () => {
    const nextFlag = getNextFlag(remainingFlags, currentFlag, true);
    setCurrentFlag(nextFlag);
  };

  const handleIncorrectAnswer = () => {};

  const handleCorrectAnswer = () => {
    const newRemainingFlags = remainingFlags.filter(
      (flag) => flag.id !== currentFlag?.id
    );

    if (newRemainingFlags.length === 0) {
      onComplete({ score: score + 1, completed: true });
    }

    setScore(score + 1);
    setAnswer("");

    setRemainingFlags(newRemainingFlags);

    const nextFlag = getNextFlag(remainingFlags, currentFlag, true);
    setCurrentFlag(nextFlag);
  };

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
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flag"
              />
            </div>
            <div className="flex-none pl-4 content-end">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
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
