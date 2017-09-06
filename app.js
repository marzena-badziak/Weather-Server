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
    console.log("invalid email!");
  } else {
    if (
      !(city.toLowerCase() === "london" || city.toLowerCase() === "new york")
    ) {
      console.log("You can check weather only in London or New York!");
    } else {
      console.log("city ok");
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&APPID=ad39bc99ad9b6537af039f557c68561f"
        )
        .then(response => {
          console.log(response.data.weather[0]);
          res.send(
            " hello " +
              email +
              " the weather in " +
              city +
              " is: " +
              response.data.weather[0].main
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});

app.listen(3000);
