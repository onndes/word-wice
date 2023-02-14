/* eslint-disable react/self-closing-comp */
import React from 'react'
import './style.css'

const LoaderPage = () => {
    return (
        <div className="loaderBody">
            <div className="loader">
                <div className="face">
                    <div className="circle"></div>
                </div>
                <div className="face">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    )
}

export default LoaderPage
