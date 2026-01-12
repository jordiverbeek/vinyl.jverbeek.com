import { useState, useEffect } from "react";


export default function ItemForm({ onSubmit, existing }) {
    const [name, setName] = useState("");


    useEffect(() => {
        if (existing) setName(existing.name);
    }, [existing]);


    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ name });
        setName("");
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                value={name}
                placeholder="Naam"
                onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Opslaan</button>
        </form>
    );
}