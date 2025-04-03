"use strict";
const formPartida = document.getElementById("formPartida");
const formPartidaItens = {
    campeonatoId: document.getElementById("campeonatos"),
    mandanteI: document.getElementById("timeMandante"),
    visitanteI: document.getElementById("timeVisitante"),
};
const tabelaPartida = document.getElementById("partidas");
const partidasSalvas = getLocalStorageItem("partidas");
let partidas = partidasSalvas ?? [];
const campeonatosPartidas = getLocalStorageItem("campeonatos");
const gerarListaListener = () => {
    formPartida?.addEventListener("submit", (event) => {
        event.preventDefault();
        let lastIdIncrement = partidasSalvas && partidasSalvas.length > 0 ? partidasSalvas[partidasSalvas.length - 1].id + 1 : 1;
        let partida = {
            id: lastIdIncrement,
            campeonato: campeonatosPartidas ? campeonatosPartidas.find(c => c.id == Number.parseInt(formPartidaItens.campeonatoId.value)) ?? null : null,
            timeMandante: formPartidaItens.mandanteI.value ?? "",
            timeVisitante: formPartidaItens.visitanteI.value ?? "",
        };
        partidas.push(partida);
        formPartida?.reset();
        atualizarDadosPartidas();
    });
    exibirTabelaPartidas();
};
const atualizarDadosPartidas = () => {
    setLocalStorageItems("partidas", partidas);
    exibirTabelaPartidas();
    editarOuRemoverListenersPartidas();
};
const removerItemPartidas = (id) => {
    const campIndex = partidasSalvas.findIndex((p) => p.id == id);
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        partidasSalvas.splice(campIndex, 1);
        partidas = partidasSalvas;
        atualizarDadosPartidas();
    }
    exibirTabelaPartidas();
};
const editarItemPartidas = (id) => {
    //Find = buscar um elemento em um array
    const partida = partidasSalvas.find((p) => p.id == id);
    if (!partida)
        return;
    formPartidaItens.campeonatoId.value = partida.campeonato.id ?? 0;
    formPartidaItens.mandanteI.value = partida.timeMandante;
    formPartidaItens.visitanteI.value = partida.timeVisitante;
    //findIndex buscar o index do objeto
    const campIndex = partidasSalvas.findIndex((p) => p.id == id);
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        partidasSalvas.splice(campIndex, 1);
        partidas = partidasSalvas;
        atualizarDadosPartidas();
    }
    exibirTabelaPartidas();
};
const exibirTabelaPartidas = () => {
    if (tabelaPartida.innerHTML != "")
        tabelaPartida.innerHTML = "";
    if (partidasSalvas) {
        partidasSalvas.forEach((p) => {
            tabelaPartida.innerHTML += `
      <tr>
          <td>${p.campeonato.nome ?? "N/A"}</td>
          <td>${p.timeMandante}</td>
          <td>${p.timeVisitante}</td>
          <button class="btnEdit" data-id="${p.id}""> Editar </button> 
          <button class="btnRemove" data-id="${p.id}"> Remover </button>
      </tr>
    `;
        });
    }
};
const exibirCampeonatos = () => {
    const selectCampeonatos = document.getElementById("campeonatos");
    selectCampeonatos.innerHTML = "";
    campeonatosPartidas.forEach((c) => {
        selectCampeonatos.innerHTML += `
      <option value="${c.id}">${c.nome}</option>
    `;
    });
};
const editarOuRemoverListenersPartidas = () => {
    const editarBtns = document.querySelectorAll("#partidas button.btnEdit");
    const removerBtns = document.querySelectorAll("#partidas button.btnRemove");
    editarBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            console.log("cliked editar", btn);
            const id = Number(event.target.getAttribute("data-id"));
            editarItemPartidas(id);
        });
    });
    removerBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            console.log("cliked remover", btn);
            const id = Number(event.target.getAttribute("data-id"));
            removerItemPartidas(id);
        });
    });
};
gerarListaListener();
exibirTabelaPartidas();
editarOuRemoverListenersPartidas();
exibirCampeonatos();
