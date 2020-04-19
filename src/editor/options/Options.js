import React, {useEffect} from 'react'
import classes from './Options.module.css'
import {useEditorContext} from "../EditorContext";
import {useGetColors} from "../../shared-hooks/use-get-colors";
import {Colors} from "../colors/Colors";
import {TextAlignment} from "../text-alignment/TextAlignment";
import {DatePicker} from '@blueprintjs/datetime'
import {Slider, Button} from "@blueprintjs/core";
import {useAppContext} from "../../app/AppContext";

export default function Options({onSave}) {
    const {styles, date, setDate, text} = useEditorContext()
    const {loading} = useAppContext()
    const {updateBackgroundColor, updateTextColor} = useFunctions()
    
    const borderStyles = {borderLeftColor: styles.color}

    const shouldDisabled = loading === true || text === ''

    return (
        <div className={classes.Options} style={borderStyles}>
            <div className={classes.Title}>Options</div>

            <div className={classes.Option}>
                <p>Date</p>
                <DatePicker
                    highlightCurrentDay={true}
                    reverseMonthAndYearMenus={true}
                    onChange={setDate}
                    defaultValue={date} />
            </div>

            <div className={classes.Option}>
                <p>Background Color</p>
                <Colors onSelect={updateBackgroundColor}/>
            </div>

            <div className={classes.Option}>
                <p>Text Color</p>
                <Colors onSelect={updateTextColor} download={false}/>
            </div>

            <Button disabled={shouldDisabled} onClick={onSave}>Save</Button>
        </div>
    )
}

function useFunctions() {
    const {setStyle} = useEditorContext()

    const updateBackgroundColor = color => setStyle('backgroundColor', color)

    const updateTextColor = color => setStyle('color', color)

    return {updateBackgroundColor, updateTextColor}
}
