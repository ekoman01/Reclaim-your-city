const init = () => {
    let checked = false;

    document.querySelector(".mobile_nav_button").addEventListener("click", () => {
        if (checked == false) {
            gsap.fromTo(".mobile_nav_container", {x: 1000}, { x: 0});
            document.querySelector(".mobile_nav_container").style.display = "flex";
            gsap.to(".mobile_nav_button", { rotation: 180});
            document.querySelector(".mobile_nav_button").src = "../assets/images/cross.png";
            document.querySelector("html").style.overflowY = "hidden";
            checked = true;
        } else {
            gsap.to(".mobile_nav_container", { x: 1000});
            setTimeout(() => {
                document.querySelector(".mobile_nav_container").style.display =
                "none";
            }, 50);
            gsap.to(".mobile_nav_button", { rotation: -360});
            document.querySelector(".mobile_nav_button").src = "../assets/images/menu.png";
            document.querySelector("html").style.overflowY = "unset";
            checked = false;
        }
            
        });
}

init();