import React, {useEffect, useState} from 'react'
import classes from './Colors.module.css'
import {useGetColors} from "../../shared-hooks/use-get-colors";
import {useEditorContext} from "../EditorContext";

export function Colors({onSelect}) {
    const {colors} = useEditorContext()

    useOnMount()

    return (
        <div className={classes.Colors}>
            {
                (colors.length === 0 ? Array(7).fill('#e1e1e1') : []).map(color => (
                    <div className={classes.ColorCell} key={color}>
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

function useOnMount() {
    const getColors = useGetColors()
    const {setColors} = useEditorContext()

    useEffect(() => {
        getColors().then(colors => setColors(colors))
    }, [])
}
