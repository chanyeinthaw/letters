import React, {useEffect, useState} from 'react';
import {TextView} from "./text-view/TextView";
import {defaultLetterViewState, LetterViewContext} from "./LetterViewContext";
import {useAppContext} from "../app/AppContext";
import {useGetLetter} from "../shared-hooks/use-get-letter";
import {CancelToken} from "axios";

export default function LetterView() {
    const [state, setState] = useState(defaultLetterViewState)
    const {loading} = useAppContext()

    const updateLetterState = (data) => {
        const {letter, hasNext} = data

        if (!letter) return

        letter.styles = JSON.parse(letter.styles)

        setState({
            ...state, letter, hasNext
        })
    }

    const changeCurrentPage = (pivot) =>  setState({...state, currentPage: state.currentPage + pivot})

    useLetterViewEffects(updateLetterState, state.currentPage)

    const provide = {
        letter: state.letter,
        hasNext: state.hasNext,
        currentPage: state.currentPage,

        loading,

        goNextPage: () => changeCurrentPage(+1),
        goPrevPage: () => changeCurrentPage(-1)
    }

    return (
        <LetterViewContext.Provider value={provide}>
            {<TextView />}
        </LetterViewContext.Provider>
    )
}

function useLetterViewEffects(updateLetterState, page) {
    const {password} = useAppContext()
    const [getLetter, cancelTokenSource] = useGetLetter()

    useEffect(() => {
        if (password !== '') {
            getLetter(page).then(updateLetterState)
        }

        return () => cancelTokenSource.cancel('Component unmount')
    }, [password, page])
}
