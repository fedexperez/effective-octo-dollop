const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const dbConnection = async() => {
    try {
        console.log('init DB config');
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('DataBase connection error - Contact Admin');
    }
}

module.exports = {
    dbConnection
}

// const mongoose = require('mongoose');

// dbConnection().catch(err => console.log(err));

// async function dbConnection() {
//     await mongoose.connect(process.env.DB_CNN);
// }

// module.exports = {
//     dbConnection,
// }
