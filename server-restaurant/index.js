const dotenv = require("dotenv").config();
const Stripe = require("stripe");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;
const YOUR_DOMAIN = "https://restaurant-e-commerce-website-m2yp.vercel.app/"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
    try{
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [{ shipping_rate: "shr_1MJTX8SHnOGYGLnPO1haAXqp" }],
        
            line_items: req.body.map((item) => {
              return {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: item.title,
                    images: [item.imgURL],
                  },
                  unit_amount: item.price * 100,
                },
                adjustable_quantity: {
                  enabled: true,
                  minimum: 1,
                },
                quantity: item.qty,
              };
            }),
        
            //mode: "payment",
            success_url: `${YOUR_DOMAIN}success`,
            cancel_url: `${YOUR_DOMAIN}canceled`,
          };

          const session = await stripe.checkout.sessions.create(params);
          res.status(200).json(session.id)
        //   res.redirect(303, session.url);
    }catch(err){
        res.status(err.statusCode || 500).json(err.message);
    }
 
});

app.listen(PORT, () => console.log("Running on port " + PORT));
