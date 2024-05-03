import React from 'react'

function Bg() {
    return (
        <div>
            <div style={{ backgroundColor: darkMode ? "" : "white" }} className={backgroundClassName}>
            </div>
        </div>
    )
}

export default Bg
