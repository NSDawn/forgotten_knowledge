// query change time button, and give it a click event
const CHANGE_TIME_BUTTON = document.getElementById('change_time_button');
console.log(CHANGE_TIME_BUTTON);
CHANGE_TIME_BUTTON.addEventListener("click", function() {changeTime()});

// change img onscreen to different time
const LIVING_ROOM_IMG_PATHS = ["assets/img/living_room/Day.PNG", "assets/img/living_room/Noon.PNG","assets/img/living_room/Night.PNG"]
let living_room_img_idx = 0;
function changeTime() {
    living_room_img_idx = living_room_img_idx == LIVING_ROOM_IMG_PATHS.length -1 ? 0 : living_room_img_idx +1;

    const LIVING_ROOM_IMG = document.getElementsByClassName("living_room_img")[0];
    LIVING_ROOM_IMG.src = LIVING_ROOM_IMG_PATHS[living_room_img_idx];
}


// onload, remove the loading animation
window.addEventListener('load', function() {
    var loader = document.querySelector('.loader');
    loader.style.display = 'none';
});