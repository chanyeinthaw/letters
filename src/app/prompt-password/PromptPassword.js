import React, {useState} from 'react'
import classes from './PromptPassword.module.css'
import PropTypes from 'prop-types'
import {usePassword} from "../../shared-hooks/use-password";
import {useNavigate} from "../../shared-hooks/use-navigate";

export function PromptPassword() {
    const [password, _setPassword] = useState('')
    const {setPassword} = usePassword()
    const navigate = useNavigate()

    const onBtnClick = () => {
        setPassword(password)

        navigate('#/')
    }

    return (
        <div className={classes.PromptPassword}>
            <input placeholder="Password"
                   type="password"
                   value={password}
                   onChange={e => _setPassword(e.target.value)} />
            <button onClick={onBtnClick}>Enter</button>
        </div>
    )
}

PromptPassword.propTypes = {
    onEnter: PropTypes.func
}
