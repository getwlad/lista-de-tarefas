const taskListPending = localStorage.getItem("taskListPending")
  ? JSON.parse(localStorage.getItem("taskListPending"))
  : [];
const taskListCompleted = localStorage.getItem("taskListCompleted")
  ? JSON.parse(localStorage.getItem("taskListCompleted"))
  : [];

document.addEventListener("DOMContentLoaded", function (e) {
  //Criação de elementos
  const input = document.querySelector(".input-tarefa");
  //---funções
  //Criar Elemento
  const createElement = (tagName, className) => {
    const element = document.createElement(tagName);
    if (className && className !== undefined) {
      Array.isArray(className)
        ? className.forEach((clss) => element.classList.add(clss))
        : element.classList.add(className);
    }
    return element;
  };
  //Limpar input
  const erase = () => {
    input.value = "";
  };
  //Remover um item
  const removerItem = (e) => {
    const tagName = e.target.tagName;
    let id = -1;
    if (tagName === "I") {
      id = e.target.parentNode.parentNode.firstChild.getAttribute("id");
      e.target.parentNode.parentNode.remove();
    } else {
      id = e.target.parentNode.firstChild.getAttribute("id");
      e.target.parentNode.remove();
    }
    const index = taskListPending.findIndex((task) => task.id == id);
    if (index != -1) {
      taskListPending.splice(index, 1);
    } else {
      const index = taskListCompleted.findIndex((task) => task.id == id);
      taskListCompleted.splice(index, 1);
    }
    saveData();
  };
  //Salvar dados no localstorage
  const saveData = () => {
    localStorage.setItem("taskListPending", JSON.stringify(taskListPending));
    localStorage.setItem(
      "taskListCompleted",
      JSON.stringify(taskListCompleted)
    );
  };
  const tarefaConcluida = (e) => {
    e.preventDefault();
    const id = e.target.parentNode.parentNode.id;
    if (id === "tarefas-pendentes") {
      const tarefasConc = document.querySelector("#tarefa-concluida");
      tarefasConc.appendChild(e.target.parentNode);
      const id = e.target.parentNode.firstChild.getAttribute("id");
      const index = taskListPending.findIndex((task) => task.id == id);
      const task = taskListPending[index];
      taskListCompleted.push({ ...task });
      taskListPending.splice(index, 1);
      saveData();
    } else {
      const tarefasPend = document.querySelector("#tarefas-pendentes");
      tarefasPend.appendChild(e.target.parentNode);
      const id = e.target.parentNode.firstChild.getAttribute("id");
      const index = taskListCompleted.findIndex((task) => task.id == id);
      const task = taskListCompleted[index];
      taskListPending.push({ ...task });
      taskListCompleted.splice(index, 1);
      saveData();
    }
  };
  //Criar uma tarefa na tela
  const createTask = (task, id, sectionId) => {
    // li
    const taskItem = createElement("li");
    //botao
    const trashBtn = createElement("button", "btn-remove");
    trashBtn.onclick = removerItem;
    const iconBtn = createElement("i", ["fa-solid", "fa-trash"]);
    trashBtn.appendChild(iconBtn);
    //texto
    const spanItem = createElement("span");
    spanItem.innerText = task;
    spanItem.onclick = tarefaConcluida;
    spanItem.setAttribute("id", id);

    // inserir itens no li
    taskItem.appendChild(spanItem);
    taskItem.appendChild(trashBtn);
    // inserir li na lista de tarefas
    document.querySelector(sectionId).appendChild(taskItem);
  };
  const updateList = (taskList, id) => {
    document.querySelector(id).innerHTML = "";
    if (!taskList || taskList === undefined || taskList === []) {
      return;
    }
    taskList.forEach((task) => {
      createTask(task.name, task.id, id);
    });
  };
  //Atualizar a lista de tarefas
  updateList(taskListPending, "#tarefas-pendentes");
  updateList(taskListCompleted, "#tarefa-concluida");

  const submit = () => {
    if (!input.value || input.value === undefined || input.value === "") {
      return;
    }
    const id = new Date().getTime();
    taskListPending.push({ id, name: input.value });
    saveData();
    // updateList();

    createTask(input.value, id, "#tarefas-pendentes");

    erase();
  };

  const teclaPressionada = (e) => {
    if (e.keyCode === 13) {
      submit();
    }
    if (e.keyCode === 27) {
      erase();
    }
  };

  document.querySelector(".btn-tarefa").addEventListener("click", submit);
  input.addEventListener("keydown", teclaPressionada);
});
