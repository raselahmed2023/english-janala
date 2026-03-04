
// step:1

const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((json) => levLesson(json.data))
}
//step:3
//reminder fetch korle seikane kono kaj hoi nah. fetch ekta docu. kore onno jaigai logic implement kora lage.  fetch ta ekta hoisting kaj kore .


const levelWordLoad = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const btnClick = document.getElementById(`lessonClickBtn-${id}`);
            btnClick.classList.add("active");

            displayLevelWord(data.data)
        })

}

//step-5

const removeActive = () => {
    const commonBtn = document.querySelectorAll(".commonClass");
    commonBtn.forEach((btn) => btn.classList.remove("active"));
}

//step-4

const displayLevelWord = (words) => {
    const displayCard = document.getElementById('displayCard');
    displayCard.innerHTML = '';

    if (words.length == 0) {
        displayCard.innerHTML = `
          <div class="text-center col-span-full space-y-6 p-4">
               <img class="mx-auto" src="./assets/alert-error.png" alt="">
              <p class="font-semibold text-xl text-gray-500 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
               <h2 class="text-6xl font-semibold font-bangla">নেক্সট Lesson এ যান</h2>
        </div>
        
        `
    }


    for (let word of words) {
        const divWord = document.createElement('div');
        divWord.innerHTML = `
        <div class="bg-white rounded text-center shadow-sm py-10 px-5 space-y-4">
    <h1 class="font-bold text-4xl font-eng">${word.word ? word.word : "শব্দ নেই"}</h1>
    <p class="font-eng text-2xl ">Meaning / Pronunciation</p>
    <p class="font-bangla font-semibold text-2xl">"${word.meaning ? word.meaning : "অর্থ নেই"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ নেই"}"</p>
    <div class=" flex justify-between items-center">
        <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
    </div>
</div>
        `
        displayCard.appendChild(divWord)
    }
}



//  step:2
const levLesson = (lessons) => {

    //1. get the id where to implement and empty the container
    const lessonLevelContainer = document.getElementById('lessonLevelContainer');
    lessonLevelContainer.innerHTML = "";

    //2 get each lesson by apply loop
    for (let lesson of lessons) {
        //3 create element
        const levBtn = document.createElement('div');
        levBtn.innerHTML = `
        <button id="lessonClickBtn-${lesson.level_no}" onclick="levelWordLoad(${lesson.level_no})" class="btn btn-outline btn-primary w-40 commonClass"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        //4 append the child
        lessonLevelContainer.appendChild(levBtn);
    }
}


loadLesson();