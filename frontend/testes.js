
function classificarTemperatura(temperatura) {
    if (temperatura >= 35) {
        return "ALERTA";
    } else if (temperatura >= 30) {
        return "ATENCAO";
    } else {
        return "NORMAL";
    }
}

const testes = [
    { temperatura: 25, esperado: "NORMAL" },
    { temperatura: 29.9, esperado: "NORMAL" },
    { temperatura: 30, esperado: "ATENCAO" },
    { temperatura: 32, esperado: "ATENCAO" },
    { temperatura: 34.9, esperado: "ATENCAO" },
    { temperatura: 35, esperado: "ALERTA" },
    { temperatura: 36.5, esperado: "ALERTA" },
    { temperatura: 40, esperado: "ALERTA" }
];

let aprovados = 0;

console.log("=== TESTES DO BROTAS CLIMA ===");

testes.forEach((teste, indice) => {
    const resultado = classificarTemperatura(teste.temperatura);
    const passou = resultado === teste.esperado;

    if (passou) {
        aprovados++;
    }

    console.log(
        `Teste ${indice + 1}: ${passou ? "APROVADO" : "FALHOU"}`
    );
});

console.log(`${aprovados} de ${testes.length} testes aprovados.`);
