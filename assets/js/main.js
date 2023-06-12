// ------PURE JAVASCRIPT!!!------------------------

var day_num = 1; 
var time_of_day = 'day'
var isShowingFact = false;

const FACT_CONTENT = document.getElementsByClassName('fact_content')[0]
const FACT_TITLE= document.getElementsByClassName('fact_title')[0]


// query change time button, and give it a click event
const CHANGE_TIME_BUTTON = document.getElementById('change_time_button');
CHANGE_TIME_BUTTON.addEventListener("click", advanceTime);

// onload, remove the loading animation
window.addEventListener('load', function() {
    var loader = document.querySelector('.loader');
    loader.style.display = 'none';
});


const FACT_POPUP_WRAPPER = document.getElementsByClassName("popup_wrapper")[0];
const FACT_POPUP_CLOSE_BUTTON = document.getElementsByClassName("close_fact_popup")[0];

FACT_POPUP_CLOSE_BUTTON.addEventListener("click", hideFact);


function showFact() {
    const SCRIPTLINE = (FACT_SCRIPT[day_num][time_of_day][objectHovering] ?? "Missing||Bingus Wingus").split("||");
    isShowingFact = !false;

    FACT_TITLE.innerHTML = SCRIPTLINE[0] ?? "[!!] Missing";
    FACT_CONTENT.innerHTML = SCRIPTLINE[1] ?? "[!!] Bingus Wingus";

    FACT_POPUP_WRAPPER.style.display = "block";
    CHANGE_TIME_BUTTON.style.pointerEvents = 'none';
}

function hideFact() {
    FACT_POPUP_WRAPPER.style.display ="none";
    isShowingFact = false;
    CHANGE_TIME_BUTTON.style.pointerEvents = 'auto';
} hideFact();

// -P5!!!-----------------------------------------------

var SCALE = 4;
const IMG = {};
const IMG_LIST = [
    "living_room/room.png",
    "living_room/dog.png",
    "living_room/dog_extracted.png",
    "living_room/lamp.png",
    "living_room/meds.png",
    "living_room/table.png",
    "living_room/meds_extracted.png",
    "living_room/lamp.png",
    "living_room/lamp_extracted.png",
    "living_room/photo_rack.png",
    "living_room/photo_1_extracted.png",
    "living_room/photo_2_extracted.png",
    "living_room/photo_3_extracted.png",
    "living_room/photo_4_extracted.png",
    "living_room/couch.png",
    "living_room/books.png",
    "living_room/books_extracted.png",
    "living_room/window_night.png",
    "living_room/window_day.png",
    "living_room/window_noon.png",
    "living_room/filter_noon.png",
    "living_room/filter_night.png",
    "living_room/filter_day.png",

];

let objectHovering = "";
var TIME_OF_DAY_REF = ['day', 'noon', 'night']

function setup() {
    
    const CANVAS = createCanvas(150 * SCALE, 100 * SCALE);
    CANVAS.parent('p5Canvas');

    setCanvasSize()

}

function preload() {
    for (let k = 0; k < IMG_LIST.length; k ++) {
        IMG[IMG_LIST[k].replace(".png", "")] = loadImage("./assets/img/" + IMG_LIST[k])
    }
}  

let cursor_pos = new v2(0, 0);

// p5 draw function, runs every ∆t
function draw() {

    // init frame
    scale(SCALE);
    setCanvasSize();
    imageMode(CENTER);
    noSmooth();

    cursor_pos.x = mouseX; cursor_pos.y = mouseY;

    // render on-screen static things 
    image(IMG["living_room/room"], 75, 50);
    image(IMG["living_room/table"], 75, 50);
    image(IMG["living_room/photo_rack"], 75, 50);
    image(IMG["living_room/couch"], 75, 50);
    
    image(IMG["living_room/filter_" + time_of_day] ?? IMG["living_room/filter_day"], 75, 50)
    
    image(IMG["living_room/window_" + time_of_day] ?? IMG["living_room/window_day"], 75, 50)

    
    // look for what object is being hovered over
    objectHovering = 'room';
    for (let obj in OBJ_BOUNDING_BOXES) {
        // disable while a pop up window is up
        if (isShowingFact) break;
        // else go through all the bounding boxes
        if (cursor_pos.isWithin(OBJ_BOUNDING_BOXES[obj][0].scaled(SCALE), OBJ_BOUNDING_BOXES[obj][1].scaled(SCALE))) {
            objectHovering = obj;
            break;
        }
    } 


    // render on-screen objects, highlighting the one that is being hovered over
    switch (objectHovering) {
        case "room":
            image(IMG["living_room/meds_extracted"], 39, 72.5, 16, 9);
            image(IMG["living_room/lamp_extracted"], 133.5, 62.5, 23, 55);
            image(IMG["living_room/dog_extracted"], 100 + 14, 81 + 8, 28, 16);
            image(IMG["living_room/photo_1_extracted"], 84.5, 29.5, 5, 7);
            image(IMG["living_room/photo_2_extracted"], 95, 25.5, 4, 5);
            image(IMG["living_room/photo_3_extracted"], 103.5, 26.5, 5, 7);
            image(IMG["living_room/photo_4_extracted"], 112, 23.5, 4, 5);
            image(IMG["living_room/books_extracted"], 13, 71, 22, 16);
            break;
        case "meds": 
            image(IMG["living_room/meds_extracted"], 39, 72.5, 16*1.2, 9*1.2);
            image(IMG["living_room/lamp_extracted"], 133.5, 62.5, 23, 55);
            image(IMG["living_room/dog_extracted"], 100 + 14, 81 + 8, 28, 16);
            image(IMG["living_room/photo_1_extracted"], 84.5, 29.5, 5, 7);
            image(IMG["living_room/photo_2_extracted"], 95, 25.5, 4, 5);
            image(IMG["living_room/photo_3_extracted"], 103.5, 26.5, 5, 7);
            image(IMG["living_room/photo_4_extracted"], 112, 23.5, 4, 5);
            image(IMG["living_room/books_extracted"], 13, 71, 22, 16);
            break;
        case "lamp": 
            image(IMG["living_room/lamp_extracted"], 133.5, 62.5, 23*1.2, 55*1.2);
            image(IMG["living_room/meds_extracted"], 39, 72.5, 16, 9);
            image(IMG["living_room/dog_extracted"], 100 + 14, 81 + 8, 28, 16);
            image(IMG["living_room/photo_1_extracted"], 84.5, 29.5, 5, 7);
            image(IMG["living_room/photo_2_extracted"], 95, 25.5, 4, 5);
            image(IMG["living_room/photo_3_extracted"], 103.5, 26.5, 5, 7);
            image(IMG["living_room/photo_4_extracted"], 112, 23.5, 4, 5);
            image(IMG["living_room/books_extracted"], 13, 71, 22, 16);
            break;
        case "dog": 
            image(IMG["living_room/dog_extracted"], 100 + 14, 81 + 8, 28 * 1.2, 16* 1.2);
            image(IMG["living_room/meds_extracted"], 39, 72.5, 16, 9);
            image(IMG["living_room/lamp_extracted"], 133.5, 62.5, 23, 55);
            image(IMG["living_room/photo_1_extracted"], 84.5, 29.5, 5, 7);
            image(IMG["living_room/photo_2_extracted"], 95, 25.5, 4, 5);
            image(IMG["living_room/photo_3_extracted"], 103.5, 26.5, 5, 7);
            image(IMG["living_room/photo_4_extracted"], 112, 23.5, 4, 5);
            image(IMG["living_room/books_extracted"], 13, 71, 22, 16);
            break;
        case "photo_1": 
            image(IMG["living_room/photo_1_extracted"], 84.5, 29.5, 5 *1.2, 7 *1.2);
            image(IMG["living_room/meds_extracted"], 39, 72.5, 16, 9);
            image(IMG["living_room/lamp_extracted"], 133.5, 62.5, 23, 55);
            image(IMG["living_room/dog_extracted"], 100 + 14, 81 + 8, 28, 16);
            image(IMG["living_room/photo_2_extracted"], 95, 25.5, 4, 5);
            image(IMG["living_room/photo_3_extracted"], 103.5, 26.5, 5, 7);
            image(IMG["living_room/photo_4_extracted"], 112, 23.5, 4, 5);
            image(IMG["living_room/books_extracted"], 13, 71, 22, 16);
            break;
        case "photo_2": 
            image(IMG["living_room/photo_2_extracted"], 95, 25.5, 4 *1.2, 5 *1.2);
            image(IMG["living_room/meds_extracted"], 39, 72.5, 16, 9);
            image(IMG["living_room/lamp_extracted"], 133.5, 62.5, 23, 55);
            image(IMG["living_room/dog_extracted"], 100 + 14, 81 + 8, 28, 16);
            image(IMG["living_room/photo_1_extracted"], 84.5, 29.5, 5, 7);
            image(IMG["living_room/photo_3_extracted"], 103.5, 26.5, 5, 7);
            image(IMG["living_room/photo_4_extracted"], 112, 23.5, 4, 5);
            image(IMG["living_room/books_extracted"], 13, 71, 22, 16);
            break;
        case "photo_3":
            image(IMG["living_room/photo_3_extracted"], 103.5, 26.5, 5 *1.2, 7 *1.2);
            image(IMG["living_room/meds_extracted"], 39, 72.5, 16, 9);
            image(IMG["living_room/lamp_extracted"], 133.5, 62.5, 23, 55);
            image(IMG["living_room/dog_extracted"], 100 + 14, 81 + 8, 28, 16);
            image(IMG["living_room/photo_1_extracted"], 84.5, 29.5, 5, 7);
            image(IMG["living_room/photo_2_extracted"], 95, 25.5, 4, 5);
            image(IMG["living_room/photo_4_extracted"], 112, 23.5, 4, 5);
            image(IMG["living_room/books_extracted"], 13, 71, 22, 16);
            break;
        case "photo_4":
            image(IMG["living_room/photo_4_extracted"], 112, 23.5, 4 *1.2, 5 *1.2);
            image(IMG["living_room/meds_extracted"], 39, 72.5, 16, 9);
            image(IMG["living_room/lamp_extracted"], 133.5, 62.5, 23, 55);
            image(IMG["living_room/dog_extracted"], 100 + 14, 81 + 8, 28, 16);
            image(IMG["living_room/photo_1_extracted"], 84.5, 29.5, 5, 7);
            image(IMG["living_room/photo_2_extracted"], 95, 25.5, 4, 5);
            image(IMG["living_room/photo_3_extracted"], 103.5, 26.5, 5, 7);
            image(IMG["living_room/books_extracted"], 13, 71, 22, 16);
            break;
        case "books": 
            image(IMG["living_room/books_extracted"], 13, 71, 22 *1.2, 16 *1.2);
            image(IMG["living_room/meds_extracted"], 39, 72.5, 16, 9);
            image(IMG["living_room/lamp_extracted"], 133.5, 62.5, 23, 55);
            image(IMG["living_room/dog_extracted"], 100 + 14, 81 + 8, 28, 16);
            image(IMG["living_room/photo_1_extracted"], 84.5, 29.5, 5, 7);
            image(IMG["living_room/photo_2_extracted"], 95, 25.5, 4, 5);
            image(IMG["living_room/photo_3_extracted"], 103.5, 26.5, 5, 7);
            image(IMG["living_room/photo_4_extracted"], 112, 23.5, 4, 5);
            break;
    }

    // add an additional filter over everything
    image(IMG["living_room/filter_" + time_of_day] ?? IMG["living_room/filter_day"], 75, 50)

}


function mouseClicked() {

    if (objectHovering != "room") { 
        showFact()
    }

    switch (objectHovering) {
        case "room": 
            return false;
        case "dog": 
            return true;
        case "lamp":
            return true;
        case "meds": 
            return true;
        case "photo_1": 
            return true; 
        case "photo_2": 
            return true;   
        case "photo_3": 
            return true;     
        case "photo_4": 
            return true; 
        case "books" : 
            return true;  
    }

}

// reset canvas size dynamically, keeping it with the CSS calculated size.
const CANVAS_ELEMENT = document.getElementById('p5Canvas')
function setCanvasSize() {
    const startSCALE = SCALE;
    const WIDTH = CANVAS_ELEMENT.offsetWidth;
    SCALE = WIDTH /150;
    if (startSCALE == SCALE) return;
    resizeCanvas(150 * SCALE, 100 * SCALE);
}

function advanceTime() {
    let idx = TIME_OF_DAY_REF.indexOf(time_of_day)
    idx = idx === -1 ? 0 : (idx +1) % (TIME_OF_DAY_REF.length);
    time_of_day = TIME_OF_DAY_REF[idx]
    if (idx === 0) {day_num ++}
    return time_of_day;
}

// REF -----------------------------------------------

// update this as the story is written.
// use || to seperate fields.
// format: "Title||Text"
const FACT_SCRIPT = {
    1: {
        "day" : {
            "dog": "Spot||This is my dog, Spot. They've been with me for a long time now. I haven't been able to play with Spot as much as I used to.",
            
            "": "",
        },
        
        
    },
    2: {

    },
    3: {

    },
    4: {

    },
}

// object boundaries on screen, probs no touchy.
const OBJ_BOUNDING_BOXES = {
    "meds":         [new v2(39-8, 72.5-4.5), new v2(39+8, 72.5+4.5)], 
    "lamp":         [new v2(133.5-11.5, 62.5-27.5), new v2(133.5+11.5, 62.5+27.5)],
    "dog":          [new v2(100, 81), new v2(127, 97)],
    "photo_1":      [new v2(84.5 +2.5, 29.5 +3.5), new v2(84.5 -2.5, 29.5 -3.5)],
    "photo_2":      [new v2(95 +2, 25.5 +2.5), new v2(95 -2, 25.5 -2.5)],
    "photo_3":      [new v2(103.5 +2.5, 26.5 +3.5), new v2(103.5 -2.5, 26.5 -3.5)],
    "photo_4":      [new v2(112 +2, 23.5 +2.5), new v2(112 -2, 23.5 -2.5)],
    "books":        [new v2(13 +11, 71 +8), new v2(13 -11, 71 -8)],
}