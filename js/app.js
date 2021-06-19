const addtodo = document.querySelector('#addTodo');
const edit = document.querySelector('#edit');
const del = document.querySelector('#delete');
const todoTitle = document.querySelector('#todoTitle');
const todoDesc = document.querySelector('#todoDesc');
const tableData = document.querySelector('#tblData');
const todoTable = document.querySelector('.todoTable');

document.querySelector("#cancel").addEventListener('click',()=>{
    document.querySelector('#edittodo').value=""
    document.querySelector('#editdec').value=""

   document.querySelector('#editFrom').style.display="none" 
  
})


if (!localStorage.getItem('todo')) {
    const newArray = new Array();
    const mkJson = JSON.stringify(newArray);
    localStorage.setItem('todo', mkJson)
}

const updateTable = () => {
    tableData.innerHTML = ""
    const currentItem = JSON.parse(localStorage.getItem('todo'))
    if(currentItem.length===0){
        document.querySelector('.todoTable thead').style.display="none";
        document.querySelector('#emtyMsg').innerHTML="There is no todo"
    }else{
        document.querySelector('#emtyMsg').innerHTML=""
        document.querySelector('.todoTable thead').removeAttribute('style')
    }
    let serial = 1
    currentItem.forEach((item, index) => {
        tableData.innerHTML += `<tr id="itemSingle" data-itemid="${index}">
                <td>${serial}</td>
                <td>${item.title}</td>
                <td>${item.des}</td>
                <td>
                <button id='edit' class="btn btn-success">Edit</button>
                <button id="delete" class="btn btn-danger">Delete</button>
                </td>
                </tr>`;

        serial++;
    });
    deleteFunc();
}
updateTable()

const addtodos = () => {
    addtodo.addEventListener("click", () => {
        let title = todoTitle.value.trim();
        let dec = todoDesc.value.trim();
        const newtodo = {
            title: title,
            des: dec
        }
        let current = JSON.parse(localStorage.getItem('todo'));
        current.push(newtodo);
        let jsondata = JSON.stringify(current);
        localStorage.setItem('todo', jsondata)

        todoTitle.value = "";
        todoDesc.value = "";
        updateTable()
    })

}
addtodos();


function deleteFunc() {
    const itemSingle = document.querySelectorAll('#itemSingle');

    itemSingle.forEach((value, index) => {
        value.querySelector('#delete').addEventListener('click', () => {
            let clickEvent = Number(value.getAttribute('data-itemid'))
            let currentTarget = JSON.parse(localStorage.getItem('todo'))
            let remmaingdata = currentTarget.filter((todo, index)=>{
               return index !== clickEvent
            })
            localStorage.clear()
          localStorage.setItem('todo',JSON.stringify(remmaingdata))
          updateTable()
        })
    })
    modifytodo();
}

deleteFunc();


function modifytodo() {
    const itemSingle = document.querySelectorAll('#itemSingle');

    itemSingle.forEach((value, index) => {
        value.querySelector('#edit').addEventListener('click', () => {
            let clickEvent = Number(value.getAttribute('data-itemid'))
            let currentTarget = JSON.parse(localStorage.getItem('todo'))
          
            document.querySelector('#edittodo').value=currentTarget[clickEvent].title
            document.querySelector('#editdec').value=currentTarget[clickEvent].des

           document.querySelector('#editFrom').style.display="block" 
          
document.querySelector('#hiddenvalue').value=clickEvent;


        //     localStorage.clear()
        //   localStorage.setItem('todo',JSON.stringify(remmaingdata))
        //   updateTable()
        })
    })
}
modifytodo();


function  updateTodos(){
    document.querySelector('#modify').addEventListener('click',()=>{
        let currentTarget = JSON.parse(localStorage.getItem('todo'))
       let titleTodo= document.querySelector('#edittodo').value
       let decTodo= document.querySelector('#editdec').value
       let newobj={
         title:titleTodo,
         des:decTodo
       }
      
       let updateKey=Number(document.querySelector('#hiddenvalue').value);
       currentTarget[updateKey]=newobj
       localStorage.clear();
       localStorage.setItem('todo',JSON.stringify(currentTarget))
       updateTable();
       document.querySelector('#edittodo').value=""
     document.querySelector('#editdec').value=""
     document.querySelector('#editFrom').style.display='none'

    })

}
updateTodos();