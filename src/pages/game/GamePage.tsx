import React, { useState } from "react";
import Page from "../../components/page/Page";
import Game from "./components/Game/Game";
import Instructions from "./components/Instructions";
import GameOver from "./components/GameOver";
import { GameResults } from "./types";

enum GameState {
  Setup,
  Playing,
  GameOver,
}

const intialGameResults: GameResults = {
  score: 0,
  completed: false,
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

  const handleGameOver = (results: GameResults) => {
    setGameResults(results);
    setGameState(GameState.GameOver);
  };

  switch (gameState) {
    case GameState.Setup:
      content = <Instructions onPlayClick={handlePlayClicked} />;
      break;
    case GameState.Playing:
      content = <Game onComplete={handleGameOver} />;
      break;
    case GameState.GameOver:
      content = (
        <GameOver gameResults={gameResults} onPlayClick={handlePlayClicked} />
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
