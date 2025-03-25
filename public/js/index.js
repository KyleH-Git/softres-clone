// ***** Query Selectors ***** 
const usernameElement = document.querySelector('#username');
const classElement = document.querySelector('#class');
const specOptions = document.querySelectorAll('.spec');
const specializationElement = document.querySelector('#spec');
const softReserveElement = document.querySelector('#softresd');
const softReserveFormBtn = document.querySelector('#softres-form button');
const itemElements = document.querySelectorAll('.item');
const softResLabelElement = document.querySelector('label[for=softresd');



//select and store form for user info / item display

//loop through and display all items + associated info in the display
//populate drop down menu with item name + id as an option

// ***** Event Listeners *****
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
                    softReserveElement.children[0].innerText = softReserveElement.children[0].innerText + `, ${item.innerText}`;
                    softReserveElement.children[0].value = softReserveElement.children[0].value + ' ' + item.value;
                    softReserveElement.children[0].setAttribute('selected', "selected");
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


//on form submit by user, capture and send the information to the DB
//find associated item and update the associated soft resd players

//delete button for item select, remove the element from the form submit section

//edit button - grab user info from db and display saved items

