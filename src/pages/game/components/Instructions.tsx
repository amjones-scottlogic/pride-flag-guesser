import React from "react";
import { MAX_TIME, FLAGS } from "../constants";

type InstructionsProps = {
  onPlayClick: () => void;
  onGuideClick: () => void;
};

function Instructions({ onPlayClick, onGuideClick }: InstructionsProps) {
  return (
    <div>
      <div className="flex justify-center content-center">
        <h1 className="text-4xl font-bold pb-4 ">Pride Flag Guesser</h1>
      </div>
      <div className="flex justify-center content-center pb-2 text-center">{`You have ${MAX_TIME} seconds to name as many pride flags as you can!`}</div>
      <div className="flex justify-center content-center pb-2 text-center">{`Can you get all ${FLAGS.length}?`}</div>
      <div className="flex justify-center content-center pt-6">
        <button
          className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={onPlayClick}
        >
          Play
        </button>
      </div>
      <div className="flex justify-center content-center pt-2">
        <button
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onGuideClick}
        >
          Learn the flags
        </button>
      </div>
    </div>
  );
}

export default Instructions;
