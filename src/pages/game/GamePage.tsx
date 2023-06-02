import React, { useState } from "react";
import Page from "../../components/page/Page";
import Game from "./components/Game/Game";
import Instructions from "./components/Instructions";
import GameOver from "./components/gameOver/GameOver";
import { GameResults } from "./types";
import FlagGuide from "./components/FlagGuide";

enum GameState {
  Setup,
  FlagGuide,
  Playing,
  GameOver,
}

const intialGameResults: GameResults = {
  score: 0,
  completed: false,
  skippedFlags: {},
};

function GamePage() {
  const [gameState, setGameState] = useState<GameState>(GameState.Setup);
  const [gameResults, setGameResults] =
    useState<GameResults>(intialGameResults);

  let content;

  const handlePlayClicked = () => {
    if (gameState === GameState.Playing) {
      return;
    }

    setGameResults(intialGameResults);
    setGameState(GameState.Playing);
  };

  const handleGuideClicked = () => {
    setGameState(GameState.FlagGuide);
  };

  const handleGameOver = (results: GameResults) => {
    setGameResults(results);
    setGameState(GameState.GameOver);
  };

  switch (gameState) {
    case GameState.Setup:
      content = (
        <Instructions
          onPlayClick={handlePlayClicked}
          onGuideClick={handleGuideClicked}
        />
      );
      break;
    case GameState.FlagGuide:
      content = <FlagGuide onPlayClick={handlePlayClicked} />;
      break;
    case GameState.Playing:
      content = <Game onComplete={handleGameOver} />;
      break;
    case GameState.GameOver:
      content = (
        <GameOver
          gameResults={gameResults}
          onPlayClick={handlePlayClicked}
          onGuideClick={handleGuideClicked}
        />
      );
      break;
  }

  return (
    <Page>
      <div className="container">{content}</div>
    </Page>
  );
}

export default GamePage;
