import {createContext, useContext} from "react";

export const defaultEditorState = {
    styles: {
        fontSize: 24,
        backgroundColor: '#fafafa',
        color: '#212121',
        marginLeft: 52,
        marginRight: 52,
        textAlign: 'unset'
    },
    text: '',
    createdAt: 0,
    colors: []
}

export const EditorContext = createContext()

export const useEditorContext = () => useContext(EditorContext)
