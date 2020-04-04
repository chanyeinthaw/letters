import React, {Component} from "react";
import PropTypes from 'prop-types'
import classes from './Navigator.module.css'
import cls from 'clsx'
import arrow from './arrow.svg'


export class Navigator extends Component {
    getNavigationButtonClass = (control) => cls(classes.NavigationButton, {
        [classes.NavigationButtonDisabled]: !control
    })

    getPrevText() {
        return this.props.hasPrev ? "နောက်သို့" : ""
    }

    getNextText() {
        return this.props.hasNext ? "ရှေ့သို့" : ""
    }

    nothing() {}

    render() {
        const {hasNext, hasPrev, nextAction, prevAction} = this.props

        return (
            <div className={classes.NavigatorContainer} >
                <div className={classes.Navigator} >
                    <img src={arrow}
                         alt=""
                         onClick={hasPrev ? prevAction : this.nothing}
                         className={this.getNavigationButtonClass(hasPrev)}
                         title={this.getPrevText()}/>
                    <img src={arrow}
                         onClick={hasNext ? nextAction : this.nothing}
                         alt=""
                         className={this.getNavigationButtonClass(hasNext)}
                         title={this.getNextText()}/>
                </div>
            </div>
        )
    }
}

Navigator.propTypes = {
    nextAction: PropTypes.func,
    prevAction: PropTypes.func,
    hasNext: PropTypes.bool,
    hasPrev: PropTypes.bool
}
