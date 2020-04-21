import React, {useEffect, useState} from 'react';
import {TextView} from "./text-view/TextView";
import {defaultLetterViewState, LetterContext} from "./LetterContext";
import {useGetLetter} from "../shared-hooks/use-get-letters";
import {useParams} from "react-router";

export default function Letter() {
    const [state, setState] = useState(defaultLetterViewState)
    const getLetter = useGetLetter()
    const {id} = useParams()

    useEffect(() => {
        getLetter(id).then(letter => {
            letter.styles = typeof letter.styles === "string" ? JSON.parse(letter.styles) : letter.styles

            setState({
                ...state,
                letter
            })
        })
    }, [])

    const provide = {letter: state.letter,}

    return (
        <LetterContext.Provider value={provide}>
            {<TextView />}
        </LetterContext.Provider>
    )
}
