const express = require('express');
const router = express.Router();
const {
  criarPedido,
  listarPedidos,
  atualizarStatusPedido,
} = require('../controllers/orderController');

router.post('/orders', criarPedido);
router.get('/orders', listarPedidos);
router.put('/orders/:id', atualizarStatusPedido);

module.exports = router;
