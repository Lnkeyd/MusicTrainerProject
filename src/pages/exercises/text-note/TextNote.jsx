import { useState } from 'react'
import { Link } from 'react-router-dom'
import GoBack from '../../../components/goBack/GoBack'
import Piano from '../../../components/piano/Piano'
import './textNote.css'

export default function TextNote() {

    const [activeKeys, setActiveKeys] = useState([])
    const [answerKey, setAnswer] = useState('')
    const [result, setResult] = useState('')
    const [key, setKey] = useState({name: 'C3', value: 'C3'})
    
    const keys = [
        {name: 'C3', value: 'C3'},
        {name: 'C#3', value: 'Db3'},
        {name: 'D3', value: 'D3'},
        {name: 'D#3', value: 'Eb3'},
        {name: 'E3', value: 'E3'},
        {name: 'F3', value: 'F3'},
        {name: 'F#3', value: 'Gb3'},
        {name: 'G3', value: 'G3'},
        {name: 'G#3', value: 'Ab3'},
        {name: 'A3', value: 'A3'},
        {name: 'A#3', value: 'Bb3'},
        {name: 'B3', value: 'B3'},

        {name: 'C4', value: 'C4'},
        {name: 'C#4', value: 'Db4'},
        {name: 'D4', value: 'D4'},
        {name: 'D#4', value: 'Eb4'},
        {name: 'E4', value: 'E4'},
        {name: 'F4', value: 'F4'},
        {name: 'F#4', value: 'Gb4'},
        {name: 'G4', value: 'G4'},
        {name: 'G#4', value: 'Ab4'},
        {name: 'A4', value: 'A4'},
        {name: 'A#4', value: 'Bb4'},
        {name: 'B4', value: 'B4'}
    ]

    // const handleAnswer = (answer) => {
    //     setAnswer([...answerKey, answer])
    // } FOR CHORDS AND SCALES

    const handleAnswer = (answer) => {
            setAnswer(answer.id)
            setActiveKeys([...activeKeys, answer])
        }

    // useEffect(() => {
    //     console.log(answerKey.id)
    // }, [])

    function check() {
        if (answerKey === key.value) {
            setResult('✔️ Правильный ответ!')
        } else if (!answerKey) {
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
        setAnswer('')
        let random = Math.floor(Math.random() * 23)
        if (keys[random].name === key.name) {
            if (random === keys.length)
                random = 0
            else
                random = random + 1
        }
        setKey(keys[random])
    }



  return (
      <div className="text-note">
        <header>Определите ноту, нажав на соответствующую ей клавишу</header>
        <Piano ansKeys = {handleAnswer}/>
        <div className="form">
            <h2 className='header'>Тест</h2>
            <div className="question">Нажмите на клавишу: <b>{key.name}</b></div>
            <button className="checkAnswer"onClick={check}>Проверь себя!</button>
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
