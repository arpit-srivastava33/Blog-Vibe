import React from 'react'
import load from "./load.gif"

export default function Spinner() {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img src={load} style={{ height: "50px", width: "50px" }} alt='spinner' />
        </div>
    )
}