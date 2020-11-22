var express = require('express');
var app = express();
var gplay = require('google-play-scraper');
let limit;
let sorting;
const hostname = 'localhost';
let port = process.env.PORT || 3000;
let nextPaginationToken;


//Get all review by limit default = 150
app.get('/reviewList', function (req, res, next) {

    limit = req.query.limit;
    sorting = req.query.sorting;
    nextPaginationToken = req.query.nextPaginationToken;
    packageName = req.query.packageName;


    if (nextPaginationToken == "default") {
        console.log(nextPaginationToken + "null olana girdi!")
        if (sorting == 'false' || sorting == "newest") {
            gplay.reviews({
                appId: packageName,
                sort: gplay.sort.NEWEST,
                num: limit,
                lang: 'tr'
            }).then(function (result) {
                console.log('Retrieved ' + result.data.length + "and" + result.nextPaginationToken + ' reviews!');
                let data = result.data;
                nextPaginationToken = result.nextPaginationToken;
                try {
                    if (result != null) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ data: data, nextPaginationToken: nextPaginationToken }));
                        console.log("Got a GET request for list");
                        next();
                    }
                    else {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ success: false, response: "Empty" }));
                        console.log("Got a GET request for list but list empty");
                        next();
                    }
                }
                catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({ success: false, message: err.message }));
                    console.log("Not got a GET request for list");
                }
            });
        }
        else if (sorting == "rating") {

            gplay.reviews({
                appId: packageName,
                sort: gplay.sort.RATING,
                num: limit,
                lang: 'tr'
            }).then(function (result) {
                console.log('Retrieved ' + result.data.length + ' reviews!');
                let data = result.data;
                let nextPaginationToken = result.nextPaginationToken;
                try {
                    if (result != null) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ data: data, nextPaginationToken: nextPaginationToken }));
                        console.log("Got a GET request for list");
                        next();
                    }
                    else {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ success: false, response: "Empty" }));
                        console.log("Got a GET request for list but list empty");
                        next();
                    }
                }
                catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({ success: false, message: err.message }));
                    console.log("Not got a GET request for list");
                }
            });
        }
        else if (sorting == "helpfulness") {
            gplay.reviews({
                appId: packageName,
                sort: gplay.sort.HELPFULNESS,
                num: limit,
                lang: 'tr'
            }).then(function (result) {
                console.log('Retrieved ' + result.data.length + ' reviews!');
                let data = result.data;
                let nextPaginationToken = result.nextPaginationToken;
                try {
                    if (result != null) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ data: data, nextPaginationToken: nextPaginationToken }));
                        console.log("Got a GET request for list");
                        next();
                    }
                    else {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ success: false, response: "Empty" }));
                        console.log("Got a GET request for list but list empty");
                        next();
                    }
                }
                catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({ success: false, message: err.message }));
                    console.log("Not got a GET request for list");
                }
            });
        }

    }

    else {
        console.log("null olmayana girdi!")
        if (sorting == 'false' || sorting == "newest") {
            gplay.reviews({
                appId: packageName,
                sort: gplay.sort.NEWEST,
                num: limit,
                paginate: true,
                nextPaginationToken: nextPaginationToken,
                lang: 'tr'
            }).then(function (result) {
                console.log('Retrieved ' + result.data.length + "and" + result.nextPaginationToken + ' reviews!');
                let data = result.data;
                nextPaginationToken = result.nextPaginationToken;
                try {
                    if (result != null) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ data: data, nextPaginationToken: nextPaginationToken }));
                        console.log("Got a GET request for list");
                        next();
                    }
                    else {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ success: false, response: "Empty" }));
                        console.log("Got a GET request for list but list empty");
                        next();
                    }
                }
                catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({ success: false, message: err.message }));
                    console.log("Not got a GET request for list");
                }
            });
        }
        else if (sorting == "rating") {

            gplay.reviews({
                appId: packageName,
                sort: gplay.sort.RATING,
                num: limit,
                paginate: true,
                nextPaginationToken: nextPaginationToken,
                lang: 'tr'
            }).then(function (result) {
                console.log('Retrieved ' + result.data.length + ' reviews!');
                let data = result.data;
                let nextPaginationToken = result.nextPaginationToken;
                try {
                    if (result != null) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ data: data, nextPaginationToken: nextPaginationToken }));
                        console.log("Got a GET request for list");
                        next();
                    }
                    else {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ success: false, response: "Empty" }));
                        console.log("Got a GET request for list but list empty");
                        next();
                    }
                }
                catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({ success: false, message: err.message }));
                    console.log("Not got a GET request for list");
                }
            });
        }
        else if (sorting == "helpfulness") {
            gplay.reviews({
                appId: packageName,
                sort: gplay.sort.HELPFULNESS,
                num: limit,
                paginate: true,
                nextPaginationToken: nextPaginationToken,
                lang: 'tr'
            }).then(function (result) {
                console.log('Retrieved ' + result.data.length + ' reviews!');
                let data = result.data;
                let nextPaginationToken = result.nextPaginationToken;
                try {
                    if (result != null) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ data: data, nextPaginationToken: nextPaginationToken }));
                        console.log("Got a GET request for list");
                        next();
                    }
                    else {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ success: false, response: "Empty" }));
                        console.log("Got a GET request for list but list empty");
                        next();
                    }
                }
                catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({ success: false, message: err.message }));
                    console.log("Not got a GET request for list");
                }
            });
        }

    }

})


app.listen(port, function () {

    console.log("Example app listening at http://localhost:%s", port)
})

