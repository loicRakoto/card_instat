import React from 'react'
import { useState, useEffect } from 'react';
import { Modal, Table } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Ligne2({ handleFormValueChange, formReset, Searchvalue, activeSearch, setmodifStatus }) {

    const MySwal = withReactContent(Swal);

    const handleChange = (event) => {
        const { name, value } = event.target;
        handleFormValueChange(name, value);
    };

    const verificateurId = async (e) => {
        var valeur = e.target.value;

        handleFormValueChange("id", valeur);

        if (valeur !== "") {
            try {
                const response = await fetch("http://localhost:4000/alaotra/" + valeur, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (Object.keys(data).length === 0 && data.constructor === Object) {
                        setmodifStatus(false);
                    } else {
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
                            icon: "error",
                            title: "L'ID existe déjà"
                        });

                        setmodifStatus(true);
                    }
                }

            } catch (error) {

            }
        } else {
            setmodifStatus(false);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    const [show, setShow] = useState(false);
    const [Tableau, setTableau] = useState([]);
    const [selectedLieux, setselectedLieux] = useState([]);
    const [adresseEx, setadresseEx] = useState('Veuillez choisir une adresse');


    const handleClose = () => setShow(false);
    const handleShow = async () => {
        try {
            const response = await fetch("http://localhost:4000/sheet1");
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données de l\'API');
            }
            const data = await response.json();
            setTableau(data);

        } catch (error) {
            throw new Error('Erreur lors de la récupération des données de l\'API');
        }

        setShow(true)
    };

    const [fokontany, setfokontany] = useState("");
    const selectLieux = (e) => {
        const ligne = e.target.parentNode;
        const tds = ligne.querySelectorAll('td');
        const table = [];
        tds.forEach(td => {
            table.push(td.innerText);
        });

        setselectedLieux(table);
        const addresse = "Zone régionale /".concat(" ", table[3], " ", table[1]);
        setadresseEx(addresse);
        handleFormValueChange('fokon', table[3]);
        setfokontany(table[3]);
        handleClose();
    }

    const [searchMode, setsearchMode] = useState(false);
    const [tableSearch, settableSearch] = useState([])
    const searchElement = async (e) => {
        try {
            if (e.target.value.trim() === "") {
                setsearchMode(false);
            } else {
                setsearchMode(true);
                const element = e.target.value;
                const response = await fetch("http://localhost:4000/sheet1/search/" + element);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données de l\'API');
                }
                const data = await response.json();
                settableSearch(data);
            }


        } catch (error) {
            throw new Error('Erreur lors de la récupération des données de l\'API');
        }
    }

    //Formulaire reset
    useEffect(() => {
        if (formReset) {
            setfokontany("");
            setadresseEx("Veuillez choisir une adresse");
        }
    }, [formReset]);

    //Recherche
    useEffect(() => {
        var nstatElements = document.getElementsByName("nstat");
        var idElements = document.getElementsByName("id");
        var nentreElements = document.getElementsByName("nentre");
        var lienElements = document.getElementsByName("lien");
        var nomElements = document.getElementsByName("nom");
        var sigleElements = document.getElementsByName("sigle");
        // var adresseElements = document.getElementsByName("adresse");
        // var fokonElements = document.getElementsByName("fokon");
        var domicElements = document.getElementsByName("domic");
        var telElements = document.getElementsByName("tel");


        if (activeSearch && Searchvalue) {

            // Sélection du premier élément avec le nom "nstat"
            var nstatElement = nstatElements[0];
            var idElement = idElements[0];
            var nentreElement = nentreElements[0];
            var lienElement = lienElements[0];
            var nomElement = nomElements[0];
            var sigleElement = sigleElements[0];
            // var adresseElement = adresseElements[0];
            // var fokonElement = fokonElements[0];
            var domicElement = domicElements[0];
            var telElement = telElements[0];
            // Affectation de la valeur de Searchvalue.nstat à l'élément
            nstatElement.value = Searchvalue.nstat;
            idElement.value = Searchvalue.id;
            nentreElement.value = Searchvalue.nentre;
            lienElement.value = Searchvalue.lien;
            nomElement.value = Searchvalue.nom;
            sigleElement.value = Searchvalue.sigle;
            // adresseElement.value = Searchvalue.adresse;
            // fokonElement.value = Searchvalue.fokon;
            domicElement.value = Searchvalue.domic;
            telElement.value = Searchvalue.tel;

            setadresseEx(Searchvalue.adresse);
            setfokontany(Searchvalue.fokon);
        } else {
            setadresseEx("");
            setfokontany("");
        }
    }, [activeSearch, Searchvalue]);




    return (
        <>
            {/* MODAL */}
            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Liste des lieux</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col'></div>
                        <div className='col'>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Rechercher un lieux</span>
                                <input onKeyUp={searchElement} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                        </div>
                    </div>

                    <Table striped bordered hover style={{ cursor: 'pointer' }}>
                        <thead>
                            <tr>
                                <th>Region</th>
                                <th>District</th>
                                <th>Commune</th>
                                <th>Fokontany</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchMode ? tableSearch.map(i => (
                                <tr key={i.cfkt} onClick={selectLieux}>
                                    <td>{i.reg}</td>
                                    <td>{i.dist}</td>
                                    <td>{i.com}</td>
                                    <td>{i.fkt}</td>
                                    <td hidden>{i.creg}</td>
                                    <td hidden>{i.cdist}</td>
                                    <td hidden>{i.ccom}</td>
                                    <td hidden>{i.cfkt}</td>
                                </tr>
                            )) : Tableau.map(i => (
                                <tr key={i.cfkt} onClick={selectLieux}>
                                    <td>{i.reg}</td>
                                    <td>{i.dist}</td>
                                    <td>{i.com}</td>
                                    <td>{i.fkt}</td>
                                    <td hidden>{i.creg}</td>
                                    <td hidden>{i.cdist}</td>
                                    <td hidden>{i.ccom}</td>
                                    <td hidden>{i.cfkt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>

            <div className='row ligne2'>
                <div className="col">
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Num Stat</span>
                                <input onBlur={handleChange} name='nstat' type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Identifiant</span>
                                <input onBlur={verificateurId} name='id' type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text" id="inputGroup-sizing-sm">N°Entreprise</span>
                                <input onBlur={handleChange} name='nentre' type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Lien</span>
                                <input onBlur={handleChange} name='lien' type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Nom du proprietaire</span>
                                <input onBlur={handleChange} name='nom' type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Domination commerciale ou sigle</span>
                                <input onBlur={handleChange} name='sigle' type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Adresse de l'EX</span>
                                <input onBlur={handleChange} name='adresse' onClick={handleShow} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={adresseEx} readOnly required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Fokontany ou localité</span>
                                <input name='fokon' type="text" value={fokontany} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Adresse domicile</span>
                                <input onBlur={handleChange} name='domic' type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Téléphone</span>
                                <input onBlur={handleChange} name='tel' type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body" style={{ textAlign: 'center' }}>
                            <ul className="list-group mb-3 list-group-flush">
                                <li className="list-group-item px-0 d-flex justify-content-between">
                                    <span>Region</span>
                                    <strong style={{ fontWeight: 'lighter' }}>{selectedLieux[0]}</strong>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between">
                                    <span>District</span>
                                    <strong style={{ fontWeight: 'lighter' }}>{selectedLieux[1]}</strong>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between">
                                    <span>Commune</span>
                                    <strong style={{ fontWeight: 'lighter' }}>{selectedLieux[2]}</strong>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between">
                                    <span>Code Region</span>
                                    <strong style={{ fontWeight: 'lighter' }}>{selectedLieux[4]}</strong>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between">
                                    <span>Code District</span>
                                    <strong style={{ fontWeight: 'lighter' }}>{selectedLieux[5]}</strong>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between">
                                    <span>Code Commune</span>
                                    <strong style={{ fontWeight: 'lighter' }}>{selectedLieux[6]}</strong>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between">
                                    <span>Code Fokontany</span>
                                    <strong style={{ fontWeight: 'lighter' }}>{selectedLieux[7]}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Ligne2