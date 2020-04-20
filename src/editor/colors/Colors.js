import React, {useEffect, useState} from 'react'
import classes from './Colors.module.css'
import {useGetColors} from "../../shared-hooks/use-get-colors";
import {useEditorContext} from "../EditorContext";

export function Colors({onSelect}) {
    const [colors, setColors] = useState([])
    const getColors = useGetColors()

    useEffect(() => {
        getColors().then(colors => setColors(colors))
    }, [])

    return (
        <div className={classes.Colors}>
            {
                (colors.length === 0 ? Array(7).fill('#e1e1e1') : []).map((color, i) => (
                    <div className={classes.ColorCell} key={i}>
                        <div className={classes.Color} style={{backgroundColor: color}} onClick={() => {}}/>
                    </div>
                ))
            }

            {colors.map(color => (
                <div className={classes.ColorCell} key={color}>
                    <div className={classes.Color} style={{backgroundColor: color}} onClick={() => onSelect(color)}/>
                </div>
            ))}
        </div>
    )
}
