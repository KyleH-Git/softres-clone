// ***** Query Selectors ***** 
const usernameElement = document.querySelector('#username');
const classElement = document.querySelector('#class');
const specOptions = document.querySelectorAll('.spec');
const specializationElement = document.querySelector('#spec');
const softReserveElement = document.querySelector('#softresd');
const softReserveFormBtn = document.querySelector('#softres-form-button');
const cancelBtn = document.querySelector('#cancel-btn');
const itemElements = document.querySelectorAll('.item');
const softResLabelElement = document.querySelector('label[for=softresd');

// ***** Event Listeners *****


classElement.addEventListener('change', (event) => {
    for(spec of specOptions){
        spec.setAttribute('hidden', "");
    }
    for(spec of document.querySelectorAll(`.${classElement.value}`)){
        spec.removeAttribute('hidden');
    }
    specializationElement.value = '';
});

cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    location.href = '/';
});

window.addEventListener('load', (event) => {
    for(spec of specOptions){
        spec.setAttribute('hidden', "");
    }
    console.log(classElement.value)
    for(spec of document.querySelectorAll(`.${classElement.value.toLowerCase()}`)){
        spec.removeAttribute('hidden');
    }
});

softReserveElement.addEventListener('change', (event) => {
    softReserveElement.classList.add(`${softReserveElement.value}`)
    for(item of itemElements){
        console.log(item.value)
        console.log(softReserveElement.value + 'softresele')
        if(item.value === softReserveElement.value){

            if(softReserveElement.children[0].hasAttribute('hidden')){
                softResLabelElement.innerText = 'Soft-Reserve: 1 of 2';
                softReserveElement.children[0].removeAttribute('hidden');
                softReserveElement.children[0].innerText = item.innerText;
                softReserveElement.children[0].value = item.value;
            }else{
                softResLabelElement.innerText = 'Soft-Reserve: 2 of 2';
                softReserveElement.children[0].innerText = softReserveElement.children[0].innerText + `, ${item.innerText}`;
                softReserveElement.children[0].value = softReserveElement.children[0].value + ' ' + item.value;
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