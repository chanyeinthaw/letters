import {useAppContext} from "../app/AppContext";
import * as http from "axios";
import {usePassword} from "./use-password";
import {useNavigateLogin} from "./use-navigate";

export function useGetLetters() {
    const {setLoading} = useAppContext()
    const {getPassword, setPassword} = usePassword()
    const navigateLogin = useNavigateLogin()

    return async (limit, skip) => {
        const url = `${process.env.REACT_APP_API_URL}/letters`
        const requestToken = Date.now() + 'letters'

        setLoading(requestToken)

        const res = await http.get(url, {
            validateStatus: (status) => status >= 200 && status <= 401,
            params: {limit: limit, skip: skip},
            headers: {
                Authorization: getPassword()
            }
        })

        if (res.status === 401) {
            setPassword('')
            navigateLogin()
            setLoading(requestToken, true)

            return {letters: [], hasNext: false}
        }

        setLoading(requestToken, true)

        return res.data
    }
}

export function useGetLetter() {
    const {setLoading} = useAppContext()
    const {getPassword, setPassword} = usePassword()
    const navigateLogin = useNavigateLogin()

    return async (id) => {
        const url = `${process.env.REACT_APP_API_URL}/letters`
        const requestToken = Date.now() + 'letter'

        setLoading(requestToken)

        const res = await http.get(url + '/' + id, {
            validateStatus: (status) => status >= 200 && status <= 401,
            headers: {Authorization: getPassword()}
        })

        if (res.status === 401) {
            setPassword('')
            navigateLogin()
            setLoading(requestToken, true)

            return null
        }

        setLoading(requestToken, true)

        return res.data
    }
}
