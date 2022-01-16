const express = require('express');
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true,limit: '500mb', parameterLimit: 500000 }));

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

mercadopago.configure({
  access_token: 'TEST-7433144170707596-011519-e72a6f063e35f2c700e5794ef04dcf20-51750053'
});


//routes
app.post('/checkout', (req, res) => {
  // Crea un objeto de preferencia
  
  let preference = {
      items: [
        {
          title:req.body.title,
          unit_price: parseInt(req.body.price),
          quantity: 1,
        }
      ]
    };
    console.log(preference)
    
    mercadopago.preferences.create(preference)
      .then(function(response){
        res.redirect(response.body.init_point);
    }).catch(function(error){
      console.log(error);
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))