import React from 'react';

export default function ResultBox({ result }) {
    return (
        <div className="result-box">
            {result ? <p>{result}</p> : <p>No hay resultados aún.</p>}
        </div>
    );
}