/** Mudança de background */
function changeMainBackgroundColor() {
	const element = document.getElementById('main');
	if (element) {
		element.style.setProperty('background-color', '#000');
	}
}

function appendNewElementWithTextContent(parentElId, elTag, textValue) {
	const parentEl = document.getElementById(parentElId);
	const newEl = document.createElement(elTag);
	newEl.textContent = textValue;
	parentEl.appendChild(newEl);
}

/** Adicionando elementos a lista */
function addListElements() {
  const addElementForm = document.getElementById('addElement');
  if (addElementForm) {
    addElementForm.addEventListener('submit', event => {
      event.preventDefault();
      const wordInput = document.getElementById('word').value;
      if (wordInput) {
        appendNewElementWithTextContent('randomWordsList', 'li', wordInput);  
      }
    });
  }
}

/** Removendo elementos da lista com doubleclick */
function removeListElements() {
  const wordslistElements = document.querySelectorAll('#randomWordsList li');
  if (wordslistElements.length > 0) {
  const wordsListContainer = document.getElementById('randomWordsList');
  wordslistElements.forEach(el => {
    el.addEventListener('dblclick', event => {
      event.preventDefault();
      wordsListContainer.removeChild(el);
    });
  });
  } 
}

/** Consumindo dados de uma API (GET) */
async function getMessageFromMockableIo() {
  const jsonValue = await getData(mockableEndpoints.getMessage) ?? { mensagem: "Teste mockado"};
  if (jsonValue) {
    const mensagem = jsonValue["mensagem"];
    appendNewElementWithTextContent("mockableMsg", "div", mensagem);
  }
}

/** Validação de formulários com JavaScript */
function validateRequiredFields(field, fieldErrorEl) {
  field.addEventListener('focusout', () => {
		if (!field.value) {
			fieldErrorEl.style.setProperty('display', 'block');
		} else {
			fieldErrorEl.style.setProperty('display', 'none');
		}
	});

	field.addEventListener('input', () => {
		if (field.value) {
			fieldErrorEl.style.setProperty('display', 'none');
		}
	});
}

/** Enviando dados para a API (POST) */
async function postFormDataToMockableIo(nomeValue, emailValue) {
  const formData = {
    nome: nomeValue,
    email: emailValue,
  }
  const jsonValue = await postData(mockableEndpoints.postData, formData);
  if (jsonValue) {
    console.log(jsonValue)
    appendNewElementWithTextContent('mockablePost', 'div', jsonValue["msg"]);
  }
}


function sendDataToMockableIo() {
  const mockablePostForm = document.getElementById('mockablePostForm');
  const nameInputContainer = document.querySelector('#mockablePostForm #nome');
  const nameInput = nameInputContainer.children[0];
  const nameInputErr = nameInputContainer.children[1];
  const emailInputContainer = document.querySelector(
			'#mockablePostForm #email'
   );
  const emailInput = emailInputContainer.children[0];
  const emailInputErr = emailInputContainer.children[1];

  validateRequiredFields(nameInput, nameInputErr);
  validateRequiredFields(emailInput, emailInputErr);

	if (mockablePostForm) {
		mockablePostForm.addEventListener('submit', event => {
			event.preventDefault();
      
      postFormDataToMockableIo(nameInput.value, emailInput.value);

		});
	}
}

/** Exibindo dados retornados em tabela */
/** Manipulação do JSON recebido */
async function createNewTableWithMockableIoData(clearFilter) {
  const originalItems = await getData(mockableEndpoints.getUsersData) ?? staticMockList;
  let items = originalItems.filter(item => item.idade > 18);
  if (clearFilter) {
    items = originalItems;
  }
  const tableBodyEl = document.querySelector('#tableMock tbody');
  let newRows = "";
  items.forEach(item => {
    newRows += `
      <tr>
        <td>${item.id}</td>
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>${item.idade}</td>
      </tr>
    `; 
  })
  tableBodyEl.innerHTML = newRows;
}


/** Chamadas das funções */
addListElements();
removeListElements();
getMessageFromMockableIo();
sendDataToMockableIo();
createNewTableWithMockableIoData();
