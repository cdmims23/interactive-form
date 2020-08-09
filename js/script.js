/**
 * Global Variables and set up for default form state
 **/
 const jobRoleLabel = document.querySelector("label[for='job-role']"); 
 const jobRoleInput = document.querySelector("#job-role");
 const shirtColorsDiv = document.querySelector("#shirt-colors");
 const jobTitleSelect = document.querySelector("#title");
 const designSelect = document.querySelector("#design");
 const colorSelect = document.querySelector("#color");

 /**
  * Default form set up
  **/
  jobRoleLabel.style.display = "none";
  jobRoleInput.style.display = "none";
  shirtColorsDiv.style.display = "none";

  /** 
   * Form behavior and events
  **/
jobTitleSelect.addEventListener("change", (e) => {
    if(jobTitleSelect.value === "other") {
        jobRoleLabel.style.display = "block";
        jobRoleInput.style.display = "block";
    } else {
        jobRoleLabel.style.display = "none";
        jobRoleInput.style.display = "none";
    }
});

designSelect.addEventListener("change", (e) => {

    }
);
