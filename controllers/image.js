const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '6addf6d577d84da7b2178ef7ff69be57'
}); 
const handleApiCall = (req, res)=>{
    app.models
        .predict({
            id: "a403429f2ddf4b49b307e318f00e528b",
            version: "34ce21a40cc24b6b96ffee54aabff139"},  req.body.input)
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) =>{
    const { id } = req.body
        db('users').where('id' , '=' ,  id)
        .increment ('enteries' , 1)
         .returning('enteries')
            .then (enteries =>{
                    res.json(enteries[0])
    })
            .catch(err => res.status(400).json('unable to get count'))
}

module.exports = {
    handleImage,
    handleApiCall
}




