import React from 'react'

function SmallLogo(props) {
    const {image} = props
    return (
        <div className="small-logo-container">
            <img src={image} />
        </div>
    )
}

export default SmallLogo
