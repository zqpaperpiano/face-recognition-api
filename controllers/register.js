var User = require('../Schema/registrationSchema.js');
var UserPassword = require('../Schema/registerPasswordSchema.js');

const handleRegister = async (req, res, bcrypt, saltRounds) => {
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

        // console.log('saving user now...');
        saveUser(newUser)
        .then((data) => {
            if(data === null){
                // console.log('email already exists');
                res.status(401).json("Email already exists");
            }
            else{
                // console.log('all good, going to save password now');
                savePassword(newUserPassword)
                .then((data) => {
                    if(data === false){
                        console.log('something went wrong...');
                        User.find({email: email})
                            .then(user => {user.remove()});
                            // console.log('user removed due to error');
                        res.status(400).json('unable to register');
                    }
                })
            }
        })
        .catch((err) => {console.log(err)});
        


        // newUser.save()
        // .then(console.log('hello'))
        // .catch((err) => console.log('this is an error'));
    })
}

const saveUser = async (newUser) => {
    try{
        registered = await newUser.save()
        return registered;
    }catch(err){
        console.log('error found: ');
        return null;
    }
    
}

const savePassword = async(userPassword) => {
    try{
        savePassword = await userPassword.save()
        return true;
    }catch(err){
        return false;
    }
}
        // .then(() => {
        // console.log('saving new user and password.....')
        // if(err){
        //     console.log('found an error: ', err);
        // }}) 
                // newUserPassword.save()},
                // err => {
                //     return('error...');
                // })
            // .then(() => console.log("entry added")
            // .then(
            //     console.log('entered somewhere i shouldnt have'))
            // err => {
            //     console.log('entered err part...');
            //     User.find({email: email})
            //     .then(user => {user.remove()});
            //     console.log('user removed due to error');
            //     res.json("error registering");
            //     console.log('error here!: ', err);
            //     } 
            // )
            
                // res.json(newUser));
//     })
// }

module.exports = {
    handleRegister: handleRegister
}