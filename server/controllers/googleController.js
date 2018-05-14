const axios = require('axios')

module.exports = {
    getGeolocation : (req, res)=>{
        const {address, city, state} = req.body;
        const api_key = process.env.GOOGLE_GEOCODE_KEY
        const convertedAddress = address.replace(/\s/g, '+');
        const convertedCity = city.replace(/\s/g, '+');
        const convertedState = state.replace(/\s/g, '+');


        const base_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
        const url=`${base_url}${convertedAddress},+${convertedCity},+${convertedState}&key=${api_key}`

        axios.get(`${url}`).then((result) => {
            res.status(200).send(result.data.results[0].geometry.location)
        }).catch((e) => {
            console.log(`Error while fetching geoloc from google : ${e}`);
            res.sendStatus(500);
        })
    }
    
}