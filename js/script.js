"use strict";

const formBill = document.querySelector(".input-bill");
const peoples = document.querySelector(".input-peoples");
const tips = document.querySelectorAll(".grid-tips__box");

const tipAmount = document.querySelector(".results--tip-amount");
const total = document.querySelector(".results--tip-total");

const tipInput = document.querySelector(".grid-tips__tip-box--6");
const btn = document.querySelector(".btn");
const errorSpan = document.querySelector(".error-span");

let people = 0;
let bill = 0;
let tip = 0;

formBill.addEventListener("change", (e) => {
  bill = +e.target.value;
  !Number.isFinite(bill) ? (formBill.style.borderColor = "rgb(173, 94, 4)") : (formBill.style.cssText = "");

  if (!isValid()) {
    return;
  }
  setAmount(people, bill, tip);
});

peoples.addEventListener("change", (e) => {
  people = +e.target.value;
  if (people === 0) {
    errorSpan.style.cssText = "display:block; color:rgb(173, 94, 4)";
    peoples.style.cssText = "border-color:rgb(173, 94, 4)";
  } else {
    errorSpan.style.cssText = "";
    peoples.style.cssText = "";
  }
  if (!isValid()) {
    return;
  }
  setAmount(people, bill, tip);
});

tips.forEach((node) => {
  node.addEventListener("click", (e) => {
    tips.forEach((node) => (node.style.cssText = ""));
    node.style.cssText = "background-color:rgb(66, 183, 168)";

    tipInput.value = "";
    tip = parseInt(e.target.closest(".grid-tips__box").textContent);

    if (!isValid()) {
      return;
    }

    setAmount(people, bill, tip);
  });
});

tipInput.addEventListener("change", function (e) {
  tip = +e.target.closest(".grid-tips__tip-box--6").value;
  !Number.isFinite(tip) ? (tipInput.style.borderColor = "rgb(173, 94, 4)") : (tipInput.style.cssText = "");

  if (!isValid()) {
    return;
  }

  setAmount(people, bill, tip);
});

btn.addEventListener("click", () => reset());

// functions
const setAmount = (people, bill, tip) => {
  tipAmount.textContent = ((bill * tip) / 100 / people).toFixed(2);
  total.textContent = (bill / people + (bill * tip) / 100 / people).toFixed(2);
};

const isValid = () => {
  if (people && Number.isFinite(tip) && Number.isFinite(bill)) {
    return true;
  } else {
    return false;
  }
};

const reset = () => {
  tipAmount.textContent = "0.00";
  total.textContent = "0.00";
  formBill.value = "";
  peoples.value = "";
  peoples.style.cssText = "";
  errorSpan.style.cssText = "";
  tipInput.value = "";
  tipInput.style.cssText = "";

  tips.forEach((node) => (node.style.cssText = ""));
};
