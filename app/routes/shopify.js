var express = require('express');
var router = express.Router();
var url = require('url');
var verifyCall = require('../tools/verify');
var request = require('request-promise');

router.get('/install', function (req, res, next) {
    var shop = req.query.shop;
    var appId = "client_id";

    var appSecret = "client_secret";
    var appScope = "read_products,write_products,write_pixels,read_customer_events";
    var appDomain = "32a8-182-180-118-76.ngrok-free.app";

    var installUrl = `https://${shop}/admin/oauth/authorize?client_id=${appId}&scope=${appScope}&redirect_uri=https://${appDomain}/shopify/auth`;

    res.redirect(installUrl);

});

router.get('/auth', async function (req, res, next) {
    let securityPass = false;
    let appId = "client_id";
    let appSecret = "client_secret";
    let shop = req.query.shop;
    let code = req.query.code;

    const regex = /^[a-z\d_.-]+[.]myshopify[.]com$/;

    if (shop.match(regex)) {
        console.log('regex is ok');
        securityPass = true;
    } else {
        securityPass = false;
    }

    let urlObj = url.parse(req.url);
    let query = urlObj.search.slice(1);
    if (verifyCall.verify(query)) {
        console.log('get token');
        securityPass = true;
    } else {
        securityPass = false;
    }

    if (securityPass && regex) {
        try {
            let accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
            let accessTokenPayload = {
                client_id: appId,
                client_secret: appSecret,
                code,
            };

            const accessTokenResponse = await request.post(accessTokenRequestUrl, { json: accessTokenPayload });
            let accessToken = accessTokenResponse.access_token;
            console.log('shop token ' + accessToken);

            const graphqlUrl = `https://${shop}/admin/api/2023-10/graphql.json`;

            const graphqlQuery = `
                mutation {
                    webPixelCreate(webPixel: { settings: { accountID: "234" } }) {
                    userErrors {
                        code
                        field
                        message
                    }
                    webPixel {
                        settings
                        id
                    }
                    }
                }
            `;
            const graphqlResponse = await request.post(graphqlUrl, {
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                    'Content-Type': 'application/json',
                },
                json: true,
                body: {
                    query: graphqlQuery,
                },
            });
            console.log('GraphQL Response:', graphqlResponse);

            res.redirect('/shopify/app?shop=' + shop);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error communicating with Shopify API.');
        }
    } else {
        res.redirect('/installerror');
    }
});



router.get('/app', function (req, res, next) {
    let shop = req.query.shop;
    res.json({ shop: shop });
});


module.exports = router;