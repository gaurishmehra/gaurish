import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import StarBackground from './components/StarBackground/StarBackground';
import Intro from './sections/Intro/Intro';
import About from './sections/About/About';
import Thoughts from './sections/Thoughts/Thoughts';
import Projects from './sections/Projects/Projects';
import Contact from './sections/Contact/Contact';

function App() {
  return (
    <div className="App">
      <StarBackground />
      <Navbar />
      <Intro />
      <About />
      <Thoughts />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;