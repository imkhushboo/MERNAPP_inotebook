import React, { useState } from 'react'
import modalcontext from './modalContext'

const Modalstate = (props) => {
    const [text, setText] = useState("");
    return (
        <modalcontext.Provider value={{ text, setText }}>
            {props.children}
        </modalcontext.Provider>
    )
}

export default Modalstate
