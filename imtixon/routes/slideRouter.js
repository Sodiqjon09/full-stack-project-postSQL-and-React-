const express = require("express");
const router = express.Router();
const SlideController = require("../controller/SlideController");
/**
 * @swagger
 * tags:
 *   name: slide
 *   description: slide management
 */

/**
 * @swagger
 * /api/slide:
 *   post:
 *     tags: [slide]
 *     summary: Create a new slide
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: slide created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/slide", SlideController.createSlideType);

/**
 * @swagger
 * /api/slide:
 *   get:
 *     tags: [slide]
 *     summary: Get all slide
 *     responses:
 *       200:
 *         description: List of slide
 *       500:
 *         description: Server error
 */

router.get("/slide", SlideController.getSlideType);

/**
 * @swagger
 * /api/slide/{id}:
 *   get:
 *     tags: [slide]
 *     summary: Update user by slide
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: slide ID
 *     responses:
 *       200:
 *         description: slide updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: slide not found
 *       500:
 *         description: Server error
 */

router.get("/slide/:id", SlideController.getSlideTypeById);

/**
 * @swagger
 * /api/slide/{id}:
 *   put:
 *     tags: [slide]
 *     summary: Update slide by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: slide ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: slide updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: slide not found
 *       500:
 *         description: Server error
 */
router.put("/slide/:id", SlideController.updateSlideType);
/**
 * @swagger
 * /api/slide/{id}:
 *   delete:
 *     tags: [slide]
 *     summary: Delete slide by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: slide ID
 *     responses:
 *       204:
 *         description: slide deleted
 *       404:
 *         description: slide not found
 *       500:
 *         description: Server error
 */

router.delete("/slide/:id", SlideController.deleteDataType);
module.exports = router;
