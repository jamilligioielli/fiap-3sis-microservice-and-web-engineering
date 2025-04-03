const formCadastro = document.getElementById("formCadastro")  as HTMLFormElement;
const formBusca = document.getElementById("formBusca")  as HTMLFormElement;
const btnLimpar = document.getElementById("btnLimparFiltro")  as HTMLFormElement;
const formCadastroItens = {
    tituloI: document.getElementById("titulo") as HTMLFormElement,
    autorI: document.getElementById("autor") as HTMLFormElement,
    paginasI: document.getElementById("paginas") as HTMLFormElement,
    generoI: document.getElementById("genero") as HTMLFormElement,
}

const formBuscaItens = {
    autorI: document.getElementById("autorBusca") as HTMLFormElement,
}
const tabela = document.getElementById("livros") as HTMLElement;

interface Livro{
    id: number;
    titulo: string;
    autor: string;
    paginas: number;
    genero?: string;
}

const livrosSalvos = getLocalStorageItem("livros") as Livro[];

let livros: Livro[] = livrosSalvos ?? [];

const cadastrarLivrosListener = () => {
  formCadastro?.addEventListener("submit", (event) => {
    event.preventDefault();

    let lastIdIncrement = livrosSalvos && livrosSalvos.length > 0 ? livrosSalvos[livrosSalvos.length - 1].id + 1 : 1;
    let livro: Livro = {
        id: lastIdIncrement,
        titulo: formCadastroItens.tituloI.value ?? "",
        autor: formCadastroItens.autorI.value ?? "",
        paginas: formCadastroItens.paginasI.value ?? "",
        genero: formCadastroItens.generoI.value ?? "",
    }
    livros.push(livro)
    atualizarDados()
    formCadastro?.reset()
  })
  exibirLista()
}

const limparFiltrosListener = () => {
  btnLimpar?.addEventListener("click", (event) => {
    event.preventDefault();
    
    exibirLista(livrosSalvos)
  })
}

const buscarLivrosListener = () => {
  formBusca?.addEventListener("submit", (event) => {
    event.preventDefault();

    const autorDesejado = formBuscaItens.autorI.value ?? "";
    // filtrar lista
    const listaLivrosAutor = livrosSalvos.filter(l => l.autor === autorDesejado);
    
    exibirLista(listaLivrosAutor)
    formBusca?.reset()
  })
}

function removerItem(id:number)
{
    if(livrosSalvos.length == 1){
        livros = [];
    }
   const index =  livrosSalvos.findIndex(
    (livro:Livro) => livro.id == id);
  if(index !== -1){
    livrosSalvos.splice(index, 1)
    livros = livrosSalvos;
    atualizarDados();
  }
  exibirLista()
}

function editarItem (id:number) {
  const livro = livrosSalvos.find(
    (livro : Livro) => livro.id ==id);
  
  if(!livro)  return;

  formCadastroItens.tituloI.value = livro.titulo;
  formCadastroItens.autorI.value = livro.autor;
  formCadastroItens.generoI.value = livro.genero;
  formCadastroItens.paginasI.value = livro.paginas;

  const index = livrosSalvos.findIndex((c : Livro) => c.id ==id);

  if(index !== -1){
    livrosSalvos.splice(index, 1);
    livros = livrosSalvos;
    atualizarDados();
  }
  exibirLista()
}

const exibirLista = (livros?: Livro[]) => {
  const lista = livros ?? livrosSalvos;
  if(tabela.innerHTML != "")
    tabela.innerHTML = "";
  if (lista) {
    lista.forEach((livro : Livro) =>{
      tabela.innerHTML += `
          <tr>
              <td>${livro.titulo}</td>
              <td>${livro.autor}</td>
              <td>${livro.paginas}</td>
              <td>${livro.genero ?? "N/A"}</td>
              <button class="btnEdit" data-id="${livro.id}""> Editar </button> 
              <button class="btnRemove" data-id="${livro.id}"> Remover </button> 
          </tr>
    `;
    })
  }
}

const atualizarDados = () => {
  setLocalStorageItems("livros", livros)
  exibirLista(livros)
  editarOuRemoverListeners()
}

const editarOuRemoverListeners = () => {
  const editarBtns = document.querySelectorAll("#livros button.btnEdit")
  const removerBtns = document.querySelectorAll("#livros button.btnRemove")
  editarBtns.forEach((btn) => {
   btn.addEventListener("click", (event) => {
      const id = Number((event.target as HTMLElement).getAttribute("data-id"));
      editarItem(id);
    });
  }); 

  removerBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = Number((event.target as HTMLElement).getAttribute("data-id"));
      removerItem(id);
    });
  });
}

cadastrarLivrosListener()
buscarLivrosListener()
limparFiltrosListener()
exibirLista()
editarOuRemoverListeners()