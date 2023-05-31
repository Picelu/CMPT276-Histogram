// order of the grades
let order = [
  "Max",
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D",
  "F",
];

// Initial grades in the system
let grades = [
  65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.0, 81.43, 86.22, 88.33,
  9.03, 49.93, 52.34, 53.11, 50.1, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54,
  90.0, 71.11, 80.01,
];

// Web functionality code
let inputBox = document.querySelectorAll(".rectangle-input");

// Empty object for Boundaries to be inserted
let gradeBoundaries = {}; // Corrected variable name

// object to count the number of grades in each bound
let newGrades = {
  "A+": 0,
  A: 0,
  "A-": 0,
  "B+": 0,
  B: 0,
  "B-": 0,
  "C+": 0,
  C: 0,
  "C-": 0,
  D: 0,
  F: 0,
};

let len = grades.length;

let update = () => {
  // init all of the elements in the newGrades obj
  for (let grade in newGrades) {
    newGrades[grade] = 0;
  }
  // Logic for updating each grade count in newGrades
  grades.forEach((x) => {
    if (x === gradeBoundaries["Max"]) {
      newGrades["A+"]++;
    }
    if (x <= gradeBoundaries["F"]) {
      newGrades["F"]++;
    } else {
      for (let i = order.length - 1; i >= 0; i--) {
        if (
          x >= gradeBoundaries[order[i]] &&
          (i == 0 || x < gradeBoundaries[order[i - 1]])
        ) {
          newGrades[order[i]]++;
          break;
        }
      }
    }
  });

  // Updating the progress bar based on the newGrades that were updated
  for (let grade in newGrades) {
    let count = newGrades[grade];
    let percentage = (count / len) * 100;
    let progressBar = document.querySelector(
      ".progress-bar." + grade.replace("+", "plus").replace("-", "minus")
    );
    let progressBarText = progressBar.querySelector("span");
    progressBar.style.setProperty("--percentage", percentage + "%"); // Update CSS variable
    progressBarText.textContent = count.toString();
  }
};

// function to not allow inputs of newGrades unless all of the gradeBoundaries obj's are filled
let boundsEmpty = () => {
  for (let i of order) {
    if (gradeBoundaries[i] === undefined) {
      // Corrected variable name
      return false;
    }
  }
  return true;
};

// The actual script to run on the code
inputBox.forEach((input) => {
  input.addEventListener("input", function () {
    let newVal = parseFloat(this.value);
    let inputNewVal = document.querySelector('input[name="newGrade"]');

    gradeBoundaries[this.name] = newVal;

    if (boundsEmpty()) {
      inputNewVal.disabled = false;
      update();
      console.log(gradeBoundaries);
    } else {
      inputNewVal.disabled = true;
    }
  });
});

//Button Code
document
  .querySelector(".rounded-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let inputNewGrade = document.querySelector('input[name="newGrade"]');
    inputNewGrade.disabled = true;
    if (!boundsEmpty()) {
      alert("Please input all bounds");
      inputNewGrade.value = "";
      return;
    } else {
      inputNewGrade.disabled = false;
    }

    var newGrade = parseFloat(inputNewGrade.value);

    if (newGrade <= gradeBoundaries["Max"] && inputNewGrade.disabled == false) {
      grades.push(newGrade);
      update();
    } else {
      if (inputNewGrade.disabled == true) {
        alert("Please Input all bounds");
      }
      alert("Out of bounds!");
    }
    inputNewGrade.value = "";
  });

// Initial update on page load
update();
