import {createContext, useContext} from "react";

export const defaultLetterViewState = {
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

export const LetterViewContext = createContext(null)

export const useLetterViewContext = () => useContext(LetterViewContext)
