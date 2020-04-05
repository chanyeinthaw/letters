import {createContext, useContext} from "react";

export const defaultAppState = {
    password: '',
    loading: true
}

export const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)
