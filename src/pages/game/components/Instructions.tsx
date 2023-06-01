import React from "react";
import { MAX_TIME } from "../constants";

type InstructionsProps = {
  onPlayClick: () => void;
};

function Instructions({ onPlayClick }: InstructionsProps) {
  return (
    <div>
      <div className="flex justify-center content-center">
        <h1 className="text-4xl font-bold pb-4 ">Pride Flag Guesser</h1>
      </div>
      <div className="flex justify-center content-center pb-8 text-center">{`You have ${MAX_TIME} seconds to name as many pride flags as you can!`}</div>
      <div className="flex justify-center content-center">
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={onPlayClick}
        >
          Play
        </button>
      </div>
    </div>
  );
}

export default Instructions;
