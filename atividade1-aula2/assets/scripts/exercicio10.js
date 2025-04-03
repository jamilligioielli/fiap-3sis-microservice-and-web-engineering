/** Integração completa: listagem, cadastro e exibição dinâmica
 */
let items = staticMockList;

async function getItems() {
  items = await getData(mockableEndpoints.getUsersData);
}

// Descomentar a linha abaixo para usar o Mockable.io
// getItems();

function createNewTableWithMockableIoData() {
	const tableBodyEl = document.querySelector('#tableMock tbody');
	let newRows = '';
	items.forEach(item => {
		newRows += `
      <tr>
        <td>${item.id}</td>
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>${item.idade}</td>
      </tr>
    `;
	});
	tableBodyEl.innerHTML = newRows;
}

async function sendDataToMockableIo() {
	const mockablePostForm = document.getElementById('mockablePostForm');
	const nameInput = document.querySelector('#mockablePostForm #nome');
	const emailInput = document.querySelector('#mockablePostForm #email');
	const idadeInput = document.querySelector('#mockablePostForm #idade');

	if (mockablePostForm) {
		mockablePostForm.addEventListener('submit', async event => {
			event.preventDefault();

			const formData = {
				id: items[items.length - 1].id + 1,
				nome: nameInput.value,
				email: emailInput.value,
				idade: idadeInput.value
			};
			/** POST */
			// const postResult = await postData(mockableEndpoints.postData, formData);
			// console.log(postResult);
			 
			items.push(formData);
			createNewTableWithMockableIoData();
			/** GET
			 * Se o POST realmente atualizasse a lista:
			 */
			// const newItems = await getData(mockableEndpoints.getUsersData);
			// items = newItems;
		});
	}
}

/** Chamadas das funções */
createNewTableWithMockableIoData();
sendDataToMockableIo();