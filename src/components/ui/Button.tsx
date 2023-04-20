import React, { ReactNode } from 'react'

import '../../sass/ui/button.scss'

const Button: React.FC<{
  children: ReactNode
  className: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}> = function ({ children, className, onClick }) {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  )
}

export default Button
