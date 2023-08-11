const handleRegister = (req, res, knex, bcrypt, saltRounds) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password){
        return res.status(400).json('All fields must be filled in');
    }
    
    bcrypt.hash(password, saltRounds, function(err, hash) {
        knex.transaction(trx => {
            trx.insert({
                hash: hash,
                email, email
            })
            .into('login')
            .then(
                trx('user')
                .insert({
                    email: email,
                    name: name,
                    joined: new Date()
                })
                .then(res.json('success'))
                // .catch(console.log('error!!'))
            )
            .then(trx.commit)
            .catch(trx.rollback)
        })
    })
}

module.exports = {
    handleRegister: handleRegister
}