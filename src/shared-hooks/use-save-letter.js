import {useAppContext} from "../app/AppContext";
import * as http from "axios";
import {usePassword} from "./use-password";
import {useNavigate, useNavigateLogin} from "./use-navigate";

export function useSaveLetter() {
    const {setLoading} = useAppContext()
    const {getPassword, setPassword} = usePassword()
    const navigateLogin = useNavigateLogin()
    const navigate = useNavigate()

    return async (id, text, styles, date) => {
        const url = `${process.env.REACT_APP_API_URL}/letters`
        const requestToken = Date.now() + 'save-letter'

        setLoading(requestToken)

        const data = {
            _id: id,
            text: text,
            createdAt: date,
            styles: styles
        }

        const res = await http.post(url, data, {
            validateStatus: (status) => status >= 200 && status <= 401,
            headers: {
                Authorization: getPassword(),
            }
        })

        if (res.status === 401) {
            setPassword('')
            setLoading(requestToken, true)
            navigateLogin()

            return
        }

        navigate(`#/editor/${res.data._id}`)
        setLoading(requestToken, true)
    }
}
