const express = require('express');
const router = express.Router();

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
 *         id: 1
 *         nombre: penedol
 *         marca: pa tu estres
 *         precio: 56
 *         categoria: jaja
 *         stock: 56
 *         sub_categoria: vamo hacer
 *         img: par de weas
 */

router.get('/productos', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks)
});

//GET ALL

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


router.get('/:id', async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
});

router.post('/create', async (req, res) => {


    const { nombre, precio, marca, stock, imagen, categoria, subcategoria } = req.body;
    const task = new Task({ nombre , precio, marca, stock, imagen, categoria, subcategoria });
    await task.save();
    res.json(' status task saved');
});

router.put('/:id', async (req, res) =>{
    const { nombre, precio, marca, stock, imagen, categoria, subcategoria } = req.body;
    const newTask = { nombre , precio, marca, stock, imagen, categoria, subcategoria };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json('status task update')
});

router.delete('/:id', async (req, res) =>{
    await Task.findByIdAndRemove(req.params.id);
    res.json('task removed')
});
module.exports = router;