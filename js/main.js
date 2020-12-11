/* get container for our lists */
const listsContainer = document.querySelector("[data-lists]");

/* fetching the form */
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");/* fetching the delete button */
const listDisplayContainer = document.querySelector("[data-list-display-container]");/* fetching the to-do list container */
const listTitleElement = document.querySelector("[data-list-title]");/* fetching the to-do list title */
const listCountElement = document.querySelector("[data-list-count]");/* fetching the to-do list count */
const tasksContainer = document.querySelector("[data-tasks]");/* fetching the tasks container that has the to-dos */

/* Saving user input */
const LOCAL_STORAGE_LIST_KEY = "task.lists";
        /* key for variable that stores the selected list */
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId"

/* variable that holds all our lists */
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] ;

/* to select a list on left form: first make a variable for the selected list */
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

/* adding an event listener to the HTML container */
listsContainer.addEventListener("click", e => {
  e.preventDefault()
  if(e.target.tagName.toLowerCase() === "li"){
    selectedListId = e.target.dataset.listId;
    saveAndRender();  
  }
})

/* delete button event listener */
deleteListButton.addEventListener("click", e => {
  lists = lists.filter(list => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
})

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
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

/* render function that renders the list */
function render(){
  clearElement(listsContainer);
  renderLists();
  const selectedList = lists.find(list => list.id === selectedListId);/* finding the list that has the ID of the selectedList */
  if(selectedListId == null){
    listDisplayContainer.style.display = "none";    
  }else{
    listDisplayContainer.style.display = "";
    listTitleElement.innerText = selectedList.name;
  }
}

function renderLists(){
  lists.forEach(list => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    if(list.id === selectedListId) {
      listElement.classList.add("active-list")
    }
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

































































































































































































































































































