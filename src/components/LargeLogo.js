import React from 'react'

function LargeLogo(props) {
    const {image, bgColor= 'transparent'} = props
    return (
        <div className="large-logo-container" style={{
            backgroundColor: bgColor
         }}>
            <img src={image} />
        </div>
    )
}

export default LargeLogo
