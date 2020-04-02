import React, {Component} from "react";
import PropTypes from 'prop-types'
import classes from './TextView.module.css'
import {Navigator} from "../navigator/Navigator";
import ReactMarkdown from "react-markdown";

export class TextView extends Component {
    getStyles() {
        const {styles} = this.props
        const colorStyles = {
            backgroundColor: styles.backgroundColor,
            color: styles.color
        }

        delete styles.backgroundColor
        delete styles.color

        return {styles, colorStyles}
    }

    render() {
        const {text} = this.props
        const {styles, colorStyles} = this.getStyles()

        return (
            <div className={classes.TextView} style={colorStyles}>
                <div className={classes.DateText}>
                    <span>၂၈ရက် ၆လ ၂၀၂၀</span>
                </div>
                <div className={classes.Text} style={styles}>
                    <ReactMarkdown source={text} />
                </div>
                <Navigator nextAction={() => {}}
                        prevAction={() => {}}
                        hasNext={false}
                        hasPrev={false} />
            </div>
        )
    }
}

TextView.propTypes = {
    styles: PropTypes.object,
    text: PropTypes.object
}

