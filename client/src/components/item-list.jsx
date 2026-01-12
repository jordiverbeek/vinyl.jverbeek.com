export default function ItemList({ items, onEdit, onDelete }) {
    return (
        <ul>
            {items.map(i => (
                <li key={i.id}>
                    {i.name}
                    <button onClick={() => onEdit(i)}>✏️</button>
                    <button onClick={() => onDelete(i.id)}>🗑️</button>
                </li>
            ))}
        </ul>
    );
}


