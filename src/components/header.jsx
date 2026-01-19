import React from 'react'
import { Link } from 'react-router-dom'

const header = () => {
    return (
        <section className="header">
            <div>Vinyl</div>
            <nav>
                <Link to={`/`}>Home</Link>
                <Link to={`/catalogus`}>Catalogus</Link>
                <Link to={`/forum`}>Forum</Link>
            </nav>
        </section>
    )
}

export default header