import React from 'react'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Home.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';

import LigneFirst from "../../../src/components/ligneFirst";
import Ligne0 from "../../../src/components/ligne0";
import Ligne2 from "../../../src/components/ligne2";
import Ligne3 from "../../../src/components/ligne3";
import Ligne4 from "../../../src/components/ligne4";
import Ligne5 from "../../../src/components/ligne5";



function Home() {
    const MySwal = withReactContent(Swal);

    const [modifStatus, setmodifStatus] = useState(false);

    const [codeAct, setCodeAct] = useState("");

    const handleActiviteChange = (nouvelleValeur) => {
        setCodeAct(nouvelleValeur);
    };


    ////////////////////////////////////////////////////////////////////////////////////////

    // Déclaration des états pour stocker les valeurs des champs de formulaire
    const [formValues, setFormValues] = useState({
        // ligne1: "",
        // ligne2: "",
    });

    const [formReset, setformReset] = useState(false)
    const resetform = () => {
        document.getElementById("create-modif-form").reset();
        setformReset(true);
    }
    // Fonction de mise à jour des valeurs
    const handleFormValueChange = (name, value) => {
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitForm = async (e) => {

        e.preventDefault();

        // Validation champs du formulaire
        try {
            const response = await fetch('http://localhost:4000/alaotra/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la soumission du formulaire');
            }

            const Toast = MySwal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Enregistrement réussie"
            });


            // Réinitialise formulaire
            setFormValues({});
            resetform();
            setactiveSearch(false);
            setmodifStatus(false);

        } catch (error) {
            console.error(error.message);
            // Afficher un message d'erreur générique
            alert('Une erreur s\'est produite lors de la soumission du formulaire.');
        }
    };

    const modifForm = async (e) => {
        e.preventDefault();

        var id = formValues.id;

        // Validation champs du formulaire
        try {
            const response = await fetch('http://localhost:4000/alaotra/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la soumission du formulaire');
            }

            const Toast = MySwal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Formulaire modifié avec succès"
            });


            // Réinitialise formulaire
            setFormValues({});
            resetform();
            setactiveSearch(false);
            setmodifStatus(false);

        } catch (error) {
            console.error(error.message);
            // Afficher un message d'erreur générique
            alert('Une erreur s\'est produite lors de la soumission du formulaire.');
        }
    };

    const [activeSearch, setactiveSearch] = useState(false);
    const [Searchvalue, setSearchvalue] = useState([]);

    const searchID = async (e) => {

        if (e.key === 'Enter') {
            const id = e.target.value;

            handleFormValueChange("id", id);

            if (id !== "") {
                setactiveSearch(true);
                try {
                    const response = await fetch("http://localhost:4000/alaotra/" + id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (Object.keys(data).length === 0 && data.constructor === Object) {

                            resetform();
                            setactiveSearch(false);
                            setmodifStatus(false);
                        } else {
                            setSearchvalue(data);
                            setmodifStatus(true);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }

            } else {
                resetform();
                setactiveSearch(false);
                setmodifStatus(false);
            }
        }

    }

    const handlePrint = () => {
        let id = formValues.id;
        window.location.href = "/print/" + id;
    };

    return (
        <div className='content'>
            <div className='main'>
                <div className='container'>
                    <LigneFirst></LigneFirst>
                    <div className='row mb-2 ligne1'>
                        <div className='col'>
                            <input onKeyUp={searchID} className="form-control form-control-sm" type="text" placeholder="Recherche par ID" aria-label=".form-control-sm example" />
                        </div>
                    </div>
                    <form id="create-modif-form" action="/" onSubmit={modifStatus ? modifForm : submitForm}>
                        <Ligne0 formReset={formReset}></Ligne0>
                        <Ligne2 handleFormValueChange={handleFormValueChange} formReset={formReset} Searchvalue={Searchvalue} activeSearch={activeSearch} setmodifStatus={setmodifStatus}></Ligne2>
                        <Ligne3 handleFormValueChange={handleFormValueChange} formReset={formReset} Searchvalue={Searchvalue} activeSearch={activeSearch}></Ligne3>
                        <Ligne4 handleFormValueChange={handleFormValueChange} onActiviteChange={handleActiviteChange} formReset={formReset} Searchvalue={Searchvalue} activeSearch={activeSearch}></Ligne4>
                        <Ligne5 codeActivite={codeAct} formReset={formReset} Searchvalue={Searchvalue} activeSearch={activeSearch}></Ligne5>
                        <div className='row'>
                            <div className="col">
                                <div className="row">
                                    <div className='col'>
                                        <div className='row'>
                                            <div className='col-3 '></div>
                                            <div className='col'></div>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        {modifStatus ?
                                            <>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                    <button
                                                        type='button'
                                                        style={{
                                                            width: "45%",
                                                            padding: "5px",
                                                            backgroundColor: "#46869c",
                                                            border: "none",
                                                            color: "white",
                                                            cursor: "pointer"
                                                        }}
                                                        className="btn btn-info btn-sm"
                                                        onClick={handlePrint}  >
                                                        <PrintIcon />
                                                        Imprimer
                                                    </button>

                                                    <button type='submit' onSubmit={modifForm} style={{ width: "45%", padding: "5px", backgroundColor: "#4c8771f0", border: "none", color: "white" }} className="btn btn-secondary btn-sm"> <EditIcon />Modifier</button>
                                                </div>
                                            </>
                                            :
                                            <button type='submit' onSubmit={submitForm} style={{ width: "100%", backgroundColor: "#a44141", border: "none" }} className="btn btn-success btn-sm"> <SaveIcon /> Enregistrer</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Home