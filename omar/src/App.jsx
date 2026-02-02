import { useState } from 'react'
import './App.css'
import Headers from './compponents/headers.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/about.jsx'
import Skills from './sections/Skills.jsx'
import Projects from './sections/Projects.jsx'
import Footer from './compponents/Footer.jsx'

function App() {
 return (
  <>
    <Headers/>
   <Hero/>
    <About/>
    <Skills/>
    <Projects/>
    <Footer/>

  </>
 )  
}


export default App

