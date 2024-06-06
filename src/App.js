import React, { useState, useEffect } from 'react';
import './App.css';
import Game from './Game'

function App() {
  const [wordList, setWordList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [guessed, setGuessed] = useState("");
  const wordURL = "https://random-word-api.vercel.app/api?words=1";// "https://random-word-api.herokuapp.com/word";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(wordURL);
      const data = await response.json();
      setWordList(data);
      setIsLoading(false);
    }
    fetchData();
  }, [])

  function checkValidity(input) {
    const test = input.toString();
    if (test === "") {
      alert("PLease type in a letter, or guess the full word!");
    } else if (test.length > 1) {
      alert("Please only guess 1 letter at a time")
    } else {
      setGuessed(document.getElementById("inputText").value);
      document.getElementById("inputText").value = "";
    }

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
            <button type="submit" onClick={() => { checkValidity(document.getElementById("inputText").value); }}>Guess!</button>
          </div>
          </div>
          <div id="playSpace">
            <Game setWord={wordList} setWordList={setWordList} input={guessed} />
          </div>
        </div>
      ) : (
        <div>Loadiing...</div>
      )}
    </div>
  );
  
 
}


export default App;
