import './Game.css';
import { useState, useRef } from 'react';

const Game = ({
	verifyLetter,
	category,
	letters,
	guessedLetters,
	wrongLetters,
	attempt,
	score,
}) => {
	const [letter, setLetter] = useState('');
	const letterInputRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		verifyLetter(letter);

		setLetter('');
		letterInputRef.current.focus();
	};

	return (
		<div className="game">
			<p className="point">
				<span>Points: {score}</span>
			</p>
			<h1>Guess the word</h1>
			<h3 className="tip">
				Tip about the word:{' '}
				<span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
			</h3>
			<p>You have {attempt} attempts</p>
			<div className="wordContainer">
				{letters.map((l, i) =>
					guessedLetters.includes(l) ? (
						<span className="letter" key={i}>
							{l}
						</span>
					) : (
						<span className="blankSquare" key={i}></span>
					)
				)}
			</div>
			<div className="letterContainer">
				<p>Try guess a letter of the word</p>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="letter"
						maxLength="1"
						required
						onChange={(e) => setLetter(e.target.value)}
						value={letter}
						ref={letterInputRef}
					/>
					<button>Play</button>
				</form>
			</div>
			<div className="wrongLettersContainer">
				<p>Letters already used:</p>
				{wrongLetters.map((l, i) =>
					i === 0 ? (
						<span key={i}>{l.toUpperCase()}</span>
					) : (
						<span key={i}>, {l.toUpperCase()}</span>
					)
				)}
			</div>
		</div>
	);
};

export default Game;
