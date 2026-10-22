
/*
    BROTAS CLIMA
    Painel de monitoramento ambiental
*/

const URL_SERVIDOR = "https://brotasclima.onrender.com/dados";

const LIMITE_ATENCAO = 30;
const LIMITE_ALERTA = 35;

// A Marginal continua com dados de demonstração.
// O Calçadão será atualizado com a leitura do ESP32.
const dadosLocais = {
    calcadao: {
        temperatura: null,
        umidade: null
    },
    marginal: {
        temperatura: 30.2,
        umidade: 62
    }
};

function atualizarLocal(nomeLocal, dados) {
    const temperatura = document.getElementById(
        `temperatura-${nomeLocal}`
    );

    const umidade = document.getElementById(
        `umidade-${nomeLocal}`
    );

    const status = document.getElementById(
        `status-${nomeLocal}`
    );

    if (!temperatura || !umidade || !status) return;

    if (dados.temperatura === null || dados.umidade === null) {
        temperatura.textContent = "-- °C";
        umidade.textContent = "-- %";
        status.textContent = "Aguardando leitura do sensor.";
        return;
    }

    temperatura.textContent = `${dados.temperatura.toFixed(1)} °C`;
    umidade.textContent = `${dados.umidade.toFixed(1)} %`;

    if (dados.temperatura >= LIMITE_ALERTA) {
        status.textContent = "🔴 ALERTA: temperatura elevada!";
    } else if (dados.temperatura >= LIMITE_ATENCAO) {
        status.textContent = "🟡 ATENÇÃO: temperatura em observação.";
    } else {
        status.textContent = "🟢 NORMAL: temperatura abaixo do limite de atenção.";
    }
}

function compararLocais() {
    const resultado = document.getElementById("resultado-comparacao");

    if (!resultado) return;

    const calcadao = dadosLocais.calcadao.temperatura;
    const marginal = dadosLocais.marginal.temperatura;

    if (calcadao === null || marginal === null) {
        resultado.textContent =
            "A comparação estará disponível quando houver dados dos dois locais.";
        return;
    }

    const diferenca = Math.abs(calcadao - marginal).toFixed(1);

    if (calcadao > marginal) {
        resultado.textContent =
            `☀️ A leitura do sensor do Calçadão está ${diferenca} °C acima do valor de demonstração da Marginal.`;
    } else if (marginal > calcadao) {
        resultado.textContent =
            `🌡️ O valor de demonstração da Marginal está ${diferenca} °C acima da leitura do sensor do Calçadão.`;
    } else {
        resultado.textContent =
            "As duas temperaturas exibidas estão iguais, mas a Marginal usa dados de demonstração.";
    }
}

async function buscarDadosSensor() {
    const atualizacao = document.getElementById("atualizacao");

    try {
        atualizacao.textContent = "Buscando leitura do sensor ESP32...";

        const resposta = await fetch(URL_SERVIDOR, {
            cache: "no-store"
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar o servidor.");
        }

        const dados = await resposta.json();

        if (
            typeof dados.temperatura !== "number" ||
            typeof dados.umidade !== "number"
        ) {
            throw new Error("O servidor ainda não possui uma leitura válida.");
        }

        dadosLocais.calcadao.temperatura = dados.temperatura;
        dadosLocais.calcadao.umidade = dados.umidade;

        atualizarLocal("calcadao", dadosLocais.calcadao);
        atualizarLocal("marginal", dadosLocais.marginal);
        compararLocais();

        const horario = dados.atualizadoEm
            ? new Date(dados.atualizadoEm).toLocaleString("pt-BR")
            : "horário indisponível";

        atualizacao.textContent =
            `Sensor ESP32 atualizado em ${horario}. A Marginal apresenta dados de demonstração.`;

    } catch (erro) {
        atualizacao.textContent =
            "Não foi possível carregar a leitura do ESP32. Verifique se o sensor está enviando dados.";

        console.error("Erro ao consultar o servidor:", erro);
    }
}

buscarDadosSensor();

// Consulta o servidor a cada 5 segundos.
setInterval(buscarDadosSensor, 5000);
