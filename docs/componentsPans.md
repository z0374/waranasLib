Com base no que estudei da **Waranas Library**, dos dois projetos que a utilizam e do protótipo do **Portal da Família** , fiz um mapeamento dos módulos que **já existem** e podem ser reaproveitados no projeto **Nestong**.

## Componentes que podem ser utilizados diretamente

| Módulo             | Uso no Nestong               | Observação                              |
| ------------------ | ---------------------------- | --------------------------------------- |
| `bootstrap.php`    | Inicialização                | Fundamental                             |
| `renderer.php`     | Renderização da página       | Fundamental                             |
| `cache.php`        | Cache das páginas            | Fundamental                             |
| `section()`        | Seções da página             | Pode substituir `<section>` manual      |
| `listing()`        | Listagens                    | Muito útil para receitas, tarefas, etc. |
| `tabs()`           | Abas                         | Organização de conteúdo                 |
| `menu()`           | Navegação                    | Cabeçalho e menus                       |
| `search()`         | Pesquisa                     | Buscar membros, receitas, fotos         |
| `boardComponent()` | Quadros/boards               | Dashboard                               |
| `bubble()`         | Cards leves                  | Avisos, mensagens                       |
| `modal()`          | Janelas                      | Cofre da família, detalhes              |
| `tagList()`        | Tags                         | Categorias, parentesco                  |
| `textblock()`      | Texto formatado              | Biografias, histórias                   |
| `slideshow()`      | Slides                       | Destaques e banners                     |
| `sliding()`        | Carrosséis                   | Pode servir para galerias               |
| `chatComponent()`  | Futuro livro de visitas/chat | Ainda em evolução                       |
| `btFloat()`        | Botão flutuante              | Cofre da família                        |
| `hamburguer()`     | Menu mobile                  | Navegação responsiva                    |
| `formwhats()`      | Formulários                  | Contato                                 |
| `grid()`           | Layout                       | Organização visual                      |

---

# Helpers que serão extremamente úteis

## Sanitização

```php
normalize()
```

Provavelmente será uma das funções mais utilizadas.

---

## Formatação

```php
BRL()

cepFormat()

brForP()
```

---

## Compressão

```php
minifyHTML()

minifyCSS()

minifyJS()
```

Excelente para o roadmap do Nestong.

---

## Manipulação

```php
colorTone()

filter_image()

isSvg()
```

---

# Core

Esses já deverão fazer parte da estrutura do projeto.

```text
bootstrap.php

renderer.php

cache.php

globals.php

html.php
```

---

# API

Já existe infraestrutura para

```php
getJsonData()

postJsonData()
```

Que poderá ser usada para:

* Blogger
* Google Sheets
* Google Drive
* Telegram
* APIs futuras

---

# O que o Portal da Família precisa criar

Comparando o protótipo com a Waranas Library, identifiquei os componentes específicos que ainda não existem e que devem nascer **no projeto**, podendo futuramente subir para a biblioteca.

## Header

Já existe parcialmente.

Eu manteria

```text
header/
```

---

## sectionTitle

Já começamos.

---

## fixedHeader

Para controlar:

* sticky
* blur
* menu
* pesquisa

---

## familyTree

Árvore genealógica.

---

## timelineWidget

Para

```text
Linha do tempo

Diário do bebê

Eventos
```

---

## albumGallery

Responsável por

```text
Álbuns

Categorias

Filtros
```

---

## albumCard

Cada álbum.

---

## cardImage

Cada foto.

---

## guestbookForm

Livro de visitas.

---

## recipesWidget

Receitas.

---

## talentsWidget

Talentos da família.

---

## pollsWidget

Enquetes.

---

## wishListWidget

Lista de desejos.

---

## tasksWidget

Tarefas.

---

## goalsWidget

Metas.

---

## vaultWidget

Cofre da família.

Pode reutilizar

```text
modal()

btFloat()
```

---

## mediaWidget

Filmes

Livros

Músicas

Jogos

---

# Componentes que podem ser compostos

Uma característica da Waranas Library é reutilizar componentes.

Exemplo:

```text
vaultWidget

↓

btFloat()

↓

modal()

↓

listing()

↓

tagList()
```

Outro exemplo:

```text
albumGallery

↓

section()

↓

sliding()

↓

cardImage()
```

Outro:

```text
timelineWidget

↓

section()

↓

listing()

↓

bubble()
```

---

# Componentes que eu criaria pensando em futura reutilização

Pela filosofia da biblioteca, eu faria esses módulos já pensando em subir para a Waranas Library no futuro:

* `familyTree()`
* `timelineWidget()`
* `albumGallery()`
* `albumCard()`
* `cardImage()`
* `guestbookForm()`
* `recipesWidget()`
* `pollsWidget()`
* `vaultWidget()`
* `mediaWidget()`

Todos possuem potencial de reutilização em outros projetos.

## Minha conclusão

O Nestong pode ser desenvolvido com aproximadamente **70–80% da interface reutilizando componentes existentes da Waranas Library**, enquanto os **20–30% restantes** serão componentes específicos do domínio "Portal da Família". Esses novos componentes devem ser construídos de forma modular, utilizando os componentes-base (`section`, `listing`, `modal`, `sliding`, `bubble`, `tagList`, etc.) para manter a arquitetura consistente com a filosofia da biblioteca e facilitar sua futura incorporação à Waranas Library.
