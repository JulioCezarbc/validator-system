import express from 'express';
import { ValidatorController } from './controllers/ValidatorController';
import cors from 'cors';

const app = express();
app.use(express.json()); // Essencial para o Express entender o corpo da requisição (body)
app.use(cors()); 

const validatorController = new ValidatorController();

// Definindo as Rotas
// Quando o usuário fizer um POST para /validate/mod10, o controller será chamado
app.post('/validate/mod10', (req, res) => validatorController.validatorMod10(req, res));

app.post('/validate/cnpj', (req, res) => validatorController.validatorCNPJ(req, res));

app.post('/validate/luhn', (req, res) => validatorController.validatorLuhn(req, res));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`
  🚀 Server started on http://localhost:${PORT}
  ✅ POST http://localhost:3000/validate/mod10
  `);
});