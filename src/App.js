import React from 'react';
import {TextView} from "./text-view/TextView";

function App() {
    const styles = {
        fontSize: 24,
        fontWeight: 700,
        backgroundColor: '#c6f68d',
        color: '#212121',
        marginLeft: 52,
        marginRight: 52,
        textAlign: 'center'
    }

    const textData = `
ဆေးတံတို တညှိုလောက်

ရော့ သောက်တော့ ပေး။


မယူလိုက်က မိုက်လို့ထင်

ယူလိုက်ပြန်က ကြိုက်လို့ထင်

သောက်စေချင်

ကုတင်တွင် ထောင်ခဲ့ကွဲ့

ညိုနွဲ့ရဲ့လေး။
`
    console.log(textData)

    return <TextView styles={styles} text={textData}/>
}

export default App;
