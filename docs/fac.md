# Documentação Técnica: Waranas Library

## 1. Filosofia da Biblioteca
1.1. Qual foi a motivação para criar a Waranas Library? 
        Aprender PHP e praticar técnicas de HTML/CSS/JS
        
1.2. Qual a definição da biblioteca? 
        Uma biblioteca de componentes PHP para HTML/CSS/JS
        
1.3. Qual é a principal regra de desenvolvimento da biblioteca?
        Tudo deve ser componentizado, com foco em reutilização e modularidade

## 2. Organização
2.1. Critérios de distinção: Quando uma função deve ir para `helpers/` vs `utils/`?
        utils/ deve conter funções utilitárias que fazem parte de componentes específicos.
        helpers/ deve conter funções reunilizaveis independentes.
        
2.2. Quando um recurso merece virar um componente? (Ex: `modal()` vs helper).
        Componentes são estruturas que apresentam uma funcionalidade vizual específica utilizando funções que geram HTML/CSS/JS.
        
2.3. Convenções de nomenclatura: camelCase, snake_case, verbNoun() ou bom senso?
        camelCase, snake_case [em alguns casos específicos]
        
## 3. Componentes
3.1. Acoplamento: Os componentes devem ser totalmente independentes ou podem depender uns dos outros?
        Podem depender uns dos outros, e devem reutilizar funções e ate mesmo componentes inteiros se possível [ex.: chat.php]

3.2. Estrutura de arquivos: Cada componente deve possuir obrigatoriamente `component.php`, `component.css`, `component.js`, ou apenas o necessário?
        Apenas o necessário evitando o máximo o uso de "JS", deve estrair o máximo do "HTML" e "CSS". [ex.: listing.php, tabs.php, sliding.php]

3.3. Existe um template oficial para criar componentes novos?
        No momento não.

3.4. Colaboração: Você pretende que terceiros desenvolvam componentes para a biblioteca?
        Sim.

## 4. Assets
4.1. Carregamento: Como funciona o carregamento (automático, via registro ou por convenção)?
        Convenção. Utiliza variáveis de controle para carregar os assets necessários.
        Sempre é necessário utilizar controles para evitar carregamentos desnecessários.
        Carrega apenas os assets necessários para cada componente.
        
4.2. Performance: Existe *lazy loading* de CSS/JS ou tudo é carregado globalmente?
        Existe componentes para carregar alguns assets de forma lazy.
        O ideal é sempre reutilizar o máximo possível.

## 5. Renderização
5.1. Responsabilidade: Quem renderiza o HTML (componentes ou páginas)?
        Os componentes são responsáveis por renderizar o HTML.

5.2. Filosofia: Uso de `echo`, `return` ou *output buffering*?
        Os componentes utilizam return e ao utiliza-los, o HTML é retornado e pode ser utilizado em outras partes do sistema.
        O core/html.php é responsável por renderizar o HTML final.

## 6. Globals
6.1. Função do `GLOBALS.php`: Configuração, DI simples, variáveis globais ou inicialização?
        O GLOBALS.php é responsável por inicializar variáveis globais e configurações.

## 7. Bootstrap
7.1. Qual é a sequência ideal de inicialização? 
*(Ex: index → bootstrap → globals → router → layout → componentes)*
          Index -> Bootstrap -> globals -> renderer

## 8. Router
8.1. Escopo: O router faz apenas `URL → página` ou também autenticação, carregamento de módulos e middlewares?
        O router é responsável por rotear as URLs e carregar as páginas correspondentes apenas.

## 9. Banco de Dados
9.1. Filosofia: `arquivoBd()` é apenas uma abstração simples ou existe uma persistência robusta baseada em arquivos?
        Abstração simples, serve para buscar arquivos salvos em banco de dados MySQL.

## 10. APIs
10.1. Natureza das funções HTTP: *Wrappers* simples ou camada oficial para qualquer API?
        Abstração simples, serve para fazer requisições HTTP.

## 11. JavaScript
11.1. Convenção: Existe uma estrutura fixa (1 componente PHP → 1 JS → 1 CSS)?
        Não, requisita conforme o necessário para cada projeto.
        É ideal utilizar uma função js para cada arquivo para facilitar manutenção e reutilização.

## 12. CSS
12.1. Metodologia: BEM, Atomic ou organização própria?
        Organização própria.
        Geralmente cada arquivo CSS é responsável por um componente específico.
        Mas o ideal é reutilizar o css já existente ao invés de criar um novo.

## 13. Responsabilidades
13.1. Limites: Um componente pode acessar o banco de dados ou deve apenas gerar a interface?
        Apenas gerar a interface, não deve acessar o banco de dados.
        Os dados devem ser passados via parâmetros de função pré estabelecidos e fixos.

## 14. Extensibilidade
14.1. Fluxo de criação: Adicionar código diretamente ao projeto ou elevar para a Waranas Library primeiro?
        Se o componente já existe na Waranas Library, elevar para lá.
        Se não, criar o componente no projeto primeiro e elevar para a Waranas Library posteriormente conforme necessário.

## 15. Versionamento
15.1. Compatibilidade: Existe preocupação com *breaking changes* ou a biblioteca evolui conforme os projetos?
        Sim existe, e deve ser evitado.
        Há projetos para melhorias que podem ocasionar breaking changes. Mas se por acaso o projeto necessitar de uma alteração que ocosiona o breaking change, a alteração deve ser feita direto no projeto, alterações criticas apenas se necessário para melhor performace, compatibilidade e estabilidade.
        
## 16. Componentes Favoritos
16.1. Quais componentes formam a base da biblioteca?
        cache.php, bootstrap.php e o principal renderer.php pois gera o HTML final.

## 17. Helpers Essenciais
17.1. Quais funções representam a identidade da Waranas Library?
        sanitizers.php [normalize()]

## 18. O que NÃO fazer
18.1. Práticas evitadas (Ex: classes grandes, herança, dependências pesadas, Composer).
        Aninhamento rigido,
        Ecesso de funções por arquivo.
        Ecesso de funcionalidades por componentes.

## 19. Roadmap
19.1. Quais funcionalidades estão no horizonte?
        Sintaxe: substituição de estritos fixos por objetos.
        Performace: Minificação de cache final e junção de css compartilhados.
        Componentes: Finalização do chat e criação de componentes de midia e manipulação de dados.

## 20. Convenções do Ecossistema (Perguntas Técnicas)
* Como é feito o *autoload* dos componentes e dos assets?
        

* Existe um ciclo de vida oficial (`bootstrap → router → render → componentes`)?
        Index -> bootstrap -> router -> render -> componentes

* Quando um helper deve evoluir para um componente?
        Helpers não evoluem para componentes.
        São coisas diferentes.
        Utils evoluem para componentes quando há possibilidade de reutilização e quando se torna complexas o bastante.

* Quando uma funcionalidade deve entrar na biblioteca em vez de permanecer no projeto?
        Funcionalidades que podem ser reutilizadas em outros projetos ou que se tornam complexas o bastante para serem mantidas no projeto.

* Quais partes da API da biblioteca são estáveis e quais estão em evolução?
        Praticamente tudo é estável, com exceção do componente de chat.php .

* Há componentes ou funções obsoletos mantidos por compatibilidade?
        Não, todos os componentes e funções são atualizados e mantidos conforme necessário.

* Qual é a ordem recomendada para inicializar configurações, ambiente e renderização?
        index.php -> bootstrap.php -> global.php -> config.php -> render.php -> componentes.

* Qual é a principal filosofia que orienta suas decisões de arquitetura?
        Praticidade, reutilização e velocidade.
