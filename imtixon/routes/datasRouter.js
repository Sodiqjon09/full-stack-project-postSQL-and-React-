const express = require("express");
const router = express.Router();
const datasController = require("../controller/datasController");
/**
 * @swagger
 * tags:
 *   name: datas
 *   description: datas management
 */

/**
 * @swagger
 * /api/datas:
 *   post:
 *     tags: [datas]
 *     summary: Create a new datas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *               like:
 *                 type: boolean
 *               title:
 *                 type: string
 *               starText:
 *                 type: string
 *               credit:
 *                 type: string
 *               fakePrice:
 *                 type: string
 *               price:
 *                 type: string
 *               category:
 *                 type: number
 *     responses:
 *       201:
 *         description: datas created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/datas", datasController.createDataType);

/**
 * @swagger
 * /api/datas:
 *   get:
 *     tags: [datas]
 *     summary: Get all datas
 *     responses:
 *       200:
 *         description: List of datas
 *       500:
 *         description: Server error
 */

router.get("/datas", datasController.getDataType);
/**
 * @swagger
 * /api/datas/{id}:
 *   get:
 *     tags: [datas]
 *     summary: Update user by datas
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: datas ID
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

router.get("/datas/:id", datasController.getDataTypeById);

/**
 * @swagger
 * /api/datas/{id}:
 *   put:
 *     tags: [datas]
 *     summary: Update datas by ID
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
 *               image:
 *                 type: string
 *               like:
 *                 type: boolean
 *               title:
 *                 type: string
 *               starText:
 *                 type: string
 *               credit:
 *                 type: string
 *               fakePrice:
 *                 type: string
 *               price:
 *                 type: string
 *               category:
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
router.put("/datas/:id", datasController.updateDataType);
/**
 * @swagger
 * /api/datas/{id}:
 *   delete:
 *     tags: [datas]
 *     summary: Delete datas by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: datas ID
 *     responses:
 *       204:
 *         description: datas deleted
 *       404:
 *         description: datas not found
 *       500:
 *         description: Server error
 */

router.delete("/datas/:id", datasController.deleteDataType);
module.exports = router;
