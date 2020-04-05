import React, {useCallback} from "react";
import classes from './TextView.module.css'
import {Navigator} from "../navigator/Navigator";
import ReactMarkdown from "react-markdown";
import {useLetterViewContext} from "../LetterViewContext";

function convertToMMNumber(number) {
    const numberMap = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉', '၁၀']

    return [...number+''].map(n => numberMap[n]).join('')
}

export function TextView() {
    const {letter} = useLetterViewContext()

    const getStyles = useCallback(() => {
        const {styles} = letter
        const _styles = {...styles}
        const colorStyles = {
            backgroundColor: styles.backgroundColor,
            color: styles.color
        }

        delete _styles.backgroundColor
        delete _styles.color

        return {styles: _styles, colorStyles}
    }, [letter])

    const getMMDate = useCallback((date) => {
        date = new Date(date)

        const day = convertToMMNumber(date.getDate())
        const month = convertToMMNumber(date.getMonth()+1)
        const year = convertToMMNumber(date.getFullYear())

        return `${day}ရက် ${month}လ ${year}`
    }, [])

    const {text, createdAt} = letter
    const {styles, colorStyles} = getStyles()

    return (
        <div className={classes.TextView} style={colorStyles}>
            <div className={classes.DateText}>
                <span>{getMMDate(createdAt)}</span>
            </div>
            <div className={classes.Text} style={styles}>
                <ReactMarkdown source={text} escapeHtml={false}/>
            </div>
            <Navigator />
        </div>
    )
}

