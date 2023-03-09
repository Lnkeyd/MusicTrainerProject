import './audioChord.css'
import { useState } from 'react'
//подключение аудио-файлов из соответствующего модуля Sounds
import {C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3} from '../../../assets/sounds/Sounds'
import {C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4} from '../../../assets/sounds/Sounds'
import React from 'react'
import { Link } from 'react-router-dom'
import GoBack from '../../../components/goBack/GoBack'

export default function AudioChord() {
    //использование хуков useState
    const [result, setResult] = useState('')
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0)
    const [chord, setChord] = useState({type: 'Maj triad', value: [C3, E3, G3]})

     // объявление аудио-контекста на странице
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    const myAudioContext = new AudioContext();
   
    //инициализирование массива со звуками
    const sounds = [C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3,
                    C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4]

    function getRandomRootNote() {
        return Math.floor(Math.random() * 11)
        // возвращает радномный индекс у массива sounds первой октавы
    }

    function getRandomMinor() {
        const root = getRandomRootNote();
        setChord({type: 'Min triad', value: [sounds[root], sounds[root+3], sounds[root+7]]})
    }

    function getRandomMajor() {
        const root = getRandomRootNote();
        setChord({type: 'Maj triad', value: [sounds[root], sounds[root+4], sounds[root+7]]})
    }

    function getRandomAug() {
        const root = getRandomRootNote();
        setChord({type: 'Aug triad', value: [sounds[root], sounds[root+4], sounds[root+8]]})
    }

    function getRandomDim() {
        const root = getRandomRootNote();
        setChord({type: 'Dim triad', value: [sounds[root], sounds[root+3], sounds[root+6]]})
    }

    function getRandomD7() {
        const root = getRandomRootNote();
        setChord({type: 'Dominant 7th', value: [sounds[root], sounds[root+4], sounds[root+7], sounds[root+10]]})
    }

    function getRandomMaj7() {
        const root = getRandomRootNote();
        setChord({type: 'Maj 7th', value: [sounds[root], sounds[root+4], sounds[root+7], sounds[root+11]]})
    }

    function getRandomMin7() {
        const root = getRandomRootNote();
        setChord({type: 'Min 7th', value: [sounds[root], sounds[root+3], sounds[root+7], sounds[root+10]]})
    }

    const types = [getRandomMajor, getRandomMinor, getRandomAug, getRandomDim, getRandomD7, getRandomMaj7, getRandomMin7]
    // массив из типов аккордов: мажорное трезвучие, минорное и т.д.

    function playRef(refChord) {
        myAudioContext.resume().then(() => {
            const firstNote = new Audio(refChord[0]);
            const secondNote = new Audio(refChord[1]);
            const thirdNote = new Audio(refChord[2]);

            firstNote.loop = false;
            secondNote.loop = false;
            thirdNote.loop = false;

            firstNote.currentTime = 0;
            secondNote.currentTime = 0;
            thirdNote.currentTime = 0;

            if (refChord.length === 3) {
                firstNote.play();
                secondNote.play();
                thirdNote.play();
            } else {
                const forthNote = new Audio(refChord[3]);
                forthNote.loop = false;
                forthNote.currentTime = 0;

                firstNote.play();
                secondNote.play();
                thirdNote.play();
                forthNote.play();
            }

        })
    }

    // проверка ответа
    function check(answer) {
        if (answer === chord.type) {
            setResult('✔️ Правильный ответ!')
        } else {
            setResult('❌ Неправильный ответ!')
        }
        
        setTimeout(() => setResult(''), 1000)
        // вопросы не должны повторяться
        let random = Math.floor(Math.random() * 6)
        if (types[random] === types[currentTypeIndex]) {
            if (random === types.length)
                random = 0
            else
                random = random + 1
        }
        setCurrentTypeIndex(random)
        const rand = types[currentTypeIndex]
        rand()
    }


    //непосредственно разметка веб-страницы
  return (
      <div className="audio-note">
        <header>Прослушайте аккорд, нажав на Вопрос. Затем, определите его, нажав на соответствующую кнопку</header>
        <div className="chord-ref-wrap">
            <button className="chord-play-question" onClick={() => playRef(chord.value)}>Вопрос</button>
        </div>
        <div className="audio-chord-module">
            <div className="chord-row">
                <button className="chord-item" id='Maj triad' onClick={(e) => check(e.target.id)}>Maj 3rd</button>
                <button className="chord-item" id='Min triad' onClick={(e) => check(e.target.id)}>Min 3rd</button>
                <button className="chord-item" id='Aug triad' onClick={(e) => check(e.target.id)}>Aug 3rd</button>
                <button className="chord-item" id='Dim triad' onClick={(e) => check(e.target.id)}>Dim 3rd</button> 
            </div>
            <div className="chord-row">
                <button className="chord-item" id='Dominant 7th' onClick={(e) => check(e.target.id)}>Dominant 7th</button>
                <button className="chord-item" id='Maj 7th' onClick={(e) => check(e.target.id)}>Maj 7th</button>
                <button className="chord-item" id='Min 7th' onClick={(e) => check(e.target.id)}>Min 7th</button>
            </div>
        </div>
        <div className="form">
            <h2 className='header'>Результат</h2>
            <div className="answer">{result}</div>
        </div>
        <footer>
            <small>Приведены две октавы, наиболее часто употребляемые при написании мелодий.
                <br/> Среди септаккордов приведены D7, M7 и m7, являющиеся
                <br/> отправной точкой для различия септаккордов на слух.
            </small>
            <Link className='link' to='/exercises'>
                <GoBack/>
            </Link>
        </footer>
      </div>
  )
}
