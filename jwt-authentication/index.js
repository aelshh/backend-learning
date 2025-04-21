const jwt = require("jsonwebtoken");

const secret = "someranadomsecreat";

const value = {
  fname: "Rakesh",
  accNum: 2341243213141,
};
    
const token = jwt.sign(value, secret);
console.log(token);

const verfiy = jwt.verify(token, secret);
// const verfiy2 = jwt.verify(token, "someanotherrandomsecreat");

console.log(verfiy);
