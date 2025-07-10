const Order = require('../models/Order');
const nodemailer = require('nodemailer');

const criarPedido = async (req, res) => {
  try {
    const novoPedido = new Order(req.body);
    await novoPedido.save();
    res.status(201).json({ mensagem: 'Pedido criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar pedido.' });
  }
};

const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Order.find().sort({ criadoEm: -1 });
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar pedidos.' });
  }
};

const atualizarStatusPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pedido = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });

    if (status === 'finalizado') {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: pedido.cliente.email,
        subject: 'Seu pedido está em rota',
        text: `Olá ${pedido.cliente.nome}, seu pedido foi enviado e está a caminho!`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error('Erro ao enviar e-mail:', error);
        else console.log('E-mail enviado:', info.response);
      });
    }

    res.json(pedido);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar status' });
  }
};

module.exports = {
  criarPedido,
  listarPedidos,
  atualizarStatusPedido
};
