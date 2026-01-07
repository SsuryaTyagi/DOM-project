function openFeatures() {
  const AllElem = document.querySelectorAll(".elem");
  const fullElem = document.querySelectorAll(".fullElem");
  const back = document.querySelectorAll(".back");

  AllElem.forEach((elem, idx) => {
    elem.addEventListener("click", () => {
      fullElem[idx].style.display = "block";
    });
  });

  back.forEach((elem, idx) => {
    elem.addEventListener("click", () => {
      fullElem[idx].style.display = "none";
    });
  });
}
openFeatures();

function todo() {
  const form = document.querySelector(".addTask form");
  const input = document.querySelector(".todo-container .addTask form input");
  const textArea = document.querySelector(
    ".todo-container .addTask form textarea"
  );
  let taskPrint = document.querySelector(".allTask");

  // localStorage.clear();
  let allTask = [];

  if (localStorage.getItem("allTask")) {
    allTask = JSON.parse(localStorage.getItem("allTask"));
  } else {
    console.log("Task list is Empty");
  }

  function render() {
    localStorage.setItem("allTask", JSON.stringify(allTask));

    let sum = "";
    allTask.forEach((elem, idx) => {
      sum += `<div class="task">
                    <div>${elem.task}</div>
                    <button id=${idx}>Mark as completed</button>
                </div>`;
    });

    taskPrint.innerHTML = sum;
    document.querySelectorAll(".allTask button").forEach((elem, idx) => {
      elem.addEventListener("click", () => {
        allTask.splice(elem.id, 1);
        render();
      });
    });
  }
  render();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value == "") return;
    allTask.push({ task: input.value, details: textArea.value });

    input.value = "";
    textArea.value = "";
    render();
  });
}

todo();

function Dailyplaner() {
  const dailyPlanner = document.querySelector(
    ".daily-planner-fullpage .daily-planner"
  );
  let hours = Array.from(
    { length: 18 },
    (_, idx) => `${idx + 6}:00 - ${idx + 7}:00`
  );
  let plannerData = JSON.parse(localStorage.getItem("plannerData")) || {};

  let wholeDaySum = "";
  hours.forEach((elem, idx) => {
    let savedData = plannerData[idx] || "";
    wholeDaySum += `<div class="planner">
              <p>${elem}</p>
              <input type="text" id="${idx}" value="${savedData}" placeholder=".... ">
            </div> `;
  });

  dailyPlanner.innerHTML = wholeDaySum;

  document
    .querySelectorAll(".daily-planner-fullpage .daily-planner input")
    .forEach((elem, idx) => {
      elem.addEventListener("input", () => {
        // console.log(elem.value);
        plannerData[elem.id] = elem.value;
        localStorage.setItem("plannerData", JSON.stringify(plannerData));
      });
    });
}
Dailyplaner();

async function fetchMotiv() {
  let motivation = document.querySelector(".motivation2 p");
  let author = document.querySelector(".motivation2 h3");
  let res = await fetch("http://api.quotable.io/random");
  let data = await res.json();
  console.log(data.content);

  motivation.innerHTML = data.content;
  author.innerHTML = data.author;
}
fetchMotiv();

function pomo() {
  
  let time = 25 * 60;
let min = 0;
let sec = 0;
let timeId = null;
let isPaused = true;

const h1 = document.querySelector(".time h1");
const button = document.querySelectorAll(".time button");

function startTime() {
  if (timeId) return; 

  timeId = setInterval(() => {
    if (isPaused) return;

    if (time <= 0) {
      clearInterval(timeId);
      timeId = null;
      h1.innerHTML = "00:00";
      return;
    }

    min = Math.floor(time / 60);
    sec = time % 60;

    h1.innerHTML = `${min}:${sec < 10 ? "0" + sec : sec}`;
    time--;
  }, 1000);
}

startTime();

// Pause
button[1].addEventListener("click", () => {
  isPaused = true;
});

// Start / Resume
button[0].addEventListener("click", () => {
  isPaused = false;
});

// Reset
button[2].addEventListener("click", () => {
  isPaused = true;
  time = 25 * 60;
  h1.innerHTML = "25:00";
});
}
pomo();




