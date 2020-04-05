import React, {Component} from "react";
import PropTypes from 'prop-types'
import classes from './Navigator.module.css'
import cls from 'clsx'
import arrow from './arrow.svg'
import {AppContext} from "../app/AppContext";


export class Navigator extends Component {
    static contextType = AppContext

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
        let {loading, hasNext, currentPage, goNextPage, goPrevPage} = this.context
        const hasPrev = !loading && currentPage !== 0
        hasNext = !loading && hasNext

        console.log('loading', loading)

        return (
            <div className={classes.NavigatorContainer} >
                <div className={classes.Navigator} >
                    <img src={arrow}
                         alt=""
                         onClick={hasPrev ? goPrevPage : this.nothing}
                         className={this.getNavigationButtonClass(hasPrev)}
                         title={this.getPrevText()}/>
                    <img src={arrow}
                         onClick={hasNext ? goNextPage : this.nothing}
                         alt=""
                         className={this.getNavigationButtonClass(hasNext)}
                         title={this.getNextText()}/>
                </div>
            </div>
        )
    }
}
