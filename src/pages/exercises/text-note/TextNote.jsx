import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GoBack from '../../../components/goBack/GoBack'
import Piano from '../../../components/piano/Piano'
import keys from '../../../assets/Keys'
import './textNote.css'

export default function TextNote() {

    const [activeKeys, setActiveKeys] = useState([])
    const [answer, setAnswer] = useState('')
    const [result, setResult] = useState('')
    const [key, setKey] = useState(keys[Math.floor(Math.random() * 23)])
    const [rightAnswers, setRightAnswers] = useState(Array.of(key).map(item => item.value))
    const [rightAnsRefs, setRightAnsRefs] = useState([])

    //To get fresh data
    useEffect(() => {
        setRightAnswers(Array.of(key).map(item => item.value))
    }, [key])
    
    // const handleAnswer = (answer) => {
    //     setAnswer([...answerKey, answer])
    // } FOR CHORDS AND SCALES

    const handleAnswer = (answer) => {
            setAnswer(answer.id)
            setActiveKeys([...activeKeys, answer])
    }

    const handleRightAnsRefs = (elements) => {
        setRightAnsRefs(elements)
    }

    function check() {
        if (answer === key.value) {
            setResult('✔️ Правильный ответ!')
        } else if (!answer) {
            setResult('⚠️ Клавиша не нажата!')
        } else {
            setResult('❌ Неправильный ответ!')
        }

        // Hinting right results on piano keyboard vvv
        rightAnsRefs.forEach(item => {
            item.className.includes('white') ? 
            item.style.backgroundColor = 'rgb(132, 255, 167)' : 
            item.style.backgroundColor = 'rgb(74, 198, 109)'
        })


        //Resetting all the styles vvvv
        setTimeout(() => {
            //For actually right keys
            rightAnsRefs.forEach(item => {
                item.className.includes('white') ? 
                    item.style.backgroundColor = 'white' : 
                    item.style.backgroundColor = 'black' 
            })
            //For keys that user clicked
            activeKeys.forEach(item => {
                item.className.includes('white') ? 
                    item.style.backgroundColor = 'white' : 
                    item.style.backgroundColor = 'black' })
        
        }, 1000)
        
        setActiveKeys([])
        setTimeout(() => setResult(''), 1000)
        setAnswer('')

        //Setting up new task
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
        <Piano 
            ansKeys={handleAnswer} 
            rightAnswers={rightAnswers} 
            setRightAnswers={setRightAnswers}
            handleRightAnsRefs={handleRightAnsRefs}
        />
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
