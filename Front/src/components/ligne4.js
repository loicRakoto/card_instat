import React from 'react'
import { useState, useEffect } from 'react'


function Ligne4({ onActiviteChange, handleFormValueChange, formReset, Searchvalue, activeSearch }) {
    const [optionsPrincipale, setOptionsPrincipale] = useState([]);
    const [codeActPrincipale, setcodeActPrincipale] = useState('');

    const handleSelectPrincipaleChange = (e) => {
        const selectedValue = e.target.value;

        const selectedOption = e.target.selectedOptions[0]; // Récupère l'option sélectionnée
        const idValue = selectedOption.id;

        const code = idValue;
        const libelle = selectedValue
        handleFormValueChange('actpr', code);
        handleFormValueChange('lactpr', libelle);
        setcodeActPrincipale(code);
        onActiviteChange(code);
    }
    useEffect(() => {
        async function fetchDataPrincipale() {
            try {
                const response = await fetch('http://localhost:4000/nomac');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données de l\'API');
                }
                const data = await response.json();
                // Mettre à jour le state avec les options récupérées
                setOptionsPrincipale(data);
            } catch (error) {
                console.error('Erreur:', error);
            }
        }

        fetchDataPrincipale();
    }, []);

    //Formulaire reset
    useEffect(() => {
        if (formReset) {
            setcodeActPrincipale('');
        }
    }, [formReset]);

    //Recherche
    useEffect(() => {
        var lactprElements = document.getElementsByName("lactpr");
        // var actprElements = document.getElementsByName("actpr");

        if (activeSearch && Searchvalue) {

            // Sélection du premier élément avec le nom "nstat"
            var lactprElement = lactprElements[0];
            // var actprElement = actprElements[0];

            // Affectation de la valeur de Searchvalue.nstat à l'élément
            lactprElement.value = Searchvalue.lactpr;
            // actprElement.value = Searchvalue.actpr;

            setcodeActPrincipale(Searchvalue.actpr);
        }
        else {
            setcodeActPrincipale('');
        }
    }, [activeSearch, Searchvalue]);

    return (
        <div className='row ligne4'>
            <div className="col">
                <div className="row">
                    <div className="col-sm">
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Libelle activité</span>
                            <select id='selectActiv' defaultValue='' name='lactpr' onChange={handleSelectPrincipaleChange} style={{ flex: 10 }} className="form-select form-select-sm" aria-label="Small select example" required>
                                <option value="" disabled hidden>Veuillez choisir une activité</option>
                                {optionsPrincipale.map(option => (
                                    <option key={option.Code} value={option.Libelle} id={option.Code} >
                                        {option.Libelle}
                                    </option>
                                ))}
                            </select>
                            <span className="input-group-text" id="inputGroup-sizing-sm">Code de l'activité</span>
                            <input name='actpr' type="text" value={codeActPrincipale} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Ligne4