import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Exercises from './pages/exercises/Exercises';
import TextNote from './pages/exercises/text-note/TextNote';
import TextChord from './pages/exercises/text-chord/TextChord';
import TextScale from './pages/exercises/text-scale/TextScale';
import AudioNote from './pages/exercises/audio-note/AudioNote';
import AudioChord from './pages/exercises/audio-chord/AudioChord';
import AudioInterval from './pages/exercises/audio-interval/AudioInterval';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
          <Route path="*" element={<Exercises/>}/>
          <Route path="/exercises/text-note" element={<TextNote/>}/>
          <Route path="/exercises/text-chord" element={<TextChord/>}/>
          <Route path="/exercises/text-scale" element={<TextScale/>}/>
          <Route path="/exercises/audio-note" element={<AudioNote/>}/>
          <Route path="/exercises/audio-chord" element={<AudioChord/>}/>
          <Route path="/exercises/audio-interval" element={<AudioInterval/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);