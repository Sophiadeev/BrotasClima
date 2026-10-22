
const http = require("http");

let ultimaLeitura = {
    temperatura: null,
    umidade: null,
    atualizadoEm: null
};

const servidor = http.createServer((req, res) => {
    const caminho = new URL(req.url, "http://localhost").pathname;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    if (req.method === "POST" && caminho === "/dados") {
        let corpo = "";

        req.on("data", parte => {
            corpo += parte;
        });

        req.on("end", () => {
            try {
                const dados = JSON.parse(corpo);
                const temperatura = Number(dados.temperatura);
                const umidade = Number(dados.umidade);

                if (
                    !Number.isFinite(temperatura) ||
                    !Number.isFinite(umidade) ||
                    umidade < 0 ||
                    umidade > 100
                ) {
                    res.writeHead(400);
                    return res.end("Dados invalidos");
                }

                ultimaLeitura = {
                    temperatura,
                    umidade,
                    atualizadoEm: new Date().toISOString()
                };

                console.log("Nova leitura recebida:", ultimaLeitura);

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({ mensagem: "Dados recebidos!" }));
            } catch {
                res.writeHead(400);
                res.end("JSON invalido");
            }
        });

        return;
    }

    if (req.method === "GET" && caminho === "/dados") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        return res.end(JSON.stringify(ultimaLeitura));
    }
console.log("Requisição recebida:", req.method, req.url);
    res.writeHead(404);
    res.end("Rota nao encontrada");
});

const PORTA = process.env.PORT || 3000;

servidor.listen(PORTA, "0.0.0.0", () => {
    console.log(`Brotas Clima rodando na porta ${PORTA}`);
});
