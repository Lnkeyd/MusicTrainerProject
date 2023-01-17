import './piano.css'
import { useState } from 'react'
import {C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3} from '../../pages/exercises/sounds/Sounds'
import {C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4} from '../../pages/exercises/sounds/Sounds'

export default function Piano({ansKeys}) {
    
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    const myAudioContext = new AudioContext();

    const [activeKeys, setActiveKeys] = useState([])

    function GoPlay(note, event) {
        myAudioContext.resume().then(() => {
            const mySound = new Audio(note);
            mySound.loop = false;
            mySound.currentTime = 0;
            mySound.play();

            event.target.className.includes('white') ? 
                event.target.style.backgroundColor = 'rgb(255, 103, 103)' : 
                event.target.style.backgroundColor = 'rgb(216, 69, 69)'

            setActiveKeys([...activeKeys, event])
        })
    }

  return (
          <div className="container">
            <div className="piano">
                <button className="key white" id='C3' onClick={(e) => {GoPlay(C3, e); ansKeys(e.target)}}></button>
                <button className="key black" id="Db3" onClick={(e) => {GoPlay(Db3, e); ansKeys(e.target)}}></button>
                <button className="key white" id="D3" onClick={(e) => {GoPlay(D3, e); ansKeys(e.target)}}></button>
                <button className="key black" id="Eb3" onClick={(e) => {GoPlay(Eb3, e); ansKeys(e.target)}}></button>
                <button className="key white" id="E3" onClick={(e) => {GoPlay(E3, e); ansKeys(e.target)}}></button>
                <button className="key white" id="F3" onClick={(e) => {GoPlay(F3, e); ansKeys(e.target)}}></button>
                <button className="key black" id="Gb3" onClick={(e) => {GoPlay(Gb3, e); ansKeys(e.target)}}></button>
                <button className="key white" id="G3" onClick={(e) => {GoPlay(G3, e); ansKeys(e.target)}}></button>
                <button className="key black" id="Ab3" onClick={(e) => {GoPlay(Ab3, e); ansKeys(e.target)}}></button>
                <button className="key white" id="A3" onClick={(e) => {GoPlay(A3, e); ansKeys(e.target)}}></button>
                <button className="key black" id="Bb3" onClick={(e) => {GoPlay(Bb3, e); ansKeys(e.target)}}></button>
                <button className="key white" id="B3" onClick={(e) => {GoPlay(B3, e); ansKeys(e.target)}}></button>
                
                <button className="key white" id='C4' onClick={(e) => {GoPlay(C4, e); ansKeys(e.target)}}></button>
                <button className="key black" id="Db4" onClick={(e) => {GoPlay(Db4, e); ansKeys(e.target)}}></button>
                <button className="key white" id="D4" onClick={(e) => {GoPlay(D4, e); ansKeys(e.target)}}></button>
                <button className="key black" id="Eb4" onClick={(e) => {GoPlay(Eb4, e); ansKeys(e.target)}}></button>
                <button className="key white" id="E4" onClick={(e) => {GoPlay(E4, e); ansKeys(e.target)}}></button>
                <button className="key white" id="F4" onClick={(e) => {GoPlay(F4, e); ansKeys(e.target)}}></button>
                <button className="key black" id="Gb4" onClick={(e) => {GoPlay(Gb4, e); ansKeys(e.target)}}></button>
                <button className="key white" id="G4" onClick={(e) => {GoPlay(G4, e); ansKeys(e.target)}}></button>
                <button className="key black" id="Ab4" onClick={(e) => {GoPlay(Ab4, e); ansKeys(e.target)}}></button>
                <button className="key white" id="A4" onClick={(e) => {GoPlay(A4, e); ansKeys(e.target)}}></button>
                <button className="key black" id="Bb4" onClick={(e) => {GoPlay(Bb4, e); ansKeys(e.target)}}></button>
                <button className="key white" id="B4" onClick={(e) => {GoPlay(B4, e); ansKeys(e.target)}}></button>
            </div>
        </div>
  )
}
