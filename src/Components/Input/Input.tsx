import cn from 'classnames'
import s from './input.module.scss'
import { ChangeEvent, useState } from 'react'

interface InputProps {
    initValue: string
    className: string
    type: 'text' | 'password' | 'email'
    onChange: (value: string) => void
}

export const Input = ({ initValue, className, type, onChange }: InputProps) => {
    const [value, setValue] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
        setValue(e.target.value)
    }

    return (
        <input
            onChange={handleChange}
            type={type}
            value={initValue}
            className={cn(s.input, className)}
        />
    )
}
