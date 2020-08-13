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

 let totalOfActvities = 0;

 /**
  * Default form set up
  **/
  jobRoleLabel.style.display = "none";
  jobRoleInput.style.display = "none";
  shirtColorsDiv.style.display = "none";

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
            shirtColorsDiv.style.display = "block";
        } else if(designSelect.value === "heart js") {
            for(let k = 0; k < colorOptions.length; k++) {
                if(colorOptions[k].dataset.shirtType !== "heart-js") {
                    colorOptions[k].style.display = "none";
                }
            }
            shirtColorsDiv.style.display = "block";
        } else {
            shirtColorsDiv.style.display = "none";
        }
    }
);

activitiesFieldSet.addEventListener("change", (e) => {
    let checkBox = e.target;
    let checkBoxes = activitiesFieldSet.querySelectorAll("input[type='checkbox']");
    console.log(checkBoxes);

    if (checkBox.tagName === 'INPUT' && checkBox.checked === true) {
        totalOfActvities += parseInt(checkBox.dataset.cost);

        for(let i = 1; i < checkBoxes.length; i++) {
            if (checkBox.dataset.dayAndTime === checkBoxes[i].dataset.dayAndTime && checkBoxes[i].name !== checkBox.name) {
                checkBoxes[i].disabled = "true";
                checkBoxes[i].parentElement.classList.add("disabled");
            }
        }

        console.log(totalOfActvities);
    }
});

/**
 * Validation functions
 **/
