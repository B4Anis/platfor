import { useState, useEffect } from 'react'
import './Sponsors.css'
import '../styles/animations.css'
import cashAssuranceLogo from '../assets/Logo-cash-assurance-720pixels.png'
import caatLogo from '../assets/caat.png'
import saaLogo from '../assets/saa.png'
import talaLogo from '../assets/tala.png'

interface Sponsor {
  id: number
  name: string
  logo: string
  description: string
  website: string
}

const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "Cash Assurance",
    logo: cashAssuranceLogo,
    description: "Leading insurance provider in digital transformation",
    website: "https://cash-assurance.com"
  },
  {
    id: 2,
    name: "CAAT Insurance",
    logo: caatLogo,
    description: "Innovative insurance solutions provider",
    website: "https://caat-insurance.com"
  },
  {
    id: 3,
    name: "SAA Assurance",
    logo: saaLogo,
    description: "Trusted insurance partner for businesses",
    website: "https://saa-assurance.com"
  },
  {
    id: 4,
    name: "Tala Insurance",
    logo: talaLogo,
    description: "Next-generation insurance technology",
    website: "https://tala-insurance.com"
  }
]

const SPONSORS_PER_PAGE = 2
const AUTO_SWITCH_INTERVAL = 5000

const Sponsors = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const totalPages = Math.ceil(sponsors.length / SPONSORS_PER_PAGE)

  useEffect(() => {
    const interval = setInterval(() => {
      handlePageChange((currentPage + 1) % totalPages)
    }, AUTO_SWITCH_INTERVAL)

    return () => clearInterval(interval)
  }, [currentPage, totalPages])

  const handlePageChange = (newPage: number) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentPage(newPage)
      setIsAnimating(false)
    }, 500)
  }

  const getCurrentSponsors = () => {
    const start = currentPage * SPONSORS_PER_PAGE
    return sponsors.slice(start, start + SPONSORS_PER_PAGE)
  }

  return (
    <section className="sponsors" id="sponsors">
      <div className="sponsors-glow"></div>
      <div className="content-container">
        <div className="sponsors-header animate-fadeIn">
          <h2>Our Partners</h2>
          <p>Working with industry leaders to transform insurance</p>
        </div>

        <div className="sponsors-carousel">
          <div className="sponsors-navigation">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(index)}
              />
            ))}
          </div>

          <div className="sponsors-container">
            <div className={`sponsors-page ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              {getCurrentSponsors().map((sponsor) => (
                <a
                  key={sponsor.id}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-card"
                  title={`Visit ${sponsor.name}`}
                >
                  <div className="sponsor-logo">
                    <div className="logo-glow"></div>
                    <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
                  </div>
                  <div className="sponsor-info">
                    <h3>{sponsor.name}</h3>
                    <p>{sponsor.description}</p>
                    <span className="visit-link">
                      Learn More
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="sponsors-background">
        <div className="grid-pattern"></div>
      </div>
    </section>
  )
}

export default Sponsors
