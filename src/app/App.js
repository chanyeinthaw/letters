import React, {useEffect, useState} from 'react';
import Letter from "../letter/Letter";
import {AppContext, defaultAppState} from "./AppContext";
import {PromptPassword} from "./prompt-password/PromptPassword";
import {LoadingBar} from "./loading-bar/LoadingBar";
import {HashRouter, Route} from "react-router-dom";
import Editor from "../editor/Editor";
import {usePassword} from "../shared-hooks/use-password";
import {useNavigate} from "../shared-hooks/use-navigate";

export default function App() {
    const [state, setState] = useState(defaultAppState)
    const {getPassword} = usePassword()
    const navigate = useNavigate()


    const setLoading = (loading) => setState({...state, loading})

    useEffect(() => {
        if (getPassword() === '') navigate('#/login')
    }, [])

    const provide = {
        ...state,

        setLoading
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
            <Route exact path="/" component={Letter} />
            <Route path="/letter" component={Letter} />
            <Route path="/login" component={PromptPassword} />
            <Route path="/editor" component={Editor} />
        </HashRouter>
    )
}
