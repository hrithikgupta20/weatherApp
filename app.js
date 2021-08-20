const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //necessary code to run body parser package

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //catch the files of the form using post method

  const query = req.body.cityName;
  const apiKey = "61559e67c953acda376b526c99e15bac";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?&q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;
  https.get(url, function (response) {
    //using get making a https request
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data); //JSON.parse --> turns json in js string format
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1>The temperature in " +
          " " +
          query +
          " " +
          " is " +
          temp +
          " degress celcius.</h1>"
      );
      res.write(
        "<p>The weather is currently" + " " + weatherDescription + "</p>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
