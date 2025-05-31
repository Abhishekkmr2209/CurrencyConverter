const access_key = "33a09fccd2d93ca0c8b38c5850b45473";
const URL =`https://api.currencylayer.com/convert?`;

/* access_key , from , to and amount are  required in querystring*/

const dropDown = document.querySelector('.dropDown');
const selectElements = document.querySelectorAll('select');



for(let select of selectElements){
    for(let countryCurrCode in countryList){
        let option = document.createElement('option');
        option.value=countryCurrCode;
        option.innerText=countryCurrCode;
        select.append(option);
    }
    select.addEventListener("change",(evt)=>updateFlag(evt));
}

function updateFlag(evt){
    const countryCurrCode=evt.target.value;
    const countryCode=countryList[countryCurrCode];
    const flagSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    const divSelect = evt.target.parentElement;
    const img = divSelect.querySelector('img');
    img.src=flagSrc;

}



function amountReset(){
    let amount = document.querySelector('#amount');
    let amtValue = amount.value;
    if(amtValue==="" || amtValue<1){
        amount.value=1;

    }
}




window.addEventListener('load',amountReset());