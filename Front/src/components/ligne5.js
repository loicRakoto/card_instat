import React from 'react'
import { useState, useEffect } from 'react';

function Ligne5({ codeActivite, formReset, Searchvalue, activeSearch }) {

    let date = new Date().toLocaleDateString();
    const dates = date.split('/');
    const annee = dates[2];
    const [codeActivit, setcodeActivit] = useState("-");

    useEffect(() => {
        setcodeActivit(codeActivite);
    }, [codeActivite]);

    const loadLastID = async () => {
        try {
            const response = await fetch('http://localhost:4000/alaotra/lastid');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données de l\'API');
            }
            const data = await response.json();
            setlastID(data.fiveLastNbr);
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    const [lastID, setlastID] = useState("");
    useEffect(() => {

        loadLastID();
    }, []);

    //Formulaire reset
    useEffect(() => {
        if (formReset) {
            setcodeActivit("");
            setlastID("");
            loadLastID();
        }
    }, [formReset]);


    //Recherche
    useEffect(() => {
        var codeActElements = document.getElementById("codeAct");

        if (activeSearch && Searchvalue) {
            codeActElements.textContent = Searchvalue.actpr;
        }
        else {
            codeActElements.textContent = "-";
        }
    }, [activeSearch, Searchvalue]);

    return (
        <div className='row mt-3 ligne5'>
            <div className="col">
                <div className="row">
                    <div className='col'>
                        <div className='row'>
                            <div className='col-3 nIdentStat '>
                                <h6>N°Identification STAT </h6>
                            </div>
                            <div className='col'>
                                {codeActivite ? <span id='codeAct' className='rectangle'>{codeActivit}</span> : <span id='codeAct' className='rectangle'>-</span>}
                                <span className='rectangle'>33</span>
                                <span className='rectangle'>{annee}</span>
                                <span className='rectangle'>0</span>
                                <span className='rectangle'>{lastID}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ligne5;