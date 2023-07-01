import { useEffect } from 'react'
import { Routes, Route } from "react-router";
import { Home, Registration } from "./Pages";
import { Header } from "./Features";
import { useAppDispatch } from './store';
import { getUser } from './store/slices/userSlice';
import s from './app.module.scss'

export const App = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {

    const userId = localStorage.getItem('id')

    if (userId) {
      dispatch(getUser(userId))
    }

  }, [])

  return (
    <div className={s.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}
