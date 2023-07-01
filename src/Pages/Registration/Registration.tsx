import { useState } from 'react'
import { RegistrationForm, AuthorizationForm } from '../../Features'

import cn from 'classnames'
import s from './registrationPage.module.scss'

export const Registration = () => {
    const [switchForm, setSwitchForm] = useState<string>('registration')

    return (
        <div className={s.container}>
            <h1 className={s.title}>
                <span onClick={() => setSwitchForm('authorization')} className={cn({ [s.isActive]: switchForm === 'authorization' })}>Войти</span>/
                <span onClick={() => setSwitchForm('registration')} className={cn({ [s.isActive]: switchForm === 'registration' })}>Регистрироваться</span>
            </h1>
            {switchForm === 'registration' ? (
                <RegistrationForm />
            ) : (
                <AuthorizationForm />
            )}
        </div>
    )
}
