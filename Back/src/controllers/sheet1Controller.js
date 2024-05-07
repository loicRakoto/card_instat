const pool = require("../config/db.js")

exports.getAllSheet = async (req, res) => {
    const requete = 'SELECT * FROM sheet1';
    try {
        const [rows] = await pool.query(requete);
        res.json(rows);
    } catch (err) {
        console.error("Une erreur est survenue lors de l'exécution de la requête :", err);
        res.status(500).json({ error: "Une erreur est survenue lors de l'exécution de la requête." });
    }
};

exports.search = async (req, res) => {

    const requete = `SELECT * FROM sheet1 WHERE reg LIKE ? OR dist LIKE ? OR com LIKE ? OR fkt LIKE ?`;
    const itemId = req.params.id;
    try {
        const [rows] = await pool.query(requete, [`%${itemId}%`, `%${itemId}%`, `%${itemId}%`, `%${itemId}%`]);
        res.json(rows);
    } catch (err) {
        console.error("Une erreur est survenue lors de l'exécution de la requête :", err);
        res.status(500).json({ error: "Une erreur est survenue lors de l'exécution de la requête." });
    }

};

