import React from "react";
import { Flag } from "../../pages/game/types";

import "./FlagCard.css";

type FlagCardProps = {
  flag: Flag;
};

function FlagCard({ flag }: FlagCardProps) {
  return (
    <div className="flag-card flex flex-row m-2 px-2">
      <div className="flex flex-col justify-center">
        <img className="flag-image" src={flag.icon} alt="flag" />
      </div>
      <div className="flex flex-col justify-center pl-2">
        <p className="text-base font-bold">{flag.id}</p>
        <a
          className="text-sm"
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
