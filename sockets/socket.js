const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');
const {userConnected, userDisconnected, saveMessage} = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');
    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);

    console.log(client.handshake.headers['x-token']);

    if (!valid) {
        return client.disconnect();
    }

    console.log('cliente autenticado');
    userConnected(uid);

    //Unique channel
    client.join(uid);

    //Listen the personal-message
    client.on('personal-message', async (payload) => {
        console.log(payload);
        saveMessage(payload);

        io.to(payload.toUser).emit('personal-message', payload);
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        userDisconnected(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
