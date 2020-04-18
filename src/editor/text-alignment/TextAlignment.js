import React, {useState} from 'react'
import classes from './TextAlignment.module.css'
import clsx from "clsx";

export function TextAlignment({onSelect}) {
    const [value, setValue] = useState("unset")

    const getClasses = v => clsx(classes.TextAlignmentItem, {
        [classes.TextAlignmentItemSelected]: value === v
    })

    const _onSelect = v => _ => {
        setValue(v)
        onSelect(v)
    }

    return (
        <div className={classes.TextAlignmentContainer}>
            <div className={getClasses('unset')} onClick={_onSelect('unset')}>None</div>
            <div className={getClasses('left')} onClick={_onSelect('left')}>Left</div>
            <div className={getClasses('center')} onClick={_onSelect('center')}>Center</div>
            <div className={getClasses('right')} onClick={_onSelect('right')}>Right</div>
        </div>
    )
}
