import { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <a href="/" className="nav-logo">
          <img src="/logo.svg" alt="AI Insurance Platform" />
          <span>InsureAI</span>
        </a>

        <button 
          className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#team" className="nav-link">Team</a>
          <a href="#sponsors" className="nav-link">Partners</a>
          <a href="#contact" className="nav-link">Contact</a>
          <div className="nav-buttons">
            <a href="/signup" className="signup-button">Get Started</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
