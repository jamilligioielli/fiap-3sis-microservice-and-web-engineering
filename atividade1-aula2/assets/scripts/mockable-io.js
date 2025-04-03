const MOCKABLE_API_HOST = 'http://demo0475534.mockable.io';
const mockableEndpoints = {
	getMessage: `${MOCKABLE_API_HOST}/a1-exercicio4-get-msg`,
	getUsersData: `${MOCKABLE_API_HOST}/a1-exercicio6-get-dados-tabela`,
	postData: `${MOCKABLE_API_HOST}/a1-exercicio5-post`,
	putData: `${MOCKABLE_API_HOST}/a1-exercicio8-put`,
	deleteData: `${MOCKABLE_API_HOST}/a1-exercicio8-delete`
};
const staticMockList = [
		{
			id: 1,
			nome: 'João Silva',
			email: 'joao.silva@email.com',
			idade: 18
		},
		{
			id: 2,
			nome: 'Ana Costa',
			email: 'ana.costa@email.com',
			idade: 16
		},
		{
			id: 3,
			nome: 'Pedro Oliveira',
			email: 'pedro.oliveira@email.com',
			idade: 30
		},
		{
			id: 4,
			nome: 'Maria Pereira',
			email: 'maria.pereira@email.com',
			idade: 15
		},
		{
			id: 5,
			nome: 'Lucas Santos',
			email: 'lucas.santos@email.com',
			idade: 22
		}
];

async function getData(url) {
	try {
		const response = await fetch(url);
    if (!response.ok) {
			throw new Error(`API Unavailable`);
		}

		return response.json();
	} catch (error) {
		console.error(error);
	}
}

async function postData(url, body) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		return response.json();
	} catch (error) {
		console.error(error);
	}
}

async function putData(url, itemToBeUpdated) {
	const items = await getData(mockableEndpoints.getUsersData) ?? staticMockList;
	console.log('Lista original: ');
	console.table(items);
	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		items.forEach(item => {
			if (item.id == itemToBeUpdated.id) {
				item.nome = itemToBeUpdated.nome;
			}
		});
		const jsonResponse = await response.json();
		console.log(jsonResponse['msg']);
		console.log('Lista pós atualização do item de ID ' + itemToBeUpdated.id);
		console.table(items);
	} catch (error) {
		console.error(error);
	}
}

async function deleteData(url, item) {
	const items = await getData(mockableEndpoints.getUsersData) ?? staticMockList;
	console.log('Lista original: ');
	console.table(items);

	try {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const newItems = items.filter(it => it.id != item.id);
		const jsonResponse = await response.json();
		console.log(jsonResponse['msg']);
		console.log('Lista pós deleção do item de ID ' + item.id);
		console.table(newItems);
	} catch (error) {
		console.error(error);
	}
}

/** Criação de um pequeno CRUD */

async function crudSimulator() {
  console.log("------ CRUD SIMULATOR -------");
  /** GET */
  console.log("GET");
	const items = await getData(mockableEndpoints.getUsersData) ?? staticMockList;
	console.table(items);

  /** POST */
  console.log('POST');
	const postBody = {
		text: 'crud simulator POST'
	};
  const postResult = await postData(mockableEndpoints.postData, postBody);
  if(postResult)
	  console.log(postResult['msg']);

  /** DELETE */
  console.log('DELETE');
	await deleteData(mockableEndpoints.deleteData, items[0]);

  /** PUT */
  console.log('PUT');
	await putData(mockableEndpoints.putData, {
		id: 2,
		nome: 'Jamilli Vitoria'
	});
}

/** DESCOMENTAR FUNÇÃO QUANDO FOR TESTAR 
 * Necessário evitar multiplas requisições
 * para o mockable.io
 */
// crudSimulator();