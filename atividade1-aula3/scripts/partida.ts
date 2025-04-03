const formPartida = document.getElementById("formPartida") as HTMLFormElement;
const formPartidaItens = {
    campeonatoId: document.getElementById("campeonatos") as HTMLFormElement,
    mandanteI: document.getElementById("timeMandante") as HTMLFormElement,
    visitanteI: document.getElementById("timeVisitante") as HTMLFormElement,
}
const tabelaPartida = document.getElementById("partidas");
interface Partida{
    id: number;
    timeMandante: string;
    timeVisitante: string;
    campeonato: Campeonato | null;
}

const partidasSalvas = getLocalStorageItem("partidas") as Partida[];
let partidas: Partida[] = partidasSalvas ?? [];
const campeonatosPartidas = getLocalStorageItem("campeonatos") as Campeonato[];

const gerarListaListener = () => {
    formPartida?.addEventListener("submit", (event) => {
        event.preventDefault();
        let lastIdIncrement = partidasSalvas && partidasSalvas.length > 0 ? partidasSalvas[partidasSalvas.length - 1].id + 1 : 1;
        let partida: Partida = {
            id: lastIdIncrement,
            campeonato: campeonatosPartidas ? campeonatosPartidas.find(c => c.id == Number.parseInt(formPartidaItens.campeonatoId.value)) ?? null : null,
            timeMandante: formPartidaItens.mandanteI.value ?? "",
            timeVisitante: formPartidaItens.visitanteI.value ?? "",
        }
        partidas.push(partida)
        formPartida?.reset()
        atualizarDadosPartidas()
      })
      exibirTabelaPartidas()
}

const atualizarDadosPartidas = () => {
setLocalStorageItems("partidas", partidas)
  exibirTabelaPartidas()
  editarOuRemoverListenersPartidas()
}

const removerItemPartidas = (id:number) =>
{
   const campIndex =  partidasSalvas.findIndex(
    (p:Partida) => p.id == id);

  //Validar se encontrou algum item  
  if(campIndex !== -1){
    //remover da lista
    partidasSalvas.splice(campIndex, 1)
    partidas = partidasSalvas;
    atualizarDadosPartidas()
  }
  exibirTabelaPartidas()
}

const editarItemPartidas = (id:number) => {
  //Find = buscar um elemento em um array
  const partida = partidasSalvas.find(
    (p : Partida) => p.id ==id);
  
  if(!partida)  return;

  formPartidaItens.campeonatoId.value = partida.campeonato!.id ?? 0;
  formPartidaItens.mandanteI.value = partida.timeMandante;
  formPartidaItens.visitanteI.value = partida.timeVisitante;
  
  //findIndex buscar o index do objeto
  const campIndex = partidasSalvas.findIndex((p : Partida) => p.id ==id);


  //Validar se encontrou algum item  
  if(campIndex !== -1){
    //remover da lista
    partidasSalvas.splice(campIndex, 1);
    partidas = partidasSalvas;
    atualizarDadosPartidas();
  }
  exibirTabelaPartidas()
}

const exibirTabelaPartidas = () => {
  if(tabelaPartida!.innerHTML != "")
    tabelaPartida!.innerHTML = "";
  if (partidasSalvas) {
    partidasSalvas.forEach((p : Partida) =>{
      tabelaPartida!.innerHTML += `
      <tr>
          <td>${p.campeonato!.nome ?? "N/A"}</td>
          <td>${p.timeMandante}</td>
          <td>${p.timeVisitante}</td>
          <button class="btnEdit" data-id="${p.id}""> Editar </button> 
          <button class="btnRemove" data-id="${p.id}"> Remover </button>
      </tr>
    `;
    })
  }
}

const exibirCampeonatos = () => {
    const selectCampeonatos = document.getElementById("campeonatos") as HTMLSelectElement;
    selectCampeonatos!.innerHTML = "";
    campeonatosPartidas.forEach((c : Campeonato) =>{
      selectCampeonatos!.innerHTML += `
      <option value="${c.id}">${c.nome}</option>
    `;
    })
}

const editarOuRemoverListenersPartidas = () => {
  const editarBtns = document.querySelectorAll("#partidas button.btnEdit")
  const removerBtns = document.querySelectorAll("#partidas button.btnRemove")
  editarBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      console.log("cliked editar", btn)
      const id = Number((event.target as HTMLElement).getAttribute("data-id"));
      editarItemPartidas(id);
    });
  });

  removerBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      console.log("cliked remover", btn)
      const id = Number((event.target as HTMLElement).getAttribute("data-id"));
      removerItemPartidas(id);
    });
  });
}

gerarListaListener()
exibirTabelaPartidas()
editarOuRemoverListenersPartidas()
exibirCampeonatos()