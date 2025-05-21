// ***** Query Selectors ***** 
const newUserBtn = document.querySelector('#new-user');
const accountDivElement = document.querySelector('#account-div');
const userDivElement = document.querySelector('#user-div');
const signUpBtn = document.querySelector('#sign-up');
const signInBtn = document.querySelector('#sign-in');
const cancelAccBtns = document.querySelectorAll('.cancel-acc-btn')
const signUpFormElement = document.querySelector('#signUp-form');
const signInFormElement = document.querySelector('#signIn-form');
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

// Event listener for signUpBtn
signUpBtn.addEventListener('click', (event) => {
    accountDivElement.classList.toggle('d-none');
    signUpFormElement.classList.toggle('d-none');
});

// Event listener for signInBtn
signInBtn.addEventListener('click', (event) => {
    accountDivElement.classList.toggle('d-none');
    signInFormElement.classList.toggle('d-none');
});

// Event listeners for cancel buttons
for (btn of cancelAccBtns) {
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        accountDivElement.classList.toggle('d-none');
        event.currentTarget.parentElement.parentElement.parentElement.classList.toggle('d-none');
    });
}

// Event listener for newUserBtn
newUserBtn.addEventListener('click', (event) => {
    console.log('clicked');
    userDivElement.classList.toggle('d-none');
    softReserveFormElement.classList.toggle('d-none');
});

// Event listener for cancelBtn
cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();

    // Disable form elements and reset values
    classElement.setAttribute('disabled', '');
    specializationElement.setAttribute('disabled', '');
    softReserveElement.setAttribute('disabled', '');
    softReserveFormBtn.setAttribute('disabled', '');
    
    // Hide selected option
    softReserveElement.children[0].classList.add('d-none');
    softReserveElement.children[0].value = '';
    softReserveElement.children[0].innerText = '';
    softResLabelElement.innerText = 'Soft-Reserve: 0 of 2';
    
    // Reset input and select elements
    const inputs = document.getElementsByTagName('input');
    const selects = document.getElementsByTagName('select');
    for (input of inputs) {
        input.value = '';
    }
    for (select of selects) {
        select.value = '';
    }

    // Hide spec options
    for (spec of specOptions) {
        spec.classList.add('d-none');
    }
    for (item of itemElements) {
        item.classList.remove('d-none');
    }

    // Toggle visibility of the userDiv and softReserveForm
    userDivElement.classList.toggle('d-none');
    softReserveFormElement.classList.toggle('d-none');
});

// Event listener for usernameElement input
usernameElement.addEventListener('input', (event) => {
    classElement.removeAttribute('disabled');
});

// Event listener for classElement change
classElement.addEventListener('change', (event) => {
    console.log(classElement.value);

    // Enable specializationElement and reset d-none class for spec options
    specializationElement.removeAttribute('disabled');
    for (spec of specOptions) {
        spec.classList.add('d-none');
    }
    for (spec of document.querySelectorAll(`.${classElement.value}`)) {
        spec.classList.remove('d-none');
    }
});

// Event listener for specializationElement change
specializationElement.addEventListener('change', (event) => {
    softReserveElement.removeAttribute('disabled');
});


softReserveElement.addEventListener('change', (event) => {
    softReserveElement.classList.add(`${softReserveElement.value}`)
    for(item of itemElements){
        if(item.value === softReserveElement.value){
            if(softReserveElement.children[0].hasAttribute('d-none')){
                softResLabelElement.innerText = 'Soft-Reserve: 1 of 2';
                softReserveElement.children[0].removeAttribute('d-none');
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
            item.classList.add('d-none', "")
        }
    }
});
