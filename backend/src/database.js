const mongoose = require('mongoose');

const URI = 'mongodb+srv://Admin:209308798@cluster0.wmlofsu.mongodb.net/?retryWrites=true&w=majority'

mongoose.set("strictQuery", false);

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;