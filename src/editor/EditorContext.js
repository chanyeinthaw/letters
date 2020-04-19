import {createContext, useContext} from "react";

export const defaultEditorState = {
    styles: {
        fontSize: 24,
        backgroundColor: '#ffffff',
        color: '#212121',
        marginLeft: 0,
        marginRight: 0,
        textAlign: 'unset'
    },
    text: '',
    createdAt: new Date(),
    colors: []
}

export const EditorContext = createContext()

export const useEditorContext = () => useContext(EditorContext)
