import {createContext} from "react";

export const defaultAppState = {
    password: '',
    letter: {
        _id: '',
        styles: {
            fontSize: 24,
            backgroundColor: '#fff',
            color: '#fff',
            marginLeft: 52,
            marginRight: 52,
            textAlign: 'center'
        },
        text: '',
        createdAt: 0
    },
    hasNext: false,
    currentPage: 0
}

export const AppContext = createContext(null)
