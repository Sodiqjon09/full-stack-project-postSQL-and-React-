const express = require("express");
const router = express.Router();
const likedController = require("../controller/likedController");
/**
 * @swagger
 * tags:
 *   name: liked
 *   description: liked management
 */

/**
 * @swagger
 * /api/liked:
 *   post:
 *     tags: [liked]
 *     summary: Create a new liked
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_id:
 *                 type: number
 *     responses:
 *       201:
 *         description: number created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/liked", likedController.createLikedType);

/**
 * @swagger
 * /api/liked:
 *   get:
 *     tags: [liked]
 *     summary: Get all liked
 *     responses:
 *       200:
 *         description: List of liked
 *       500:
 *         description: Server error
 */

router.get("/liked", likedController.getLikedType);
/**
 * @swagger
 * /api/liked/{id}:
 *   get:
 *     tags: [liked]
 *     summary: Update user by liked
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: liked ID
 *     responses:
 *       200:
 *         description: liked updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: liked not found
 *       500:
 *         description: Server error
 */

router.get("/liked/:id", likedController.getLikedTypeById);

/**
 * @swagger
 * /api/liked/{id}:
 *   put:
 *     tags: [liked]
 *     summary: Update liked by ID
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
 *               data_id:
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
router.put("/liked/:id", likedController.updateLikedType);
/**
 * @swagger
 * /api/liked/{id}:
 *   delete:
 *     tags: [liked]
 *     summary: Delete liked by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: liked ID
 *     responses:
 *       204:
 *         description: liked deleted
 *       404:
 *         description: liked not found
 *       500:
 *         description: Server error
 */

router.delete("/liked/:id", likedController.deleteLikedType);
module.exports = router;
