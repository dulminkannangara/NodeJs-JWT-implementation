// const user = require('../model/user.model');

var users = [];

function findUserByUsernamePassowd(username, password) {
    return users.find(function (u) {
        return username == u.username && password == u.password;
    });

}

function getUser(id){
    return users.find(function(u){
        return id == u.id;
    });
}

function addUser(u){
    if(typeof u != "object"){
        return;
    }

    if('username' in u && 'password'  in u && 'fname'  in u && 'lname'  in u && 'email'  in u){

        u.id = users.length+1;
        u.status = "active";
        return users.push(u);

    }
    return;


}

module.exports = {getUser, findUserByUsernamePassowd, addUser}