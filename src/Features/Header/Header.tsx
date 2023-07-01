import { useAppSelector, useAppDispatch } from '../../store'
import { Link } from 'react-router-dom'
import { logOut, selectIsAuth } from '../../store/slices/userSlice'

import { Navbar } from '../../Components'

import s from './header.module.scss'

export const Header = () => {

    const { user } = useAppSelector(state => state.userSlice)
    const isAuth = useAppSelector(selectIsAuth)

    const dispatch = useAppDispatch()

    const userLogOut = () => {
        dispatch(logOut())
    }

    return (
        <header className={s.header}>
            <Navbar />
            {isAuth ? (
                <div onClick={userLogOut} className={s.logOut}>выйти</div>
            ) : (
                <Link className={s.logIn} to='/registration'>
                    войти/зарегистрироваться
                </Link>
            )}
            {
                isAuth && <div>{user?.name}</div>
            }
        </header>
    )
}
