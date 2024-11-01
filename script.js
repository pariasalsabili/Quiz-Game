let currentQuestionIndex = 0;
let score = 0;
let questions = [];

window.onload = function() {
    fetch('categories.json')
        .then(response => response.json())
        .then(data => {
            const categoriesDropdown = document.getElementById('categories');
            data.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoriesDropdown.appendChild(option);
            });
        });
};

function startGame() {
    const selectedCategory = document.getElementById("categories").value;
    fetch(`game.php?category=${selectedCategory}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                questions = data;
                score = 0;
                currentQuestionIndex = 0;
                document.getElementById("score").textContent = score;
                document.getElementById("category-selection").style.display = "none";
                document.getElementById("question-container").style.display = "block";
                document.getElementById("next-button").style.display = "inline-block";
                loadQuestion();
            }
        });
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionObj = questions[currentQuestionIndex];
        document.getElementById("question-text").textContent = questionObj.question;
        const choicesContainer = document.getElementById("choices-container");
        choicesContainer.innerHTML = ''; // Clear previous choices

        questionObj.choices.forEach(choice => {
            const choiceDiv = document.createElement("div");
            choiceDiv.className = "choice";
            choiceDiv.textContent = choice;

            choiceDiv.addEventListener("click", () => selectAnswer(choice));
            choicesContainer.appendChild(choiceDiv);
        });
    } else {
        endGame();
    }
}

function selectAnswer(selectedChoice) {
    const questionObj = questions[currentQuestionIndex];
    const messageElement = document.getElementById("message"); // Get the message display element

    messageElement.textContent = ''; 
    
    if (selectedChoice === questionObj.answer) {
        score++;
        document.getElementById("score").textContent = score;
        messageElement.textContent = "Correct!"; 
        messageElement.style.color = "green"; 
    } else {
        messageElement.textContent = `Wrong! The correct answer is: ${questionObj.answer}`; 
        messageElement.style.color = "red"; 
    }

    currentQuestionIndex++;
    document.getElementById("next-button").disabled = false; 
}

function loadNextQuestion() {
    loadQuestion();
    document.getElementById("next-button").disabled = true;
}

function endGame() {
    document.getElementById("question-container").innerHTML = `<h2>Game Over!</h2><p>Your score: ${score}</p>`;
    document.getElementById("next-button").style.display = "none";
    document.getElementById("category-selection").style.display = "block";
}
