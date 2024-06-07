import React, { useState, useEffect } from 'react';

import './App.css';
import Game from './Game'

function App() {
  const [wordList, setWordList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [guessed, setGuessed] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [leaderboards, setLeaderboards] = useState([]);
  const wordURL = "https://random-word-api.vercel.app/api?words=1";//"https://random-word-api.herokuapp.com/word"; 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(wordURL);
      const data = await response.json();
      if(wordList === ""){
        setWordList(data);
      }
      setIsLoading(false);
      setTimerStarted(false);
    }
    fetchData();
  }, [isLoading])


  const startTimer = () => {
    setTimerStarted(true);
    const interValid = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    setTimerInterval(interValid);
  }
  let a = 0
  const stopTimer = () => {
    if( a === 0){
      a += 1;
    // setLeaderboards(prev => [...prev, ]);
    clearInterval(timerInterval);
    setTimerInterval(null);
    }
    //setTimerStarted(false);
  }

  useEffect(() => {
    if(!timerInterval && a === 1){
      setLeaderboards(prev => [...prev, elapsedTime]);
    }
  }, [timerInterval, a, elapsedTime])

  const checkValidity = (input) => {
    const test = input.toString();
    if (test === "") {
      alert("PLease type in a letter, or guess the full word!");
    } else if (test.length > 1) {
      alert("Please only guess 1 letter at a time")
    } else {
      setGuessed(test);
      document.getElementById("inputText").value = "";
      if(!timerStarted){
        startTimer();
      }
    }
  }

  const reset = () => {
    stopTimer();
    setElapsedTime(0);
    setWordList("");
    setIsLoading(true);
    setGuessed("");

    //window.location.reload();
  }

  return (
    <div>
      {!isLoading ? (
        <div>
          <div id="head">
          <p id="title">Guess the word!</p>
          <p id="description">A word was already selected at random, type in a letter and try to figure out the word!</p>
          <div id="inputFields">
            <label for="inputText">Type in a Letter </label>
            <input id="inputText" type="text"></input>
            <button type="submit" onClick={() => { checkValidity(document.getElementById("inputText").value);}}>Guess!</button>
          </div>
          </div>
           <div id="timer">
            {timerStarted && <p>Elapsed Time: {elapsedTime} seconds</p>}
          </div>
          <div id="playSpace">
            <Game setWord={wordList} setWordList={setWordList} input={guessed} timer={stopTimer} reset={reset} elapsedTime={elapsedTime} leaderBoards={leaderboards}/>
          </div>
         
        </div>
      ) : (
        <div>Loadiing...</div>
      )}
    </div>
  );
  
 
}


export default App;
