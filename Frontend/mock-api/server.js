const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

const db = router.db;

// Helpers
function addHistory(solicitacaoId, statusAnterior, funcionarioDestino, statusAtual, autor, observacao, motivoRejeicao) {
  const id = Date.now() + Math.floor(Math.random() * 1000);
  db.get("historicos")
    .push({
      id,
      solicitacaoId,
      statusAnterior,
      statusAtual,
      funcionarioDestino,
      autor,
      dataHora: new Date().toISOString(),
      observacao: observacao || null,
      motivoRejeicao: motivoRejeicao || null
    })
    .write();
}

// AUTH
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  const user = db.get("usuarios").find({ email, password }).value();
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });
  res.json({ token: "fake-token-" + user.id, usuario: user });
});

server.post("/auth/logout", (req, res) => {
  res.json({ message: "Logout OK" });
});

server.get("/auth/me", (req, res) => {
  const auth = req.headers["authorization"] || "";
  if (!auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token ausente" });
  }

  const token = auth.replace("Bearer ", "");
  const match = token.match(/^fake-token-(\d+)$/);

  if (!match) {
    return res.status(401).json({ message: "Token inválido" });
  }

  const userId = parseInt(match[1], 10);
  const user = db.get("usuarios").find({ id: userId }).value();

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  res.json(user);
});

// Solicitacoes
server.post("/solicitacoes", (req, res) => {
  const solicitacao = {
    id: Date.now(),
    ...req.body
  };

  db.get("solicitacoes").push(solicitacao).write();
  res.json(solicitacao);

  addHistory(solicitacao.id, null, null, solicitacao.status, solicitacao.clienteId, null, null);
});

// Histórico
server.get("/solicitacoes/:id/historico", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const historicos = db.get("historicos").filter({ solicitacaoId: id }).value();
  res.json(historicos);
});

// Orçamento
server.get("/solicitacoes/:id/orcamento", (req, res) => { 
  const id = parseInt(req.params.id, 10); 
  const orcamento = db.get("orcamentos").find({ solicitacaoId: id }).value(); 
  res.json(orcamento); 
});

server.post("/solicitacoes/:id/orcamento", (req, res) => {
  const solicitacaoId = parseInt(req.params.id, 10);
  const solicitacao = db.get("solicitacoes").find({ id: solicitacaoId }).value();
  if (!solicitacao) return res.status(404).json({ message: "Solicitação não encontrada" });

  const orcamento = {
    id: Date.now(),
    solicitacaoId,
    funcionarioId: req.body.funcionarioId,
    valor: req.body.valor,
    observacao: req.body.observacao || null,
    dataHora: new Date().toISOString()
  };

  db.get("orcamentos").remove({ solicitacaoId }).write();
  db.get("orcamentos").push(orcamento).write();

  const statusAnterior = solicitacao.status;
  const statusAtual = "ORÇADA";

  db.get("solicitacoes").find({ id: solicitacaoId }).assign({ status: statusAtual }).write();
  addHistory(solicitacaoId, statusAnterior, null, statusAtual, req.body.funcionarioId, req.body.observacao, null);

  res.json(orcamento);
});



// Aprovar orçamento
server.post("/solicitacoes/:id/aprovar", (req, res) => {
  const solicitacaoId = parseInt(req.params.id, 10);
  const solicitacao = db.get("solicitacoes").find({ id: solicitacaoId }).value();
  if (!solicitacao) return res.status(404).json({ message: "Solicitação não encontrada" });

  const statusAnterior = solicitacao.status;
  const statusAtual = "APROVADA";

  db.get("solicitacoes").find({ id: solicitacaoId }).assign({ status: statusAtual }).write();
  addHistory(solicitacaoId, statusAnterior, null, statusAtual, req.body.clienteId, null, null);

  res.json(db.get("solicitacoes").find({ id: solicitacaoId }).value());
});

// Rejeitar orçamento
server.post("/solicitacoes/:id/rejeitar", (req, res) => {
  const solicitacaoId = parseInt(req.params.id, 10);
  const solicitacao = db.get("solicitacoes").find({ id: solicitacaoId }).value();
  if (!solicitacao) return res.status(404).json({ message: "Solicitação não encontrada" });

  const statusAnterior = solicitacao.status;
  const statusAtual = "REJEITADA";

  db.get("solicitacoes").find({ id: solicitacaoId }).assign({ status: statusAtual }).write();
  addHistory(solicitacaoId, statusAnterior, null, statusAtual, req.body.clienteId, null, req.body.motivo);

  res.json(db.get("solicitacoes").find({ id: solicitacaoId }).value());
});

// Pagamento
server.post("/solicitacoes/:id/pagar", (req, res) => {
  const solicitacaoId = parseInt(req.params.id, 10);
  const solicitacao = db.get("solicitacoes").find({ id: solicitacaoId }).value();
  if (!solicitacao) return res.status(404).json({ message: "Solicitação não encontrada" });

  const pagamento = {
    id: Date.now(),
    solicitacaoId,
    valorPago: req.body.valorPago,
    dataHoraPagamento: new Date().toISOString()
  };

  db.get("pagamentos").remove({ solicitacaoId }).write(); // garante 1:1
  db.get("pagamentos").push(pagamento).write();

  const statusAnterior = solicitacao.status;
  const statusAtual = "PAGA";

  db.get("solicitacoes").find({ id: solicitacaoId }).assign({ status: statusAtual }).write();
  addHistory(solicitacaoId, statusAnterior, null, statusAtual, req.body.clienteId);

  res.json(pagamento);
});

// Manutenção
server.post("/solicitacoes/:id/manutencao", (req, res) => {
  const solicitacaoId = parseInt(req.params.id, 10);
  const solicitacao = db.get("solicitacoes").find({ id: solicitacaoId }).value();
  if (!solicitacao) return res.status(404).json({ message: "Solicitação não encontrada" });

  const statusAnterior = solicitacao.status;
  const statusAtual = "ARRUMADA";

  db.get("solicitacoes").find({ id: solicitacaoId }).assign({ status: statusAtual }).write();
  addHistory(solicitacaoId, statusAnterior, null, statusAtual, req.body.funcionarioId, req.body.observacao);

  res.json(db.get("solicitacoes").find({ id: solicitacaoId }).value());
});

// Resgatar
server.post("/solicitacoes/:id/resgatar", (req, res) => {
  const solicitacaoId = parseInt(req.params.id, 10);
  const solicitacao = db.get("solicitacoes").find({ id: solicitacaoId }).value();
  if (!solicitacao) return res.status(404).json({ message: "Solicitação não encontrada" });

  const statusAnterior = solicitacao.status;
  const statusAtual = "ABERTA";

  db.get("solicitacoes").find({ id: solicitacaoId }).assign({ status: statusAtual }).write();
  addHistory(solicitacaoId, statusAnterior, null, statusAtual, req.body.funcionarioId);

  res.json(db.get("solicitacoes").find({ id: solicitacaoId }).value());
});

// Finalizar
server.post("/solicitacoes/:id/finalizar", (req, res) => {
  const solicitacaoId = parseInt(req.params.id, 10);
  const solicitacao = db.get("solicitacoes").find({ id: solicitacaoId }).value();
  if (!solicitacao) return res.status(404).json({ message: "Solicitação não encontrada" });

  const statusAnterior = solicitacao.status;
  const statusAtual = "FINALIZADA";

  db.get("solicitacoes").find({ id: solicitacaoId }).assign({ status: statusAtual }).write();
  addHistory(solicitacaoId, statusAnterior, null, statusAtual, req.body.funcionarioId);

  res.json(db.get("solicitacoes").find({ id: solicitacaoId }).value());
});

// Funcionários
server.get("/funcionarios", (req, res) => {
  const funcionarios = db.get("funcionarios").filter({ ativo: true }).value();
  res.json(funcionarios);
});

server.post("/funcionarios", (req, res) => {
  const funcionario = {
    id: Date.now(),
    ...req.body,
    ativo: true
  };
  db.get("funcionarios").push(funcionario).write();
  res.json(funcionario);
});

server.get("/funcionarios/:id", (req, res) => {
  const funcionario = db.get("funcionarios").find({ id: parseInt(req.params.id, 10) }).value();
  if (!funcionario) return res.status(404).json({ message: "Funcionário não encontrado" });
  res.json(funcionario);
});

server.put("/funcionarios/:id", (req, res) => {
  const funcionario = db.get("funcionarios").find({ id: parseInt(req.params.id, 10) }).assign(req.body).write();
  res.json(funcionario);
});

server.delete("/funcionarios/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.get("funcionarios").find({ id }).assign({ ativo: false }).write();
  res.json({ message: "Funcionário desativado (soft delete)" });
});

// Categorias
server.get("/categorias", (req, res) => {
  const categorias = db.get("categorias").filter({ ativo: true }).value();
  res.json(categorias);
});

server.post("/categorias", (req, res) => {
  const categoria = {
    id: Date.now(),
    ...req.body,
    ativo: true
  };
  db.get("categorias").push(categoria).write();
  res.json(categoria);
});

server.put("/categorias/:id", (req, res) => {
  const categoria = db.get("categorias").find({ id: parseInt(req.params.id, 10) }).assign(req.body).write();
  res.json(categoria);
});

server.delete("/categorias/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.get("categorias").find({ id }).assign({ ativo: false }).write();
  res.json({ message: "Categoria desativada (soft delete)" });
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Mock API rodando em http://localhost:${PORT}`);
});
