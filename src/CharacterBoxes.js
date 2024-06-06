import React, { useEffect, useState } from 'react'
import { useSpring, a } from '@react-spring/web'

import "./CharacterBoxes.css"

const CharacterBoxes = ({ setWord, indexes }) => {

    return (
        <>
            {setWord.map((x, index) => <div id="letter-box" key={index}>{indexes.includes(index) ? x : null}</div>)}
        </>
    );
}

export default CharacterBoxes;