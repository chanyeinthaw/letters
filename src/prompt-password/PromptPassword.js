import React, {Component} from 'react'
import classes from './PromptPassword.module.css'
import PropTypes from 'prop-types'

export class PromptPassword extends Component {
    state = {
        password: ''
    }

    render() {
        return (
            <div className={classes.PromptPassword}>
                <input placeholder="Password"
                       type="password"
                       value={this.state.password}
                       onChange={e => this.setState({
                            password: e.target.value
                       })} />
                <button onClick={() => this.props.onEnter(this.state.password)}>Enter</button>
            </div>
        )
    }
}

PromptPassword.propTypes = {
    onEnter: PropTypes.func
}
