const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const fillPage = () => {
  const places = [
    {
      name: "K in Kortrijk",
      description:
        "A place where fashion, free time, interior, the catering industry and so much more come together.",
    },
    {
      name: "Koningin Astrid park",
      description:
        "The park was named after the Queen Astrid who visited the park on the 5th of April in 1935.",
    },
    {
      name: "Texture museum",
      description:
        "The museum is open from 10 to 17 o’ clock on Monday's en on holidays (24/12, 25/12, 31/12, 1/01)",
    },
    {
      name: "Begijnhof",
      description:
        "The Begijnhof in Kortrijk was founded in 1238 by Johanna of Constantinopel.",
    },
    {
      name: "Kortrijk Weide",
      description:
        "Kortrijk Weide is the new part of the city where multiple functions come together. The Nelson Mandelaplein is a events square that can accommodate no fewer than 15,000 spectators.",
    },
    {
      name: "Skatebowl Albertpark",
      description:
        "The skatebowl in Kortrijk is the very first skate bowl worthy of it’s name. This ‘concretepark’ was built by Team Pain.",
    },
  ];

  const index = urlParams.get(`category`);
  document.querySelector(`.place`).innerHTML = places[parseInt(index)].name;
  document.querySelector(`.place_description`).innerHTML =
    places[index].description;
};

const animation = () => {
  const tl = gsap.timeline({ repeat: -1 });
  tl.to(".lock", 0.1, {
    rotate: "+5",
    transformOrigin: "50% 100%",
    duration: 0.1,
  });
  tl.to(".lock", { x: "0", duration: 0.1 });
  tl.to(".lock", 0.1, {
    rotate: "-5",
    transformOrigin: "50% 100%",
    duration: 0.1,
  });
  tl.to(".lock", {
    x: "0",
    rotate: "0",
    transformOrigin: "50% 100%",
    duration: 0.1,
  });
  tl.to(".lock", { x: "0", rotate: "0" }, "+=1");
  tl.to(".lock", 0.1, {
    rotate: "-5",
    transformOrigin: "50% 100%",
    duration: 0.1,
  });
  tl.to(".lock", { x: "0", duration: 0.1 });
  tl.to(".lock", 0.1, {
    rotate: "+5",
    transformOrigin: "50% 100%",
    duration: 0.1,
  });
  tl.to(".lock", {
    x: "0",
    rotate: "0",
    transformOrigin: "50% 100%",
    duration: 0.1,
  });
  tl.to(".lock", { x: "0", rotate: "0" }, "+=1");
};

const fillList = async () => {
    const answers = await getAnswers();

    answers.forEach(answer => {
        const div = document.createElement("div");
        div.className = "archive_list_item";
        div.innerHTML = `
            <div class="archive_list_item_left">
                    <p class="place">K in Kortrijk</p>
                    <img src="../assets/images/archive.png" alt="">
                </div>
                <div class="archive_list_item_right">
                    <p class="question">${answer.title}</p>
                    <p class="date">${answer.date}</p>
                    <p class="answer">${answer.useranswer}</p>
                </div>
            </div> 
        `;
        document.querySelector(".archive_list").appendChild(div);
    });
}

{/* 
<div class="archive_list_item">
    <div class="archive_list_item_left">
        <p class="place">K in Kortrijk</p>
        <img src="../assets/images/archive.png" alt="">
    </div>
    <div class="archive_list_item_right">
        <p class="question">Wat is typische Kortrijkse cultuur?</p>
        <p class="date">18/6/2023</p>
        <p class="answer">Het eten, de mensen en vooral de herinneringen</p>
    </div>
</div> 
*/}

/////////////////////////////
/////////////////////////////
//// database connection ////
/////////////////////////////
/////////////////////////////

const BASE_URL = import.meta.env.VITE_API_ENDPOINT || "";

export const graphQLRequest = async (query, variables = {}) => {
  const result = await fetch(`${BASE_URL}/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json());
  if (!result.data) {
    console.log(result);
    throw new Error(result.errors[0].message);
  }
  return result;
};

export async function getAnswers() {
  const result = await graphQLRequest(
    `query getAnswers{
        answersEntries {
            ... on answers_default_Entry {
            id
            title
            date
            useranswer
            }
        }
    }`
  );
  return result.data.answersEntries;
}

const init = () => {
  fillPage();
  animation();
  fillList();

  document.querySelector(".lock").addEventListener("click", () => {
    document.querySelector(".locked").style.display = "none";
    document.querySelector(".archive").style.display = "block";
  });
};

init();
