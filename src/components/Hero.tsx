import './Hero.css'
import Button from './Button'
import '../styles/animations.css'

interface HeroProps {
  onGetStarted: () => void
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="hero">
      <div className="content-container">
        <div className="hero-content animate-slideInLeft">
          <h1>Transform Insurance Reserve Estimation with AI</h1>
          <p className="animate-fadeIn delay-200">
            Leverage cutting-edge artificial intelligence to accurately predict and manage insurance reserves. 
            Make data-driven decisions with confidence.
          </p>
          <div className="cta-group animate-fadeIn delay-300">
            <Button variant="primary" onClick={onGetStarted}>Get Started</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>
        <div className="hero-image animate-slideInRight">
          <div className="analytics-card animate-float">
            <div className="card-header">AI Reserve Prediction</div>
            <div className="card-content">
              <div className="metric">
                <span className="label">Accuracy Rate</span>
                <span className="value">98.5%</span>
              </div>
              <div className="metric">
                <span className="label">Processing Time</span>
                <span className="value">2.3s</span>
              </div>
              <div className="metric">
                <span className="label">Risk Assessment</span>
                <span className="value">Real-time</span>
              </div>
            </div>
            <div className="card-chart">
              <div className="chart-bars">
                <div className="bar" style={{ height: '60%' }}></div>
                <div className="bar" style={{ height: '80%' }}></div>
                <div className="bar" style={{ height: '70%' }}></div>
                <div className="bar" style={{ height: '90%' }}></div>
                <div className="bar" style={{ height: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
