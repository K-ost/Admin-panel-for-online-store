import { createSlice } from '@reduxjs/toolkit'

// State interface
export interface CounterState {
  login: boolean
  refetch: boolean
  notice: boolean
  noticeText: string
}

// State
const initialState: CounterState = {
  login: false,
  refetch: false,
  notice: false,
  noticeText: ''
}

export const appSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setLogin: (state) => {
      state.login = true
      localStorage.setItem('login', 'true')
    },
    setLogout: (state) => {
      state.login = false
      localStorage.removeItem('login')
    },
    setRefetch: (state, action) => {
      state.refetch = action.payload
    },
    setNotice: (state, action) => {
      state.noticeText = action.payload
    },
    showNotice: (state, action) => {
      state.notice = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLogin, setLogout, setRefetch, setNotice, showNotice } = appSlice.actions
export default appSlice.reducer