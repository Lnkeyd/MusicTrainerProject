import React from 'react'
import './exercises.css'

import note from '../../assets/img/note.svg'
import chord from '../../assets/img/chord.svg'
import scale from '../../assets/img/scale.svg'
import interval from '../../assets/img/interval.svg'
import { Link } from 'react-router-dom'


export default function Exercises() {

  return (
        <div className="training">
            <div className="mode">
              <h2 className='header'>Текстовый режим</h2>
                <Link className="link module" to="/exercises/text-note">
                  <div className="background">
                    <img src={note} alt="" className="icon" />
                  </div>
                  <div className="description">Определите ноту по названию</div>
                </Link>
                <Link className="link module" to="/exercises/text-chord">
                  <div className="background">
                    <img src={chord} alt="" className="icon" />
                  </div>
                  <div className="description">Определите аккорд по названию</div>
                </Link>
                <Link className="link module" to="/exercises/text-scale">
                  <div className="background">
                    <img src={scale} alt="" className="icon" />
                  </div>
                  <div className="description">Определите тональность по названию</div>
                </Link>
            </div>
            
            <div className="mode">
              <h2 className='header'>Аудио-режим</h2>
                <Link className="link module" to="/exercises/audio-note">
                  <div className="background">
                    <img src={note} alt="" className="icon" />
                  </div>
                  <div className="description">Определите ноту на звук</div>
                </Link>
                <Link className="link module" to="/exercises/audio-chord">
                  <div className="background">
                    <img src={chord} alt="" className="icon" />
                  </div>
                  <div className="description">Определите аккорд на звук</div>
                </Link>
                <Link className="link module" to="/exercises/audio-interval">
                  <div className="background">
                    <img src={interval} alt="" className="icon" />
                  </div>
                  <div className="description">Определите интервал на звук</div>
                </Link>
            </div>
        </div>
  )
}