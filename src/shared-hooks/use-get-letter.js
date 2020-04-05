import {useAppContext} from "../app/AppContext";
import * as http from "axios";

export function useGetLetter() {
    const {password, setPassword, setLoading} = useAppContext()

    return async (page) => {
        const url = `${process.env.REACT_APP_API_URL}/letters`

        setLoading(true)

        const res = await http.get(url, {
            validateStatus: (status) => status >= 200 && status <= 401,
            params: {limit: 1, skip: page},
            headers: {
                Authorization: password
            }
        })

        if (res.status === 401) {
            setPassword('')
            setLoading(false)

            return {letter: null, hasNext: false}
        }

        const letters = res.data.letters || [null]

        setLoading(false)

        return {letter: letters[0], hasNext: res.data.hasNext}
    }
}
