import express from "express";
import authentication from "../../middlewares/authentication.middleware";
import configData from "../../../config";
const router = express.Router();
const stripe = require("stripe")(configData.STRIP_SECRET_KEY);

router.post("/intents", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true
            }
        })

        res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })

    }
});
// router.post("/buy-ticket", authentication, buyTicket);
// router.get("/", getUsers);

export default router;