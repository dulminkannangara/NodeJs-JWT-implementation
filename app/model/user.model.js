class User{
    setId(id){
        this.id = id;
    }
    setStatus(status){
        this.status = status;
    }

    constructor(username,password,fname,lname,email){
        this.username = username;
        this.password = password;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
    }
}

module.exports = {User};