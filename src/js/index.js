const taskList = [];
//Criação de elementos
const input = document.querySelector(".input-tarefa");
// funções
const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  if (className && className !== undefined) {
    Array.isArray(className)
      ? className.forEach((clss) => element.classList.add(clss))
      : element.classList.add(className);
  }
  return element;
};
const erase = () => {
  input.value = "";
};
const updateList = () => {
  document.querySelector("#tarefas-pendentes").innerHTML = "";
  taskList.forEach((task) => {
    const li = createElement("li");
    li.innerHTML = task;
    document.querySelector("#tarefas-pendentes").appendChild(li);
  });
};
const submit = () => {
  if (!input.value || input.value === undefined || input.value === "") {
    return;
  }
  //usando array
  // taskList.push(
  //   `<span>${input.value}</span onclick={tarefaConcluida}><button onclick="{removerItem}" class="btn-remove"><i class="fa-solid fa-trash"></i></button>`
  // );
  // updateList();

  // li
  const taskItem = createElement("li");
  //botao
  const trashBtn = createElement("button", "btn-remove");
  trashBtn.onclick = removerItem;
  const iconBtn = createElement("i", ["fa-solid", "fa-trash"]);
  trashBtn.appendChild(iconBtn);
  //texto
  const spanItem = createElement("span");
  spanItem.innerText = input.value;
  spanItem.onclick = tarefaConcluida;
  // inserir itens no li
  taskItem.appendChild(spanItem);
  taskItem.appendChild(trashBtn);
  // inserir li na lista de tarefas
  document.querySelector("#tarefas-pendentes").appendChild(taskItem);

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

const removerItem = (e) => {
  e.target.tagName === "I"
    ? e.target.parentNode.parentNode.remove()
    : e.target.parentNode.remove();
};
const tarefaConcluida = (e) => {
  e.preventDefault();
  const id = e.target.parentNode.parentNode.id;
  if (id === "tarefas-pendentes") {
    const tarefasConc = document.querySelector("#tarefa-concluida");
    tarefasConc.appendChild(e.target.parentNode);
  } else {
    const tarefasPend = document.querySelector("#tarefas-pendentes");
    tarefasPend.appendChild(e.target.parentNode);
  }
};
document.querySelector(".btn-tarefa").addEventListener("click", submit);
input.addEventListener("keydown", teclaPressionada);
