const lessonBtnContainer = document.getElementById("lesson-btn-container");
const wordsContainer = document.getElementById("words-container");

// login functionality
const submitLogin = () => {
  const nameField = document.getElementById("name-field").value.trim();
  const passwordField = document.getElementById("password-field").value.trim();
  // যদি name খালি থাকে
  if (nameField === "") {
    alert("নাম খালি রাখা যাবে না!");
    return;
  }

  // যদি password খালি থাকে
  if (passwordField === "") {
    alert("পাসওয়ার্ড খালি রাখা যাবে না!");
    return;
  }

  // যদি password ভুল হয়
  if (passwordField !== "123456") {
    alert("ভুল পাসওয়ার্ড!");
    return;
  }

  // সব ঠিক থাকলে Sweet Alert দেখাবে
  Swal.fire({
    title: "Successfully Login!",
    text: "Welcome " + nameField,
    icon: "success",
    confirmButtonText: "OK",
  }).then(() => {
    // Hidden section গুলো show হবে
    document.getElementById("header").style.display = "block";
    document.getElementById("vocabularies").style.display = "block";
    document.getElementById("faq").style.display = "block";
    document.getElementById("hero").style.display = "none";
  });
};

const submitLogout = () => {
  const nameField = document.getElementById("name-field").value.trim();
  Swal.fire({
    title: "Logging Out!",
    text: " Bye Bye " + nameField,
    icon: "success",
    confirmButtonText: "OK",
  }).then(() => {
    // Hidden section গুলো show হবে
    document.getElementById("header").style.display = "none";
    document.getElementById("vocabularies").style.display = "none";
    document.getElementById("faq").style.display = "none";
    document.getElementById("hero").style.display = "block";
  });
};

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
        <button id="btn-${lesson.level_no}" onclick="gettingWordsByLevel(${lesson.level_no})" class="btn btn-outline btn-primary m-1"> <i class="fa-solid fa-book-open"></i></>
                    Lesson-${lesson.level_no}</button>
    `;
    lessonBtnContainer.append(lessonsBtnDiv);
  }
};

// removing active class
const removeActiveClass = () => {
  const selectActive = document.getElementsByClassName("active");
  for (let btn of selectActive) {
    btn.classList.remove("active");
  }
};

//getting words by button level and active class functionality
const gettingWordsByLevel = (levelId) => {
  fetch(`https://openapi.programming-hero.com/api/level/${levelId}`)
    .then((res) => res.json())
    .then((data) => {
      displayWordsByLevel(data.data);
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${levelId}`);
      clickedButton.classList.add("active");
    });
};

// show word details
const loadingWordDetails = (wordId) => {
  fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
    .then((res) => res.json())
    .then((data) => displayWordDetails(data.data));
};

const displayWordDetails = (wordData) => {
  document.getElementById("word_details").showModal();
  const wordDetailsCard = document.getElementById("modal-container");
  // wordDetailsCard.innerHTML = ``;
};

// listen words sound
const listenPronunciation = (word) => {
  const msg = new SpeechSynthesisUtterance();
  msg.text = word;
  msg.lang = "en-US"; // ভাষা সেট করা (optional but recommended)
  msg.rate = 0.5;
  msg.pitch = 1;
  window.speechSynthesis.speak(msg);
};

const displayWordsByLevel = (words) => {
  console.log(words);
  wordsContainer.innerHTML = "";
  if (words.length === 0) {
    wordsContainer.innerHTML = `
            <div class="mx-auto flex flex-col col-span-full space-y-4">
                <img class="w-24 mx-auto" src="./assets/alert-error.png" alt="">
                <p class="text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h3 class="font2 font-bold text-2xl">নেক্সট Lesson এ যান</h3>
            </div>
    `;
  }

  for (let word of words) {
    const wordsCardDiv = document.createElement("div");
    wordsCardDiv.innerHTML = `
            <div class="card bg-white shadow-sm">
                <div class="card-body">
                    <h2 class=" font-bold text-xl text-center">${word.word}</h2>
                    <p>Meaning/Pronunciation</p>
                    <p class=" font-bold text-lg text-center font2">${
                      word.meaning === null ? "অর্থ নেই" : word.meaning
                    } / ${word.pronunciation}</p>
                    <div class="card-actions justify-between">
                        <button onclick="loadingWordDetails('${
                          word.id
                        }')" class="btn btn-ghost"><i class="fa-solid fa-circle-info"></i></button>
                        <button onclick="listenPronunciation('${
                          word.word
                        }')" class="btn btn-ghost"> <i class="fa-solid fa-volume-high"></i> </button>
                    </div>
                </div>
            </div>
    `;
    wordsContainer.append(wordsCardDiv);
  }
};

loadingLessonsLevel();
