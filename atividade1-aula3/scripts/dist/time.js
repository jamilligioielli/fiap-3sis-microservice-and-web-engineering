"use strict";
const formTime = document.getElementById("formTimes");
let formItensTime = {
    nomeI: document.getElementById("nome"),
    nomeCurtoI: document.getElementById("nomeCurto"),
};
const tabelaTime = document.getElementById("times");
const timesSalvos = window.getLocalStorageItem("times");
let times = timesSalvos ?? [];
const gerarTimesListener = () => {
    formTime?.addEventListener("submit", (event) => {
        event.preventDefault();
        let lastIdIncrement = timesSalvos && timesSalvos.length > 0 ? timesSalvos[timesSalvos.length - 1].id + 1 : 1;
        let time = {
            id: lastIdIncrement,
            nome: formItensTime.nomeI.value ?? "",
            nomeCurto: formItensTime.nomeCurtoI.value ?? ""
        };
        times.push(time);
        atualizarDadosTime();
    });
    exibirTabelaTime();
};
const removerItemTime = (id) => {
    const index = timesSalvos.findIndex((t) => t.id == id);
    //Validar se encontrou algum item  
    if (index !== -1) {
        //remover da lista
        timesSalvos.splice(index, 1);
        times = timesSalvos;
        atualizarDadosTime();
    }
    exibirTabelaTime();
};
const editarItemTime = (id) => {
    //Find = buscar um elemento em um array
    const item = timesSalvos.find((t) => t.id == id);
    if (!item)
        return;
    formItensTime.nomeI.value = item.nome;
    formItensTime.nomeCurtoI.value = item.nomeCurto;
    //findIndex buscar o index do objeto
    const campIndex = timesSalvos.findIndex((t) => t.id == id);
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        timesSalvos.splice(campIndex, 1);
        times = timesSalvos;
        atualizarDadosTime();
    }
    exibirTabelaTime();
};
const exibirTabelaTime = () => {
    if (tabelaTime.innerHTML != "")
        tabelaTime.innerHTML = "";
    timesSalvos.forEach((time) => {
        tabelaTime.innerHTML += `
    <tr>
         <td>${time.nome}</td>
         <td>${time.nomeCurto}</td>
         <button class="btnEdit" data-id="${time.id}""> Editar </button> 
         <button class="btnRemove" data-id="${time.id}"> Remover </button> 
    </tr>
  `;
    });
};
const atualizarDadosTime = () => {
    setLocalStorageItems("times", times);
    exibirTabelaTime();
    editarOuRemoverListenersTime();
};
const editarOuRemoverListenersTime = () => {
    let editarBtns = document.querySelectorAll("#times button.btnEdit");
    let removerBtns = document.querySelectorAll("#times button.btnRemove");
    console.log(editarBtns);
    console.log(removerBtns);
    editarBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const id = Number(event.target.getAttribute("data-id"));
            editarItemTime(id);
        });
    });
    removerBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const id = Number(event.target.getAttribute("data-id"));
            removerItemTime(id);
        });
    });
};
gerarTimesListener();
exibirTabelaTime();
editarOuRemoverListenersTime();
