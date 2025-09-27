const base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;

    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "PKR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

// Update flag image
const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Handle button click and conversion
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  const amountInput = document.querySelector(".amount input");
  const amtVal = parseFloat(amountInput.value) || 1;

  const base = fromcurr.value.toLowerCase();
  const target = tocurr.value.toLowerCase();
  const url = `${base_URL}/${base}.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API fetch failed");

    const data = await res.json();
    const rate = data[base][target]; // ✅ FIXED: nested structure

    if (rate === undefined) {
      msg.innerText = `Exchange rate from ${fromcurr.value} to ${tocurr.value} is currently unavailable.`;
      return;
    }

    const finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
  } catch (e) {
    console.error(e);
    msg.innerText = "Something went wrong. Please try again later.";
  }
});















/*const base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for(let select of dropdowns){
for (currcode in countryList){
   let newOption = document.createElement("option")
   newOption.innerText = currcode;
   newOption.value = currcode;
   if(select.name === "from" && currcode === "USD"){
    newOption.selected = "selected";
   } else if(select.name === "to" && currcode === "PKR"){
    newOption.selected = "selected";
   }
   
   select.append(newOption);
}
select.addEventListener("change",(evt) =>{
    updateflag(evt.target)
})
}

 const updateflag = (element) =>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img =  element.parentElement.querySelector("img");
    img.src = newSrc;

}
btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    //console.log(fromcurr.value, tocurr.value)
     const URL = `${base_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate =  data [tocurr.value.toLowerCase()];
    console.log(rate)
    let finalamount = amtVal * rate ;
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
    });*/


    

