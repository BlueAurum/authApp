import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { registrationUser, authUser, getUser as getPerson } from '../../Shared/api/routes/user'
import { RootState } from '..'

interface IUser {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

interface IResponseUser extends Omit<IUser, 'password'> {
    id: number
}

interface IState {
    isLoading: boolean,
    user: IResponseUser | null,
    error: string | null
}

const initialState: IState = {
    isLoading: false,
    user: null,
    error: null
}

export const registrationNewUser = createAsyncThunk('user/registrationUser', async (user: IUser, thunkApi) => {
    try {
        const response = await registrationUser(user)
        localStorage.setItem('token', response.data.accessToken)
        // тут id добавил специально , что бы сделать вход по id , а то я хз как сделать по токену именно на json-server
        localStorage.setItem('id', response.data.user.id)
        return response.data.user
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const authorizationUser = createAsyncThunk('user/authorizationUser', async (user: {
    email: string,
    password: string,
}, thunkApi) => {
    try {
        const response = await authUser(user)
        localStorage.setItem('token', response.data.accessToken)
        // тут id добавил специально , что бы сделать вход по id , а то я хз как сделать по токену именно на json-server
        localStorage.setItem('id', response.data.user.id)
        return response.data.user
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

// тут id добавил специально , что бы сделать вход по id , а то я хз как сделать по токену именно на json-server
export const getUser = createAsyncThunk('user/getUser', async (id: string, thunkApi) => {
    try {
        const response = await getPerson(id)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut(state) {
            state.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('id')
        }
    },
    extraReducers(builder) {
        builder.addCase(registrationNewUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registrationNewUser.fulfilled, (state, action: PayloadAction<IResponseUser>) => {
            state.isLoading = false
            state.user = action.payload
        }).addCase(registrationNewUser.rejected, (state, action: any) => {
            state.isLoading = false
            state.user = null
            state.error = action.payload.message
        }).addCase(authorizationUser.pending, (state, action) => {
            state.isLoading = true
        }).addCase(authorizationUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
        }).addCase(authorizationUser.rejected, (state, action) => {
            state.isLoading = false
            state.user = null
            state.error = 'произошла ошибка'
        }).addCase(getUser.pending, (state) => {
            state.isLoading = true
        }).addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
        }).addCase(getUser.rejected, (state, action) => {
            state.isLoading = false
            state.user = null
            state.error = 'произошла ошибка'
        })
    }
})

export const { logOut } = userSlice.actions

export const selectIsAuth = (state: RootState) => Boolean(state.userSlice.user)

export default userSlice.reducer