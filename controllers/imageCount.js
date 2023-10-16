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
        {
            // console.log('resp :', resp);
            // console.log(typeof resp.status.code);
            // console.log('data: ', resp.outputs[0].data, 'length: ', resp.outputs[0].data.regions);
            if(resp.status.code === 30104){
                // console.log('caught!');
                res.status(400).json('Please enter a valid URL')    ;
            }else if(resp.outputs[0].data.regions === undefined){
                // console.log("unable to detect a face");
                res.status(400).json('No face identified');
            }else{
                // console.log('here');
                res.json(resp.outputs[0].data.regions)
            }
        }
    )
    .catch(err => 
        {return res.status(400).json('unable to work with API')} 
        )
}

var User = require("../Schema/registrationSchema");

const imageCount = (req, res) => {
    const {email} = req.body;

    User.findOneAndUpdate(
        {email: email}, 
        {$inc: { imageCount: 1 }},
        {
            new: true
        })
        .then((data) => {
            res.json(data.imageCount);
        })
        .catch((err) => {
            console.log('err: ', err);
            res.json('error');
        })
}
 
module.exports = {
    imageCount,
    handleFRCall
}