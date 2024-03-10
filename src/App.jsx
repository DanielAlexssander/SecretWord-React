// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// Data
import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import Game from './components/Game';

const stages = [
	{ id: 1, name: 'start' },
	{ id: 2, name: 'game' },
	{ id: 3, name: 'end' },
];

const attemptQty = 3;

function App() {
	const [gameStage, setGameStage] = useState(stages[0].name);
	const [words] = useState(wordsList);

	const [pickedWord, setPickedWord] = useState('');
	const [pickedCategory, setPickedCategory] = useState('');
	const [letters, setLetters] = useState([]);

	const [guessedLetters, setGuessedLetters] = useState([]);
	const [wrongLetters, setWrongLetters] = useState([]);
	const [attempt, setAttempt] = useState(attemptQty);
	const [score, setScore] = useState(0);

	const pickWordAndCategory = useCallback(() => {
		const categories = Object.keys(words);
		const category =
			categories[Math.floor(Math.random() * Object.keys(categories).length)];

		const word =
			words[category][Math.floor(Math.random() * words[category].length)];

		return { word, category };
	}, [words]);

	const startGame = useCallback(() => {
		clearLetterStates();
		const { word, category } = pickWordAndCategory();

		let wordLetters = word.split('');
		wordLetters = wordLetters.map((l) => l.toLowerCase());

		setPickedWord(word);
		setPickedCategory(category);
		setLetters(wordLetters);

		setGameStage(stages[1].name);
	}, [pickWordAndCategory]);

	const verifyLetter = (l) => {
		const normalizedLetter = l.toLowerCase();
		if (
			guessedLetters.includes(normalizedLetter) ||
			wrongLetters.includes(normalizedLetter)
		) {
			return;
		}

		if (letters.includes(normalizedLetter)) {
			setGuessedLetters((actualGuessedLetters) => [
				...actualGuessedLetters,
				normalizedLetter,
			]);
		} else {
			setWrongLetters((actualWrongLetters) => [
				...actualWrongLetters,
				normalizedLetter,
			]);

			setAttempt((actualAttempt) => actualAttempt - 1);
		}
	};

	const clearLetterStates = () => {
		setGuessedLetters([]);
		setWrongLetters([]);
	};

	useEffect(() => {
		if (attempt <= 0) {
			clearLetterStates();
			setGameStage(stages[2].name);
		}
	}, [attempt]);

	useEffect(() => {
		const uniqueLetters = [...new Set(letters)];

		if (
			guessedLetters.length === uniqueLetters.length &&
			gameStage === stages[1].name
		) {
			setScore((actualScore) => (actualScore += 100));

			return startGame();
		}
	}, [guessedLetters, letters, startGame, gameStage]);

	const retryGame = () => {
		setScore(0);
		setAttempt(attemptQty);
		setGameStage(stages[0].name);
	};

	return (
		<div className="App">
			{gameStage === 'start' && <StartScreen startGame={startGame} />}
			{gameStage === 'game' && (
				<Game
					verifyLetter={verifyLetter}
					word={pickedWord}
					category={pickedCategory}
					letters={letters}
					guessedLetters={guessedLetters}
					wrongLetters={wrongLetters}
					attempt={attempt}
					score={score}
				/>
			)}
			{gameStage === 'end' && <GameOver retryGame={retryGame} score={score} />}
		</div>
	);
}

export default App;
