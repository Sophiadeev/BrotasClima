# 🌳 Brotas Clima

## Sobre o projeto

O Brotas Clima é um projeto de IoT desenvolvido para a atividade final prática do SENAI São Paulo. O objetivo é monitorar as condições ambientais de espaços públicos de Brotas, SP, comparando a temperatura e a umidade de diferentes locais.

## Problema identificado

O projeto busca investigar se existem diferenças de temperatura entre o Calçadão do Centro, na Avenida Mário Pinotti, e a região da Marginal, na Avenida Lorival Jaubert da Silva Braga.

A hipótese inicial é que as características dos locais, como a presença de árvores, sombra e áreas pavimentadas, podem influenciar as condições ambientais. Essa hipótese ainda precisa ser verificada com medições.

## Tecnologias utilizadas

- HTML para estruturar a página.
- CSS para a aparência do painel.
- JavaScript para as regras de negócio e a consulta à API.
- Open-Meteo para consultar dados meteorológicos regionais.
- Visual Studio Code para desenvolver o projeto.
- Wokwi e ESP32 previstos para a simulação do componente IoT.

## Funcionalidades desenvolvidas

- Painel com cartões para os dois locais.
- Exibição de temperatura e umidade.
- Comparação das temperaturas.
- Alertas de temperatura normal, atenção e alerta.
- Consulta à API Open-Meteo.
- Atualização automática dos dados regionais a cada cinco minutos.
- Testes da regra de negócio.

## Regra de negócio

O sistema classifica a temperatura de acordo com os limites definidos para o protótipo:

- Abaixo de 30 °C: normal.
- De 30 °C até menos de 35 °C: atenção.
- A partir de 35 °C: alerta.

Esses limites são configurações educacionais do projeto e não representam uma classificação oficial de risco à saúde.

## Testes realizados

Foram realizados oito testes de classificação de temperatura em JavaScript. No teste executado no navegador, os oito testes foram aprovados.

## Situação atual

A interface está funcionando, a consulta à API foi testada e os testes da regra de negócio passaram.

A integração com o ESP32 e a simulação no Wokwi ainda dependem da parte desenvolvida pelo integrante responsável por essa etapa. Os valores exibidos nos cartões dos locais são simulados e não devem ser considerados medições reais.

## Melhorias futuras

- Integrar os dados do ESP32 ao painel.
- Registrar medições dos dois locais para comparação.
- Armazenar o histórico de temperatura e umidade.
- Criar gráficos para acompanhar as mudanças ao longo do tempo.
- Melhorar os testes e a validação dos dados recebidos.

## Projeto educacional

Desenvolvido para a atividade final prática do SENAI São Paulo.