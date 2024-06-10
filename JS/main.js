/*************
JS strict mode
*************/
'use strict';

// variables inizialization
const userFirstName = document.getElementById('user-firstname');
const userLastName = document.getElementById('user-lastname');
const userEmail = document.getElementById('user-email');
const workType = document.getElementById('user-reqwork');
const promCode = document.getElementById('prom-code');
const privacyCheck = document.getElementById('privacy-check');
const userForm = document.getElementById('user-form');
const priceUnit = document.getElementById('price-unit');
const priceDec = document.getElementById('price-dec');

// array with valid promotional codes
const valPromCode = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'];

// object contain select options
const selectOptions = ['Backend Development', 'Frontend Development', 'Project Analysis'];

// create html elements from object
selectOptions.forEach(function (element, index) {
    let option = document.createElement('option');
    option.value = `${index + 1}`;
    option.innerText = element;
    workType.append(option);
});

// form eventlistener
userForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // invalid feedback default
    document.getElementById('invalid-promcode').classList.add('d-none');
    document.getElementById('invalid-reqwork').classList.add('d-none');
    document.getElementById('invalid-privacy').classList.add('d-none');
    document.getElementById('invalid-firstname').classList.add('d-none');
    document.getElementById('invalid-lastname').classList.add('d-none');
    document.getElementById('invalid-email').classList.add('d-none');
    workType.classList.remove('border-danger');
    userFirstName.classList.remove('border-danger');
    userLastName.classList.remove('border-danger');
    userEmail.classList.remove('border-danger');

    // validation control variable
    let validControl = true;

    // input workType validation
    if (workType.value === "") {
        workType.classList.add('border-danger');
        document.getElementById('invalid-reqwork').classList.remove('d-none');
        validControl = false;
    }

    // input privacyCheck validation
    if (!privacyCheck.checked) {
        document.getElementById('invalid-privacy').classList.remove('d-none');
        validControl = false;
    }

    // input firstname and lastname validation
    if (!useRegex(userFirstName.value)) {
        document.getElementById('invalid-firstname').classList.remove('d-none');
        userFirstName.classList.add('border-danger');
        validControl = false;
    }
    if (!useRegex(userLastName.value)) {
        document.getElementById('invalid-lastname').classList.remove('d-none');
        userLastName.classList.add('border-danger');
        validControl = false;
    }

    // input email validation
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegEx.test(userEmail.value)) {
        document.getElementById('invalid-email').classList.remove('d-none');
        userEmail.classList.add('border-danger');
        validControl = false;
    }

    // price calculation
    if (validControl) {
        let price = calcPrice(Number(workType.value));
        // discount for valid promotional code
        const code = promCode.value;
        if (valPromCode.includes(code.toUpperCase())) {
            // 25% discount
            price = price * 0.75;
        } else if (code !== "") {
            document.getElementById('invalid-promcode').classList.remove('d-none');
        }
        // price visualization in page
        price = price.toFixed(2);
        priceUnit.innerText = '€ ' + price.toString().split(".")[0];
        priceDec.innerText = ',' + price.toString().split(".")[1];
    } else {
        priceUnit.innerText = '€ --';
        priceDec.innerText = ',--';
    }
});

// function return final price 
function calcPrice(num) {
    const priceHour = [20.50, 15.30, 33.60];
    return priceHour[num - 1] * 10;
}

// function for firstname and lastname validation
function useRegex(input) {
    let regex = /^[a-zA-Z][a-zA-Z'\s]+[a-zA-Z]$/;
    return regex.test(input);
}