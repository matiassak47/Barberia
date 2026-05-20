import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Gallery from './components/Gallery/Gallery'
import Barbers from './components/Barbers/Barbers'
import Booking from './components/Booking/Booking'
import Location from './components/Location/Location'
import Footer from './components/Footer/Footer'
import Loader from './components/Loader/Loader'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Barbers />
        <Booking />
        <Location />
      </main>
      <Footer />
    </>
  )
}

export default App