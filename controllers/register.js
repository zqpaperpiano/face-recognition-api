var User = require('../Schema/registrationSchema.js');
var UserPassword = require('../Schema/registerPasswordSchema.js');

const handleRegister = (req, res, bcrypt, saltRounds) => {
    const { email, name, password } = req.body;


    if(!email || !name || !password){
        return res.status(400).json('All fields must be filled in');
    }

    bcrypt.hash(password, saltRounds, function(err, hash){
        const newUser = new User({
            name: name,
            email: email,
            imageCount: 0,
            joinedDate: Date() 
        });
        
        const newUserPassword = new UserPassword({
            email: email,
            password: hash
        });
        try{
            newUser.save()
            .then(() => newUserPassword.save())
            .then(() => console.log("entry added"),
            err => {
                User.find({email: email})
                .then(user => user.remove());
                console.log('user removed due to error');
                res.json("error registering");
                console.log('error here!: ', err);
        }
            )
            .then(res.json(newUser));
        }catch(err){
            console.log("Error: ", err);
            res.status(400).json('Error registering');
        }
    })
}

module.exports = {
    handleRegister: handleRegister
}