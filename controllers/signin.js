const handleSignIn = (req, res, knex, bcrypt) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('All fields must be filled in')
    }
    knex.select('hash').from('login').where('email', '=', email)
    .then(hash => {
        let mapResp = JSON.stringify(hash);
        let stringHash = "";
        for(let i = 10; i < mapResp.length - 3; ++i){
            stringHash = stringHash + mapResp[i];
        }
        bcrypt.compare(password, stringHash)
        .then(result => {
            console.log(result);
            if(result){
                knex.from('user').where({email})
                .then(user => res.json(user))
            }
            else{
                res.json('wrong credentials')
            }
        })
    })
    .catch(err => res.json(err))
}

module.exports = {
    handleSignIn: handleSignIn
}