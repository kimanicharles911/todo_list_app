/* get container for our lists */
const listsContainer = document.querySelector("[data-lists]");

/* fetching the form */
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
 
/* Saving user input */
const LOCAL_STORAGE_LIST_KEY = "task.lists";

/* variable that holds all our lists */
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] ;

/* from event listener */
newListForm.addEventListener("submit", e => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
})

/* function to create a list */
function createList(name){
  return { id: Date.now().toString(), name: name,  tasks: []}
}

function saveAndRender(){
  save();
  render();
}


/* function to save the list in the line with let lists = JSON.parse... */
function save(){
  /* localStorage.setItem(THE_KEY, THE_VALUE_OF_THAT_KEY); */
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

/* render function that renders the list */
function render(){
  clearElement(listsContainer);
  lists.forEach(list => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    listsContainer.appendChild(listElement)
  })
}

/* removes default HTML */
function clearElement(element){
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
}





render();

































































































































































































































































































