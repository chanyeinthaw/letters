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

        setLoading(true)

        const res = await http.get(url, {
            validateStatus: (status) => status >= 200 && status <= 401,
            headers: {
                Authorization: getPassword()
            }
        })

        if (res.status === 401) {
            setLoading(false)
            setPassword('')
            navigateLogin()

            return []
        }

        setLoading(false)

        return res.data.colors
    }
}
