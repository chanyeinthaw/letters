import React, {Component} from "react";
import classes from './TextView.module.css'
import {Navigator} from "../navigator/Navigator";
import ReactMarkdown from "react-markdown";
import {AppContext} from "../app/AppContext";

function convertToMMNumber(number) {
    const numberMap = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉', '၁၀']

    return [...number+''].map(n => numberMap[n]).join('')
}

export class TextView extends Component {
    static contextType = AppContext

    getStyles() {
        const {styles} = this.context.letter
        const _styles = {...styles}
        const colorStyles = {
            backgroundColor: styles.backgroundColor,
            color: styles.color
        }

        delete _styles.backgroundColor
        delete _styles.color

        return {styles: _styles, colorStyles}
    }

    getMMDate(date) {
        date = new Date(date)

        const day = convertToMMNumber(date.getDate())
        const month = convertToMMNumber(date.getMonth()+1)
        const year = convertToMMNumber(date.getFullYear())

        return `${day}ရက် ${month}လ ${year}`
    }

    render() {
        const {letter} = this.context
        const {text, createdAt} = letter
        const {styles, colorStyles} = this.getStyles()

        return (
            <div className={classes.TextView} style={colorStyles}>
                <div className={classes.DateText}>
                    <span>{this.getMMDate(createdAt)}</span>
                </div>
                <div className={classes.Text} style={styles}>
                    <ReactMarkdown source={text} escapeHtml={false}/>
                </div>
                <Navigator />
            </div>
        )
    }
}

