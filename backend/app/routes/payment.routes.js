import express from 'express';
import ShoppingCart from '../models/cart.models.js';
import Order from '../models/orders.model.js';
import Inventory from '../models/inventory.model.js';
import dotenv from 'dotenv';

dotenv.config();

const paymentRouter = express.Router();

// GET

// Obtaining the payment success page (base path /api/payment/success)
paymentRouter.get('/success', async (req, res) => {
	try {
		const { totalPrice, cartID, shippingAddress } = req.query; // Utilizamos req.query en lugar de req.body para obtener los parámetros enviados desde la pasarela de pago
		const url = process.env.NODE_ENV === 'production' ? process.env.PROD_FRONTEND_URL : process.env.DEV_FRONTEND_URL;

		// Obtaining the active carts of the user
		const activeCarts = await ShoppingCart.findAll({
			where: {
				cartID: cartID,
				cartStatus: 'active',
			},
		});

		if (activeCarts.length === 0) {
			return res.status(404).json({ message: 'Empty cart' });
		}

		// Obtaining the inventory of the products of the active carts
		const inventory = await Promise.all(
			activeCarts.map(async (cart) => {
				const inventory = await Inventory.findOne({
					where: { productID: cart.productID },
				});
				return inventory;
			})
		);

		// Verifying if there is enough inventory for the products of the active carts
		for (let i = 0; i < inventory.length; i++) {
			if (inventory[i].quantity < activeCarts[i].quantity) {
				return res.status(400).json({
					message: `Not enough inventory for product ${inventory[i].productID}`,
				});
			}
		}

		// Creating the order
		await Order.create({
			cartID,
			totalPrice,
			shippingAddress,
		});

		// Updating the inventory
		for (let i = 0; i < inventory.length; i++) {
			await Inventory.update(
				{ quantity: inventory[i].quantity - activeCarts[i].quantity },
				{
					where: { productID: activeCarts[i].productID },
				}
			);
		}

		// Updating the cart status
		await ShoppingCart.update(
			{ cartStatus: 'inactive' },
			{
				where: { cartID, cartStatus: 'active' },
			}
		);

		return res.redirect(`${url}/paymentStatus/${cartID}`);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error creating the order' });
	}
});

// Obtaining the payment cancel page (base path /api/payment/cancel)
paymentRouter.get('/cancel', (req, res) => {
	res.status(200).json({ message: 'Payment cancelled' });
});

export default paymentRouter;
