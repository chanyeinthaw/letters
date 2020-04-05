import React, {Component} from "react";
import classes from './LoadingBar.module.css'

export class LoadingBar extends Component {
    render() {
        return (
            <div className={classes.Meter}>
                <span className={classes.Progress} />
            </div>
        )
    }
}
