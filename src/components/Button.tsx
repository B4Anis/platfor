import './Button.css'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

const Button = ({ children, variant = 'primary', onClick }: ButtonProps) => {
  return (
    <button 
      className={`button ${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
