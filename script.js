var availableSkills = {
    "Frontend": ["HTML", "CSS", "JavaScript", "React", "Angular", "Vue"],
    "Backend": ["Node.js", "Django", "Spring Boot", "Express.js", "Flask"],
    "Full Stack": ["MongoDB", "SQL", "GraphQL", "REST API", "Docker"],
    "Tester": ["Selenium", "Jest", "Mocha", "Cypress", "JUnit"],
    "SDET": ["Selenium", "Jest", "Mocha", "Cypress", "JUnit", "MongoDB", "SQL", "GraphQL", "REST API", "Docker"]
};

var skillList = Object.values(availableSkills).flat();

const measureBtn = document.getElementById("measureBtn");
const userImage = document.querySelector(".user img");

let skillImages = {
    "Frontend": "frontend.jpeg",
    "Backend": "backend.jpeg",
    "Full Stack": "fullsprof.webp",
    "Tester": "tester.png",
    "SDET": "tester.png"
};

let experienceCups = {
    "Beginner": { image: "bronze.png", stars: 1 },
    "Fresher": { image: "bronze.png", stars: 2 },
    "Intermediate": { image: "bronze.png", stars: 3 },
    "Senior": { image: "bronze.png", stars: 4 },
    "Learner": { image: "bronze.png", stars: 0 },
    "Not a programmer!": { image: "bronze.png", stars: 0 }
};

measureBtn.addEventListener("click", function () {
    let name = document.getElementById("name").value.trim() || "USER";
    let experience = parseInt(document.getElementById("experience").value) || 0;
    const skillsContainer = document.getElementById("skillsContainer");
    const skillElements = skillsContainer.querySelectorAll(".skill");
    let skills = Array.from(skillElements).map(skill =>  
        skill.textContent
    );
    let websites = parseInt(document.getElementById("websites").value) || 0;
    let apps = parseInt(document.getElementById("apps").value) || 0;

    if (name == "USER") {
        alert("Name required!");
        return;
    }

    let category = classifyUser(skills, websites, apps, experience);
    let level = determineExperienceLevel(experience, websites, apps);

    displayResult(name, category, level);
});

function classifyUser(selectedSkills, websites, apps, experience) {
    let skillCounts = { "Frontend": 0, "Backend": 0, "Full Stack": 0, "Tester": 0, "SDET": 0, "None": 0 };
    
    selectedSkills.forEach(skill => {
        for (let category in availableSkills) {
            if (availableSkills[category].includes(skill)) {
                skillCounts[category]++;
            }
        }
       
    });

    let bestMatch = Object.entries(skillCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
//     selectedSkills.forEach(skill => {

//     if(skill=="SDET" && websites >= 5 && apps >= 3 && experience>=10){
//             return "SDET";
//         }
//     else if ( skill="Full Stack" && websites >= 5 && apps >= 3) {
//         return "Full Stack";
//     } else if (websites >= 3) {
//         return "Frontend";
//     } else if (apps >= 3) {
//         return "Backend";
//     }
// });
    if(bestMatch=="SDET" && experience < 10){
        bestMatch="Tester";
    }
    return bestMatch;
}

function determineExperienceLevel(experience, websites, apps) {
    let score = experience + (websites * 0.5) + (apps * 0.7);

    // if (websites == 0 && apps == 0 && years != 0) {
    //     return "Learner";
    // }
    
    if (score == 0) return "Not a programmer!";
    if (score <= 2) return "Beginner";
    if (score <= 4) return "Fresher";
    if (score <= 6) return "Intermediate";
    return "Senior";
}

const setDisplayNone = () => {
    console.log("Hii");
    document.getElementById("result").remove();
}

function displayResult(name, category, level) {
    if (category == "Learner" || category == "Not a programmer!") {
        category = "Newbie";
    }

    userImage.src = skillImages[category];

    const resultContainer = document.createElement("div");
    resultContainer.id = "result";
    resultContainer.classList.add("result-card");
    
    const cup = experienceCups[level];

    resultContainer.innerHTML = `
        <div class="crossDiv" onclick="setDisplayNone()"><button id="cross"/>X</button></div>
        <h2>${name}</h2>
        <img src="${cup.image}" class="cup-img" alt="${level}">
        <h3>${category}: ${level}</h3>
        <div class="stars">${"⭐".repeat(cup.stars)}</div>
        <p class="caption">Track, Hustle, Repeat</p>
    `;

    document.body.appendChild(resultContainer);
}

function showSuggestions() {
    let input = document.getElementById("skills").value.toLowerCase();
    const suggestionsList = document.getElementById("suggestionsList");
    suggestionsList.innerHTML = "";
    if (input === "") return;
    
    const filteredSkills = skillList.filter(skill => skill.toLowerCase().includes(input));

    console.log(filteredSkills);
    
    filteredSkills.forEach(skill => {
        const div = document.createElement("div");
        div.classList.add("suggestions");
        div.textContent = skill;
        div.onclick = () => addSkill(skill);
        suggestionsList.appendChild(div);
    });
}

function addSkill(skill) {
    const skillsContainer = document.getElementById("skillsContainer");
    const skillElement = document.createElement("div");
    skillElement.classList.add("skill");
    skillElement.textContent = skill;
    skillsContainer.appendChild(skillElement);
    document.getElementById("skills").value = "";
    document.getElementById("suggestionsList").innerHTML = "";
}
