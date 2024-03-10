import './StartScreen.css';
import React from 'react';

const StartScreen = ({ startGame }) => {
	return (
		<div className="start">
			<h1>Secret Word</h1>
			<p>Click the button below to begin the game.</p>
			<button onClick={startGame}>Start Game</button>
		</div>
	);
};

export default StartScreen;
