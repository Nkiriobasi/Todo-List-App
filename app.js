// GETTING ALL THE REQUIRED ELEMENTS
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; // GETTING USER ENTERED VALUE
    if(userData.trim() != 0){    // IF USER INPUT BOX DOES NOT CONTAIN A SPACE
        addBtn.classList.add("active");  // ACTIVE THE ADD BUTTON
    }else{
        addBtn.classList.remove("active");  // UNACTIVE THE ADD BUTTON
    }
}

showTasks(); // THE FUNCTION PLACED HERE WILL CAUSE ALL YOUR LISTED TODOS NOT TO WRAP EVEN AFTER REFRESH



// IF USER CLICKS ON THE ADD BUTTON
addBtn.onclick = () =>{
    let userData = inputBox.value; // GETTING USER ENTERED VALUE
    let getLocalStorage = localStorage.getItem("New Todo");  // GETTING LOCALSTORAGE
    if(getLocalStorage == null){  // IF LOCALSTORAGE IS NULL
        listArr = [];  // CREATING BLANK ARRAY
    }else{
        listArr = JSON.parse(getLocalStorage);  // TRANSFORMING JSON STRING INTO A JS OBJECT
    }
    listArr.push(userData);  // PUSHING OR ADDING USER DATA
    localStorage.setItem("New Todo", JSON.stringify(listArr));  // TRANSFORMING JS OBJECT INTO A JSON STRING
    showTasks(); // CALLING SHOWTASKS FUNCTION(WHEN YOU CLICK ON THE PLUS BUTTON YOU ARE CALLING THE FUNCTION TO ACT)
    addBtn.classList.remove("active");  // UNACTIVE THE ADD BUTTON
}



// FUNCTION TO ADD TASK LIST INSIDE UL
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");  // GETTING LOCALSTORAGE
    if(getLocalStorage == null){  // IF LOCALSTORAGE IS NULL
        listArr = [];  // CREATING BLANK ARRAY
    }else{
        listArr = JSON.parse(getLocalStorage);  // TRANSFORMING JSON STRING INTO A JS OBJECT
    }
    const pendingNumb = document.querySelector(".pendingNum");
    pendingNumb.textContent = listArr.length;  // PASSING THE LENGTH OF THE VALUE IN PENDINGNUM
    if(listArr.length > 0){  // IF ARRAY LENGTH IS GREATER THAN O
        clearAllBtn.classList.add("active") // ACTIVE THE CLEARALL BUTTON
    }else{
        clearAllBtn.classList.remove("active") // UNACTIVE THE CLEARALL BUTTON
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick= "deleteTask(${index})"; > <img src="./trash-icon.png" alt="" /> </li>`;
    });
    todoList.innerHTML = newLiTag;  // ADDING NEW LI TAG INSIDE UL TAG
    inputBox.value = "";  // ONCE TASKS ARE ADDED THE INPUT FIELD IS LEFT BLANK
}



// FUNCTION TO DELETE TASK 
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1)  // DELETE OR REMOVE THE PARTICULAR INDEXED LI
    
    // AFTER A PARTICULAR LI HAVE BEEN REMOVED OR DELETED UPDATE THE LOCAL STORAGE
    localStorage.setItem("New Todo", JSON.stringify(listArr)); 
    showTasks();
}


// FUNCTION TO CLEAR ALL TASKS
clearAllBtn.onclick = () =>{
    listArr = [];  // EMPTY AN ARRAY
    
    // AFTER DELETING ALL TASKS UPDATE THE LOCAL STORAGE
    localStorage.setItem("New Todo", JSON.stringify(listArr)); 
    showTasks();

}