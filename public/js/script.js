const socket = io('http://localhost:3001/');

clearInputs();

const displayDataTable = document.getElementById('display-data-table');
let userDisplay = '';

socket.on('server:getUsers', users => {

    users.forEach(user => {
            userDisplay = userDisplay + `
            <tr>
                <td>${user._id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.password}</td>
                <td>
                    <a href='#' onclick={editUser('${user._id}')} id='editUser' class='operations op-edit'>Edit</a> / 
                    <a href='#' onclick={deleteUser('${user._id}')} id='removeUser' class='operations op-remove'>Remove</a>
                </td>
            </tr>
        `;
    });

    displayDataTable.innerHTML = userDisplay;
    userDisplay = '';
});

socket.on('server:createUser', response => {
    const {success, msg} = response;

    if(success){
        clearInputs();
        document.getElementById('feedback').style.color = 'green';
        document.getElementById('name').focus();
        document.getElementById('title1').innerHTML = 'Create user';
        document.getElementById('btnSave').innerHTML = 'Create';
    }
    else{
        document.getElementById('feedback').style.color = 'red';
    }
    
    document.getElementById('feedback').innerHTML = msg;

    setTimeout(() => {
        document.getElementById('feedback').innerHTML = '';
    },2000);
});

socket.on('server:editUser', user => {
    document.getElementById('id').value = user._id;
    document.getElementById('name').value = user.name;
    document.getElementById('username').value = user.username;
    document.getElementById('password').value = user.password;
});


//JAVASCRIPT FUNCTIONS----------------------------------------------
function editUser (id) {
    document.getElementById('title1').innerHTML = 'Edit user';
    document.getElementById('btnSave').innerHTML = 'Edit'

    socket.emit('client:editUser', id);
}

const deleteUser = id => socket.emit('client:deleteUser', id);

function clearInputs(){
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

const formUser = document.getElementById('userForm');
formUser.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    socket.emit('client:createUser', user);
});

document.getElementById('btnCancel').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('title1').innerHTML = 'Create user';
    document.getElementById('btnSave').innerHTML = 'Create'

    clearInputs();
}); 





