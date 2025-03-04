const express = require("express");
const router = express.Router();
const regionController = require("../controller/regionController");

/**
 * @swagger
 * tags:
 *   name: region
 *   description: region management
 */

/**
 * @swagger
 * /api/region:
 *   post:
 *     tags: [region]
 *     summary: Create a new region
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/region", regionController.createRegion);
/**
 * @swagger
 * /api/region:
 *   get:
 *     tags: [region]
 *     summary: Get all region
 *     responses:
 *       200:
 *         description: List of region
 *       500:
 *         description: Server error
 */
router.get("/region", regionController.getRegion);

/**
 * @swagger
 * /api/region/{id}:
 *   get:
 *     tags: [region]
 *     summary: Update user by venue_type
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: region ID
 *     responses:
 *       200:
 *         description: region updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: region not found
 *       500:
 *         description: Server error
 */

router.get("/region/:id", regionController.getRegionById);

/**
 * @swagger
 * /api/region/{id}:
 *   put:
 *     tags: [region]
 *     summary: Update region by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: region ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: region updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: region not found
 *       500:
 *         description: Server error
 */
router.put("/region/:id", regionController.updateRegion);

/**
 * @swagger
 * /api/region/{id}:
 *   delete:
 *     tags: [region]
 *     summary: Delete region by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: region ID
 *     responses:
 *       204:
 *         description: region deleted
 *       404:
 *         description: region not found
 *       500:
 *         description: Server error
 */

router.delete("/region/:id", regionController.deleteRegion);

module.exports = router;
