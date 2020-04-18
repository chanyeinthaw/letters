import {createContext, useContext} from "react";

export const defaultAppState = {
    loading: false
}

export const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)
