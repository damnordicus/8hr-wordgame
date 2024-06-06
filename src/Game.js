import React, {useState, useEffect} from "react"
import CharacterBoxes from "./CharacterBoxes";
import "./Game.css"

const Game = ({setWord, setWordList, input}) => {

    const word = setWord.toString().toUpperCase();
    let charArrayOfWord = word.split('');
    const inputLetter = input.toString().toUpperCase();
    const [guesses, setGuesses] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const dictionary = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const [wordDef, setWordDef] = useState("");
    
    useEffect(() => {
        if(inputLetter !== null){
        const newIndexes = [];
        for(let i = 0; i < charArrayOfWord.length; i++){
            if(charArrayOfWord[i] === inputLetter){
                newIndexes.push(i);
            }
        }
        setGuesses(prev => [...prev, ...input])
        setIndexes(prev => [...prev, ...newIndexes]);
        }
    }, [input]);

    useEffect(() => {
        const fetchData = async() => {
            let response
            try{
                response = await fetch(dictionary + word);
                if(!response.ok){
                    throw new Error(`Invalid URL: ${word} not in this dictionary`)
                }
                const data = await response.json();
                setWordDef(data[0].meanings[0].definitions[0].definition);
            } catch(error){
                if(!response.ok)
                console.error(error.message);
            }
        }
        fetchData();
    }, [setWord]);

    function reset(){
        window.location.reload();
    }

    

    return(
        <>

            <div id="board">
                {indexes.length === charArrayOfWord.length && <button class="button-53" onClick={reset}>Play Again!</button> }
                <p id="guesses">{guesses.length !== 0 ? (guesses.map(x => x) + ", "): null}</p>
                
            <div id="boxes"><CharacterBoxes setWord={charArrayOfWord} indexes={indexes}/></div>
            {indexes.length === charArrayOfWord.length?(
             <div id="definition"><p>{wordDef.length? wordDef : "Hmmm, I need a better dictionary..."}</p></div>
            ):(null)}
            </div>
        </>
    );
}

export default Game;