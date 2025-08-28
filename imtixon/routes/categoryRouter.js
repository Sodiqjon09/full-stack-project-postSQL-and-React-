const express = require("express");
const router = express.Router();
const categoeyController = require("../controller/categoeyController");
/**
 * @swagger
 * tags:
 *   name: category
 *   description: category category
 */

/**
 * @swagger
 * /api/category:
 *   post:
 *     tags: [category]
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: category created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/category", categoeyController.createCategoryType);

/**
 * @swagger
 * /api/category:
 *   get:
 *     tags: [category]
 *     summary: Get all category
 *     responses:
 *       200:
 *         description: List of category
 *       500:
 *         description: Server error
 */

router.get("/category", categoeyController.getCategoryType);
/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     tags: [category]
 *     summary: Update user by category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: category ID
 *     responses:
 *       200:
 *         description: category updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: category not found
 *       500:
 *         description: Server error
 */

router.get("/category/:id", categoeyController.getCategoryTypeById);

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     tags: [category]
 *     summary: Update category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: category updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: category not found
 *       500:
 *         description: Server error
 */
router.put("/category/:id", categoeyController.updateCategoryType);
/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     tags: [category]
 *     summary: Delete category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: category ID
 *     responses:
 *       204:
 *         description: category deleted
 *       404:
 *         description: category not found
 *       500:
 *         description: Server error
 */

router.delete("/category/:id", categoeyController.deleteCategoryType);
module.exports = router;
