var User = require('../Schema/registrationSchema');
var UserPassword = require('../Schema/registerPasswordSchema');

const handleSignIn = (req, res, bcrypt) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('All fields must be filled in')
    }

    UserPassword.find({ email: email})
    .exec()
    .then(data => {
        return data[0]
    })
    .then(hash => {
        bcrypt.compare(password, hash.password)
        .then(result => {
            if(result){
                User.find({email: email})
                .then(data => res.json(data));
            }else{
                res.status(401).json('wrong credentials');
            }
        })
    })
    .catch(err => {
        res.status(401).json('wrong credentials ');
        console.log('error: ', err);
    })
}

module.exports = {
    handleSignIn: handleSignIn
}