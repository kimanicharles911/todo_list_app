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
const taskTemplate = document.querySelector("#task-template"); /* fetching the task template */
const newTaskForm = document.querySelector("[data-new-task-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");

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

/* form event listener */
newListForm.addEventListener("submit", e => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
})

newTaskForm.addEventListener("submit", e => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  if (taskName == null || taskName === "") return
  const task = createTask(taskName);
  newTaskInput.value = null;
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
})

/* function to create a list */
function createList(name){
  return { id: Date.now().toString(), name: name,  tasks: []}

}
/* function to create a task */
function createTask(name){
  return { id: Date.now().toString(), name: name,  complete: false}   
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
    renderTaskCount(selectedList);/* setting count of remaining tasks */
    clearElement(tasksContainer);/* clear task HTML container */
    renderTasks(selectedList);
  }
}

function renderTasks(selectedList){
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true); /* enables cloning of task with template */
    const checkbox = taskElement.querySelector("input"); 
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
  })
}

function renderTaskCount(selectedList){
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
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
































































































































































































































































































