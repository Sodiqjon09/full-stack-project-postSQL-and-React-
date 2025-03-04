const express = require("express");
const router = express.Router();
const districkController = require("../controller/districkController");

/**
 * @swagger
 * tags:
 *   name: district
 *   description: district management
 */

/**
 * @swagger
 * /api/district:
 *   post:
 *     tags: [district]
 *     summary: Create a new district
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               regionId:
 *                 type: number
 *     responses:
 *       201:
 *         description: district created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/district", districkController.createdistristType);

/**
 * @swagger
 * /api/district:
 *   get:
 *     tags: [district]
 *     summary: Get all district
 *     responses:
 *       200:
 *         description: List of district
 *       500:
 *         description: Server error
 */

router.get("/district", districkController.getdistristType);

/**
 * @swagger
 * /api/district/{id}:
 *   get:
 *     tags: [district]
 *     summary: Update user by district
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: district ID
 *     responses:
 *       200:
 *         description: district updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: district not found
 *       500:
 *         description: Server error
 */

router.get("/district/:id", districkController.getdistristTypeById);

/**
 * @swagger
 * /api/district/{id}:
 *   put:
 *     tags: [district]
 *     summary: Update district by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: district ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               regionId:
 *                 type: number
 *     responses:
 *       200:
 *         description: district updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: district not found
 *       500:
 *         description: Server error
 */
router.put("/district/:id", districkController.updatedistristType);
/**
 * @swagger
 * /api/district/{id}:
 *   delete:
 *     tags: [district]
 *     summary: Delete district by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: district ID
 *     responses:
 *       204:
 *         description: district deleted
 *       404:
 *         description: district not found
 *       500:
 *         description: Server error
 */

router.delete("/district/:id", districkController.deletedistristType);
module.exports = router;
