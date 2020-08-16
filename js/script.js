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
 const activitiesFirstElementChild = activitiesFieldSet.firstElementChild;
 const paymentFieldSet = document.querySelector("#payment-section");
 const paymentSelect = document.querySelector("#payment");
 const creditCardDiv = document.querySelector("#credit-card");
 const payPalDiv = document.querySelector("#paypal");
 const bitCoinDiv = document.querySelector("#bitcoin");
 const totalSpan = document.createElement("span");
 activitiesFieldSet.appendChild(totalSpan);
 const nameInput = document.querySelector("#name");
 const emailInput = document.querySelector("#mail");
 const creditCardInput = document.querySelector("#cc-num");
 const zipCodeInput = document.querySelector("#zip");
 const cvvInput = document.querySelector("#cvv");
 const submitButton = document.querySelector("button[type='submit']");
 const form = document.querySelector("form");
 let totalOfActvities = 0;

 /**
  * Dynamically created spans for error messages
  */
  function appendErrorMessage(currentInput, newElement) {
    const parent = currentInput.parentElement;
    parent.insertBefore(newElement, currentInput);
  }

  function createErrorMessage(currentInput, element) {
    const errorElement = document.createElement(element);
    errorElement.id = `error-${currentInput.id}`;
    errorElement.style.color = "red";
    appendErrorMessage(currentInput, errorElement)
  }
  
 /**
  * Default form set up
  **/
  jobRoleLabel.style.display = "none";
  jobRoleInput.style.display = "none";
  shirtColorsDiv.style.display = "none";
  payPalDiv.style.display = "none";
  bitCoinDiv.style.display = "none";
  paymentSelect.options[1].selected = true;

  createErrorMessage(nameInput, 'span');
  createErrorMessage(emailInput, 'span');
  createErrorMessage(activitiesFirstElementChild, 'span');
  createErrorMessage(creditCardInput, 'span');
  createErrorMessage(zipCodeInput, 'span');
  createErrorMessage(cvvInput, 'span');

 /**
 * Validation functions
 **/

 function activitiesIsValid(activities) {
     let checked = false;

     for(let i = 0; i < activities.length; i++) {
         if(activities[i].checked) {
             checked = true;
         }
     }
     return checked;
 }

function inputValidation(regEx, input) {
    return regEx.test(input);
}

// Email validation
function emailValidation(validEmail) {
    if(!validEmail) {
        if(emailInput.value === '') {
            emailInput.previousElementSibling.textContent = `Email cannot be empty`;
            emailInput.classList.add("error");
        } else {
            emailInput.previousElementSibling.textContent = `${emailInput.value || ''} Not a valid email address`;
            emailInput.classList.add("error");
        }
    } else {
        emailInput.previousElementSibling.textContent = ``;
        emailInput.classList.remove("error");
    }
}

// Email validation event listener
emailInput.addEventListener("input", (e) => {
    const validEmail = inputValidation(/^[^@]+@[^@.]+\.[a-z]+$/i, emailInput.value);
    if(!validEmail) {
        if(emailInput.value === '') {
            emailInput.previousElementSibling.textContent = `Email cannot be empty`;
            emailInput.classList.add("error");
        } else {
            emailInput.previousElementSibling.textContent = `${emailInput.value || ''} Not a valid email address`;
            emailInput.classList.add("error");
        }
    } else {
        emailInput.previousElementSibling.textContent = ``;
        emailInput.classList.remove("error");
    }
});

emailInput.addEventListener("blur", (e) => {
    const validEmail = inputValidation(/^[^@]+@[^@.]+\.[a-z]+$/i, emailInput.value);
    if(!validEmail) {
        if(emailInput.value === '') {
            emailInput.previousElementSibling.textContent = `Email cannot be empty`;
            emailInput.classList.add("error");
        } 
    } else {
        emailInput.previousElementSibling.textContent = ``;
        emailInput.classList.remove("error");
    }
});

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

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const nameValid = inputValidation(/^[a-zA-Z]+ ?[a-zA-Z]+$/, nameInput.value);
    const emailValid = inputValidation(/^[^@]+@[^@.]+\.[a-z]+$/i, emailInput.value);
    const activitiesValid = activitiesIsValid(activitiesFieldSet.querySelectorAll("input[type='checkbox']"));

    if(!nameValid) {
        nameInput.previousElementSibling.textContent = `${nameInput.value || ''} Not a valid input`;
        nameInput.classList.add("error");
    } else {
        nameInput.previousElementSibling.textContent = ``;
        nameInput.classList.remove("error");
    }

    emailValidation(emailValid);

    if(!activitiesValid) {
        activitiesFirstElementChild.previousElementSibling.textContent = `Please choose atleast one activity`;
    } else {
        activitiesFirstElementChild.previousElementSibling.textContent = ``;
    }

    if(paymentSelect.value === 'credit card') {
        const creditCardValid = inputValidation(/^[\d]{13,16}$/, creditCardInput.value);
        const zipCodeValid = inputValidation(/^[\d]{5}$/, zipCodeInput.value);
        const cvvValid = inputValidation(/^[\d]{3}$/, cvvInput.value);

        if(!creditCardValid) {
            creditCardInput.previousElementSibling.textContent = `${creditCardInput.value || ''} Not a valid input`;
            creditCardInput.classList.add("error");
        } else {
            creditCardInput.previousElementSibling.textContent = ``;
            creditCardInput.classList.remove("error");
        }

        if(!zipCodeValid) {
            zipCodeInput.previousElementSibling.textContent = `${zipCodeInput.value || ''} Not a valid input`;
            zipCodeInput.classList.add("error");
        } else {
            zipCodeInput.previousElementSibling.textContent = ``;
            zipCodeInput.classList.remove("error");
        }

        if(!cvvValid) {
            cvvInput.previousElementSibling.textContent = `${cvvInput.value || ''} Not a valid input`;
            cvvInput.classList.add("error");
        } else {
            cvvInput.previousElementSibling.textContent = ``;
            cvvInput.classList.remove("error");
        }

        if(nameValid && activitiesValid && emailValid && creditCardValid && zipCodeValid && cvvValid) {
            form.submit();
        }
    } else {
        form.submit();
    }
})


