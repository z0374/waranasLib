Waranas Library

«Uma biblioteca de componentes PHP para construção de interfaces HTML, CSS e JavaScript, focada em reutilização, modularidade, simplicidade e desempenho.»

---

Sobre

A Waranas Library é uma biblioteca desenvolvida para facilitar a criação de aplicações PHP através da componentização de interfaces.

Ela não é um framework MVC e não pretende controlar a arquitetura da aplicação. Seu objetivo é fornecer uma base sólida de componentes reutilizáveis e utilitários que possam ser compartilhados entre diversos projetos.

Cada componente possui uma responsabilidade bem definida e pode ser utilizado de forma independente ou combinado com outros componentes da biblioteca.

---

Filosofia

A biblioteca foi construída sobre quatro princípios fundamentais:

- Componentização
- Reutilização
- Praticidade
- Performance

Toda funcionalidade deve ser pensada para ser reutilizada em diferentes projetos, evitando duplicação de código e mantendo a biblioteca simples de utilizar.

---

Objetivos

- Aprender e praticar PHP.
- Explorar HTML, CSS e JavaScript de forma componentizada.
- Criar componentes reutilizáveis.
- Reduzir repetição de código entre projetos.
- Facilitar manutenção.
- Melhorar continuamente a performance.

---

Arquitetura

A biblioteca é organizada por responsabilidades.

waranas_library/
│
├── assets/
│   ├── css/
│   └── js/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── core/
│   ├── helpers/
│   └── utils/
│
├── globals.php
└── index.php

Core

Responsável pela infraestrutura da biblioteca.

Entre suas responsabilidades estão:

- Bootstrap
- Renderização
- Cache
- Configuração de ambiente
- Carregamento interno
- Criptografia
- Gerenciamento de assets

---

Components

Representam funcionalidades visuais reutilizáveis.

Cada componente deve:

- possuir responsabilidade única;
- retornar HTML;
- receber dados por parâmetros;
- reutilizar outros componentes sempre que possível;
- carregar apenas os assets necessários.

Os componentes não devem:

- acessar banco de dados;
- executar regras de negócio;
- realizar autenticação;
- controlar rotas.

---

Helpers

Contêm funções independentes reutilizáveis por toda a biblioteca.

Exemplos:

- sanitização;
- normalização;
- formatação;
- conversões;
- minificação.

Helpers são independentes dos componentes.

---

Utils

Contêm funções auxiliares utilizadas por componentes específicos.

Quando uma utilidade cresce o suficiente e passa a representar uma funcionalidade reutilizável, ela pode evoluir para um componente.

---

API

Conjunto de abstrações simples para requisições HTTP.

Seu objetivo é simplificar integrações, mantendo a biblioteca leve.

---

Assets

Os assets pertencem aos componentes.

Cada componente registra apenas os arquivos necessários para seu funcionamento.

O carregamento é realizado por convenção e controlado para evitar duplicações.

---

Fluxo da aplicação

A inicialização recomendada segue a seguinte sequência:

index.php
    │
    ▼
bootstrap.php
    │
    ▼
globals.php
    │
    ▼
config.php
    │
    ▼
renderer.php
    │
    ▼
Componentes

---

Componentização

Na Waranas Library, toda interface deve ser construída através de componentes.

Os componentes representam pequenas unidades reutilizáveis de interface que podem ser combinadas para formar páginas completas.

Sempre que possível:

- reutilize componentes existentes;
- reutilize helpers;
- reutilize CSS existente;
- reutilize componentes dentro de outros componentes.

---

JavaScript

A biblioteca prioriza soluções utilizando HTML e CSS.

JavaScript deve ser utilizado apenas quando realmente necessário.

Sempre que existir JavaScript, recomenda-se manter uma função por arquivo para facilitar manutenção e reutilização.

---

CSS

Cada componente pode possuir seu próprio CSS.

Entretanto, antes de criar novos estilos, recomenda-se reutilizar estilos já existentes na biblioteca.

---

Convenções

Nomenclatura

Predominantemente:

- camelCase()

Em casos específicos:

- snake_case()

---

Componentes

Os componentes devem:

- ser pequenos;
- possuir responsabilidade única;
- retornar HTML;
- ser reutilizáveis;
- evitar dependências desnecessárias.

---

Helpers

Helpers nunca evoluem para componentes.

São categorias distintas.

---

Utils

Utils podem evoluir para componentes quando sua complexidade e reutilização justificarem.

---

Organização dos Projetos

A biblioteca foi projetada para ser utilizada por diversos projetos.

Uma funcionalidade nova deve seguir o seguinte fluxo:

1. Desenvolver inicialmente no projeto.
2. Validar sua utilidade.
3. Caso seja reutilizável, incorporá-la posteriormente à Waranas Library.

Dessa forma a biblioteca permanece enxuta e composta apenas por funcionalidades realmente reutilizáveis.

---

Compatibilidade

A biblioteca busca manter compatibilidade entre versões.

Alterações que possam causar breaking changes devem ser evitadas sempre que possível.

Quando necessárias, recomenda-se implementá-las primeiro no projeto antes de incorporá-las à biblioteca.

---

Roadmap

Os próximos objetivos incluem:

- Evolução da sintaxe interna.
- Melhorias no sistema de cache.
- Minificação automática do HTML final.
- Agrupamento de CSS compartilhado.
- Evolução do componente Chat.
- Componentes para mídia.
- Componentes para manipulação de dados.

---

O que evitar

A filosofia da biblioteca desencoraja:

- Componentes excessivamente grandes;
- Aninhamentos complexos;
- Múltiplas responsabilidades em um único componente;
- Excesso de funções por arquivo;
- Dependências externas desnecessárias;
- Uso exagerado de JavaScript.

---

Princípios

Toda contribuição para a biblioteca deve seguir os seguintes princípios:

- Simplicidade.
- Legibilidade.
- Reutilização.
- Modularidade.
- Performance.
- Compatibilidade.
- Facilidade de manutenção.

---

Licença

Este projeto é distribuído sob a licença definida pelo repositório.

Consulte o arquivo "LICENSE" para mais informações.