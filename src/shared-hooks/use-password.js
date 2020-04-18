export function usePassword() {
    return {
        getPassword: () => {
            const cookies = document.cookie.split('; ')

            for(const cookie of cookies) {
                const [key, value] = cookie.split('=')
                if(key === 'password') return value
            }

            return ''
        },

        setPassword: (pw) => document.cookie = 'password=' + pw
    }
}
