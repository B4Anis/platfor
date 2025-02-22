import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Team from './components/Team'
import Sponsors from './components/Sponsors'
import Dashboard from './components/Dashboard'
import Button from './components/Button'

function App() {
  const [showDashboard, setShowDashboard] = useState(false)

  const handleGetStarted = () => {
    setShowDashboard(true)
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        {showDashboard ? (
          <Dashboard />
        ) : (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <Sponsors />
            <Team />
          </>
        )}
      </main>
    </div>
  )
}

export default App
