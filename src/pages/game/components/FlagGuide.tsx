import React from "react";
import { FLAGS } from "../constants";
import FlagCard from "../../../components/flagCard/FlagCard";

type FlagGuideProps = {
  onPlayClick: () => void;
};

function FlagGuide({ onPlayClick }: FlagGuideProps) {
  const flags = FLAGS.map((flag) => <FlagCard flag={flag} />);

  return (
    <div className="flex justify-center content-center mt-6">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center">Pride Flags</h1>
        <div className="flex flex-wrap justify-center mt-4">{flags}</div>
        <div className="flex justify-center content-center pt-6">
          <button
            className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={onPlayClick}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlagGuide;
