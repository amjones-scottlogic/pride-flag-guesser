import React from "react";
import { Flag } from "../../pages/game/types";

import "./FlagCard.css";

type FlagCardProps = {
  flag: Flag;
};

function FlagCard({ flag }: FlagCardProps) {
  return (
    <div className="container flex flex-row m-2 px-2">
      <div className="flex flex-col justify-center">
        <img className="flag-image" src={flag.icon} alt="flag" />
      </div>
      <div className="flex flex-col justify-center pl-2">
        <p className="text-xl">{flag.id}</p>
        <a
          className="font-bold"
          href={flag.link}
          target="_blank"
          rel="noreferrer"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}

export default FlagCard;
