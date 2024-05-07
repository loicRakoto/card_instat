import React from 'react'
import { useState, useEffect } from 'react';
let date = new Date().toLocaleDateString();

function Ligne0({ formReset }) {
    ///////////////////////////////////////////////////////////////

    const [lastID, setlastID] = useState("");

    const loadLastID = async () => {
        try {
            const response = await fetch('http://localhost:4000/alaotra/lastid');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données de l\'API');
            }
            const data = await response.json();
            const dates = date.split("/");
            const annee = dates[2];
            const concatID = '33'.concat('-', annee, '-', data.fiveLastNbr);
            setlastID(concatID);


        } catch (error) {
            console.error('Erreur:', error);
        }
    }
    useEffect(() => {
        loadLastID();
    }, []);

    useEffect(() => {
        if (formReset) {
            loadLastID();
        }
    }, [formReset]);

    return (
        <div className='row ligne0'>
            <div className="col-sm">
                <div className="input-group input-group-sm mb-2">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Dernier N°</span>
                    <input type="text" value={lastID} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled />
                </div>
            </div>
            <div className="col-sm">
                <div className="input-group input-group-sm mb-2">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Date actuelle</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={date} disabled />
                </div>
            </div>
        </div>
    )
}

export default Ligne0