const express = require("express");
const router = express.Router();
const basketController = require("../controller/basketController");

/**
 * @swagger
 * tags:
 *   name: basket
 *   description: basket management
 */

/**
 * @swagger
 * /api/basket:
 *   post:
 *     tags: [basket]
 *     summary: Create a new basket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               basket_id:
 *                 type: number
 *     responses:
 *       201:
 *         description: number created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/basket", basketController.creatBasketype);

/**
 * @swagger
 * /api/basket:
 *   get:
 *     tags: [basket]
 *     summary: Get all basket
 *     responses:
 *       200:
 *         description: List of basket
 *       500:
 *         description: Server error
 */

router.get("/basket", basketController.getBasketType);
/**
 * @swagger
 * /api/basket/{id}:
 *   get:
 *     tags: [basket]
 *     summary: Update user by basket
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: basket ID
 *     responses:
 *       200:
 *         description: basket updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: basket not found
 *       500:
 *         description: Server error
 */

router.get("/basket/:id", basketController.getBasketTypeById);

/**
 * @swagger
 * /api/basket/{id}:
 *   put:
 *     tags: [basket]
 *     summary: Update basket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: datas ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               basket_id:
 *                 type: number
 *     responses:
 *       200:
 *         description: datas updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: datas not found
 *       500:
 *         description: Server error
 */
router.put("/basket/:id", basketController.updateBasketType);
/**
 * @swagger
 * /api/basket/{id}:
 *   delete:
 *     tags: [basket]
 *     summary: Delete basket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: basket ID
 *     responses:
 *       204:
 *         description: basket deleted
 *       404:
 *         description: basket not found
 *       500:
 *         description: Server error
 */

router.delete("/basket/:id", basketController.deleteBasketType);
module.exports = router;
