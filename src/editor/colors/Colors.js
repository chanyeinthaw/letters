import React, {useEffect, useState} from 'react'
import classes from './Colors.module.css'
import {useGetColors} from "../../shared-hooks/use-get-colors";
import {useEditorContext} from "../EditorContext";

export function Colors({onSelect}) {
    const {colors} = useEditorContext()

    useOnMount()

    return (
        <div className={classes.Colors}>
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
