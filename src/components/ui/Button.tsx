import React, { ReactNode } from 'react'

import '../../sass/ui/button.scss'

const Button: React.FC<{ children: ReactNode; className: string }> = function ({
  children,
  className,
}) {
  return <button className={`button ${className}`}>{children}</button>
}

export default Button
