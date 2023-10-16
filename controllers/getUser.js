const getUser = (req, res) => {
    const {id} = req.params;
    User.find({id: id})
    .then(data => res.json(data))
    .catch(err => console.log("Error occured, " + err));
}

module.exports = {
    getUser: getUser
}