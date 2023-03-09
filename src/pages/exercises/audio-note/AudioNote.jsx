import { useState } from 'react'
import { Link } from 'react-router-dom'
import GoBack from '../../../components/goBack/GoBack'
import {C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3} from '../../../assets/sounds/Sounds'
import {C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4} from '../../../assets/sounds/Sounds'
import './audioNote.css'

export default function AudioNote() {

    // const [answerKey, setAnswer] = useState('')
    const [result, setResult] = useState('')
    
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    const myAudioContext = new AudioContext();

    const keys = [
        {name: 'C', value: C3},
        {name: 'C#', value: Db3},
        {name: 'D', value: D3},
        {name: 'D#', value: Eb3},
        {name: 'E', value: E3},
        {name: 'F', value: F3},
        {name: 'F#', value: Gb3},
        {name: 'G', value: G3},
        {name: 'G#', value: Ab3},
        {name: 'A', value: A3},
        {name: 'A#', value: Bb3},
        {name: 'B', value: B3},

        {name: 'C', value: C4},
        {name: 'C#', value: Db4},
        {name: 'D', value: D4},
        {name: 'D#', value: Eb4},
        {name: 'E', value: E4},
        {name: 'F', value: F4},
        {name: 'F#', value: Gb4},
        {name: 'G', value: G4},
        {name: 'G#', value: Ab4},
        {name: 'A', value: A4},
        {name: 'A#', value: Bb4},
        {name: 'B', value: B4},
    ]

    const [key, setKey] = useState(keys[Math.floor(Math.random() * 23)])

    // const handleAnswer = (answer) => {
    //     setAnswer([...answerKey, answer])
    // } FOR CHORDS AND SCALES

    function playRef(refNote) {
        myAudioContext.resume().then(() => {
            const mySound = new Audio(refNote);
            mySound.loop = false;
            mySound.currentTime = 0;
            mySound.play();
        })
    }


    function check(answerKey) {
        if (answerKey === key.name) {
            setResult('✔️ Правильный ответ!')
        } else {
            setResult('❌ Неправильный ответ!')
        }
        
        setTimeout(() => setResult(''), 1000)
        // setAnswer('')
        let random = Math.floor(Math.random() * 23)
        //всегда на 1 меньше, чем элементом в массиве
        if (keys[random].name === key.name) {
            if (random === keys.length)
                random = 0
            else
                random = random + 1
        }
        setKey(keys[random])
    }



  return (
      <div className="audio-note">
        <header>Прослушайте ноту, нажав на Вопрос. Затем, определите ее, нажав на соответствующую ей кнопку</header>
        <div className="ref-wrap">
            <button className="play-ref" onClick={() => playRef(C3)}>Референс</button>
            <button className="play-question" onClick={() => playRef(key.value)}>Вопрос</button>
        </div>
        <div className="audio-module">
            <div className="module-row">
                <button className="module-item" id='C#' onClick={(e) => check(e.target.id)}>C#</button>
                <button className="module-item" id='D#' onClick={(e) => check(e.target.id)}>D#</button>
                <button className="module-item" id='F#' onClick={(e) => check(e.target.id)}>F#</button>
                <button className="module-item" id='G#' onClick={(e) => check(e.target.id)}>G#</button>
                <button className="module-item" id='A#' onClick={(e) => check(e.target.id)}>A#</button>
            </div>
            <div className="module-row">
                <button className="module-item" id='C' onClick={(e) => check(e.target.id)}>C</button>
                <button className="module-item" id='D' onClick={(e) => check(e.target.id)}>D</button>
                <button className="module-item" id='E' onClick={(e) => check(e.target.id)}>E</button>
                <button className="module-item" id='F' onClick={(e) => check(e.target.id)}>F</button>
                <button className="module-item" id='G' onClick={(e) => check(e.target.id)}>G</button>
                <button className="module-item" id='A' onClick={(e) => check(e.target.id)}>A</button>
                <button className="module-item" id='B' onClick={(e) => check(e.target.id)}>B</button>
            </div>
        </div>
        <div className="form">
            <h2 className='header'>Результат</h2>
            <div className="answer">{result}</div>
        </div>
        <footer>
            <small>Приведены две октавы, наиболее часто употребляемые при написании мелодий.
                <br/> Первая октава в тренажере соответствует третьей на фортепиано.
                <br/> Таким образом, нота С3 в тренажере соответствует первой клавише первой октавы и т.д.
                <br/> В данном упражнении референсом на слух выступает клавиша С3
            </small>
            <Link className='link' to='/exercises'>
                <GoBack/>
            </Link>
        </footer>
      </div>
  )
}
