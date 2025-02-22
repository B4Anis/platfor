import { useState } from 'react'
import './Team.css'
import photoprof from '../assets/photoprof.jpg'
import photo1 from '../assets/photo_2025-02-22_04-08-53.jpg'
import photo2 from '../assets/photo_2025-02-22_04-08-57.jpg'
import photo3 from '../assets/photo_2025-02-22_04-09-12.jpg'
import photo4 from '../assets/photo_2025-02-22_04-19-15.jpg'
import photo5 from '../assets/1719035866927.jpg'

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
  linkedin?: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Belahcene Hanadi",
    role: "Lead Data Scientist",
    image: photo3,
    bio: "Expert in AI and insurance technology",
    linkedin: "https://linkedin.com/in/anis-belkada"
  },
  {
    id: 2,
    name: "Maroua Ibtissem SEGUER",
    role: "Senior Actuary",
    image: photo1,
    bio: "AI/ML specialist with focus on risk assessment",
    linkedin: "https://linkedin.com/in/sarah-chen"
  },
  {
    id: 3,
    name: "Meriem Mebarek Mansouri ",
    role: "Insurance Specialist",
    image: photo2,
    bio: "Product strategy and innovation leader",
    linkedin: "https://linkedin.com/in/michael-rodriguez"
  },
  {
    id: 4,
    name: "Bensabra Moahmed Anis",
    role: "Risk Analyst",
    image: photo5,
    bio: "Expert in predictive modeling",
    linkedin: "https://linkedin.com/in/emily-thompson"
  },
  {
    id: 5,
    name: "Bouazouni Nassim",
    role: "AI Engineer",
    image: photo4,
    bio: "20+ years insurance industry expertise",
    linkedin: "https://linkedin.com/in/david-kim"
  }
]

const Team = () => {
  return (
    <section className="team" id="team">
      <div className="team-glow"></div>
      <div className="content-container">
        <div className="team-header animate-fadeIn">
          <h2>Our Team</h2>
          <p>Meet the experts behind our AI-powered insurance platform</p>
        </div>

        <div className="team-grid">
          <div className="team-row top-row">
            {teamMembers.slice(0, 3).map((member) => (
              <div key={member.id} className="team-member animate-fadeIn">
                <div className="member-image">
                  <div className="image-glow"></div>
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <span className="role">{member.role}</span>
                  <p>{member.bio}</p>
                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkedin-link"
                    >
                      Connect on LinkedIn
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="team-row bottom-row">
            {teamMembers.slice(3).map((member) => (
              <div key={member.id} className="team-member animate-fadeIn">
                <div className="member-image">
                  <div className="image-glow"></div>
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <span className="role">{member.role}</span>
                  <p>{member.bio}</p>
                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkedin-link"
                    >
                      Connect on LinkedIn
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="team-background">
        <div className="grid-pattern"></div>
      </div>
    </section>
  )
}

export default Team
