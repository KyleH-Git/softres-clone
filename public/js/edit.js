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


// Handle change event for classElement
classElement.addEventListener('change', (event) => {
    // Hide all spec options
    specOptions.forEach(spec => spec.classList.add('d-none'));

    // Show only the selected spec options
    document.querySelectorAll(`.${classElement.value}`).forEach(spec => {
        spec.classList.remove('d-none');
    });

    // Clear specialization value
    specializationElement.value = '';
});

// Handle cancel button click event
cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    location.href = '/';
});

// Handle window load event
window.addEventListener('load', (event) => {
    // Hide all spec options initially
    specOptions.forEach(spec => spec.classList.add('d-none'));

    // Show the selected spec options based on the classElement value
    document.querySelectorAll(`.${classElement.value.toLowerCase()}`).forEach(spec => {
        spec.classList.remove('d-none');
    });

    console.log(classElement.value);
});

// Handle change event for softReserveElement
softReserveElement.addEventListener('change', (event) => {

    softReserveElement.classList.add(`${softReserveElement.value}`);

    itemElements.forEach(item => {
        if (item.value === softReserveElement.value) {
            if (softReserveElement.children[0].classList.contains('d-none')) {
                softResLabelElement.innerText = 'Soft-Reserve: 1 of 2';
                softReserveElement.children[0].classList.remove('d-none');
                softReserveElement.children[0].innerText = item.innerText;
                softReserveElement.children[0].value = item.value;
            } else {
                softResLabelElement.innerText = 'Soft-Reserve: 2 of 2';
                softReserveElement.children[0].innerText += `, ${item.innerText}`;
                softReserveElement.children[0].value += ' ' + item.value;
                softReserveElement.children[0].selected = true;
                softReserveFormBtn.removeAttribute('disabled');
            }
        }
    });

    // If there are two selected items, hide the remaining options
    if (softReserveElement.classList.length === 2) {
        itemElements.forEach(item => item.classList.add('d-none'));
    }
});