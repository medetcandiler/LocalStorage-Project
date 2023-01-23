let dataArr= localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [] // if local storage which is named items is exist then parse it , if does not exist return array ...

console.log(dataArr)

document.querySelector('#form').addEventListener('submit', (e)=>{
    e.preventDefault()
    const item=document.querySelector('#item')
    createList(item)
})

function createList(i){
    if(i.value.length<5){
        alert(`${i.value} : is not valit. Write at least 5 character`)
    }else dataArr.push(i.value)
    localStorage.setItem('items', JSON.stringify(dataArr))
    location.reload()
}

function displayArrItems(){
    let items=''
    for(let i of dataArr){
        items+= `
                <div class="item">
                    <div class="input-controller">
                        <textarea id="textArea" disabled>${i}</textarea>
                        <div class="edit-controller">
                            <i class="fa-solid fa-check deleteBtn"></i>
                            <i class="fa-solid fa-pen-to-square editBtn"></i>
                        </div>
                    </div>
                    <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>
        `
    }
    document.querySelector('.to-do-list').innerHTML=items
    deleteListener()
    editListener()
    saveListener()
    cancelListener()
}

function cancelListener(){
    let cancelBtnDOM=document.querySelectorAll('.cancelBtn')
    let updateControllersDOM=document.querySelectorAll('.update-controller');
    let textAreaDOM=document.querySelectorAll('#textArea')
    cancelBtnDOM.forEach((item, i) => {
        item.addEventListener('click', () => { 
            updateControllersDOM[i].style.display= 'none'
            textAreaDOM[i].disabled=true
        })
    })
}

function deleteListener(){
    let deleteBtnDOM=document.querySelectorAll('.deleteBtn');
    deleteBtnDOM.forEach((item, i)=>{
        item.addEventListener('click', ()=> {deleteItem(i)})
    })
}

function saveListener(){
    let saveBtnDOM=document.querySelectorAll('.saveBtn')
    let textAreaDOM=document.querySelectorAll('#textArea')
    saveBtnDOM.forEach((item, i ) => {
        item.addEventListener('click', () => {
            updateItem(textAreaDOM[i].value, i)
        })
    })
}

function editListener(){
    let editBtnDOM=document.querySelectorAll('.editBtn')
    let updateControllersDOM=document.querySelectorAll('.update-controller')
    let textAreaDOM= document.querySelectorAll('#textArea')
    editBtnDOM.forEach((item, i)=> {
        item.addEventListener('click', ()=>{
            updateControllersDOM[i].style.display= 'block '
            textAreaDOM[i].disabled = false
        })
    })
}


function updateItem(text, i){
    dataArr[i] = text
    localStorage.setItem('items', JSON.stringify(dataArr))
    location.reload()
}


function deleteItem(i){
    dataArr.splice(i, 1)
    localStorage.setItem('items', JSON.stringify(dataArr))
    location.reload()
}


function displayDate(){
    let d= new Date();
    let todayDate= d.toString().split(' ').slice(1,4)
    console.log(todayDate );
    let dateDOM=document.querySelector('#date')
    dateDOM.innerHTML= todayDate.join(' ')
}
window.onload= function(){
    displayDate()
    displayArrItems()
}
