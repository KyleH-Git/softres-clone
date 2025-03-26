// ***** Query Selectors ***** 
const newUserBtn = document.querySelector('#new-user');
const usernameElement = document.querySelector('#username');
const classElement = document.querySelector('#class');
const specOptions = document.querySelectorAll('.spec');
const specializationElement = document.querySelector('#spec');
const softReserveElement = document.querySelector('#softresd');
const softReserveFormElement = document.querySelector('#softres-form');
const softReserveFormBtn = document.querySelector('#softres-form-button');
const cancelBtn = document.querySelector('#cancel-btn');
const newReserveBtn = document.querySelector('#new-user');
const itemElements = document.querySelectorAll('.item');
const softResLabelElement = document.querySelector('label[for=softresd');

// ***** Event Listeners *****

newUserBtn.addEventListener('click', (event) => {
    newReserveBtn.classList.toggle('hidden');
    softReserveFormElement.classList.toggle('hidden');
});

cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    classElement.setAttribute('disabled', "");
    specializationElement.setAttribute('disabled', "");
    softReserveElement.setAttribute('disabled', "");
    softReserveFormBtn.setAttribute('disabled', "");
    softReserveElement.children[0].setAttribute('hidden', "");
    softReserveElement.children[0].value = '';
    softReserveElement.children[0].innerText = '';
    softResLabelElement.innerText = 'Soft-Reserve: 0 of 2';
    const inputs = document.getElementsByTagName('input');
    const selects = document.getElementsByTagName('select');
    for(input of inputs){
        input.value = '';
    }
    for(select of selects){
        select.value = '';
    }
    for(spec of specOptions){
        spec.setAttribute('hidden', "");
    }
    for(item of itemElements){
        item.removeAttribute('hidden', "")
    }
    newReserveBtn.classList.toggle('hidden');
    softReserveFormElement.classList.toggle('hidden');
    
});

usernameElement.addEventListener('input', (event) => {
    classElement.removeAttribute('disabled');
});

classElement.addEventListener('change', (event) => {
    console.log(classElement.value);
    specializationElement.removeAttribute('disabled');
    for(spec of specOptions){
        spec.setAttribute('hidden', "");
    }
    for(spec of document.querySelectorAll(`.${classElement.value}`)){
        spec.removeAttribute('hidden');
    }
});

specializationElement.addEventListener('change', (event) => {
    softReserveElement.removeAttribute('disabled');
});

softReserveElement.addEventListener('change', (event) => {
    softReserveElement.classList.add(`${softReserveElement.value}`)
    for(item of itemElements){
        if(item.value === softReserveElement.value){
            if(softReserveElement.children[0].hasAttribute('hidden')){
                softResLabelElement.innerText = 'Soft-Reserve: 1 of 2';
                softReserveElement.children[0].removeAttribute('hidden');
                softReserveElement.children[0].innerText = item.innerText;
                softReserveElement.children[0].value = item.value;
            }else{
                softResLabelElement.innerText = 'Soft-Reserve: 2 of 2';
                softReserveElement.children[0].innerText +=  `, ${item.innerText}`;
                softReserveElement.children[0].value += ' ' + item.value;
                softReserveElement.children[0].selected = true;
                softReserveFormBtn.removeAttribute('disabled');
            }
        }
    }
    if(softReserveElement.classList.length === 2){
        for(item of itemElements){
            item.setAttribute('hidden', "")
        }
    }
});
