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
    <motion.button
      layout
      disabled={disabled}
      onClick={onClick}
      className={`button ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default Button
