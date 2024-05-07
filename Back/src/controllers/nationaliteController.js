const pool = require("../config/db.js")

exports.getAllNationalite = async (req, res) => {
    const requete = 'SELECT * FROM nationalité';
    try {
        const [rows] = await pool.query(requete);
        res.json(rows);
    } catch (err) {
        console.error("Une erreur est survenue lors de l'exécution de la requête :", err);
        res.status(500).json({ error: "Une erreur est survenue lors de l'exécution de la requête." });
    }
};

