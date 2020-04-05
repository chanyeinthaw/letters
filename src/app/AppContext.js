import {createContext, useContext} from "react";

export const defaultAppState = {
    password: '',
    loading: false
}

export const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)
