const User = require('../models/User');

const socket = (io) => {
    io.on('connection', socket => {
        
        //SHOW USERS
        async function getUsers (){
            try{
                const users = await User.find();
                io.emit('server:getUsers', users);
            }catch(err){
                console.log(`ERROR: ${err}`);
            }
        }
        getUsers();

        //CREATE AND EDIT USER
        socket.on('client:createUser', async user => {
            //If there is no ID then the user has to be created

            if(user.id)
            {
                await User.findByIdAndUpdate(user.id, user);
                const editedUser = await User.findById(user.id);
                io.emit('server:createUser', {success: false, msg: 'Usuario editado con éxito'});
                getUsers();
                console.log('edited');
            }
            else{

                if(await isUserCreated(user)){
                    io.emit('server:createUser', {success: true, msg: 'Usuario ya existente'});
                    console.log('User already exists');
                }
                else{
                    await new User(user).save();
                    io.emit('server:createUser', {success: true, msg: 'Usuario creado con éxito'});
                    getUsers();
                    console.log('User created');
                }
            }
        });

        //EDIT USER
        socket.on('client:editUser', async id => {
            try{

                const user = await User.findById(id);
                io.emit('server:editUser', user);
            }catch(err){
                console.log(`ERROR: ${err}`);
            }
        });

        //DELETE USER
        socket.on('client:deleteUser', async id => {
            try{
                await User.deleteOne({_id: id})
                io.emit('server:removeUser', 'user removed');
                getUsers();
            }catch(err){
                console.log(`ERROR: ${err}`);
            }
        });
    });
}

async function isUserCreated(user) {
    const userWithSameUsername = await User.findOne({username: user.username});
    return userWithSameUsername ? true : false;

}

module.exports = socket;