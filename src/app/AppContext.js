import {createContext, useContext} from "react";

export const defaultAppState = {
    loading: false,
    requests: []
}

export const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)
