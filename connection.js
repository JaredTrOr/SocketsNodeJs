const mongoose = require('mongoose');

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('Connection succesfully');
})
.catch((err) => {
    console.log(`ERROR: ${err}`);
});