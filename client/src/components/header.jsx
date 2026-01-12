import React from 'react'

const header = () => {
    return (
        <section className="header">
            <div>Vinyl</div>
            <nav>
                <Link to={`/home`}>Home</Link>
                <a href="#">Catalogus</a>
                <a href="#">Nieuws</a>
                <a href="#">Contact</a>
            </nav>
        </section>
    )
}

export default header