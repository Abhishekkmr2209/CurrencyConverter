const access_key = "33a09fccd2d93ca0c8b38c5850b45473";
const BASE_URL =`https://api.currencylayer.com/convert?`;

/* access_key , from , to and amount are  required in querystring*/

const dropDown = document.querySelector('.dropDown');
const selectElements = document.querySelectorAll('select');
const from = document.querySelector('select[name="From"]');
const to = document.querySelector('select[name="To"]');
const msg=document.querySelector('.msg');
const btn = document.querySelector('.button');


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





async function amountExchangeRate(){
    let amount = document.querySelector('#amount');
    let amtValue = amount.value;
    if(amtValue==="" || amtValue<1){
        amount.value=1;

    }
    const URL = `${BASE_URL}&access_key=${access_key}&from=${from.value}&to=${to.value}&amount=${amount.value}`;
    let response = await fetch(URL,{
        method:"GET"
    });
    let rate = await response.json();
    let msgDisplayPara = msg.querySelector('p');
    msgDisplayPara.innerHTML = `1${from.value} = ${rate.result}${to.value}<br/> ${amtValue}${from.value} converts to ${rate.result*amtValue}${to.value}`;
}

btn.addEventListener('click',(evt)=>{
     evt.preventDefault();
    amountExchangeRate();
});


window.addEventListener('load',amountExchangeRate());