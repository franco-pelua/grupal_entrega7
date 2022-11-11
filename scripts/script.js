import api_handler from './api_handler.js';

const api = new api_handler('https://6363a8a68a3337d9a2e39ca4.mockapi.io/');

const $ = (selector) => document.querySelector(selector);

const modal = new bootstrap.Modal(document.getElementById('dataModal'), null);

const inputPutNombre = $('#inputPutNombre');
const inputPutApellido = $('#inputPutApellido');

function listElements(element) {
    const results = $('#results');
    
    results.textContent = '';

    if(element.length) {
        element.forEach(entry => {
            let li = `
            <li class="list-item-group">
                <p>ID: ${entry.id}</p>
                <p>Name: ${entry.name}</p>
                <p>Lastname: ${entry.lastname}</p>
            </li>`
        
            results.insertAdjacentHTML("beforeend",li)
        })
    } else {
        let li = `
            <li class="list-item-group">
                <p>ID: ${element.id}</p>
                <p>Name: ${element.name}</p>
                <p>Lastname: ${element.lastname}</p>
            </li>`
        
        results.insertAdjacentHTML("beforeend",li)
    }

}

function showAlert(){
    const alert_error = $('#alert-error');

    alert_error.classList.add('show');

    setTimeout(()=>{
        alert_error.classList.remove('show');
    },5000);

    return false;
}

$('#btnGet1').addEventListener('click',async ()=>{
    const inputGet1Id = $('#inputGet1Id');

    if(inputGet1Id.value === ""){
        const users = await api.getAllUsers();
        
        if(!users) return showAlert();

        listElements(users);
    }else{
        const user = await api.getSingleUser(inputGet1Id.value);
        
        if(!user) return showAlert();

        listElements(user);
    }

})

$('#btnPost').addEventListener('click', async()=>{
    const inputPostNombre = $('#inputPostNombre');
    const inputPostApellido = $('#inputPostApellido');

    let user_info = {
        name:inputPostNombre.value,
        lastname:inputPostApellido.value
    }

    const newUser = await api.postNewUser(user_info);
    
    if(!newUser) return showAlert()

    $('#results').textContent = "";
})


$('#btnPut').addEventListener('click', async ()=>{
    const inputPutId = $('#inputPutId');

    const user = await api.getSingleUser(inputPutId.value);

    if(!user) return showAlert();

    inputPutNombre.value = user.name
    inputPutApellido.value = user.lastname
    api.selectUser(user)
    modal.toggle()
})

inputPutNombre.addEventListener('input', () => api.updateCurrentUser(inputPutNombre.value, false));
inputPutApellido.addEventListener('input', () => api.updateCurrentUser(false, inputPutApellido.value));

$('#btnSendChanges').addEventListener('click', async ()=>{
    const user = api.getCurrentUser();

    const userUpdated = await api.updateUser(user);

    listElements(userUpdated);

    modal.toggle()
})


$('#btnDelete').addEventListener('click', async () =>{;
    const deleting = await api.deleteUser($('#inputDelete').value);

    if(!deleting) return showAlert();

    const users = await api.getAllUsers();

    listElements(users);
})