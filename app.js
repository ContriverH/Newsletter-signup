const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const { emitKeypressEvents } = require("readline");
const https = require("https");
const { url } = require("inspector");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {    
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    url = "https://us1.api.mailchimp.com/3.0/lists/4bf0e65ce5/"
    var options = {
        method: "POST",
        auth: "ContriverH:nLeJ&@-?/7"
    }

    const request = https.request(url, options, function (response ) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })

    })


    request.write(jsonData);
    request.end();
    // console.log(firstName, lastName, email);
    // res.send("You have been successfully registered for the mailchimp.");
})

app.listen(3000, function () {
    console.log("Server is runnig on port 3000");
})

// API keys
// 87d0ab567df9d926341595cf8cb67a9c-us1

// list Id (audience id or unique id) This is going to help mailchimp to get the list that you want to put your subscriber into.
// 4bf0e65ce5
