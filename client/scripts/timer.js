const timer = () => {
  const timer = document.querySelector(".timer");
  // Set the date we're counting down to
  const countDownDate = new Date("Jun 30, 2023 00:00:00").getTime();
  // Update the count down every 1 second
  const x = setInterval(() => {
    // Get today's date and time
    const now = new Date().getTime();
    // Find the distance between now and the count down date
    const distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // Display the result in the element with id="demo"
    timer.innerHTML = `${days} days left`;
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      timer.innerHTML = "OPEN ARCHIVE!";
    }
  }, 1000);
};

const init = () => {
    timer();
}

init();