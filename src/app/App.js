import React, {Component} from 'react';
import {TextView} from "../text-view/TextView";
import  * as http from 'axios'
import {defaultAppState, AppContext} from "./AppContext";
import {PromptPassword} from "../prompt-password/PromptPassword";

class App extends Component {
    state = defaultAppState

    componentDidMount() {
        document.cookie.split('; ').map(cookie => {
            const [key, value] = cookie.split('=')

            if(key === 'password') {
                this.setState({
                    ...this.state,
                    password: value
                })
            }

            return
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.password === '') {
            this.getLetter().then(this.updateLetterState.bind(this))
        } else if (prevState.currentPage !== this.state.currentPage) {
            this.getLetter().then(this.updateLetterState.bind(this))
        }
    }

    async getLetter() {
        const url = `${process.env.REACT_APP_API_URL}/letters`

        const res = await http.get(url, {
            validateStatus: function (status) {
                return status >= 200 && status <= 401;
            },
            params: {
                limit: 1,
                skip: this.state.currentPage
            },
            headers: {
                Authorization: this.state.password
            }
        })

        if (res.status === 401) {
            this.setState({
                ...this.state,
                password: ''
            })

            return {letter: null, hasNext: false}
        }

        document.cookie = "password=" + this.state.password

        const letters = res.data.letters || [null]

        return {letter: letters[0], hasNext: res.data.hasNext}
    }

    updateLetterState(data) {
        const {letter, hasNext} = data

        if (!letter) return

        letter.styles = JSON.parse(letter.styles)

        this.setState({
            ...this.state,
            letter,
            hasNext
        })
    }

    changeCurrentPage(pivot) {
        this.setState({
            ...this.state,
            currentPage: this.state.currentPage + pivot
        })
    }

    updatePassword(password) {
        this.setState({
            ...this.state,
            password
        })
    }

    render() {
        const provide = {
            letter: this.state.letter,
            hasNext: this.state.hasNext,
            currentPage: this.state.currentPage,

            goNextPage: () => this.changeCurrentPage(+1),
            goPrevPage: () => this.changeCurrentPage(-1)
        }

        return (
            <AppContext.Provider value={provide}>
                {this.state.password === '' ? <PromptPassword onEnter={this.updatePassword.bind(this)} /> : <TextView />}
            </AppContext.Provider>
        )
    }
}

export default App;
