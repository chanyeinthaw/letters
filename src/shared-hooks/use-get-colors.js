import {useAppContext} from "../app/AppContext";
import * as http from "axios";
import {useNavigateLogin} from "./use-navigate";
import {usePassword} from "./use-password";

export function useGetColors() {
    const {setLoading} = useAppContext()
    const {getPassword, setPassword} = usePassword()
    const navigateLogin = useNavigateLogin()

    return async () => {
        const url = `${process.env.REACT_APP_API_URL}/colors`

        const requestToken = Date.now() + 'colors'
        setLoading(requestToken)

        const res = await http.get(url, {
            validateStatus: (status) => status >= 200 && status <= 401,
            headers: {
                Authorization: getPassword()
            }
        })

        if (res.status === 401) {
            setLoading(requestToken, true)
            setPassword('')
            navigateLogin()

            return []
        }

        setLoading(requestToken, true)

        return res.data.colors
    }
}
