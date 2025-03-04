const express = require("express");
const router = express.Router();
const venueTypeController = require("../controller/venueTypeController");

/**
 * @swagger
 * tags:
 *   name: venue_type
 *   description: venue_type management
 */

/**
 * @swagger
 * /api/venuetype:
 *   post:
 *     tags: [venue_type]
 *     summary: Create a new venue_type
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
router.post("/venuetype", venueTypeController.createVenueType);

/**
 * @swagger
 * /api/venuetype:
 *   get:
 *     tags: [venue_type]
 *     summary: Get all venue_type
 *     responses:
 *       200:
 *         description: List of venue_type
 *       500:
 *         description: Server error
 */

router.get("/venuetype", venueTypeController.getVenueType);

/**
 * @swagger
 * /api/venuetype/{id}:
 *   get:
 *     tags: [venue_type]
 *     summary: Update user by venue_type
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: venue_type ID
 *     responses:
 *       200:
 *         description: venue_type updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: venue_type not found
 *       500:
 *         description: Server error
 */
router.get("/venuetype/:id", venueTypeController.getVenueTypeById);

/**
 * @swagger
 * /api/venuetype/{id}:
 *   put:
 *     tags: [venue_type]
 *     summary: Update venue_type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: venue_type ID
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
 *         description: venue_type updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: venue_type not found
 *       500:
 *         description: Server error
 */
router.put("/venuetype/:id", venueTypeController.updateVenueType);

/**
 * @swagger
 * /api/venuetype/{id}:
 *   delete:
 *     tags: [venue_type]
 *     summary: Delete venue_type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: venue_type ID
 *     responses:
 *       204:
 *         description: venue_type deleted
 *       404:
 *         description: venue_type not found
 *       500:
 *         description: Server error
 */

router.delete("/venuetype/:id", venueTypeController.deleteVenueType)

module.exports = router;
