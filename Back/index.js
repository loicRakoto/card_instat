
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const regalaotraRoutes = require('./src/routes/regalaotraRoutes');
const forme_jRoutes = require('./src/routes/forme_jRoutes');
const lchefRoutes = require('./src/routes/lchefRoutes');
const nationaliteRoutes = require('./src/routes/nationaliteRoutes');
const nomacRoutes = require('./src/routes/nomacRoutes');
const sheet1Routes = require('./src/routes/sheet1Routes');

const app = express();
const port = 4000;

//Autoriser les requetes
app.use(cors());

// Middleware pour parser le corps des requêtes HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilisation des routes définies pour les éléments
app.use('/alaotra', regalaotraRoutes);
app.use('/form_j', forme_jRoutes);
app.use('/lchef', lchefRoutes);
app.use('/nationalite', nationaliteRoutes);
app.use('/nomac', nomacRoutes);
app.use('/sheet1', sheet1Routes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port http://localhost:${port}`);
});


// const liste = () => {
//     cnx.query('SELECT * FROM test', (error, results) => {
//         if (error) {
//             console.error('Error fetching data from test table:', error);
//         } else {
//             if (results && Array.isArray(results) && results.length > 0) {
//                 const [firstResult] = results;
//                 console.log(firstResult);
//             } else {
//                 console.log("No results found");
//             }
//         }
//     });
// }

