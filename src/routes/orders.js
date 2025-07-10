// src/routes/orders.js
import express from 'express';
import Order from '../models/Order.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Listar todos os pedidos (com autenticação)
router.get('/', authMiddleware, async (req, res) => {
  const pedidos = await Order.find().sort({ createdAt: -1 });
  res.json(pedidos);
});

// Atualizar status do pedido
router.patch('/:id/status', authMiddleware, async (req, res) => {
  const { status } = req.body;
  const pedido = await Order.findById(req.params.id);
  if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });

  pedido.status = status; // ex: 'aceito', 'em produção', 'enviado'
  await pedido.save();
  res.json(pedido);
});

export default router;
