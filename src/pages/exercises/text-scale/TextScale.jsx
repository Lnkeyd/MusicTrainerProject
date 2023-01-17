import { useState } from 'react'
import { Link } from 'react-router-dom'
import GoBack from '../../../components/goBack/GoBack'
import Piano from '../../../components/piano/Piano'
import './textScale.css'

export default function TextScale() {

    const [activeKeys, setActiveKeys] = useState([])
    const [answerScale, setAnswerScale] = useState([])
    const [result, setResult] = useState('')

    const scales = [
        {
            name: 'Cmaj | Amin',
            value: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"]
        },
        {
            name: 'Dbmaj | Bbmin',
            value: ["Db3", "Eb3", "F3", "Gb3", "Ab3", "Bb3", "C4", "Db4"]
        },
        {
            name: 'Dmaj | Bmin',
            value: ["D3", "E3", "Gb3", "G3", "A3", "B3", "Db4", "D4"]
        },
        {
            name: 'Ebmaj | Cmin',
            value: ["Eb3", "F3", "G3", "Ab3", "Bb3", "C4", "D4", "Eb4"]
        },
        {
            name: 'Emaj | C#min',
            value: ["E3", "Gb3", "Ab3", "A3", "B3", "Db4", "Eb4", "E4"]
        },
        {
            name: 'Fmaj | Dbmin',
            value: ["F3", "G3", "A3", "Bb3", "C4", "D4", "E4", "F4"]
        },
        {
            name: 'Gbmaj | Ebmin',
            value: ["Gb3", "Ab3", "Bb3", "B3", "Db4", "Eb4", "F4", "Gb4"]
        },
        {
            name: 'Gmaj | Emin',
            value: ["G3", "A3", "B3", "C4", "D4", "E4", "Gb4", "G4"]
        },
        {
            name: 'Abmaj | Fmin',
            value: ["Ab3", "Bb3", "C4", "Db4", "Eb4", "F4", "G4", "Ab4"]
        },
        {
            name: 'Amaj | F#min',
            value: ["A3", "B3", "Db4", "D4", "E4", "Gb4", "Ab4", "A4"]
        },
        {
            name: 'Bbmaj | Gmin',
            value: ["Bb3", "C4", "D4", "Eb4", "F4", "G4", "A4", "Bb4"]
        },
        {
            name: 'Bmaj | G#min',
            value: ["B3", "Db4", "Eb4", "E4", "Gb4", "Ab4", "Bb4", "B4"]
        },
    ]

    const [scale, setScale] = useState(scales[Math.floor(Math.random() * 5)])


    const handleAnswer = (answer) => {
            setAnswerScale([...answerScale, answer.id])
            setActiveKeys([...activeKeys, answer])
        }

    function compare(a1, a2) {
        return a1.length === a2.length && a1.every((val,index) =>val === a2[index])
    }

    function check() {
        if (compare(answerScale, scale.value)) {
            setResult('✔️ Правильный ответ!')
        } else if (answerScale === false) {
            setResult('⚠️ Клавиша не нажата!')
        } else {
            setResult('❌ Неправильный ответ!')
        }
        setActiveKeys(activeKeys.map(item => 
                    item.className.includes('white') ? 
                        item.style.backgroundColor = 'white' : 
                        item.style.backgroundColor = 'black' ))
        setActiveKeys([])
        setTimeout(() => setResult(''), 1000)
        setAnswerScale([])

        let random = Math.floor(Math.random() * 11)
        if (scales[random].name === scale.name) {
            if (random === scales.length)
                random = 0
            else
                random = random + 1
        }
        setScale(scales[random])
    }



  return (
      <div className="text-note">
        <header>
            Начните определять тональность с нижней тоники параллельного мажора (...maj), последовательно нажимая клавиши на клавиатуре (8шт)
        </header>
        <Piano ansKeys = {handleAnswer}/>
        <div className="form">
            <h2 className='header'>Тест</h2>
            <div className="question">Определите тональность: <b>{scale.name}</b></div>
            <button className="checkAnswer"onClick={check}>Проверь себя!</button>
            <div className="answer">{result}</div>
        </div>
        <footer>
            <small>Приведены наиболее часто употребляемые тональности наряду с параллельными.
                <br/> F#maj/D#min на клавиатуре соответствует Gbmaj/Ebmin,
                <br/> C#maj/A#min - Dbmaj/Bbmin,
                <br/> Cbmaj/Abmin - Bmaj/G#min.
            </small>
            <Link className='link' to='/exercises'>
                <GoBack/>
            </Link>
        </footer>
      </div>
  )
}
