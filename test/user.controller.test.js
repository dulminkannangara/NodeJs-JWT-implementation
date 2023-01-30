const chai = require("chai");
const chaiHttp = require("chai-http");
const {describe} = require("mocha");

const server = require("../server");

var accessToken;
var refreshToken;

chai.should();
chai.use(chaiHttp);

// describe for a controller
describe('Tasks API', function(){

    //Test Add user route
    // describe for a single request in controller
    describe("POST /api/signup", function(){
        

        it("It should return User object as json object with 'user' key", function(done){
            const user = {
                user:{
                    username: "dul",
                    password: "123",
                    fname: "Dulmin",
                    lname: "Kannangara",
                    email: "kkddulmin@gmail.com"
                }
            }
            chai.request(server)
            .post("/api/signup")
            .send(user)
            .end(function(err,response){
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('user');
                done();
            })
        } );    

        it("It should NOT return User object", function(done){
            
            const user = {};
            chai.request(server)
            .post("/api/signup")
            .send(user)
            .end(function(err,response){
                response.should.have.status(400);
                response.text.should.be.eq('Register Failed!');
                done();
            })
        } );  



    });


});