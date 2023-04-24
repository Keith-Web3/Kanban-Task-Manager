import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

import '../../sass/ui/button.scss'

const Button: React.FC<{
  children: ReactNode
  className: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}> = function ({ children, className, onClick, disabled = false }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
