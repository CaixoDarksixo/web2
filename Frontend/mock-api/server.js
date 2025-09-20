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
      funcionarioDestino: funcionarioDestino || null,
      statusAtual,
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

// Solicitações
server.get("/solicitacoes/:id/historico", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const historicos = db.get("historicos").filter({ solicitacaoId: id }).value();
  res.json(historicos);
});

server.get("/solicitacoes/:id/orcamento", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const orcamento = db.get("orcamentos").find({ solicitacaoId: id }).value();
  res.json(orcamento);
});

function transitionEndpoint(path, novoEstado, autorPrefix) {
  server.post(`/solicitacoes/:id/${path}`, (req, res) => {
    const id = parseInt(req.params.id, 10);
    const solicitacao = db.get("solicitacoes").find({ id }).value();
    if (!solicitacao) return res.status(404).json({ message: "Não encontrada" });

    const estadoAnterior = solicitacao.status;
    db.get("solicitacoes").find({ id }).assign({ status: novoEstado }).write();

    addHistory(id, estadoAnterior, novoEstado, autorPrefix || "SISTEMA", req.body?.observacao);

    const updated = db.get("solicitacoes").find({ id }).value();
    res.json(updated);
  });
}

// ATALHOS DO ENDPOINT
transitionEndpoint("orcamento", "ORÇADA", "FUNCIONARIO");
transitionEndpoint("aprovar", "APROVADA", "CLIENTE");
transitionEndpoint("rejeitar", "REJEITADA", "CLIENTE");
transitionEndpoint("redirecionar", "REDIRECIONADA", "FUNCIONARIO");
transitionEndpoint("resgatar", "ABERTA", "CLIENTE");
transitionEndpoint("manutencao", "ARRUMADA", "FUNCIONARIO");
transitionEndpoint("finalizar", "FINALIZADA", "FUNCIONARIO");
transitionEndpoint("pagar", "PAGA", "CLIENTE");

// FALLBACK
server.use(router);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Mock API rodando em http://localhost:${PORT}`);
});