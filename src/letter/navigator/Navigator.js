import React, {useCallback} from "react";
import classes from './Navigator.module.css'
import cls from 'clsx'
import arrow from './arrow.svg'
import {useLetterViewContext} from "../LetterContext";


export function Navigator() {
    let {loading, hasNext, currentPage, goNextPage, goPrevPage} = useLetterViewContext()
    const hasPrev = !loading && currentPage !== 0; hasNext = !loading && hasNext
    const prevText = hasPrev ? "နောက်သို့" : ''
    const nextText = hasNext ? "ရှေ့သို့" : ''

    const getNavigationButtonClass = useCallback((control) => cls(classes.NavigationButton, {
        [classes.NavigationButtonDisabled]: !control
    }), [])

    const nothing = useCallback(() => {}, [])

    return (
        <div className={classes.NavigatorContainer} >
            <div className={classes.Navigator} >
                <img src={arrow}
                     alt=""
                     onClick={hasPrev ? goPrevPage : nothing}
                     className={getNavigationButtonClass(hasPrev)}
                     title={prevText}/>
                <img src={arrow}
                     onClick={hasNext ? goNextPage : nothing}
                     alt=""
                     className={getNavigationButtonClass(hasNext)}
                     title={nextText}/>
            </div>
        </div>
    )
}
