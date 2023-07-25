import React, { ReactNode } from 'react'

import '../../sass/ui/button.scss'

interface ButtonProps {
  children: ReactNode
  className: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}
const Button = function ({
  children,
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
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
