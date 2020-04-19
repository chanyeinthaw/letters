import {useAppContext} from "../app/AppContext";
import * as http from "axios";
import {usePassword} from "./use-password";
import {useNavigate, useNavigateLogin} from "./use-navigate";

export function useSaveLetter() {
    const {setLoading} = useAppContext()
    const {getPassword, setPassword} = usePassword()
    const navigateLogin = useNavigateLogin()

    return async (text, styles, date) => {
        const url = `${process.env.REACT_APP_API_URL}/letters`

        setLoading(true)

        const res = await http.request({
            method: 'POST',
            url: url,
            data: text,
            validateStatus: (status) => status >= 200 && status <= 401,
            headers: {
                Authorization: getPassword(),
                styles: JSON.stringify(styles),
                createdAt: date,
                'Content-Type': 'text/plain'
            }
        })

        if (res.status === 401) {
            setPassword('')
            navigateLogin()
            setLoading(false)
        }

        alert('Letter Saved !')
        document.location.reload()
    }
}
