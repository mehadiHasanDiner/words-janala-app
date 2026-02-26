const lessonBtnContainer = document.getElementById("lesson-btn-container");
const wordsContainer = document.getElementById("words-container");

// loading lessons button levels
const loadingLessonsLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      displayingLessonBtnLevel(data.data);
    });
};

const displayingLessonBtnLevel = (lessons) => {
  console.log(lessons);
  for (let lesson of lessons) {
    const lessonsBtnDiv = document.createElement("span");
    lessonsBtnDiv.innerHTML = `
        <button onclick="gettingWordsByLevel('${lesson.level_no}')" class="btn btn-outline btn-primary m-1"> <i class="fa-solid fa-book-open"></i></>
                    Lesson-${lesson.level_no}</button>
    `;
    lessonBtnContainer.append(lessonsBtnDiv);
  }
};

//getting words by button level
const gettingWordsByLevel = (levelId) => {
  fetch(`https://openapi.programming-hero.com/api/level/${levelId}`)
    .then((res) => res.json())
    .then((data) => {
      displayWordsByLevel(data.data);
    });
};

const displayWordsByLevel = (words) => {
  wordsContainer.innerHTML = "";
  console.log(words);
};

loadingLessonsLevel();
