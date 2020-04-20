import {createContext, useContext} from "react";

export const defaultEditorState = {
    styles: {
        backgroundColor: '#ffffff',
        color: '#212121',
    },
    text: '',
    createdAt: new Date()
}

export const EditorContext = createContext()

export const useEditorContext = () => useContext(EditorContext)
