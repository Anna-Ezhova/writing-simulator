//This Script supports the Workflow of the app (except for loading)

//Buttons

const submitCustomBtn = document.getElementById("submitCustomBtn");

//Text Containers
const taskText = document.getElementById("task_text");
const taskName = document.getElementById("task_name");

//Topic Arrays
const topicList = document.querySelectorAll(".topic");

//Form

const form = document.getElementById("form");

const loadingContainer = document.getElementById("loading_container");

//Tasks Placeholder Object Array
const tasksArray = [
  {
    id: "0",
    tasktype: "email",
    name: "Aufgabe A",
    text: `Sie wohnen in einer Mietwohnung. Die Heizung ist ausgefallen und man erwartet nächste Woche die Kälte. Schreiben Sie ihren Vermieter, Herr Schwarz, einen Brief.
                Schreiben Sie etwas zu folgenden Punkten: 
                -	Grund für Ihr Schreiben 
                -	Wie Sie versucht haben, das Problem selbst zu lösen 
                -	Weitere Probleme in der Wohnung 
                -	Was der Vermieter tun solltte.
                `,
  },
  {
    id: "1",
    tasktype: "email",
    name: "Aufgabe B",
    text: `Ihre Nachbarin Frau Stein fährt in den Urlaub und hat Sie gebeten, auf ihre Katze aufzupassen. Sie hat Ihnen eine E-Mail geschrieben. Antworten Sie auf diese E-Mail. 
                Beachten Sie dabei folgende Punkte: 
                -	Ihre Zusage 
                -	Ihre Aufgaben 
                -	Worauf Sie achten sollen 
                -	Wie oft Sie kommen können
`,
  },
];

//Navigation Logic

let screenHistory = [];

//Allows navigation to the screen based by ID

function navigateTo(screenId) {
  const current = document.querySelector(".screen.active");

  if (current) {
    screenHistory.push(current.id);
    current.classList.remove("active");
  }

  document.getElementById(screenId).classList.add("active");
}

//Returns user on the previous Screen

function goBack() {
  if (screenHistory.length === 0) return;

  const previous = screenHistory.pop();

  document
    .querySelectorAll(".screen")
    .forEach((screen) => screen.classList.remove("active"));

  document.getElementById(previous).classList.add("active");
}

//Logic for all the slides and buttons of the App

/*The User chooses one of the existing tasks
 * The Task field on the OpenTextForm is filled by the corresponding task
 * The OpenTextForm is opened
 */

for (const topic of topicList) {
  topic.addEventListener("click", () => {
    setTask(topic);
    navigateTo("text_form_container");
  });
}

function setTask(topic) {
  for (const task of tasksArray) {
    if (task.id == topic.id) {
      taskName.innerHTML = task.name;
      taskText.value = task.text;
      break;
    }
  }
}

/*The User enters the custom task and submits it*/

submitCustomBtn.addEventListener("click", function (event) {
  const customTask = document.getElementById("custom_task").value;

  if (customTask.trim() === "") {
    alert("Aufgabe soll nicht leer sein");
  } else {
    taskText.value = customTask;
    taskName.innerHTML = "Ihre Aufgabe:";

    navigateTo("text_form_container");
  }
});

form.addEventListener("submit", () => {
  loadingContainer.classList.add("active");
});

async function getTestOutput(prompt) {
  //URL!!!
  const res = await fetch("http://localhost:3000/api/v1/gemini", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  });
  const json = await res.json();
  console.log(json);

  window.location.href = "/result";
  /* const text = await json.reply
    outputText.innerHTML=text */
}
