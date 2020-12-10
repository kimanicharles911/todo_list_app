/* get container for our lists */
const listsContainer = document.querySelector("[data-lists]");

/* fetching the form */
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
 

/* variable that holds all our lists */
let lists = [{id: 1, name:"name"}, {id: 2, name:"todo"}];

/* from event listener */
newListForm.addEventListener("submit", e => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  render();
})

/* function to create a list */
function createList(name){
  return { id: Date.now().toString(), name: name,  tasks: []}
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

































































































































































































































































































