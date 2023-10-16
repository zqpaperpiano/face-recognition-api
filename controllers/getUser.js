const User = require('../Schema/registrationSchema');

const getUser = (req, res) => {
    const {id} = req.params;
    User.find({_id: id})
    .then(data => res.json(data))
    .catch(err => console.log("Error occured, " + err));
}

module.exports = {
    getUser: getUser
}