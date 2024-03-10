import './GameOver.css';
import React from 'react';

const GameOver = ({ retryGame, score }) => {
	return (
		<div>
			<h1>End Game!</h1>
			<h2>
				Your score was: <span>{score}</span>
			</h2>
			<button onClick={retryGame}>Retry Game</button>
		</div>
	);
};

export default GameOver;
