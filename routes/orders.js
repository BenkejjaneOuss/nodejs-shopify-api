const express = require('express')

const router = express.Router()

var axios = require('axios');

router.get('/add', async (req, res) => {
	try {

        let res = await axios({
          method: 'POST',
          url: 'https://api.route.com/v1/orders',
          headers: {
              'Content-Type': 'application/json',
              'token': 'test-50868c98-0d33-4db0-afd2-c0ad65afc493'
          },
          body: {
            "source_order_id": "123456",
            "subtotal": 12.34,
            "taxes": 0.9,
            "currency": "string",
            "insurance_selected": true,
            "customer_details": {
              "first_name": "John",
              "last_name": "Doe",
              "email": "john@doe.com"
            },
            "shipping_details": {
              "first_name": "John",
              "last_name": "Doe",
              "street_address1": "123 Elm St.",
              "street_address2": "Suite #110",
              "city": "Seattle",
              "province": "Washington",
              "zip": "55555",
              "country_code": "US"
            },
            "line_items": [
              {
                "source_product_id": 1234567,
                "sku": "12345",
                "name": "Mauve Linen Tote Bag",
                "price": 12.34,
                "quantity": 1,
                "upc": "1234",
                "image_url": "https://exampleimageurl.com"
              },
              {
                "source_product_id": 2345678,
                "sku": "23456",
                "name": "Beige Clutch Bag",
                "price": 23.45,
                "quantity": 1,
                "upc": "1234",
                "image_url": "https://exampleimageurl.com"
              }
            ],
            "source_created_on": "2012-03-13T16:09:55-04:00",
            "source_updated_on": "2012-03-13T16:09:55-04:00"
          }
        })
        let data = res.data;
  console.log(data);
	} catch (err) {
		next(err);
	}
})


module.exports = router;