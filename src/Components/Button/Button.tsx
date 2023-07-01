import { ReactNode } from 'react'

import cn from 'classnames'
import s from './button.module.scss'

interface ButtonProps {
    children: ReactNode
    className: string
    type: 'button' | 'submit' | 'reset'
    onClick?: () => void
}

export const Button = ({ children, className, type, onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} type={type} className={cn(s.button, className)}>
            {children}
        </button>
    )
}
