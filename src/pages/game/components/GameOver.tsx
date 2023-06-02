import React from "react";
import { GameResults } from "../types";
import FlagCard from "../../../components/flagCard/FlagCard";

type GameOverProps = {
  gameResults: GameResults;
  onPlayClick: () => void;
};

function GameOver({ gameResults, onPlayClick }: GameOverProps) {
  const titleText = gameResults.completed ? "You got them all!" : "Game Over!";

  const skippedFlagsContent = Object.keys(gameResults.skippedFlags).map(
    (key) => {
      const flag = gameResults.skippedFlags[key];

      return <FlagCard flag={flag} />;
    }
  );

  return (
    <div>
      <div className="flex justify-center content-center">
        <h1 className="text-4xl font-bold pb-4">{titleText}</h1>
      </div>
      <div className="flex justify-center content-center pb-8">{`You guessed ${gameResults.score} flags corrects! Want to play again?`}</div>
      <div className="flex justify-center content-center">
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={onPlayClick}
        >
          Play Again
        </button>
      </div>
      <div className="flex justify-center content-center mt-6">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl text-center">Skipped flags</h1>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
            {skippedFlagsContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
