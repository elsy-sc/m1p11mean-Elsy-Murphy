const { Offrespeciale } = require('../models/offrespeciale.model');

function startServerWithNotificationOffreSpecial(app, port, db) {
    const cors = require('cors');
    const http  = require('http');
    const socketIo = require('socket.io');
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: {
            origin: "*",
        }
    });
    
    db.collection('service').watch().on('change', (change) => {
        if (change.operationType === 'insert' || change.operationType === 'update') {
            const id = change.documentKey._id;
            const offreSpeciale  = new Offrespeciale();
            offreSpeciale._id = id;
            offreSpeciale.read(db).then((result) => {
                const data = result[0];
                if (data.descriptionoffrespeciale) {
                    console.log('Nouvelle offre spéciale ajoutée ou mise à jour', data);
                    io.emit('nouvelle-offre-speciale', data);                    
                }
            });
        }
    });
    server.listen(port, () => console.log("Listening on port", port, "..."));
}

exports.startServerWithNotificationOffreSpecial = startServerWithNotificationOffreSpecial;