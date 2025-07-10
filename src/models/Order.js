const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  cliente: {
    nome: String,
    email: String,
    cep: String,
    rua: String,
    numero: String,
    bairro: String,
    pagamento: String,
  },
  itens: [
    {
      id: String,
      nome: String,
      preco: Number,
      qtd: Number,
    }
  ],
  frete: Number,
  total: Number,
  status: {
  type: String,
  default: 'pendente',
  enum: ['pendente', 'produzindo', 'finalizado', 'cancelado']
}

,
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
