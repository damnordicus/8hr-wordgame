import React, { useState, useEffect } from "react"
import CharacterBoxes from "./CharacterBoxes";
import Confetti from "react-confetti"
import "./Game.css"

const Game = ({ setWord, setWordList, input, timer, reset, leaderBoards, elapsedTime }) => {

    const word = setWord.toString().toUpperCase();
    let charArrayOfWord = word.split('');
    const inputLetter = input.toString().toUpperCase();
    const [guesses, setGuesses] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const dictionary = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const [wordDef, setWordDef] = useState("");
    const [wordType, setWordType] = useState("");
    const [confetti, setConfetti] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [top5, setTop5] = useState([]);

    useEffect(() => {
        if (inputLetter !== null) {
            const newIndexes = [];
            for (let i = 0; i < charArrayOfWord.length; i++) {
                if (charArrayOfWord[i] === inputLetter) {
                    newIndexes.push(i);
                }
            }
            setGuesses(prev => [...prev, ...input])
            setIndexes(prev => [...prev, ...newIndexes]);
        }
    }, [input]);

    useEffect(() => {
        if(indexes.length === charArrayOfWord.length && !confetti){
            timer();
            fetch(dictionary + word)
                .then(response => response.json())
                .then(data => {
                    setWordDef(data[0].meanings[0].definitions[0].definition);
                    setWordType(data[0].meanings[0].partOfSpeech);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
                const board = leaderBoards.sort();
                    setTop5(board.slice(0,5));
                    let temp = board.slice(0,5);
                    let x = temp.indexOf(parseInt(elapsedTime));
                    if(x !== -1 && x <= 4){
                        setConfetti(true);
                    }
                    setShowLeaderboard(true);
        }
    }, [indexes, charArrayOfWord.length, confetti, leaderBoards, timer, elapsedTime, dictionary, setWord, word]);
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         let response
    //         try {
    //             response = await fetch(dictionary + word);
    //             if (!response.ok) {
    //                 throw new Error(`Invalid URL: ${word} not in this dictionary`)
    //             }
    //             const data = await response.json();
    //             setWordDef(data[0].meanings[0].definitions[0].definition);
    //             setWordType(data[0].meanings[0].partOfSpeech);
    //         } catch (error) {
    //             if (!response.ok)
    //                 console.error(error.message);
    //         }
    //     }
    //     fetchData();
    // }, [setWord]);

    // // function reset() {
    // //     window.location.reload();
    // // }
    // useEffect(() => {
    //     if(indexes.length === charArrayOfWord.length && !confetti){
    //         timer();
    //         board = leaderBoards.sort();
    //         top5 = board.slice(0,5);
    //         setShowLeaderboard(true);
    //         if(top5.includes(parseInt(elapsedTime))){
    //             setConfetti(true);
    //         }
    //     }
    // }, [indexes, charArrayOfWord.length, confetti, leaderBoards, timer, elapsedTime])
    return (
        <>

            <div id="board">
                {indexes.length === charArrayOfWord.length && <button class="button-53" onClick={reset}>Play Again!</button>}
                <p id="guesses">{guesses.length !== 0 ? (guesses.map(x => x) + ", ") : null}</p>

                <div id="boxes"><CharacterBoxes setWord={charArrayOfWord} indexes={indexes} /></div>
                {indexes.length === charArrayOfWord.length ? (
                    <div id="definition">{confetti? <Confetti/> : null}
                    <p>{wordDef.length ? `(${wordType}) ${wordDef}` : "Hmmm, I need a better dictionary..."}</p>
                    <ol id="list">
                        {showLeaderboard && top5.map(x => <li>  {x} seconds</li>)}
                    </ol>
                    </div>
                ) : (null)}
            </div>
        </>
    );
}

export default Game;