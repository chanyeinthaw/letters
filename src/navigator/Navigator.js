import React, {Component} from "react";
import PropTypes from 'prop-types'
import classes from './Navigator.module.css'
import cls from 'clsx'
import arrow from './arrow.svg'
import shuffle from './shuffle.svg'


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

    render() {
        const {hasNext, hasPrev} = this.props

        return (
            <div className={classes.NavigatorContainer} >
                <div className={classes.Navigator} >
                    <img src={arrow}
                         alt=""
                         className={this.getNavigationButtonClass(hasPrev)}
                         title={this.getPrevText()}/>
                    <img src={shuffle}
                         alt=""
                         className={classes.NavigationButton}
                         title="ကျပန်း"/>
                    <img src={arrow}
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
