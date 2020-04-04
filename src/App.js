import React, {Component} from 'react';
import {TextView} from "./text-view/TextView";

class App extends Component {
    state = {
        letter: {
            styles: {}
        }
    }

    componentDidMount() {
        this.getLetters()
    }

    getLetters() {
        const url = `${process.env.REACT_APP_API_URL}/letters?limit=${1}&skip=${0}&authorization=102019`

        fetch(url, {
            method: 'GET'
        }).then(async res => {
            const letters = await res.json()
        })
    }

    render() {
        const styles = {
            fontSize: 24,
            backgroundColor: '#c6f68d',
            color: '#212121',
            marginLeft: 52,
            marginRight: 52,
            textAlign: 'center'
        }

        const textData = `ဆေးတံတို တညှိုလောက်<br/>ရော့ သောက်တော့ ပေး။   **မယူလိုက်က မိုက်လို့ထင်**  ယူလိုက်ပြန်က ကြိုက်လို့ထင်  သောက်စေချင်  ကုတင်တွင် ထောင်ခဲ့ကွဲ့  ညိုနွဲ့ရဲ့လေး။`
        console.log(textData)

        return <TextView styles={styles} text={textData}/>
    }
}

export default App;
