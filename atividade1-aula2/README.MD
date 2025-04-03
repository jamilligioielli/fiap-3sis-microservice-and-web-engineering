# Exercícios para entregar

**Entregável:** Subir todo o código no GitHub e enviar um e-mail para  
[professorthiagoxavier@gmail.com](mailto:professorthiagoxavier@gmail.com) com o link do GitHub.  
**Título do e-mail:** Atividade 1

## 1. Estrutura básica de página (HTML + CSS)

**Objetivo:** Criar uma página HTML com cabeçalho, rodapé e conteúdo principal, fazendo uso de tags semânticas e estilos básicos em CSS.

1. Crie um arquivo `index.html` contendo tags semânticas (`<header>`, `<nav>`, `<section>`, `<footer>`, etc.).
2. Adicione um arquivo `styles.css` para estilizar o layout.
   - Defina cor de fundo, cor do texto, margens, etc.
3. Inclua o `styles.css` no `index.html`.
4. Garanta que a página abra no navegador corretamente.

---

## 2. Manipulação de elementos com JavaScript

**Objetivo:** Demonstrar como o JavaScript pode manipular HTML e CSS dinamicamente.

1. Dentro do `index.html`, crie um botão (ex.: **"Mudar cor"**).
2. Ao clicar nesse botão, seu script deve alterar a cor de fundo ou a cor do texto de um elemento específico, usando `document.querySelector` ou `document.getElementById`.
3. Teste a interação no navegador.

---

## 3. Inserir e remover elementos do DOM

**Objetivo:** Continuar o exercício de manipulação para criar e remover elementos via JavaScript.

1. Crie um campo de texto e um botão **"Adicionar Item"**.
2. Ao clicar em **"Adicionar Item"**, crie dinamicamente um novo `<li>` em uma lista `<ul>` ou `<ol>` com o texto digitado.
3. Permita remover um item ao clicar nele (por exemplo, ao clicar duas vezes, o item é removido).

---

## 4. Consumir dados de uma API (GET)

**Objetivo:** Fazer uma requisição GET a um endpoint do [mockable.io](https://www.mockable.io/) e exibir o resultado na página.

1. Crie um endpoint no mockable.io que retorne um JSON simples, por exemplo:

```json
{
  "mensagem": "Olá, este é um retorno de teste!"
}
```

2. Utilize a função `fetch` no JavaScript para buscar esse JSON.
3. Exiba o conteúdo retornado (por exemplo, o valor de `"mensagem"`) em um `<div>` na página.

---

## 5. Enviar dados para a API (POST)

**Objetivo:** Demonstrar como enviar informações a um servidor usando `fetch` e o método `POST`.

1. No mockable.io, configure um endpoint que aceite dados via `POST`.
2. Crie um pequeno formulário (HTML) com campos para **nome** e **e-mail**.
3. Ao clicar em **"Enviar"**, o JavaScript deve:
   - Capturar os dados do formulário.
   - Fazer um `POST` para o endpoint, enviando os dados em formato JSON.
4. Exiba no console (ou na tela) a resposta que o servidor mockable.io retornar (exemplo: mensagem de sucesso).

---

## 6. Exibindo dados retornados em tabela

**Objetivo:** Mostrar o resultado de uma requisição GET num elemento HTML tabelado.

1. Use o mesmo endpoint de GET do exercício anterior (ou crie outro que retorne uma lista de objetos JSON, como produtos, usuários, etc.).
2. Ao receber o array de dados, crie dinamicamente as linhas (`<tr>`) e células (`<td>`) de uma `<table>` no HTML.
3. Liste os objetos da resposta (por exemplo, **nome, e-mail, idade**) em cada linha.

---

## 7. Manipulação do JSON recebido

**Objetivo:** Demonstrar como tratar e filtrar dados via JavaScript antes de exibi-los.

1. Com base na mesma lista do exercício 6, filtre somente os objetos que tenham determinada condição (exemplo: **pessoas acima de 18 anos**).
2. Exiba apenas os itens filtrados na tabela.
3. Dê a opção ao usuário de **resetar o filtro** e mostrar todos os dados novamente.

---

## 8. Criação de um pequeno CRUD (sem backend real)

**Objetivo:** Simular as operações básicas de CRUD com JavaScript e mockable.io.

1. Continue usando o endpoint do mockable.io para `GET` e `POST`.
2. Simule a parte de **"UPDATE"** e **"DELETE"** apenas no front-end, por exemplo:
   - **UPDATE:** Alterar nome de um objeto numa lista e enviar um `POST` atualizado (ou um `PUT`, se o mockable.io estiver configurado para receber).
   - **DELETE:** Remover um item da lista localmente e disparar uma requisição de exclusão (se suportado), ou apenas simular.

---

## 9. Validação de formulários com JavaScript

**Objetivo:** Ensinar boas práticas de verificação de dados antes de enviar ao servidor.

1. Reaproveite o formulário do exercício 5.
2. Antes de enviar (`POST`) para o mockable.io, verifique se **todos os campos obrigatórios estão preenchidos**.
3. Caso algum campo esteja vazio, exiba uma **mensagem de erro** em um `<span>` ao lado do campo.
4. Apenas libere a requisição se estiver tudo válido.

---

## 10. Integração completa: listagem, cadastro e exibição dinâmica

**Objetivo:** Reunir todos os conceitos anteriores em um mini-projeto de página única.

1. Crie uma página com duas seções: **"Listar dados"** e **"Cadastrar novo"**.
2. Na parte de listagem:
   - Faça uma requisição `GET` ao endpoint do mockable.io.
   - Exiba os dados na tabela.
3. Na parte de cadastro:
   - Crie o formulário para inserir os dados (**nome, e-mail, etc.**).
   - Faça a requisição `POST` ao salvar.
   - Após salvar, atualize a lista (`GET` novamente) para exibir o novo registro sem recarregar a página.
4. Use **CSS** para organizar e deixar a página mais atraente.
