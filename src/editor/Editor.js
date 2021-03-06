import React, {useEffect, useState} from 'react'
import classes from './Editor.module.css'
import {defaultEditorState, EditorContext} from "./EditorContext";
import Options from "./options/Options";
import {useSaveLetter} from "../shared-hooks/use-save-letter";
import ReactMarkdown from "react-markdown";
import {useParams} from "react-router";
import {useGetLetter} from "../shared-hooks/use-get-letters";

export default function Editor() {
    const [state, setState] = useState(defaultEditorState)
    const saveLetter = useSaveLetter()
    const getLetter = useGetLetter()

    const {id} = useParams()

    useEffect(() => {
        (async () => {
            if (!id) return
            const letter = await getLetter(id)

            if (!letter) return

            setState({
                ...state,
                _id: id,
                text: letter.text,
                createdAt: new Date(letter.createdAt),
                styles: typeof letter.styles === "string" ? JSON.parse(letter.styles) : letter.styles
            })
        })().then()
    }, [])

    const styles = {
        backgroundColor: state.styles.backgroundColor,
        color: state.styles.color
    }

    const setStyle = (key, value) => {
        setState({
            ...state,
            styles: {
                ...state.styles,
                [key]: value
            }
        })
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

    const onSave = () => saveLetter(state._id, state.text, state.styles, state.createdAt.getTime())

    return (
        <EditorContext.Provider value={provide}>
            <div className={classes.Editor} style={styles}>
                <div className={classes.TextViewWrapper}>
                    <textarea
                        autoFocus={true}
                        className={classes.TextView}
                        style={styles}
                        value={state.text}
                        onChange={e => setText(e.target.value)} />
                    <ReactMarkdown source={state.text} escapeHtml={false} className={classes.TextViewPreview}/>
                </div>
                <Options onSave={onSave}/>
            </div>
        </EditorContext.Provider>
    )
}
