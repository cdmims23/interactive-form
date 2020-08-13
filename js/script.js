/**
 * Global Variables and set up for default form state
 **/
 const jobRoleLabel = document.querySelector("label[for='job-role']"); 
 const jobRoleInput = document.querySelector("#job-role");
 const shirtColorsDiv = document.querySelector("#shirt-colors");
 const jobTitleSelect = document.querySelector("#title");
 const designSelect = document.querySelector("#design");
 const colorSelect = document.querySelector("#color");
 const colorOptions = colorSelect.children;
 const activitiesFieldSet = document.querySelector(".activities");
 const paymentFieldSet = document.querySelector("#payment-section");
 const paymentSelect = document.querySelector("#payment");
 const creditCardDiv = document.querySelector("#credit-card");
 const payPalDiv = document.querySelector("#paypal");
 const bitCoinDiv = document.querySelector("#bitcoin");
 const totalSpan = document.createElement("span");
 activitiesFieldSet.appendChild(totalSpan);


 let totalOfActvities = 0;

 /**
  * Default form set up
  **/
  jobRoleLabel.style.display = "none";
  jobRoleInput.style.display = "none";
  shirtColorsDiv.style.display = "none";
  payPalDiv.style.display = "none";
  bitCoinDiv.style.display = "none";
  paymentSelect.options[1].selected = true;

 /**
 * Validation functions
 **/

  /** 
   * Form behavior and events
  **/

// Job Role Event Listener
jobTitleSelect.addEventListener("change", (e) => {
    if(jobTitleSelect.value === "other") {
        jobRoleLabel.style.display = "block";
        jobRoleInput.style.display = "block";
    } else {
        jobRoleLabel.style.display = "none";
        jobRoleInput.style.display = "none";
    }
});

// T-shirt Design and Color Event Listener
designSelect.addEventListener("change", (e) => {
        for(let i = 0; i < colorOptions.length; i++) {
            colorOptions[i].style.display = "inherit";
        }

        if(designSelect.value === "js puns") {
            for(let j = 0; j < colorOptions.length; j++) {
                if(colorOptions[j].dataset.shirtType !== "js-puns") {
                    colorOptions[j].style.display = "none";
                }
            }
            colorSelect.options[0].selected = true;
            shirtColorsDiv.style.display = "block";
        } else if(designSelect.value === "heart js") {
            for(let k = 0; k < colorOptions.length; k++) {
                if(colorOptions[k].dataset.shirtType !== "heart-js") {
                    colorOptions[k].style.display = "none";
                }
            }
            colorSelect.options[3].selected = true;
            shirtColorsDiv.style.display = "block";
        } else {
            shirtColorsDiv.style.display = "none";
        }
    }
);

// Activity Even Listener
activitiesFieldSet.addEventListener("change", (e) => {
    let checkBox = e.target;
    let checkBoxes = activitiesFieldSet.querySelectorAll("input[type='checkbox']");

    if (checkBox.tagName === 'INPUT' && checkBox.checked === true) {
        totalOfActvities += parseInt(checkBox.dataset.cost);
        totalSpan.textContent = '';
        totalSpan.textContent = `Total cost of Actvities: $ ${totalOfActvities}`;
        for(let i = 1; i < checkBoxes.length; i++) {
            if (checkBox.dataset.dayAndTime === checkBoxes[i].dataset.dayAndTime && checkBoxes[i].name !== checkBox.name) {
                checkBoxes[i].disabled = true;
                checkBoxes[i].parentElement.classList.add("disabled");
            }
        }

    } else {
        totalOfActvities -= parseInt(checkBox.dataset.cost);
        totalSpan.textContent = '';
        totalSpan.textContent = `Total cost of Actvities: $ ${totalOfActvities}`;
        for(let j = 1; j < checkBoxes.length; j++) {
            if (checkBox.dataset.dayAndTime === checkBoxes[j].dataset.dayAndTime && checkBoxes[j].name !== checkBox.name) {
                checkBoxes[j].disabled = false;
                checkBoxes[j].parentElement.classList.remove("disabled");
            }
        }
    }
});

// Payment Even Listener
paymentSelect.addEventListener("change", (e) => {
    const option = e.target;

    if (option.value === "credit card") {
        creditCardDiv.style.display = "block";
        payPalDiv.style.display = "none";
        bitCoinDiv.style.display = "none";
    } else if (option.value === "paypal") {
        payPalDiv.style.display = "block";
        creditCardDiv.style.display = "none";
        bitCoinDiv.style.display = "none";
    } else if (option.value === "bitcoin") {
        bitCoinDiv.style.display = "block";
        creditCardDiv.style.display = "none";
        payPalDiv.style.display = "none";
    } else {
        creditCardDiv.style.display = "none";
        payPalDiv.style.display = "none";
        bitCoinDiv.style.display = "none";
    }
});


