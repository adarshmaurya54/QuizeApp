const apiKey = 'BhV2mwZBDxhdDqKL0mPJpCvfDloEey5kKXg8ZBAu';
const apiEndpoint = 'https://quizapi.io/api/v1/questions';
const categroyarr = ["Linux", "DevOps", "code", "SQL"];
const limitarr = ["3", "5", "10", "20"];
const categroy = document.getElementById("category");
const limit = document.getElementById("limit");
const answerButtons = document.getElementById("answer-buttons");
const question = document.getElementById("Question");
const btns = document.getElementsByClassName("btn");
const nextbtn = document.querySelector("#next button");
const emoji = ["😢","😃","🤩","🥳"];
let score = 0;
for (let i = 0; i < categroyarr.length; i++) {
    categroy.innerHTML += `
        <option value="${categroyarr[i]}">${categroyarr[i]}</option>
    `
    limit.innerHTML += `
        <option value="${limitarr[i]}">${limitarr[i]}</option>
    `
}
// categroy.innerHTML += `

//     `
function Quize(data, i) {
    let j = 0;
    answerButtons.innerHTML = "";
    question.innerHTML = (i + 1) + ". " + data[i].question;
    if (data[i].multiple_correct_answers == "true") {
        question.classList.add("multiple_correct_answers");
    } else {
        question.classList.remove("multiple_correct_answers");
    }
    for (const key in data[i].answers) {
        if (data[i].answers[key] != null) {
            answerButtons.innerHTML += `<button onclick="isCorrect('id${j}')" class="btn" id="id${j}"></button>`;
            document.getElementById("id" + j).innerText = data[i].answers[key];
            j++;
        }
    }
    addClassToCorrectAnswer(data[i]);
}

function showQuize() {
    let url;
    if (categroy.value == "none") {
        url = `${apiEndpoint}?apiKey=${apiKey}&limit=${limit.value}&category=&)`;
    } else {
        url = `${apiEndpoint}?apiKey=${apiKey}&limit=${limit.value}&category=${categroy.value}&)`;
    }
    // Make a GET request to fetch quiz questions
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let i = 0;
            nextbtn.addEventListener("click", function () {
                i++;
                if(i < data.length){
                    Quize(data,i);
                }else{
                    let percetage = (score * 100)/limit.value;
                    if(percetage <= 25){
                        document.getElementById("result").innerHTML = emoji[0];
                        
                    } else if(percetage <= 50){
                        document.getElementById("result").innerHTML = emoji[1];
                        
                    }else if(percetage <= 75){
                        document.getElementById("result").innerHTML = emoji[2];
                        
                    }else{
                        document.getElementById("result").innerHTML = emoji[3];

                    }
                }
            });
            Quize(data,i);
        })
        .catch(error => {
            console.error('Error fetching quiz questions:', error);
        });
}

showQuize();
function addClassToCorrectAnswer(data) {
    let i = 0;
    for (const key in data.correct_answers) {
        if (data.correct_answers[key] === "true") {
            btns[i].classList.add("correct-answer");
        }
        if (i >= btns.length - 1) {
            break;
        }
        i++;
    }
}
function isCorrect(id) {
    let answer = document.getElementById(id);
    let next = document.getElementById("next");
    let correct_answer = document.getElementsByClassName("correct-answer")[0];
    if (answer.classList[1] == 'correct-answer') {
        answer.style.backgroundColor = "#198754eb";
        answer.style.color = "#fff";
        answer.style.border = "none";
        score++;
    } else {
        correct_answer.style.backgroundColor = "#198754eb";
        answer.style.backgroundColor = "#dc3545eb";
        answer.style.color = "#fff";
        answer.style.border = "none";
        correct_answer.style.color = "#fff";
        correct_answer.style.border = "none";
    }
    answerButtons.style.cursor = "not-allowed";
    for (let i = 0; i < btns.length; i++) {
        btns[i].style.pointerEvents = "none";
    }

    next.style.display = "block";
}