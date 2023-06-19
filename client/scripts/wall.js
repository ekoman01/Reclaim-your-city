// app state
const hasWebSerial = "serial" in navigator;
let isConnected = false;

const $notSupported = document.getElementById("not-supported");
const $supported = document.getElementById("supported");
const $notConnected = document.getElementById("not-connected");
const $connected = document.getElementById("connected");

const $connectButton = document.getElementById("connectButton");

let currentScene = 1;
let totalScenes = 3;
let buttonPressed = false;

const questions = [
  "Wat is typische Kortrijkse cultuur?",
  "Wat kan je niet missen in Kortrijk?",
  "Beste cafe op de grote markt?",
  "Het beste park om rust te vinden?",
  "Bij de K in Kortrijk moet je hier zijn geweest",
  "Wat zijn enkele verborgen pareltjes in Kortrijk?",
  "Wat is er te doen aan de leie?",
  "Wat zijn enkele bekende kunstwerken in Kortrijk?",
  "Wat is je favo vorm van kunst op het bude eiland?",
  "Wat moet er meer te zien zijn op het buda eiland?",
];

let question;

const init = async () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({
    force3D: true,
  });

  // glowing bounce effect
  gsap.fromTo(
    ".glow",
    { scale: 1 },
    { scale: 1.2, duration: 2, repeat: -1, yoyo: true }
  );

  displaySupportedState();
  if (!hasWebSerial) return;
  displayConnectionState();

  navigator.serial.addEventListener("connect", (e) => {
    console.log("connect");
    console.log(e.target);
    const port = e.target;
    const info = port.getInfo();
    console.log("connect", port, info);
    if (!isConnected) {
      connect(port);
    }
  });

  navigator.serial.addEventListener("disconnect", (e) => {
    console.log("disconnect");
    console.log(e.target);
  });

  const ports = await navigator.serial.getPorts();
  console.log(ports);

  $connectButton.addEventListener("click", handleClickConnect);

  if (ports.length > 0) {
    connect(ports[0]);
    if (ports.length > 1) {
      console.warn(
        "More than one port detected. Only the first port will be used."
      );
    }
  }

  // prevent enter key from submitting form
  document.querySelector(".form").onkeypress = function (e) {
    let key = e.charCode || e.keyCode || 0;
    if (key == 13) {
      e.preventDefault();
    }
  }; 
};

const handleClickConnect = async () => {
  const port = await navigator.serial.requestPort();
  console.log(port);
  const info = await port.getInfo();
  console.log(info);
  await connect(port);
};

const connect = async (port) => {
  isConnected = true;
  displayConnectionState();
  await port.open({ baudRate: 9600 });

  const textEncoder = new TextEncoderStream();
  const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
  const writer = textEncoder.writable.getWriter();

  setInterval(async () => {
    if (!isConnected) {
      return;
    }
    await writer.write(
      JSON.stringify({
        //closewall : openorclose,
      })
    );
    await writer.write("\n");
  }, 100);

  while (port.readable) {
    const decoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(decoder.writable);
    const inputStream = decoder.readable.pipeThrough(lineBreakTransformer);
    const reader = inputStream.getReader();

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // |reader| has been canceled.
          break;
        }
        // Do something with |value|...
        try {
          const json = JSON.parse(value);
          document.querySelector(".press").innerHTML = json.data[0];
          if (currentScene === 1 && json.data[0] === 1 && !buttonPressed) {
            buttonPressed = true;
            moveToScene(2);
          }

          if (currentScene === 2 && json.data[0] === 1 && !buttonPressed) {
            if (document.querySelector(".answer").value === ""){
              document.querySelector(".warning").innerHTML = "Gelieve een antwoord in te vullen";
              setTimeout(() => {
                document.querySelector(".warning").innerHTML = "";
              }, 3000);
            } else {
              buttonPressed = true;
              submitForm();
              moveToScene(3);
            }
          }
        } catch (error) {
          //console.log(error);
        }
      }
    } catch (error) {
      // Handle |error|...
    } finally {
      reader.releaseLock();
    }
  }

  port.addEventListener("disconnect", () => {
    console.log("Disconnected");
    isConnected = false;
    displayConnectionState();
  });
};

const lineBreakTransformer = new TransformStream({
  transform(chunk, controller) {
    const text = chunk;
    const lines = text.split("\n");
    lines[0] = (this.remainder || "") + lines[0];
    this.remainder = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  },
  flush(controller) {
    if (this.remainder) {
      controller.enqueue(this.remainder);
    }
  },
});

const displaySupportedState = () => {
  if (hasWebSerial) {
    $notSupported.style.display = "none";
    $supported.style.display = "block";
    setTimeout(() => {
      playArrowAnimation();
    }, 2000);

  } else {
    $notSupported.style.display = "block";
    $supported.style.display = "none";
  }
};

const displayConnectionState = () => {
  if (isConnected) {
    $notConnected.style.display = "none";
    $connected.style.display = "block";
  } else {
    $notConnected.style.display = "block";
    $connected.style.display = "none";
  }
};

const playArrowAnimation = () => {
  document.querySelector(".setup").style.display = "none";
  document.querySelector(".scene_one").style.display = "grid";
}

const submitForm = () => {
  const answer = document.querySelector(".answer").value;
  sendAnswer(question, answer);
  document.querySelector(".answer").value = "";
}

const moveToScene = (sceneNumber) => {
  if (sceneNumber >= 1 && sceneNumber <= totalScenes) {
    currentScene = sceneNumber;

    if (currentScene === 2) {
      question = questions[Math.floor(Math.random() * questions.length)];
      document.querySelector(".question").innerHTML = question;

      transition(".scene_one", ".scene_two");

      setTimeout(function() {
        buttonPressed = false;
      }, 2000);
    }

    if (currentScene === 3) {
      buttonPressed = false;
      
      transition(".scene_two", ".scene_three");
      let counter = 20;

      const sceneThreeCounter = setInterval(function() {
        counter--;
        document.querySelector(".counter").innerHTML = counter;
      }, 1000);

      setTimeout(function() {
        clearInterval(sceneThreeCounter);
        document.querySelector(".scene_three").style.display = "none";
        gsap.to(".scene_one", { x: 0 });
        playArrowAnimation();
        currentScene = 1;
      }, 20000);
    }

    console.log('Moving to Scene', currentScene);
  }
}

const transition = (from, to) => {
  const tlTransition = gsap.timeline();
  tlTransition.fromTo(from, { x: 0 }, { duration: 1, x: -window.innerWidth });
  setTimeout(function () {
    document.querySelector(to).style.display = "grid";
  }, 500);
  tlTransition.fromTo(to, { x: +window.innerWidth }, { duration: 1, x: 0 }, "<0.5");

  setTimeout(function() {
    document.querySelector(from).style.display = "none";
  }, 1000);
}


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

export async function sendAnswer(question, answer) {
  let date_time = new Date().toLocaleString();

  const test = await graphQLRequest(
    `mutation createAnswer( $question: String, $date_time: String, $data: String) {
      save_answers_default_Entry(title: $question, placewall: "K in Kortrijk", date: $date_time, useranswer: $data, authorId: 1) {
        id
      }
    }`,
    {
      question: question,
      date_time: date_time,
      data: answer,
    }
  );
  return test.save_answers_default_Entry;
}

init();
