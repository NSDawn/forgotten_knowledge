// ------PURE JAVASCRIPT!!!------------------------

// query change time button, and give it a click event
const CHANGE_TIME_BUTTON = document.getElementById('change_time_button');
CHANGE_TIME_BUTTON.addEventListener("click", function() {changeTime()});

// change img onscreen to different time
const LIVING_ROOM_IMG_PATHS = ["assets/img/living_room/Day.PNG", "assets/img/living_room/Noon.PNG","assets/img/living_room/Night.PNG"]
let living_room_img_idx = 0;
function changeTime() {
    living_room_img_idx = living_room_img_idx == LIVING_ROOM_IMG_PATHS.length -1 ? 0 : living_room_img_idx +1;

    const LIVING_ROOM_IMG = document.getElementsByClassName("living_room_img")[0];
    LIVING_ROOM_IMG.src = LIVING_ROOM_IMG_PATHS[living_room_img_idx];

    showFact()
}


// onload, remove the loading animation
window.addEventListener('load', function() {
    var loader = document.querySelector('.loader');
    loader.style.display = 'none';
});


const FACT_POPUP_WRAPPER = document.getElementsByClassName("popup_wrapper")[0];
const FACT_POPUP_CLOSE_BUTTON = document.getElementsByClassName("close_fact_popup")[0];

FACT_POPUP_CLOSE_BUTTON.addEventListener("click", hideFact);


function showFact() {
    FACT_POPUP_WRAPPER.style.display ="block";
    CHANGE_TIME_BUTTON.style.pointerEvents = 'none';
}

function hideFact() {
    FACT_POPUP_WRAPPER.style.display ="none";
    CHANGE_TIME_BUTTON.style.pointerEvents = 'auto';
} hideFact();

// -P5!!!-----------------------------------------------

const SCALE = 4;
const IMG = {};
const IMG_LIST = [
    "living_room/room.png",
    "living_room/dog.png",
    "living_room/dog_extracted.png",
    "living_room/lamp.png",
    "living_room/meds.png",
    "living_room/table.png",
];

let objectHovering = "";

function setup() {
    const CANVAS = createCanvas(150 * SCALE, 100 * SCALE);
}

function preload() {
    for (let k = 0; k < IMG_LIST.length; k++) {
        IMG[IMG_LIST[k].replace(".png", "")] = loadImage("./assets/img/" + IMG_LIST[k])
    }
}  

let cursor_pos = new v2(0, 0);

function draw() {
    objectHovering = "room";

    scale(SCALE);
    imageMode(CENTER);
    noSmooth();

    cursor_pos.x = mouseX; cursor_pos.y = mouseY;

    image(IMG["living_room/room"], 75, 50);
    
    image(IMG["living_room/table"], 75, 50);
    image(IMG["living_room/meds"], 75, 50);

    const DOG_BOUNDING_BOX = [new v2(100, 81), new v2(127, 97)];
    if (cursor_pos.isWithin(DOG_BOUNDING_BOX[0].scaled(SCALE), DOG_BOUNDING_BOX[1].scaled(SCALE))) {
        image(IMG["living_room/dog_extracted"], 100 + 14, 81 + 8, 28 * 1.2, 16* 1.2);
        objectHovering = "dog";
    } else {
        image(IMG["living_room/dog_extracted"], 100 + 14, 81 + 8, 28, 16);
    }
}


function mouseClicked() {
    switch (objectHovering) {
        case "room": 
            console.log("you're not really clicking anything in particular.");
            return false;
        case "dog": 
            console.log ("woof"); 
            return true;
    }

}