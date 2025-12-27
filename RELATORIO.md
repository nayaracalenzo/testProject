# Relatório - Alexandre Nascimento

## 1. Visão Geral da Solução

A aplicação consiste em um sistema completo de gerenciamento de tarefas, dividido entre um backend em **Node.js com Express e Sequelize** (utilizando SQL Server) e um frontend em **React + Vite** com **Material UI** para a interface.

Desde o início do projeto, foi necessário revisar componentes essenciais da arquitetura, corrigindo fluxos de criação, edição, exclusão e atualização das tasks — tanto no backend quanto no frontend.

Durante o desenvolvimento, foram implementadas boas práticas de organização, validação e experiência do usuário. No backend, ajustes importantes garantiram o correto funcionamento das rotas, carregamento de ambiente e operações com o banco. No frontend, problemas de estado, duplicações, validações, estilização e usabilidade foram corrigidos e aprimorados.

Ao final, a aplicação está **totalmente funcional**, oferecendo uma experiência fluida ao usuário, permitindo criar, listar, atualizar, marcar como concluída e excluir tarefas com segurança e feedback visual adequado.

---

## 2. Como Executar a Aplicação

A aplicação é dividida em duas partes: **backend** e **frontend**.  
Abaixo estão as instruções para rodar cada uma delas.

---

## **📌 Backend (Node.js + Express + Sequelize)**

### **Pré-requisitos**
- Node.js instalado  
- Arquivo `.env` configurado com as credenciais do SQL Server  
- Dependências instaladas com:

```bash
npm install
```

### **▶️ Como iniciar o backend**
No diretório do backend, execute:

```bash
npm run start
```

O servidor será iniciado e utilizará a porta definida no arquivo `.env`.

---

## **📌 Frontend (React + Vite + Material UI)**

### **Pré-requisitos**
- Node.js instalado  
- Dependências instaladas com:

```bash
npm install
```

### **▶️ Como iniciar o frontend**
No diretório do frontend, execute:

```bash
npm run dev
```

O Vite iniciará o servidor de desenvolvimento, geralmente acessível em:

```
http://localhost:5173
```

---

Depois de iniciar **backend** e **frontend**, a aplicação estará funcionando completamente.

## 3. Correção dos Erros Iniciais
Ao executar `npm run dev`, o backend não estava iniciando. Abaixo, eu listei os problemas que identifiquei e suas correções:

- **package.json apontava para o arquivo errado**  
  O `start` estava configurado incorretamente. Eu ajustei para apontar para `src/index.js`.

- **Erro no require do taskController**  
  O caminho do require estava incorreto: `taskControler` (com apenas um L). Eu ajustei para `taskController`.

- **Dependência `tedious` ausente**  
  O backend utiliza o pacote, mas ele não estava instalado. Executei `npm i tedious` e resolveu o problema.

- **Erro "argument handler must be a function"**  
  Faltavam funções no `module.exports` do `taskController`. Adicionei as funções exportadas corretamente.

- **Porta do servidor retornando undefined**  
  Não havia carregamento do arquivo `.env`. Eu adicionei `require('dotenv').config()` no topo do arquivo `index.js` e verifiquei a variável `PORT`.

Após essas correções, a aplicação passou a iniciar corretamente.

## 4. Relatório de Correção de Bugs

### Bug 1 — Tarefa aparecendo automaticamente ao carregar a tela

**Descrição do problema:**  
Ao abrir o vite pela primeira vez, uma task já era exibida na lista mesmo sem o usuário ter criado nada. Isso causava confusão e não representava o comportamento esperado.

**Causa raiz e solução do problema**  
O estado inicial definido no `useState` de tasks tinha uma task já definida, eu removi essa task e deixei o estado vazio.

---

### Bug 2 — Ao salvar task, ela era adicionada duplicada

**Descrição do problema:**  
Ao criar uma nova task, ela era adicionada duas vezes na lista.

**Causa raiz e solução do problema:**  
No componente `ModalTask`, a função `onCreate` chamava `createTask` duas vezes.  
Eu removi a chamada duplicada e deixei apenas a que criava a task quando as anteriores eram carregadas.

---

### Bug 3 - Ao criar uma tarefa sem descrição, nada acontece. O ideal é mostrar pro usuário que o campo não pode ser nulo

**Descrição do problema:**
Ao criar uma task sem descrição, nada acontecia. Permitindo que a task fosse adicionada de sem o campo título.

**Causa raiz e solução do problema:**
Foi utilizado um `<Alert/>` do Material UI para criar um aviso (Warning) para o usuário de que o campo título não poderia estar vazio. Barrando que a task fosse submetida sem o campo requerido.


---

### Bug 4 - Ao excluir uma tarefa, ela exclui a última criada

**Descrição do problema:**
Ao tentar excluir, por exemplo, o item número 1 de uma lista com 6 números, a aplicação excluia o último (6* número) da lista.

**Causa raiz e solução do problema:**
Após trocar a lógica no backend para que a task fosse excluída a partir do seu id, a exclusão funcionou sem problemas, corrigindo a falha.

---

### Bug 5 - Ao teclar enter, nada acontece

**Descrição do problema:**
Ao teclar enter, a task não era adicionada, causando frustração para o usuário.

**Causa raiz e solução do problema:**
Após adicionar um formulário `<form/>` ao ModalTask, o botão de submit passou a aceitar enter como confirmação.

--- 

### Bug 6 - Ao mudar tarefa para finalizada, ele não risca a tarefa

**Descrição do problema:**
Ao selecionar a checkbox da task em específico, não risca o texto indicando task completada.

**Causa raiz e solução do problema:**
A ausência de um operador condicional ternário na Stack (Task) impedia que a frase fosse riscada, como nesse exemplo `textDecoration: completed ? "line-through" : "none"`.

---

### Bug 7 - Ação de excluir 

**Descrição do problema:**
A ação de excluir uma tarefa não solicitava uma confirmação, podendo acontecer por engano e causar frustração no usuário.

**Causa raiz e solução do problema:**
O `TaskItem` chamava o método `onDelete` de uma vez quando o ícone da lixeira fosse clicado. A solução fui utilizar o que o mui já oferece e criar um componente `ConfirmDelete`, sendo chamado antes de `onDelete`.

--- 

### Bug 8 - O botão de Editar não está funcionando corretamente

**Descrição do problema:**
A ação de editar a task estava inutilizada, não abria um campo para que o usuário pudesse editar.

**Causa raiz e solução do problema:**
Foi reutilizado o `TaskModal`, com pequenas alterações, um atributo `mode` foi adicionado à `TaskModel` para trocar entre `"create" e "update"`, mudando, assim, algumas partes da interação com o usuário e com a lógica por trás da aplicação.

---

### Bug 9 - A task está desalinhada e deve ser posicionado alinhado aos outros elementos

**Descrição do problema:**
O título da task estava desalinhada em relação aos outros componentes da própria task.

**Causa raiz e solução do problema:**
A ausência de um `display: "flex", alignItems: "center` fazia com que o título ficasse desalinhado.

--- 

### Bug 10 — O botão “Remover” deve ser vermelho

**Descrição do problema:**  
O botão de remover não tinha destaque visual e não seguia a orientação do projeto, que pedia que a cor fosse vermelha.

**Causa raiz e solução do problema:**  
O botão estava usando a cor padrão e não transmitia que se tratava de uma ação de exclusão de task.  
Eu apliquei a cor vermelha diretamente no estilo/componente do botão de remover, deixando a ação mais evidente.

--- 

### Bug 11 - Barra de rolagem não funcional

**Descrição do problema:**
Ao ter mais tasks do que a tela consegue visualizar, a aplicação não apresenta barra de rolagem

**Causa raiz e solução do problema:**
No `Container` de `TodoPage` foi implementado um `overflowY: "auto"` ativando a barra de rolagem na página.

---

### Bug 12 - Espaços no campo “Título da Tarefa” e salvar também está adicionando um item em branco

**Descrição do problema:**
Ao criar uma task com o campo em branco, apenas com espaços, também está adicionando a task à coleção. 

**Causa raiz e solução do problema:**
A falta de uma lógica que retirasse os espaços permitia que a task fosse adicionada somente com espaços. Foi usado um `title.trim()` para retirar espaços (início e fim) junto com um sinal de igualdade `===` para verificar se o title sem espaços era apenas uma string vazia `""`. 

## 5. Relatório de Melhorias

Além das correções de bugs, diversas melhorias foram aplicadas para elevar a qualidade, consistência e usabilidade da aplicação.

## **Melhorias de UX e Interface**
- Implementação do componente **ConfirmDelete**, adicionando uma confirmação antes da exclusão e evitando remoções acidentais.  
- Alinhamento visual correto dos elementos da task, garantindo consistência e legibilidade.  
- Destaque visual ao botão de remover (cor vermelha), refletindo claramente sua função.  
- Adição de barra de rolagem automática no container de tarefas, melhorando a navegação em listas grandes.

## **Melhorias de Organização e Estrutura**
- Padronização das funções do `taskController`, garantindo exportações claras e organizadas.  
- Implementação do atributo `mode` no `ModalTask`, permitindo reutilização do componente tanto para criação quanto para edição.  
- Revisão das chamadas de API para evitar comportamentos duplicados e inconsistentes.

## **Melhorias de Validação e Confiabilidade**
- Validação mais robusta do campo de título utilizando `trim`, impedindo criação de tarefas vazias ou apenas com espaços.  
- Adição de suporte ao envio do formulário via tecla **Enter**, tornando o fluxo mais intuitivo.  
- Correção do comportamento da marcação de tarefas concluídas, garantindo o riscado do texto com `text-decoration`.

---

## 6. Decisões e Considerações

Desde que iniciei no projeto, foi necessário revisar e ajustar partes essenciais da implementação — desde o backend até a interface do usuário. A lógica de atualização de tarefas no backend precisou ser revista para garantir integridade e consistência dos dados. No frontend, melhorias significativas foram feitas para otimizar a experiência do usuário, incluindo a criação do componente **ConfirmDelete**, que tornou a aplicação mais segura e profissional no processo de exclusão.

Ao longo desse processo, conheci mais de **Express**, especialmente no uso do **Sequelize com SQL Server**, que tem particularidades de configuração e modelagem. Também relembrei conceitos de **React**, como componentização, controle de estado e boas práticas de interface.

Todas as decisões tomadas priorizaram:

- **Clareza e organização do código**  
- **Experiência do usuário**  
- **Segurança na manipulação de dados**  
- **Escalabilidade e manutenibilidade futura**

O resultado final é uma aplicação estável, refinada e completamente funcional, refletindo evolução técnica contínua e atenção aos detalhes ao longo do desenvolvimento.