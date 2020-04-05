import React, {useState} from 'react'
import classes from './PromptPassword.module.css'
import PropTypes from 'prop-types'
import {useAppContext} from "../AppContext";

export function PromptPassword() {
    const [password, _setPassword] = useState('')
    const {setPassword} = useAppContext()


    return (
        <div className={classes.PromptPassword}>
            <input placeholder="Password"
                   type="password"
                   value={password}
                   onChange={e => _setPassword(e.target.value)} />
            <button onClick={() => setPassword(password)}>Enter</button>
        </div>
    )
}

PromptPassword.propTypes = {
    onEnter: PropTypes.func
}
