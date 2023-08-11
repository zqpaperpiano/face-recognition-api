const returnClarifaiRequestOptions = (imageURL) => {
    const PAT = '978bbdcebc67405d8a0456bc3ca20e8e';
    const USER_ID = 'owidbci19jqh';       
    const APP_ID = 'thisisatestpleasenomoer400';
    const IMAGE_URL = imageURL;
  
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
    return requestOptions;
}

const handleFRCall = (req, res) => {
    const {url} = req.body;
    fetch("https://api.clarifai.com/v2/models/" 
    + 'face-detection' 
    + "/outputs", returnClarifaiRequestOptions(url))
    .then(resp => resp.json())
    .then(resp => 
        res.json(resp.outputs[0].data.regions[0].region_info.bounding_box)
    )
    .catch(err => 
        {return res.status(400).json('unable to work with API')}
        )
}

const imageCount = (req, res, knex) => {
    const {id} = req.body;
    knex('user').where('id', '=', id)
    .update({
        'entries': knex.raw('entries + 1')
    })
    .then(knex.select('entries').from('user').where({id})
    .then(user => {
        let temp = JSON.stringify(user);
        let count = "";
        for(let i = 12; i < temp.length - 2; ++i){
            count = count + temp[i]
        }
        temp = parseInt(count);
        res.json(count)
    }))
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    imageCount,
    handleFRCall
}