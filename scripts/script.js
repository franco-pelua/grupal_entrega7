let url = 'https://6363a8a68a3337d9a2e39ca4.mockapi.io/'

let data = "";


function $(id) {
    return document.querySelector(id)
}

const inputGet1Id = $('#inputGet1Id')
const btnGet1 = $('#btnGet1')

const inputPostNombre = $('#inputPostNombre')
const inputPostApellido = $('#inputPostApellido')
const btnPost = $('#btnPost')

const inputPutId = $('#inputPutId')
const btnPut = $('#btnPut')

const inputDelete = $('#inputDelete')
const btnDelete = $('#btnDelete')

const results = $('#results')

const alert_error = $('#alert-error')

const modalBtn = $('#btnSendChanges')

const inputPutNombre = $('#inputPutNombre');
const inputPutApellido = $('#inputPutApellido');


const modal = new bootstrap.Modal(document.getElementById('dataModal'), null)


function fetching(peticion, url) {

    return fetch(url,
        {method: peticion.method,
        body: JSON.stringify(peticion.body),
        headers:{"Content-Type":"application/json"}})


    .then(res => {

        if(res.ok){
            return res.json()
        }else{
            return false
        }
    })
}

function listElements(element) {
    let li = `
    <li class="list-item-group">
    <p>ID: ${element.id}</p>
    <p>Name: ${element.name}</p>
    <p>Lastname: ${element.lastname}</p>
    </li>`

    results.insertAdjacentHTML("beforeend",li)
}

function showAlert(){
    alert_error.classList.add('show')
    setTimeout(()=>{
        alert_error.classList.remove('show')
    },5000)

    return false
}

async function getSingleUser(id){

    if(id.length <= 0) return showAlert();

    const user = await fetching({method:'GET'},url + 'users/'+ id)

    data = user

    if(!data){
        return showAlert()
    }

    results.textContent = "";

    listElements(data)

    return user
}

async function getAllUsers(){
    data = await fetching({method:'GET'},url + 'users')

    if(!data){
        return showAlert()
    }

    results.textContent = "";

    data.forEach(element =>{
        listElements(element)
    })
}


btnGet1.addEventListener('click',async (event)=>{
    event.preventDefault()
    

    if(inputGet1Id.value === ""){
        getAllUsers()

    }else{
        getSingleUser(inputGet1Id.value)
    }

})

btnPost.addEventListener('click',async (event)=>{
    event.preventDefault()

    let newObject = {
        name:inputPostNombre.value,
        lastname:inputPostApellido.value
    }

    data = await fetching({method:'POST',body:newObject}, url + 'users')
    console.log(data);

    if(!data){
        return showAlert()
    }

    results.textContent = "";

})


btnPut.addEventListener('click', async (event)=>{
    event.preventDefault()

    const user = await getSingleUser(inputPutId.value);

    console.log(user);

    if(user){
        inputPutNombre.value = user.name
        inputPutApellido.value = user.lastname
        modal.toggle()
    }


})

modalBtn.addEventListener('click', async (event)=>{
    event.preventDefault()

    const user = {name:$('#inputPutNombre').value, lastname:$('#inputPutApellido').value}

    const userUpdated = await fetching({method:'PUT',body:user}, url + 'users/' + $('#inputPutId').value)

    results.textContent = ""

    listElements(userUpdated)

    modal.toggle()
})


btnDelete.addEventListener('click', async (event) =>{
    event.preventDefault()

    console.log(inputDelete.value);

    const deleting = await fetching({method:'DELETE'}, url + 'users/' + inputDelete.value)

    await getAllUsers()
})

function onlyForNewUser (){
    if(inputPostNombre.value != "" && inputPostApellido.value !="" ){
        btnPost.disabled = false
    }else{
        btnPost.disabled = true
    }
}

function turnOffDisabled (input,btn){

    const myInput = $(`#${input}`)
    const myBtn = $(`#${btn}`)

    if(input == inputPostNombre.id) return onlyForNewUser()

    console.log('funciona');
    if(myInput.value != ""){
        myBtn.disabled = false
    }else{
        myBtn.disabled = true
    }
}







