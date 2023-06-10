const chapters = [
  {
    name: "intro_left_where",
    text: "The Festival will highlight certain places in Kortrijk. The biggest place will be at the Broelkaai. Here a “golden wall” will be erected to show the data we collected over the past school year. The golden paths will also overflow with the golden vision of Kortrijk.",
  },
  {
    name: "intro_left_when",
    text: "The event starts right after everyone is done with their exams, this way they can rap up their school year in fashion. <br> <br> The official date is 20 june.",
  },
  {
    name: "intro_left_who",
    text: "Our main goal is to inspire young adults and push the to go and explore the city. However this event is completely open to the public. Anyone can come, the more souls the more joy. ",
  },
];

const introLeftHover = () => {
    chapters.forEach((chapter) => {
      const chapterElement = document.querySelector(`.${chapter.name}`); 
        chapterElement.addEventListener("mouseover", () => { 
            document.querySelector(".intro_right_text").innerHTML = 
              chapter.text; 
        });
    });
};

const init = () => {
  introLeftHover();
};

init();