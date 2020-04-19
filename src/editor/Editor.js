import React, {createRef, useEffect, useRef, useState} from 'react'
import classes from './Editor.module.css'
import {defaultEditorState, EditorContext} from "./EditorContext";
import Options from "./options/Options";

export default function Editor() {
    const [state, setState] = useState(defaultEditorState)

    const styles = {
        backgroundColor: state.styles.backgroundColor,
        color: state.styles.color
    }

    const contentStyles = {
        ...styles,
        textAlign: state.styles.textAlign,
        marginLeft: state.styles.marginLeft,
        marginRight: state.styles.marginRight,
        fontSize: state.styles.fontSize
    }

    const setStyle = (key, value) => {
        if (key === 'margin') {
            setState({
                ...state,
                styles: {
                    ...state.styles,
                    marginLeft: value,
                    marginRight: value
                }
            })
        } else {
            setState({
                ...state,
                styles: {
                    ...state.styles,
                    [key]: value
                }
            })
        }
    }

    const setText = text => setState({...state, text})

    const setDate = date => setState({...state, createdAt: date})

    const setColors = colors => setState({...state, colors})

    const provide = {
        styles: state.styles,
        text: state.text,
        date: state.createdAt,
        colors: state.colors,

        setStyle, setText, setDate, setColors
    }

    return (
        <EditorContext.Provider value={provide}>
            <div className={classes.Editor} style={styles}>
                <textarea
                    autoFocus={true}
                    className={classes.TextView}
                    style={contentStyles}
                    value={state.text}
                    onChange={e => setText(e.target.value)} />
                <Options />
            </div>
        </EditorContext.Provider>
    )
}
