import React, {useEffect} from 'react'
import classes from './Options.module.css'
import {useEditorContext} from "../EditorContext";
import {useGetColors} from "../../shared-hooks/use-get-colors";
import {Colors} from "../colors/Colors";
import {TextAlignment} from "../text-alignment/TextAlignment";

export default function Options() {
    const {
        styles, text, date,
        setStyle, setText, setDate
    } = useEditorContext()

    const {updateBackgroundColor, updateTextColor, updateTextAlignment} = useFunctions()
    
    const borderStyles = {
        borderLeftColor: styles.color
    }

    return (
        <div className={classes.Options} style={borderStyles}>
            <div className={classes.Title}>Options</div>

            <div className={classes.Option}>
                <p>Background Color</p>
                <Colors onSelect={updateBackgroundColor}/>
            </div>

            <div className={classes.Option}>
                <p>Text Color</p>
                <Colors onSelect={updateTextColor} download={false}/>
            </div>

            <div className={classes.Option}>
                <p>Text Alignment</p>
                <TextAlignment onSelect={updateTextAlignment}/>
            </div>
        </div>
    )
}

function useFunctions() {
    const {
        setStyle, setText, setDate
    } = useEditorContext()

    const updateBackgroundColor = color => setStyle('backgroundColor', color)

    const updateTextColor = color => setStyle('color', color)

    const updateTextAlignment = align => setStyle('textAlign', align)

    return {updateBackgroundColor, updateTextColor, updateTextAlignment}
}
