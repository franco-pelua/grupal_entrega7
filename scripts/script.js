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
}


btnGet1.addEventListener('click',async (event)=>{
    event.preventDefault()

    

    if(inputGet1Id.value === ""){

        data = await fetching({method:'GET'},url + 'users')

        if(!data){
            return showAlert()
        }

        results.textContent = "";

        data.forEach(element =>{
            listElements(element)
        })

    }else{
        data = await fetching({method:'GET'},url + 'users/'+ inputGet1Id.value)

        if(!data){
            return showAlert()
        }

        results.textContent = "";

        listElements(data)

        console.log(data);
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



