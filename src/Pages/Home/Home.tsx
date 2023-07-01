import { useAppSelector } from "../../store"

export const Home = () => {

    const { user } = useAppSelector(state => state.userSlice)
    console.log(user)

    return <div>
        {
            user ? <h1>добропожаловать {user.name}</h1> : <h1>войдите в систему</h1>
        }
    </div>
}
