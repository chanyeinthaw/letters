import React, {useEffect, useRef, useState} from "react";
import classes from './Home.module.css'
import {Card, Classes, Icon} from "@blueprintjs/core";
import clsx from "clsx";
import {useAppContext} from "../app/AppContext";
import {useGetLetters} from "../shared-hooks/use-get-letters";
import {convertToMMNumber} from "../letter/text-view/TextView";
import {useNavigate} from "../shared-hooks/use-navigate";

export function Home() {
    const {loading} = useAppContext()
    const navigate = useNavigate()
    const homeRef = useRef()
    const [hasNext, setHasNext] = useState(true)
    const [letters, setLetters] = useState([])
    const [pagination, setPagination] = useState({
        limit: 27,
        skip: 0
    })

    const getLetters = useGetLetters()

    window.onscroll = () => {
        if ((window.innerHeight + window.scrollY - 32) >= homeRef.current.offsetHeight) {
            if (hasNext)
                setPagination({
                    limit: pagination.limit,
                    skip: pagination.skip + pagination.limit
                })
        }
    }

    useEffect(() => {
        if (hasNext)
            getLetters(pagination.limit, pagination.skip).then(res => {
                setLetters([...letters, ...res.letters])
                setHasNext(res.hasNext)
            })

        return () => {
            window.onscroll = () => {}
        }
    }, [pagination])

    return (
        <div className={classes.Home} ref={homeRef}>

            <div className={classes.Header}>
                <h1>Letters</h1>
            </div>

            <div className={classes.Letters}>
                {
                    loading && letters.length === 0
                    ? <LettersSkeleton />
                    : letters.map(letter => {
                        const date = new Date(letter.createdAt)

                        const day = convertToMMNumber(date.getDate())
                        const month = convertToMMNumber(date.getMonth()+1)
                        const year = convertToMMNumber(date.getFullYear())

                        const styles = typeof letter.styles === "string" ? JSON.parse(letter.styles) : letter.styles

                        return <Letter id={letter._id}
                                       key={letter._id}
                                       onClick={(id) => navigate('#/letter/' + id)}
                                       color={styles.backgroundColor}
                                       date={`${day}ရက် ${month}လ ${year}`} />
                    })
                }
            </div>
        </div>
    )
}

function Letter({id="", date= '', color= '', onClick=() => {}, loading = false}) {
    const cardClass = clsx(classes.Letter, {
        [Classes.SKELETON]: loading
    })

    return (
        <div className={classes.LetterColumn}>
            <Card className={cardClass} interactive={true} onClick={() => onClick(id)}>
                <Icon icon="full-circle"
                      className={classes.LetterColor}
                      color={color}/>
                {date}
            </Card>
        </div>
    )
}

function LettersSkeleton() {
    return (
        <React.Fragment>
            {Array(3).fill().map((_, n) => <Letter key={n} loading={true}/>)}
        </React.Fragment>
    )
}
