import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
import "./print.css"
import mada from '../../Image/mada.jpg';
import instat from '../../Image/instat.png';
import PrintIcon from '@mui/icons-material/Print';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

function Print() {
    const { id } = useParams();

    const [codeAct, setcodeAct] = useState("");
    const [ActLib, setActLib] = useState("");
    const [fiveLastId, setfiveLastId] = useState("");
    const [Nom, setNom] = useState("");
    const [Sigle, setSigle] = useState("");
    const [Adresse, setAdresse] = useState("");
    const [DateCreat, setDateCreat] = useState("");
    const [Annee, setAnnee] = useState("");

    const [hideImpr, sethideImpr] = useState(false);
    const [btnImpr, setbtnImpr] = useState(true);


    const imprimerPdf = async () => {
        await setbtnImpr(false);
        window.print();
        setTimeout(() => {
            setbtnImpr(true);
        }, 0.005);
    }

    const btnRetour = () => {
        window.location.href = "/";
    }

    const recuperInfo = useCallback(async () => {
        if (id !== "") {
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

                        sethideImpr(true);
                    } else {
                        sethideImpr(false);
                        const codeactivite = data.actpr;
                        setcodeAct(codeactivite);

                        const activiteLibelle = data.lactpr;
                        setActLib(activiteLibelle);

                        const id = data.id;
                        const lastFiveNumber = id.slice(-5);
                        setfiveLastId(lastFiveNumber);

                        const name = data.nom;
                        setNom(name);

                        const siglee = data.sigle;
                        setSigle(siglee);

                        const addressee = data.adresse;
                        setAdresse(addressee);

                        const dateCreation = data.dtcre;
                        const dateCreationSplit = dateCreation.split('/');
                        const annee = dateCreationSplit[2];
                        setDateCreat(dateCreation);
                        setAnnee(annee);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, [id]);


    useEffect(() => {
        recuperInfo();
    }, [id, recuperInfo]);



    return (

        <>
            {hideImpr ? null :

                <div className='container-xl mt-5'>
                    <div className='row mb-2'>
                        <div className="col">
                            {btnImpr ?
                                <button style={{ backgroundColor: "#06727a", border: "none" }} type='button' onClick={btnRetour} className='btn btn-sm btn-primary'> <KeyboardReturnIcon /> Revenir à la page d'acceuil</button>
                                : null}
                        </div>
                        <div className='col' style={{ textAlign: "end" }}>
                            {btnImpr ?
                                <button style={{}} type='button' onClick={imprimerPdf} className='btn btn-sm btn-success'> <PrintIcon /> Imprimer</button>
                                : null}
                        </div>
                    </div>
                    <div className='row principale'>
                        <div className='col carteGauche'>
                            <div style={{ padding: '7px 2px' }}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <h5>Recommandation</h5>
                                        <p>
                                            En vertu du Décret n° 59-10 PR du 15 mai 1959, instituant un répertoire
                                            d'identification des établissements à Madagascar, vous êtes tenus
                                            de vous adresser au service de la Statistique pour renouveler votre carte en cas de :
                                        </p>
                                        <ul>
                                            <li>Changement d'activité ou de raison sociale</li>
                                            <li>Changement de propriétaire, de dénomination, de raison sociale, d'adresse</li>
                                            <li>Cession d'activité quel qu'en soit le motif.</li>
                                        </ul>
                                        <p>
                                            Le non-respect de ce décret est passible d'amende.
                                        </p>
                                        <h5>
                                            Hafatra tsy maintsy arahina
                                        </h5>
                                        <p>Araka ny didim-panjakana laharana 59-10 PR tamin'ny 15 main 1959 manambara ny firaketana ny lisitra hamantarana ireo sehampandraharahana
                                            dia manantona ny biraon'ny statistika ianareo hanavao ity karatra ity raha misy :
                                        </p>
                                        <ul>
                                            <li>Fiovan-draharaha</li>
                                            <li>Fiovan'ny tompony, anaran'ny orin'asa (na ny fikambanana) na ny adiresy </li>
                                            <li>Fijanonana amin'ny asa atao na inona na inona antony.</li>
                                        </ul>
                                        <p>Ny tsy fanantaterahana izany dia mahavoasazy.</p>
                                    </div>
                                    <div className='col' style={{ margin: '11px' }}>
                                        <div className='row'>
                                            <div className='LogoRepo' style={{ textAlign: 'center' }}>
                                                <img className='repoLogo' src={mada} alt="mada" />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <h4 style={{ textAlign: "center", fontFamily: "fantasy", letterSpacing: "1px" }}>MINISTERE DE L'ECONOMIE ET DES FINANCES</h4>
                                        </div>
                                        <div className='row align-items-center mb-3'>
                                            <div className='col'>
                                                <div className='LogoInstat' style={{ textAlign: 'center' }}>
                                                    <img className='instatLogo' src={instat} alt="instat" />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <h6 style={{ textAlign: 'right' }}>INSTITUT NATIONAL DE LA STATISTIQUE</h6>
                                            </div>
                                        </div>
                                        <br />
                                        <div className='row mb-4'>
                                            <h6 style={{ textAlign: "center", fontWeight: 'bolder', fontStyle: 'italic' }}>KARATRA STATISTIKA</h6>
                                            <div className='cartIdenEtab'>
                                                CARTE D'IDENTIFICATION D'ETABLISSEMENT
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <span className='mb-2 colorLibelle'>Laharana statistika ( Numéro d'Identification )</span>
                                            <div className='col'>
                                                <span className='rectanglePrint'>{codeAct}</span>
                                                <span className='rectanglePrint'>33</span>
                                                <span className='rectanglePrint'>{Annee}</span>
                                                <span className='rectanglePrint'>0</span>
                                                <span className='rectanglePrint'>{fiveLastId}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='col carteDroite'>
                            <div style={{ padding: '14px' }}>
                                <div className='row mb-3 '>
                                    <span style={{ textAlign: "end", fontSize: "12px", fontWeight: "500", color: "#13598b" }}>Nomena tamin'ny (Délivré le) : {DateCreat}</span>
                                </div>
                                <div className='row mb-3'>
                                    <label className="form-label colorLibelle" style={{ paddingLeft: "inherit" }}>Anarana (Nom/Dénomination):</label>
                                    <input value={Nom} type="text" className="form-control form-control-sm" placeholder="RAKOTOARIVO MAMY" style={{ fontSize: "12px", fontWeight: "500" }} readOnly />
                                </div>
                                <div className='row mb-3'>
                                    <label className="form-label colorLibelle" style={{ paddingLeft: "inherit" }}>Anarana nohafohezina (Sigle)</label>
                                    <input value={Sigle} type="text" className="form-control form-control-sm" placeholder="RAKOTOARIVO MAMY" style={{ fontSize: "12px", fontWeight: "500" }} readOnly />
                                </div>
                                <div className='row mb-3'>
                                    <label className="form-label colorLibelle" style={{ paddingLeft: "inherit" }}>Adiresy (Adresse):</label>
                                    <input value={Adresse} type="text" className="form-control form-control-sm" placeholder="ZONE REGIONALE / VOHIMENA AMPARAFARAVOLA" style={{ fontSize: "12px", fontWeight: "500" }} readOnly />
                                </div>
                                <div className='row mb-3'>
                                    <label className="form-label colorLibelle" style={{ paddingLeft: "inherit" }}>Asa atao (Activité principale) | Asa fanampiny (Activité secondaires):</label>
                                    <textarea value={ActLib} className="form-control" id="floatingTextarea2" style={{ height: "120px", fontSize: "12px", fontWeight: "500" }} readOnly></textarea>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col' style={{ padding: "15px" }}>
                                        <h6 style={{ fontSize: "13px" }}>DIRECTION INTERREGIONALE DE TOAMASINA SERVICE REGIONAL D'ALAOTRA MANGORO</h6>
                                        <p style={{ fontStyle: "italic", textAlign: "starts", fontSize: "12px", fontWeight: "500" }}>TSY EKENA NY TAKOSONA</p>
                                        <p style={{ fontStyle: "italic", textAlign: "starts", fontSize: "12px", fontWeight: "500" }}>(AUCUNE RATURE NI GOMMAGE)</p>
                                    </div>
                                    <div className='col' style={{ padding: "15px" }}>
                                        <h6 style={{ fontSize: "14px", textAlign: "end" }}>Sonian'ny tompon'andraikitra</h6>
                                        <h6 style={{ fontSize: "13px", textAlign: "end" }}>(Signature du Responsable)</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }

        </>


    )
}

export default Print