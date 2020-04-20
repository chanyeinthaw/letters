import {useAppContext} from "../app/AppContext";
import * as http from "axios";
import {usePassword} from "./use-password";
import {useNavigateLogin} from "./use-navigate";

export function useGetLetters() {
    const cancelTokenSource = http.CancelToken.source()
    const {setLoading} = useAppContext()
    const {getPassword, setPassword} = usePassword()
    const navigateLogin = useNavigateLogin()

    return [async (page) => {
        const url = `${process.env.REACT_APP_API_URL}/letters`
        const requestToken = Date.now() + 'letters'

        setLoading(requestToken)

        const res = await http.get(url, {
            cancelToken: cancelTokenSource.token,
            validateStatus: (status) => status >= 200 && status <= 401,
            params: {limit: 1, skip: page},
            headers: {
                Authorization: getPassword()
            }
        })

        if (res.status === 401) {
            setPassword('')
            navigateLogin()
            setLoading(requestToken, true)

            return {letter: null, hasNext: false}
        }

        const letters = res.data.letters || [null]

        setLoading(requestToken, true)

        return {letter: letters[0], hasNext: res.data.hasNext}
    }, cancelTokenSource]
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
