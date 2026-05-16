import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Gallery from './components/Gallery'
import Location from './components/Location'
import RSVP from './components/RSVP'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <div id="gallery">
          <Gallery />
        </div>
        <div id="location">
          <Location />
        </div>
        <RSVP />
      </main>
      <Footer />
    </>
  )
}
