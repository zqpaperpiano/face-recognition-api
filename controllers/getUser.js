const getUser = (req, res, knex) => {
    const {id} = req.params;
    knex.from('user').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0]);
        }else{
            res.status(400).json('Not Found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    getUser: getUser
}