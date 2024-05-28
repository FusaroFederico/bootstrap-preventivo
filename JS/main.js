/*************
JS strict mode
*************/
'use strict';

// variables inizialization
const userFirstName = document.getElementById('user-firstname');
const userLastName = document.getElementById('user-lastname');
const userEmail = document.getElementById('user-email');
const userReqWork = document.getElementById('user-reqwork');
const promCode = document.getElementById('prom-code');
const privacyCheck = document.getElementById('privacy-check');
const userForm = document.getElementById('user-form');
const priceUnit = document.getElementById('price-unit');
const priceDec = document.getElementById('price-dec');

// array with valid promotional codes
const valPromCode = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'];

// form eventlistener
userForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const workType = userReqWork.value;

    // price calculation
    if (userReqWork.value === "") {
        priceUnit.innerText = '€ --';
        priceDec.innerText = ',--';
        console.log("input non valido");
    } else {
        let price = calcPrice(Number(workType)) * 100;
        // discount from promotional code
        const code = promCode.value;
        if (valPromCode.includes(code.toUpperCase())) {
            price = price * 0.75;
        } else {
            console.log('codice sconto non valido');
        }
        // price visualization in page
        priceUnit.innerText = '€ ' + price.toString().slice(0, 3);
        priceDec.innerText = ',' + price.toString().slice(3, 5);
    }
});

// function return final price 
function calcPrice(num) {
    const priceHour = [20.50, 15.30, 33.60];
    return priceHour[num - 1] * 10;
}