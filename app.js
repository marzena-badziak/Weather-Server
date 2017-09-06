var express = require("express");
var axios = require("axios");
var app = express();

app.get("/weather", function(req, res) {
  var city = req.query.city;
  var email = req.query.email;

  var reg = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (!reg.test(email)) {
    res.send({ success: false, response: "invalid email", data: "" });
    console.log("invalid email!");
  } else {
    if (
      !(city.toLowerCase() === "london" || city.toLowerCase() === "new york")
    ) {
      res.send({ success: false, response: "invalid city", data: "" });
      console.log("You can check weather only in London or New York!");
    } else {
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&APPID=ad39bc99ad9b6537af039f557c68561f"
        )
        .then(response => {
          res.send({
            success: true,
            response: `hello ${email}, the weather in ${city} is: ${response
              .data.weather[0].main}`,
            data: {
              description: response.data.weather[0].description,
              temperature: response.data.main.temp,
              pressure: response.data.main.pressure,
              wind: response.data.wind,
              humidity: response.data.main.humidity,
              visibility: response.data.visibility
            }
          });
        })
        .catch(err => {
          res.send({ success: false, response: err, data: "" });
          console.log(err);
        });
    }
  }
});

app.listen(3000);
