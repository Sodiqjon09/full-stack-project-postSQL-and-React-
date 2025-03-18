const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");

/**
 * @swagger
 * tags:
 *   name: login
 *   description: Login management
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [login]
 *     summary: Create a new login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/login", loginController.createLoginType);

/**
 * @swagger
 * /api/login:
 *   get:
 *     tags: [login]
 *     summary: Get all logins
 *     responses:
 *       200:
 *         description: List of logins
 *       500:
 *         description: Server error
 */
router.get("/login", loginController.getLoginType);

/**
 * @swagger
 * /api/login/{id}:
 *   get:
 *     tags: [login]
 *     summary: Get login by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Login ID
 *     responses:
 *       200:
 *         description: Login found
 *       404:
 *         description: Login not found
 *       500:
 *         description: Server error
 */
router.get("/login/:id", loginController.getLoginTypeById);

/**
 * @swagger
 * /api/login/{id}:
 *   put:
 *     tags: [login]
 *     summary: Update login by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Login ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Login not found
 *       500:
 *         description: Server error
 */
router.put("/login/:id", loginController.updateLoginType);

/**
 * @swagger
 * /api/login/{id}:
 *   delete:
 *     tags: [login]
 *     summary: Delete login by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Login ID
 *     responses:
 *       204:
 *         description: Login deleted
 *       404:
 *         description: Login not found
 *       500:
 *         description: Server error
 */
router.delete("/login/:id", loginController.deleteLoginType);

module.exports = router;
