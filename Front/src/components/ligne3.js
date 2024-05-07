import React from 'react'
import { useState, useEffect } from 'react';
import { NumberToLetter } from 'convertir-nombre-lettre';

function Ligne3({ handleFormValueChange, formReset, Searchvalue, activeSearch }) {

    const handleChange = (event) => {
        const { name, value } = event.target;
        handleFormValueChange(name, value);
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [optionsFormJ, setOptionsFormJ] = useState([]);
    const [optionsLchef, setOptionsLchef] = useState([]);
    const [optionsNationalite, setOptionsNationalite] = useState([]);
    const [qualite, setqualite] = useState('');

    const [valeurSaisieTransformer, setvaleurSaisieTransformer] = useState('');

    const handleKeyUp = (e) => {
        const valeur = e.target.value;
        const nbr = parseInt(valeur, 10);
        const nbrFranc = nbr * 5;
        const montantLettre = NumberToLetter(nbrFranc);
        const valeurConcat = valeur.concat('/', montantLettre);
        handleFormValueChange('fonds', valeurConcat);
        setvaleurSaisieTransformer(montantLettre);

    }

    const recupQualite = (e) => {

        const valeur = e.target.value;

        const ichef = valeur;
        var qualitee = null;

        switch (ichef) {
            case 'P':
                qualitee = 1;
                break;
            case 'GL':
                qualitee = 2;
                break;
            case 'GS':
                qualitee = 3;
                break;
            case 'DS':
                qualitee = 4;
                break;
            case 'AS':
                qualitee = 5;
                break;
            case 'CC':
                qualitee = 6;
                break;
            case 'AU':
                qualitee = 7;
                break;
            case 'A':
                qualitee = 8;
                break;
            case 'ND':
                qualitee = 9;
                break;

            default:
                break;
        }

        handleFormValueChange('ichef', ichef);
        handleFormValueChange('qualite', qualitee);
        setqualite(qualitee);
    }

    useEffect(() => {
        async function fetchDataFormJ() {
            try {
                const response = await fetch('http://localhost:4000/form_j');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données de l\'API');
                }
                const data = await response.json();
                // Mettre à jour le state avec les options récupérées
                setOptionsFormJ(data);
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
        async function fetchDataLchef() {
            try {
                const response = await fetch('http://localhost:4000/lchef');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données de l\'API');
                }
                const data = await response.json();
                // Mettre à jour le state avec les options récupérées
                setOptionsLchef(data);
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
        async function fetchDataNationalite() {
            try {
                const response = await fetch('http://localhost:4000/nationalite');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données de l\'API');
                }
                const data = await response.json();
                // Mettre à jour le state avec les options récupérées
                setOptionsNationalite(data);
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
        fetchDataFormJ();
        fetchDataLchef();
        fetchDataNationalite();
    }, []);


    //Formulaire reset
    useEffect(() => {
        if (formReset) {
            setqualite('');
            setvaleurSaisieTransformer('');
        }
    }, [formReset]);

    //Recherche
    useEffect(() => {
        var cinElements = document.getElementsByName("cin");
        var comptaElements = document.getElementsByName("compta");
        var ifjElements = document.getElementsByName("ifj");
        var dupliElements = document.getElementsByName("dupli");
        var ichefElements = document.getElementsByName("ichef");
        // var qualiteElements = document.getElementsByName("qualite");
        var natElements = document.getElementsByName("nat");
        var cnapsElements = document.getElementsByName("cnaps");
        var patenteElements = document.getElementsByName("patente");
        // var fondsElements = document.getElementsByName("fonds");
        var fondsfondArs = document.getElementsByName("fondAr");

        if (activeSearch && Searchvalue && Searchvalue.fonds) {

            // Sélection du premier élément avec le nom "nstat"
            var cinElement = cinElements[0];
            var comptaElement = comptaElements[0];
            var ifjElement = ifjElements[0];
            var dupliElement = dupliElements[0];
            var ichefElement = ichefElements[0];
            // var qualiteElement = qualiteElements[0];
            var natElement = natElements[0];
            var cnapsElement = cnapsElements[0];
            var patenteElement = patenteElements[0];
            // var fondsElement = fondsElements[0];



            // Affectation de la valeur de Searchvalue.nstat à l'élément
            cinElement.value = Searchvalue.cin;
            comptaElement.value = Searchvalue.compta;
            ifjElement.value = Searchvalue.ifj;
            dupliElement.value = Searchvalue.dupli;
            ichefElement.value = Searchvalue.ichef;
            // qualiteElement.value = Searchvalue.qualite;
            natElement.value = Searchvalue.nat;
            cnapsElement.value = Searchvalue.cnaps;
            patenteElement.value = Searchvalue.patente;
            // fondsElement.value = Searchvalue.fonds;

            const fondBefore = Searchvalue.fonds;

            const split = fondBefore.split("/");
            const nombreFond = split[0];
            const texteFond = split[1];

            var fondsfondAr = fondsfondArs[0];
            fondsfondAr.value = nombreFond;
            setvaleurSaisieTransformer(texteFond);
            setqualite(Searchvalue.qualite);

        }
        else {
            setvaleurSaisieTransformer("");
            setqualite("");
        }
    }, [activeSearch, Searchvalue]);




    return (
        <div className='row ligne3'>
            <div className="col">
                <div className="row">
                    <div className="col-sm">
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-sm">CIN</span>
                            <input onBlur={handleChange} type="text" name='cin' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Comptabilité</span>
                            <select onBlur={handleChange} defaultValue="" name='compta' className="form-select form-select-sm" aria-label="Small select example" required>
                                <option value="" disabled hidden >Choisir</option>
                                <option value="N">N</option>
                                <option value="O">O</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-sm">form_j</span>
                            <select onChange={handleChange} className="form-select form-select-sm" defaultValue='' name='ifj' aria-label="Small select example" required>
                                <option value="" disabled hidden >Choisir</option>
                                {optionsFormJ.map(option => (
                                    <option key={option.B} value={option.B}>
                                        {option.B}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-sm">
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Duplicata</span>
                            <select onChange={handleChange} defaultValue="" name='dupli' className="form-select form-select-sm" aria-label="Small select example" required>
                                <option value="" disabled hidden >Choisir</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-sm">L chef</span>
                            <select id='ICHEF' onChange={recupQualite} className="form-select form-select-sm" defaultValue='' name='ichef' aria-label="Small select example" required>
                                <option value="" disabled hidden >Choisir</option>
                                {optionsLchef.map(option => (
                                    <option key={option.qualite} value={option.B}>
                                        {option.B}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Qualité</span>
                            <input type="text" value={qualite} className="form-control" name='qualite' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled required />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Nationalité</span>
                            <select onChange={handleChange} className="form-select form-select-sm" defaultValue='' name='nat' aria-label="Small select example" required>
                                <option value="" disabled hidden >Choisir une nationalité</option>
                                {optionsNationalite.map(option => (
                                    <option key={option.B} value={option.B}>
                                        {option.B}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-sm">CNAPS</span>
                            <input onBlur={handleChange} type="text" className="form-control" name='cnaps' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Patente</span>
                            <input onBlur={handleChange} type="text" className="form-control" name='patente' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Fonds ( en Ar )</span>
                            <input type="text" name='fondAr' onKeyUp={handleKeyUp} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                            <input type="text" value={valeurSaisieTransformer} className="form-control" name='fonds' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled />
                            <span className="input-group-text" id="inputGroup-sizing-sm">Franc</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Ligne3