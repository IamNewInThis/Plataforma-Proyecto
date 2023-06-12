const express = require('express');
const router = express.Router();
const verifyToken = require('./validate-token');

const Task = require('../models/task');

//GET

// create user
/**
 * @swagger
 * components:
 *   schemas:
 *     Productos:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: id del producto
 *         nombre:
 *           type: string
 *           description: nombre del producto
 *         marca:
 *           type: string
 *           description: marca del producto
 *         precio:
 *           type: number
 *           description: precio del producto
 *         categoria:
 *           type: string
 *           description: categoria del producto
 *         stock:
 *           type: number
 *           description: stock del producto
 *         sub_categoria:
 *           type: string
 *           description: Subcategoria del producto
 *         img:
 *           type: string
 *           description: imagen del producto
 *       required:
 *         - id
 *         - nombre
 *         - marca
 *         - precio
 *         - categoria
 *         - stock
 *         - sub_categoria
 *         - img
 *       example:
 *         id: 6461909e49ab54b7b8bxxxxx
 *         nombre: piano
 *         marca: roland
 *         precio: 350000
 *         categoria: pianos
 *         stock: 4
 *         sub_categoria: sub pianos
 *         img: base64
 */

router.get('/productos',verifyToken, async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks)
});



//ESTO ES SOLO UN EJEMPLO EN COMO ESTA ORGANIZADA LA QUERY

// 
/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: return all productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: all productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Productos'
 */ 

// 
/**
 * @swagger
 * /api/productos/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Productos'
 *     responses:
 *       200:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Productos'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Invalid request data
 */

/** Obtener toda la lista de productos */
/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: return all productos
 *     tags: [Productos]
 *     responses:
 *        200:
 *          description: all users
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Productos'
 */ 

/**BUSCAR PRODUCTO POR ID  */
/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Buscar producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a buscar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Productos'
 *       404:
 *         description: Producto no encontrado
 */ 

//* METODO ELIMINAR USUARIO/

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 */ 
//* ACTUALIZAR PRODUCTOS

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Productos'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 */ 


//middleware



router.get('/productos/:id', verifyToken, async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
});

router.post('/productos/create', verifyToken, async (req, res) => {
    const { nombre, precio, marca, stock, imagen, categoria, subcategoria } = req.body;
    const task = new Task({ nombre , precio, marca, stock, imagen, categoria, subcategoria });
    await task.save();
    res.json(' Producto creado correctamente');
});

router.put('/productos/:id', verifyToken, async (req, res) =>{
    const { nombre, precio, marca, stock, imagen, categoria, subcategoria } = req.body;
    const newTask = { nombre , precio, marca, stock, imagen, categoria, subcategoria };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json('Producto actualizado correctamente')
});

router.delete('/productos/:id',verifyToken, async (req, res) =>{
    await Task.findByIdAndRemove(req.params.id);
    res.json('Producto eliminado correctamente')
});



module.exports = router;