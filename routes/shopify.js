var express = require('express');
var router = express.Router();
var url = require('url');
var verifyCall = require('../tools/verify');
var request = require('request-promise');

var accessTokenAPI = ''

router.get('/install', function (req, res, next) {
    var shop = req.query.shop;
    var appId = process.env.appId;

    var appSecret = process.env.appSecret;
    var appScope = process.env.appScope;
    var appDomain = process.env.appDomain;

    //build the url
    var installUrl = `https://${shop}/admin/oauth/authorize?client_id=${appId}&scope=${appScope}&redirect_uri=https://${appDomain}/shopify/callback`;

    //Do I have the token already for this store?
    //Check database
    //For tutorial ONLY - check .env variable value

        //go here if you don't have the token yet
        res.redirect(installUrl);
    
});

router.get('/callback', function (req, res, next) {
    let securityPass = false;
    let appId = process.env.appId;
    let appSecret = process.env.appSecret;
    let shop = req.query.shop;
    let code = req.query.code;


    const regex = /^[a-z\d_.-]+[.]myshopify[.]com$/;

    if (shop.match(regex)) {
        console.log('regex is ok');
        securityPass = true;
    } else {
        //exit
        securityPass = false;
    }

    // 1. Parse the string URL to object
    let urlObj = url.parse(req.url);
    // 2. Get the 'query string' portion
    let query = urlObj.search.slice(1);
    if (verifyCall.verify(query)) {
        //get token
        console.log('get token');
        securityPass = true;
    } else {
        //exit
        securityPass = false;
    }

    if (securityPass && regex) {

        //Exchange temporary code for a permanent access token
        let accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
        let accessTokenPayload = {
            client_id: appId,
            client_secret: appSecret,
            code,
        };

        request.post(accessTokenRequestUrl, { json: accessTokenPayload })
            .then((accessTokenResponse) => {
                let accessToken = accessTokenResponse.access_token;
                console.log('shop token ' + accessToken);
                accessTokenAPI = accessToken
                res.redirect('/shopify/app/products?shop=' + shop);
            })
            .catch((error) => {
                res.status(error.statusCode).send(error.error.error_description);
            });
    }
    else {
        res.redirect('/installerror');
    }

});

router.get('/app/products', function (req, res, next) {

    let url = 'https://' + req.query.shop + '/admin/products.json';

    let options = {
        method: 'GET',
        uri: url,
        json: true,
        headers: {
            'X-Shopify-Access-Token': accessTokenAPI,
            'content-type': 'application/json'
        }
    };

    request(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
            res.json(parsedBody);
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        });


});


module.exports = router;