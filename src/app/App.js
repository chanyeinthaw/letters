import React, {useEffect, useState} from 'react';
import LetterView from "../letter-view/LetterView";
import {AppContext, defaultAppState} from "./AppContext";
import {PromptPassword} from "./prompt-password/PromptPassword";
import {LoadingBar} from "./loading-bar/LoadingBar";
import {HashRouter, Route, useHistory} from "react-router-dom";

export default function App() {
    const [state, setState] = useState(defaultAppState)

    const setPassword = (password) => {
        setState({...state, password})
        document.cookie = "password=" + password
    }

    const setLoading = (loading) => setState({...state, loading})

    useEffect(() => {
        document.cookie.split('; ').map(cookie => {
            const [key, value] = cookie.split('=')

            if(key === 'password') setPassword(value)
            return []
        })
    }, [])

    useEffect(() => {
        if (state.password !== '') document.location.href = '#/letter-view'
        else document.location.href = '#/login'
    }, [state.password])

    const provide = {
        ...state,

        setLoading,
        setPassword
    }

    return (
        <AppContext.Provider value={provide}>
            {state.loading ? <LoadingBar /> : null}
            <Routes />
        </AppContext.Provider>
    )
}

function Routes() {
    return (
        <HashRouter>
            <Route path="/login">
                <PromptPassword />
            </Route>
            <Route path="/letter-view">
                <LetterView />
            </Route>
        </HashRouter>
    )
}
