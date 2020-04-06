import React, {useCallback} from "react";
import classes from './TextView.module.css'
import {Navigator} from "../navigator/Navigator";
import ReactMarkdown from "react-markdown";
import {useLetterViewContext} from "../LetterContext";
import {useAppContext} from "../../app/AppContext";

function convertToMMNumber(number) {
    const numberMap = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉', '၁၀']

    return [...number+''].map(n => numberMap[n]).join('')
}

export function TextView() {
    const {letter} = useLetterViewContext()
    const {loading} = useAppContext()

    const getStyles = useCallback(() => {
        const {styles} = letter
        const _styles = {...styles}
        const colorStyles = {
            backgroundColor: styles.backgroundColor,
            color: styles.color
        }

        const opacity = {opacity: loading ? 0 : '100%'}

        delete _styles.backgroundColor
        delete _styles.color

        return {styles: {..._styles, ...opacity}, colorStyles, opacity}
    }, [letter, loading])

    const getMMDate = useCallback((date) => {
        date = new Date(date)

        const day = convertToMMNumber(date.getDate())
        const month = convertToMMNumber(date.getMonth()+1)
        const year = convertToMMNumber(date.getFullYear())

        return `${day}ရက် ${month}လ ${year}`
    }, [])

    const {text, createdAt} = letter
    const {styles, colorStyles, opacity} = getStyles()

    return (
        <div className={classes.TextView} style={colorStyles}>
            <div className={classes.DateText} style={opacity}>
                <span>{getMMDate(createdAt)}</span>
            </div>
            <div className={classes.Text} style={styles}>
                <ReactMarkdown source={text} escapeHtml={false}/>
            </div>
            <Navigator />
        </div>
    )
}

