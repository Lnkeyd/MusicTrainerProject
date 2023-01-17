import './audioInterval.css'
import { useState } from 'react'
import {C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3} from '../sounds/Sounds'
import {C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4} from '../sounds/Sounds'
import React from 'react'
import { Link } from 'react-router-dom'
import GoBack from '../../../components/goBack/GoBack'

export default function AudioInterval() {

    const [result, setResult] = useState('')
    const [interval, setInterval] = useState({name: 'Maj 3rd', rootNote: C3, endNote: E3})
    
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    const myAudioContext = new AudioContext();

    const sounds = [C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3,
                    C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4]

    const intervals = [
        {name: 'Prima', diff: 0},
        {name: 'Min 2nd', diff: 1},
        {name: 'Maj 2nd', diff: 2},
        {name: 'Min 3rd', diff: 3},
        {name: 'Maj 3rd', diff: 4},
        {name: '4th', diff: 5},
        {name: 'Tritone', diff: 6},
        {name: '5th', diff: 7},
        {name: 'Min 6th', diff: 8},
        {name: 'Maj 6th', diff: 9},
        {name: 'Min 7th', diff: 10},
        {name: 'Maj 7th', diff: 11},
        {name: 'Octave', diff: 12},
    ]

    function getRandomRootNote() {
        return Math.floor(Math.random() * 11)
        // возвращает радномный индекс у массива sounds первой октавы
    }

    function getInterval () {
        const root = getRandomRootNote()
        let randInterval = Math.floor(Math.random() * 12)
        // random interval
        if (interval.name === intervals[randInterval].name) {
            if (randInterval === intervals.length)
                randInterval = 0
            else
                randInterval = randInterval + 1
        }
        setInterval({name: intervals[randInterval].name, rootNote: sounds[root], endNote: sounds[root + intervals[randInterval].diff]})
    }


    function playRef(refInterval) {
        myAudioContext.resume().then(() => {
            const firstNote = new Audio(refInterval.rootNote);
            const secondNote = new Audio(refInterval.endNote);

            firstNote.loop = false;
            secondNote.loop = false;

            firstNote.currentTime = 0;
            secondNote.currentTime = 0;

            firstNote.play();
            setTimeout(() => secondNote.play(), 1000)
            
        })
    }


    function check(answer) {
        console.log(interval.name)
        console.log(answer)
        if (answer === interval.name) {
            setResult('✔️ Правильный ответ!')
        } else {
            setResult('❌ Неправильный ответ!')
        }
        
        setTimeout(() => setResult(''), 1000)

        getInterval()
    }



  return (
      <div className="audio-note">
        <header>Прослушайте интервал, нажав на Вопрос. Затем, определите его, нажав на соответствующую кнопку</header>
        <div className="interval-ref-wrap">
            <button className="interval-play-question" onClick={() => playRef(interval)}>Вопрос</button>
        </div>
        <div className="audio-interval-module">
            <div className="interval-row">
                <button className="interval-item" id='Prima' onClick={(e) => check(e.target.id)}>Унисон</button>
                <button className="interval-item" id='Min 2nd' onClick={(e) => check(e.target.id)}>Малая секунда</button>
                <button className="interval-item" id='Maj 2nd' onClick={(e) => check(e.target.id)}>Большая секунда</button>
                <button className="interval-item" id='Min 3rd' onClick={(e) => check(e.target.id)}>Малая терция</button>
                <button className="interval-item" id='Maj 3rd' onClick={(e) => check(e.target.id)}>Большая терция</button>
                <button className="interval-item" id='4th' onClick={(e) => check(e.target.id)}>Чистая кварта</button>
            </div>
            <div className="interval-row">
                <button className="interval-item" id='Tritone' onClick={(e) => check(e.target.id)}>Тритон</button>
                <button className="interval-item" id='5th' onClick={(e) => check(e.target.id)}>Чистая квинта</button>
                <button className="interval-item" id='Min 6th' onClick={(e) => check(e.target.id)}>Малая секста</button>
                <button className="interval-item" id='Maj 6th' onClick={(e) => check(e.target.id)}>Большая секста</button>
                <button className="interval-item" id='Min 7th' onClick={(e) => check(e.target.id)}>Малая септима</button>
                <button className="interval-item" id='Maj 7th' onClick={(e) => check(e.target.id)}>Большая септима</button>
                <button className="interval-item" id='Octave' onClick={(e) => check(e.target.id)}>Октава</button>
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
            </small>
            <Link className='link' to='/exercises'>
                <GoBack/>
            </Link>
        </footer>
      </div>
  )
}
