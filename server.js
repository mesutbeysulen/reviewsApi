var express = require('express');
var app = express();
var gplay = require('google-play-scraper');
var appStore = require('app-store-scraper');
let page;
let limit;
let sorting;
const hostname = 'localhost';
let port = process.env.PORT || 3000;
let nextPaginationToken;


//Get all review by limit default = 150
app.get('/androidreviewlist', function (req, res, next) {

    limit = req.query.limit;
    sorting = req.query.sorting;
    nextPaginationToken = req.query.nextPaginationToken;
    packageName = req.query.packageName;


    if (nextPaginationToken === "default") {
        console.log(nextPaginationToken + "null olana girdi!")
        if (sorting === 'false' || sorting === "newest") {
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
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({data: data, nextPaginationToken: nextPaginationToken}));
                    console.log("Got a GET request for list");
                    next();
                } catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({success: false, message: err.message}));
                    console.log("Not got a GET request for list");
                }
            });
        } else if (sorting === "rating") {

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
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({data: data, nextPaginationToken: nextPaginationToken}));
                    console.log("Got a GET request for list");
                    next();
                } catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({success: false, message: err.message}));
                    console.log("Not got a GET request for list");
                }
            });
        } else if (sorting === "helpfulness") {
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
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({data: data, nextPaginationToken: nextPaginationToken}));
                    console.log("Got a GET request for list");
                    next();
                } catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({success: false, message: err.message}));
                    console.log("Not got a GET request for list");
                }
            });
        }

    } else {
        console.log("null olmayana girdi!")
        if (sorting === 'false' || sorting === "newest") {
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
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({data: data, nextPaginationToken: nextPaginationToken}));
                    console.log("Got a GET request for list");
                    next();
                } catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({success: false, message: err.message}));
                    console.log("Not got a GET request for list");
                }
            });
        } else if (sorting === "rating") {

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
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({data: data, nextPaginationToken: nextPaginationToken}));
                    console.log("Got a GET request for list");
                    next();
                } catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({success: false, message: err.message}));
                    console.log("Not got a GET request for list");
                }
            });
        } else if (sorting === "helpfulness") {
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
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({data: data, nextPaginationToken: nextPaginationToken}));
                    console.log("Got a GET request for list");
                    next();
                } catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({success: false, message: err.message}));
                    console.log("Not got a GET request for list");
                }
            });
        }

    }

})

//android app bilgisi döndürülür.
app.get('/androidappinfo', function (req, res, next) {
    packageName = req.query.packageName;
    gplay.app({
        appId: packageName,
    }).then(function (result) {
        let data = result;
        try {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({data: data}));
            console.log("Got a GET request for list");
            next();
        } catch (err) {
            res.status(500) //Internal Server Error
            res.send(JSON.stringify({success: false, message: err.message}));
            console.log("Not got a GET request for list");
        }
    }).catch(function (err) {
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({success: false, message: err.message}));
        console.log("Not got a GET request for list");
    });
})

//ANDROid benzer uygulamaların listesini döndürür
app.get('/androidsimilar', function (req, res, next) {
    packageName = req.query.packageName;
    gplay.similar({
        appId: packageName,
        lang: 'tr',
        country: 'tr',
        fullDetail: true
    }).then(function (result) {
        let data = result;
        try {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({data: data}));
            console.log("Got a GET request for list");
            next();
        } catch (err) {
            res.status(500) //Internal Server Error
            res.send(JSON.stringify({success: false, message: err.message}));
            console.log("Not got a GET request for list");
        }
    }).catch(function (err) {
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({success: false, message: err.message}));
        console.log("Not got a GET request for list");
    });

})

//iOS yorum listesi döndürülür
app.get('/iosreviewlist', function (req, res, next) {

    sorting = req.query.sorting;
    appId = req.query.packageId;
    pageNo = req.query.page;
    if (pageNo <= 10) {
        if (sorting === "recent") {
            appStore.reviews({
                appId: 'com.pozitron.hepsiburada',
                sort: appStore.sort.HELPFUL,
                page: pageNo
            }).then(function (result) {
                let data = result;
                try {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({data: data}));
                    console.log("Got a GET request for list");
                    next();
                } catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({success: false, message: err.message}));
                    console.log("Not got a GET request for list");
                }
            });

        } else {
            appStore.reviews({
                appId: 'com.pozitron.hepsiburada',
                sort: appStore.sort.HELPFUL,
                page: pageNo
            }).then(function (result) {
                let data = result;
                try {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({data: data}));
                    console.log("Got a GET request for list");
                    next();
                } catch (err) {
                    res.status(500) //Internal Server Error
                    res.send(JSON.stringify({success: false, message: err.message}));
                    console.log("Not got a GET request for list");
                }
            });

        }
    } else {
        res.status(400)
        res.send(JSON.stringify({success: false, message: "iosreviewlist is limited to 10 page"}));
    }


})

//ios app bilgisi döndürülür - ratings=true ise rating ve histogram bilgisi döndürülür.
app.get('/iosappinfo', function (req, res, next) {
    appId = req.query.packageId;
    scoreRate = req.query.rating;
    if (scoreRate === 'true') {
        appStore.app({
            id: appId,
            ratings: true
        }).then(function (result) {
            let data = result;
            try {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({data: data}));
                console.log("Got a GET request for list");
                next();
            } catch (err) {
                res.status(500) //Internal Server Error
                res.send(JSON.stringify({success: false, message: err.message}));
                console.log("Not got a GET request for list");
            }
        }).catch(function (err) {
            res.status(500) //Internal Server Error
            res.send(JSON.stringify({success: false, message: err.message}));
            console.log("Not got a GET request for list");
        });
    } else {
        appStore.app({
            id: appId
        }).then(function (result) {
            let data = result;
            try {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({data: data}));
                console.log("Got a GET request for list");
                next();
            } catch (err) {
                res.status(500) //Internal Server Error
                res.send(JSON.stringify({success: false, message: err.message}));
                console.log("Not got a GET request for list");
            }
        }).catch(function (err) {
            res.status(500) //Internal Server Error
            res.send(JSON.stringify({success: false, message: err.message}));
            console.log("Not got a GET request for list");
        });
    }

})


app.listen(port, function () {

    console.log("Example app listening at http://localhost:%s", port)
})

