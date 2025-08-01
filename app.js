import countryList from './codes.js';

/* access_key , from , to and amount are  required in querystring*/

//function to add all the country codes to select element
function addSelectOptions(){

    const selectElementsArray = document.querySelectorAll('#converterContainer .currencySelectContainer select');

    selectElementsArray.forEach((selectElement,index)=>{
        
            Object.keys(countryList).forEach((countryCurr)=>{
            //Creating optionElement for every countrycode
            const optionElement = document.createElement('option');
            optionElement.value= countryList[countryCurr];
            optionElement.textContent = countryCurr;

            //Select INR as the default for first selectElement
            if(countryCurr === 'INR' && index === 0){
                optionElement.selected = true;
            }

            //Select EUR as the default for second selectElement
            if(countryCurr === 'EUR' && index === 1){
                optionElement.selected = true;
            }

            //Appending optionElement to selectElement
            selectElement.appendChild(optionElement);


        });
        selectElement.addEventListener('change',(event)=>{
            updateFlag(event);    
        });
        
    });

}

//Update flag according to selected Option
function updateFlag(event){
    const selectElement = event.target;
    const selectElementValue = event.target.value;
    
    const imageElement = selectElement.parentNode.querySelector('img');
    imageElement.src = `https://flagsapi.com/${selectElementValue}/flat/64.png`;
    
}

//Function to swap selected currencies
function addSwapButtonListener() {
    const fromElement = document.querySelector('#fromContainer .currencySelectContainer select');
    const toElement = document.querySelector('#toContainer .currencySelectContainer select');
    const swapButton = document.getElementById('swapButton');

    swapButton.addEventListener('click', () => {
        const fromIndex = fromElement.selectedIndex;
        const toIndex = toElement.selectedIndex;

        // Swap selected indices
        fromElement.selectedIndex = toIndex;
        toElement.selectedIndex = fromIndex;

        // Manually trigger flag updates
        updateFlag({ target: fromElement });
        updateFlag({ target: toElement });
    });
}


//function to get amountExchangeRate
function amountExchangeRate(){

    //Accessing all the required Elements
    const resultElement = document.querySelector('#main #footer h1');
    const exchangeRateElement = document.querySelector('#main #footer h2');
    const formElement = document.querySelector('#converterContainer #amountContainer form');
    const btnElement = document.querySelector('#main .btn');
    const fromElement = document.querySelector('#fromContainer .currencySelectContainer select');
    const toElement = document.querySelector('#toContainer .currencySelectContainer select');
    const amountInput = document.querySelector('#converterContainer #amountContainer form input');
    
    

    //API URL
    const BASE_URL = `https://api.currencylayer.com/convert?`;
    const access_key = "33a09fccd2d93ca0c8b38c5850b45473";

    
    //Adding event listener to Convert button
    btnElement.addEventListener('click',async ()=>{

        if(formElement.reportValidity()){             //Execute only after validation
        //Accessing the from and to values
        const fromCurrency = fromElement.options[fromElement.selectedIndex].textContent;
        const toCurrency   = toElement.options[toElement.selectedIndex].textContent;
        const amount = amountInput.value;

        const URL = `${BASE_URL}&access_key=${access_key}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

        try{
        //using fetch API
        const response = await fetch(URL,{method:'GET'});     //fetch data from API
        const result = await response.json();
        
        if(result.success){
        //Getting required data from the API result
        const exchangeRate = result.info.quote;
        const convertedAmount = result.result;
        
        resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        exchangeRateElement.textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
        
        }else{
        resultElement.textContent = "Conversion failed. Please check inputs or API key.";
        
        }
        }
        catch (error) {
            console.error("Fetch error:", error);
            resultElement.textContent = "Error fetching conversion data.";
        }
    
    }
    });


}


//Perform these when window is loaded
window.addEventListener('DOMContentLoaded',()=>{
    addSelectOptions();         //Adding all the countryCodes to Select
    amountExchangeRate();
    addSwapButtonListener();       
});