import { Link } from 'react-router-dom'

import s from './navbar.module.scss'

import { NavLinks } from '../../Routes'

export const Navbar = () => {
    return (
        <nav className={s.navBar}>
            <ul className={s.wrapper}>
                {NavLinks.map(item => {
                    return (
                        <li key={item.path}>
                            <Link className={s.link} to={item.path}>{item.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
