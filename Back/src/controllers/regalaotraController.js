// src/controllers/regalaotraController.js

const pool = require("../config/db.js")

exports.getAllRegalaotra = async (req, res) => {
    const requete = 'SELECT * FROM regalaotra';
    try {
        const [rows] = await pool.query(requete);
        res.json(rows[0]);
    } catch (err) {
        console.error("Une erreur est survenue lors de l'exécution de la requête :", err);
        res.status(500).json({ error: "Une erreur est survenue lors de l'exécution de la requête." });
    }
};
exports.getlastID = async (req, res) => {
    const requete = ' SELECT * FROM regalaotra ORDER BY codefichier DESC LIMIT 1';
    try {
        const [rows] = await pool.query(requete);
        const id = rows[0].id;
        const fiveLastNbr = id.slice(-5);
        res.json(
            {
                fiveLastNbr: fiveLastNbr
            }
        );

    } catch (err) {
        console.error("Une erreur est survenue lors de l'exécution de la requête :", err);
        res.status(500).json({ error: "Une erreur est survenue lors de l'exécution de la requête." });
    }
};


exports.getRegalaotraById = async (req, res) => {
    const requete = 'SELECT * FROM regalaotra WHERE id = ?';
    const itemId = req.params.id;
    try {
        const [rows] = await pool.query(requete, [itemId]);
        if (rows.length === 0) {
            // Aucune entrée trouvée, renvoyer un objet JSON vide
            res.json({});
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error("Une erreur est survenue lors de l'exécution de la requête :", err);
        res.status(500).json({ error: "Une erreur est survenue lors de l'exécution de la requête." });
    }
};

exports.createRegalaotra = async (req, res) => {
    const requete = `INSERT INTO regalaotra(id,nstat,nom,sigle,adresse,dtmaj,dtcre,lien,nentre,fokon,tel,domic,ifj,ichef,qualite,nat,cin,actpr,cnaps,patente,fonds,compta,lactpr,dupli) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `;

    let date1 = new Date().toLocaleDateString();

    // const newItem = req.body;
    const id = req.body.id;
    const nstat = req.body.nstat;
    const nom = req.body.nom;
    const sigle = req.body.sigle;
    const adresse = req.body.adresse;
    const dtmaj = "NULL";
    const dtcre = date1;
    const lien = req.body.lien;
    const nentre = req.body.nentre;
    const fokon = req.body.fokon;
    const tel = req.body.tel;
    const domic = req.body.domic;
    const ifj = req.body.ifj;
    const ichef = req.body.ichef;
    const qualite = req.body.qualite;
    const nat = req.body.nat;
    const cin = req.body.cin;
    const actpr = req.body.actpr;
    const cnaps = req.body.cnaps;
    const patente = req.body.patente;
    const fonds = req.body.fonds;
    const compta = req.body.compta;
    const lactpr = req.body.lactpr;
    const dupli = req.body.dupli;

    try {
        await pool.query(requete, [id, nstat, nom, sigle, adresse, dtmaj, dtcre, lien,
            nentre, fokon, tel, domic, ifj, ichef, qualite, nat, cin, actpr, cnaps,
            patente, fonds, compta, lactpr, dupli]);
        res.status(201).send('Enregistre avec succes');
    } catch (error) {
        console.error("Une erreur est survenue lors de l'exécution de la requête :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de l'exécution de la requête." });
    }
};

exports.updateRegalaotra = async (req, res) => {
    const fieldsToUpdate = Object.keys(req.body); // Récupérer tous les champs de req.body
    const tabAttr = [];
    const updates = [];

    const id = req.params.id;

    // Parcourir tous les champs
    fieldsToUpdate.forEach(field => {
        if (req.body[field] !== "" && field !== "id") { // Vérifier si le champ n'est pas vide et n'est pas l'id           
            tabAttr.push(req.body[field]);
            updates.push(`${field} = ?`); // Ajouter le champ et sa valeur à la liste des mises à jour
        }
        else {
            tabAttr.push([id]);
            updates.push(`id = ?`);

        }
    });



    const updateFields = updates.join(", "); // Joindre les mises à jour en une seule chaîne

    const requete = `UPDATE regalaotra SET ${updateFields} WHERE id = ?`;

    try {
        await pool.query(requete, [...tabAttr, id]);
        res.send('Mise à jour réussie');
    } catch (err) {
        console.error("Une erreur est survenue lors de l'exécution de la requête :", err);
        res.status(500).json({ error: "Une erreur est survenue lors de l'exécution de la requête." });
    }
};



exports.deleteRegalaotra = async (req, res) => {
    const requete = 'DELETE FROM regalaotra WHERE codefichier = ?';
    const codefichier = req.params.id;
    try {
        await pool.query(requete, [codefichier]);
        res.send('Suppresion terminer');
    } catch (err) {
        console.error("Une erreur est survenue lors de l'exécution de la requête :", err);
        res.status(500).json({ error: "Une erreur est survenue lors de l'exécution de la requête." });
    }
};
