import { useState } from 'react'
import Piano from '../../../components/piano/Piano'
import './textChord.css'
import GoBack from '../../../components/goBack/GoBack'
import { Link } from 'react-router-dom'

export default function TextChord() {

    const [activeKeys, setActiveKeys] = useState([])
    const [answerChord, setAnswerChord] = useState([])
    const [result, setResult] = useState('')
    const [chord, setChord] = useState({name: 'Cmaj', value: ['C3', 'E3', 'G3']})
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0)
    
    const sounds = ['C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3',
        'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4']
    
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    function getRandomRootNote() {
        return Math.floor(Math.random() * 11)
        // возвращает радномный индекс у массива sounds первой октавы
    }

    function getRandomMinor() {
        const root = getRandomRootNote();
        setChord({name: `${keys[root]}min`, value: [sounds[root], sounds[root+3], sounds[root+7]]})
    }

    function getRandomMajor() {
        const root = getRandomRootNote();
        setChord({name: `${keys[root]}maj`, value: [sounds[root], sounds[root+4], sounds[root+7]]})
    }

    function getRandomAug() {
        const root = getRandomRootNote();
        setChord({name: `${keys[root]}aug`, value: [sounds[root], sounds[root+4], sounds[root+8]]})
    }

    function getRandomDim() {
        const root = getRandomRootNote();
        setChord({name: `${keys[root]}dim`, value: [sounds[root], sounds[root+3], sounds[root+6]]})
    }

    const types = [getRandomMajor, getRandomMinor, getRandomAug, getRandomDim]

    const handleAnswer = (answer) => {
            setAnswerChord([...answerChord, answer.id])
            setActiveKeys([...activeKeys, answer])
        }


    function compare(a1, a2) {
        return a1.length === a2.length && a1.every((val,index) =>val === a2[index])
    }

    function check() {
        if (compare(answerChord, chord.value)) {
            setResult('✔️ Правильный ответ!')
        } else if (answerChord === false) {
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
        setAnswerChord([])

        let random = Math.floor(Math.random() * 3)
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



  return (
      <div className="text-note">
        <header>
            Начните определять аккорд с нижней тоники, последовательно нажимая клавиши на клавиатуре (3шт)
        </header>
        <Piano ansKeys = {handleAnswer}/>
        <div className="form">
            <h2 className='header'>Тест</h2>
            <div className="question">Определите аккорд: <b>{chord.name}</b></div>
            <button className="checkAnswer"onClick={check}>Проверь себя!</button>
            <div className="answer">{result}</div>
        </div>
        <footer>
            <Link className='link' to='/exercises'>
                <GoBack/>
            </Link>
        </footer>
      </div>
  )
}
