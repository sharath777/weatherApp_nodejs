const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
if (process.env.NODE_ENV !== 'production')  {
    require('dotenv').config()
}
const apiKey = process.env.OPENWEATHERMAP_API_KEY

app.use(express.json())

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/weather', (req, res) => {
    console.log(req.body);
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${apiKey}&units=metric`
    axios({
        url: url,
        responseType: 'json'
    }).then((data) => {
       console.log(data.data.main);
    },(error) => {
        console.log(error.data)
      });
  })

app.listen(3000,() => {
    console.log('Express server app listening on port 3000')
})


