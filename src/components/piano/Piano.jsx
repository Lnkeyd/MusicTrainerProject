import './piano.css'
import { useRef, createRef, useEffect } from 'react'
import keys from '../../assets/Keys';

export default function Piano({ansKeys, rightAnswers, handleRightAnsRefs}) {

    
    const pianoKeysRefs = useRef([])
    pianoKeysRefs.current = keys.map((element, i) => pianoKeysRefs.current[i] ?? createRef())

    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    const myAudioContext = new AudioContext();

    function GoPlay(note, event) {
        myAudioContext.resume().then(() => {
            const mySound = new Audio(note);
            mySound.loop = false;
            mySound.currentTime = 0;
            mySound.play();

            event.target.className.includes('white') ? 
                event.target.style.backgroundColor = 'rgb(255, 103, 103)' : 
                event.target.style.backgroundColor = 'rgb(216, 69, 69)'

            ansKeys(event.target)
        })
    }

    useEffect(() => {
        let trueAnsRefs = []
        pianoKeysRefs.current.forEach((item, index) => {
            if (rightAnswers.includes(item.current.id)) {
                trueAnsRefs.push(item.current)
            }
            handleRightAnsRefs(trueAnsRefs)
        })
        //eslint-disable-next-line
    }, [rightAnswers])

  return (
          <div className="container">
            <div className="piano">
                {
                    keys.map((key, i) => 
                        (<button
                            key={i}
                            ref={pianoKeysRefs.current[i]}

                            className={`key ${key.name.includes('#') ? 'black' : 'white'}`}
                            id={key.value} 
                            onClick={(e) => {GoPlay(key.sound, e)}}></button>))
                }
            </div>
        </div>
  )
}
