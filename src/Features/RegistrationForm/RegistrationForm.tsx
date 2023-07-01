import { useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store'
import { useNavigate } from 'react-router'
import { registrationNewUser, selectIsAuth } from '../../store/slices/userSlice'
import { Button, Input, Snipper } from '../../Components'

import s from './registrationForm.module.scss'

interface FormInputProps {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export const RegistrationForm = () => {
    const { isLoading, user, error } = useAppSelector(state => state.userSlice)
    const isAuth = useAppSelector(selectIsAuth)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<FormInputProps>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const submitHandler: SubmitHandler<FormInputProps> = async data => {
        const response = await dispatch(registrationNewUser(data))
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [navigate, isAuth, user])

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
            <label className={s.label}>
                <span className={s.labelText}>name</span>
                <Controller
                    name='name'
                    control={control}
                    rules={{ required: 'поле обязательно заполнить' }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            className={s.input}
                            type='text'
                            initValue={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.name && (
                    <div className={s.errorMessage}>{errors.name.message}</div>
                )}
            </label>
            <label className={s.label}>
                <span className={s.labelText}>email</span>
                <Controller
                    name='email'
                    control={control}
                    rules={{ required: 'поле обязательно заполнить' }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            className={s.input}
                            type='email'
                            initValue={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.email && (
                    <div className={s.errorMessage}>{errors.email.message}</div>
                )}
            </label>
            <label className={s.label}>
                <span className={s.labelText}>password</span>
                <Controller
                    name='password'
                    control={control}
                    rules={{ required: 'поле обязательно заполнить' }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            className={s.input}
                            type='password'
                            initValue={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.password && (
                    <div className={s.errorMessage}>{errors.password.message}</div>
                )}
            </label>
            <label className={s.label}>
                <span className={s.labelText}>confirm password</span>
                <Controller
                    name='confirmPassword'
                    control={control}
                    rules={{ required: 'поле обязательно заполнить' }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            className={s.input}
                            type='password'
                            initValue={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.confirmPassword && (
                    <div className={s.errorMessage}>{errors.confirmPassword.message}</div>
                )}
                {errors.confirmPassword
                    ? ''
                    : getValues('password') !== getValues('confirmPassword') && (
                        <div className={s.errorMessage}>пароли не совпадают</div>
                    )}
            </label>
            <Button type='submit' className={s.btn}>
                {isLoading ? <Snipper /> : 'Зарегистрироваться'}
            </Button>
        </form>
    )
}
