
/*
    BROTAS CLIMA
    Painel de monitoramento ambiental
*/

// Dados de demonstração.
// Depois vamos substituir por dados reais do ESP32 e da API.
const dadosLocais = {
    calcadao: {
        temperatura: 36.5,
        umidade: 45
    },
    marginal: {
        temperatura: 30.2,
        umidade: 62
    }
};


const LIMITE_ATENCAO = 30;
const LIMITE_ALERTA = 35;


// Mostra os dados de um local na tela.
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

    if (dados.temperatura === null || dados.umidade === null) {
        temperatura.textContent = "-- °C";
        umidade.textContent = "-- %";
        status.textContent = "Aguardando dados reais ou simulados.";
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

// Compara as temperaturas quando existem dados dos dois locais.
function compararLocais() {
    const resultado = document.getElementById("resultado-comparacao");

    const calcadao = dadosLocais.calcadao.temperatura;
    const marginal = dadosLocais.marginal.temperatura;

    if (calcadao === null || marginal === null) {
        resultado.textContent =
            "A comparação será exibida quando os dois locais tiverem dados.";
        return;
    }

    
const diferenca = Math.abs(calcadao - marginal).toFixed(1);

if (calcadao > marginal) {
    resultado.textContent =
        `☀️ O Calçadão está ${diferenca} °C mais quente que a Marginal. Essa diferença pode indicar a necessidade de investigar as condições ambientais dos dois locais.`;
} else if (marginal > calcadao) {
    resultado.textContent =
        `🌡️ A Marginal está ${diferenca} °C mais quente que o Calçadão. Vale investigar as condições ambientais dos dois locais.`;
} else {
    resultado.textContent =
        "🌿 Os dois locais apresentam a mesma temperatura registrada.";
}

}

// Atualiza a informação de horário do painel.
function atualizarHorario() {
    const elemento = document.getElementById("atualizacao");

    elemento.textContent =
        "Painel iniciado. Aguardando conexão com os dados.";
}

// Inicializa a página.
function iniciarPainel() {
    atualizarLocal("calcadao", dadosLocais.calcadao);
    atualizarLocal("marginal", dadosLocais.marginal);
    compararLocais();
    atualizarHorario();
}

iniciarPainel();

async function buscarClimaAPI() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-22.28&longitude=-48.13&current=temperature_2m,relative_humidity_2m&timezone=America%2FSao_Paulo";

    const atualizacao = document.getElementById("atualizacao");

    try {
        atualizacao.textContent = "Buscando dados da API...";

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar a API.");
        }

        const dados = await resposta.json();

        const temperatura = dados.current.temperature_2m;
        const umidade = dados.current.relative_humidity_2m;

        atualizacao.textContent =
            `Clima regional de Brotas atualizado: ${temperatura} °C e ${umidade}% de umidade.`;

        console.log("Dados recebidos da Open-Meteo:", dados);

    } catch (erro) {
        atualizacao.textContent =
            "Não foi possível carregar os dados da API. Verifique sua conexão.";

        console.error("Erro ao consultar a API:", erro);
    }
}

buscarClimaAPI();
// Atualiza os dados da API a cada 5 minutos.
setInterval(buscarClimaAPI, 5 * 60 * 1000);

