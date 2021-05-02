//Tum elementleri secme
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group")
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");
eventListener();

function eventListener(){
    //tum event Listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    //Arayuzden todolari temizleme
    if(confirm("Tumunu silmek istermisiniz?")){
        //Arayuzden todolari temizleyek
        //todoList.innerHTML=" "//yavas olur biraz
        while(todoList.firstElementChild!=null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos")
    }
}


function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue)===-1){
            //Bulamadi
            listItem.setAttribute("style","display: none !important")
        }
        else{
            listItem.setAttribute("style","display: block ")
        }

    })
}


function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
       e.target.parentElement.parentElement.remove();
       deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
       showAlert("success","Todo basarili sekilde silindi...")
    }
}


function deleteTodoFromStorage(deletetodo){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1); //Arraydan degeri silebiliriz.

        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}




function loadAllTodosToUI(){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);

    });

}

function addTodo(e){
    const newTodo=todoInput.value.trim();
    if(newTodo === " "){
       
        showAlert("danger","Lutfen bir todo girin...");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo basasarili sekilde eklendi...");
    }
    
    
    e.preventDefault();
}

function getTodosFromStorage(){//Storagedan Todolari alib
    let todos;


    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos=getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

    

}
function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;

    firstCardBody.appendChild(alert);
    alert.remove();
    //setTimeout
    window.setTimeout(function(){
        alert.remove();
    },4000);


}


function addTodoToUI(newTodo){// String deyerini list item olaraq UI'ya ekleyecek
    /*<li class="list-group-item d-flex justify-content-between">Todo 1
    <a href="#" class="delete-item"><i class="fa fa-remove"></i></a>
</li>*/
//List Item Olusturma
const listItem=document.createElement("li");
//link olusturma
const link=document.createElement("a");
link.href="#"
link.className="delete-item";
link.innerHTML="<i class='fa fa-remove'></i>";

//list Item tam olusturma
listItem.className="list-group-item d-flex justify-content-between";

//Text Node
listItem.appendChild(document.createTextNode(newTodo))

listItem.appendChild(link);
// Todo Liste e List Itemi ekleme 
todoList.appendChild(listItem)
todoInput.value="";
}






