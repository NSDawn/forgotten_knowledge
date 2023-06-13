// ------PURE JAVASCRIPT!!!------------------------

var day_num = 1; 
var time_of_day = 'day';
var isShowingFact = false;

const FACT_CONTENT = document.getElementsByClassName('fact_content')[0]
const FACT_TITLE= document.getElementsByClassName('fact_title')[0]


// query change time button, and give it a click event
const CHANGE_TIME_BUTTON = document.getElementById('change_time_button');
CHANGE_TIME_BUTTON.addEventListener("click", function() {
    objectHovering = 'room';
    showFact();
    advanceTime();
    if (day_num == 5 && time_of_day == "day") {
        day_num = 1;
        time_of_day = "day";
    }
});

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
            
            "photo_1": "Daughter||This is my daughter…I am so proud of her. You know when she was younger, she used to try to dig to China. Such a lively kid. She’s married to uhhh… oh what's his face. Ah, doesn’t matter anyway.",

            "photo_2": "My Grandson, My Daughter and Her Husband||This is my grandson. Ohhhh, he is so adorable with that smile of his. He's definitely going to grow up to be such a handsome lad. How old is he? 7...8?",

            "photo_3": "Rock Climbing Photo||You know when I was younger I used to rock climb. I was a natural. I climbed this mountain famous among rock climbers called Red Rock.",

            "photo_4": "Family Reunion||Ahh, I miss the good old days when we had BBQ in the backyard for family gatherings. Ohh, there’s my daughter and her grandson. Uhhh, I think that is the man she married, but I can’t remember his name. Ohh, there is my husband, such a handsome man. And, there's our wonderful dog Spot.",

            "room": "Journal Entry #1||Do you ever just walk through a door and forget what you were doing? Yeah, that's me. Anyway, I have had that feeling every day all day for a while now. Some days are not as bad as others but it's scary having Alzheimer’s.",
        },

        "noon" : {
            "books": "Books||I've been reading so much now that I have so much free time.",

            "room": "Journal Entry #2||It’s been tough for me and everyone around me ever since I was diagnosed with Alzheimer’s by my doctor, especially since I am not one of the lucky ones who have a mild case. Turns out there’s more than 70% of us elderly folk that might end up having this disease but it still does not make matters easier. I just have to hope that my children and their children don’t have to go through this as I do. It’s like a ghostly shell where I fail to control anything around me, one moment I’m there the next my body controls the outcome.",
        },

        "night": {
            "meds": "Medication||I just got this medication today. I have to take it every night.",

            "room": "Journal Entry #3||Have I forgotten something? This question seems to plague my mind more often than not with every encounter and visit. What started at first to be moments gone in a flash, where there were moments I lost my train of thought more often than not. It feels like I’m clinging onto bits of my mind, my memories, the parts that make me who I am. I could see the fear and sadness in the people around me, but it’s like I’m stuck in this hazy fog where I could barely find the lighthouse back to who I was, where I could remember who they were, be able to travel once more, and not be stuck in this giant ocean.",
        },
        
        
    },

    2: {
        "day" : {
            "photo_2": "My Grandson, My Daughter and Her Husband||Some of my family photos are starting to become a blur. Like, who is that kid next to my daughter. Oh, is that my grandson? Oh gosh, I'm getting worse, I don’t want this to happen.",
            
            "room": "Journal Entry #4||Faces flash in front of me but I’m struggling to remember who they are. They have been in my life forever but I can’t seem to recall these memories as well as I used to. That's the thing with me now. Remembering is hard.",
        },

        "noon" : {
            "dog": "Spot||Spot seems to be really concerned about me today.",

            "meds": "Medication||I just got this new set of medication today.",

            "room": "Journal Entry #5||Spot, my dog, seems to sense my discomfort when I return home with a new pack of medication. My room was quiet, has it always been this silent, I could have sworn that there was laughter echoing through the halls about a birthday party or was it a baby shower? Where is everybody? Why can’t I find anybody? What’s going on? Where am I? It’s getting darker, have I truly lost my mind? ",
        },

        "night" : {
            "books": "Books||It feels like my home is just filled with paper, to the point where I would find them in my pockets, each one of them with different notes. Some simple reminders for slight chores, medication, and the people in the pictures; there are even times when I need alarms to remind me that I need to drink a cup of water. There are slight moments where my mind would clear up for a moment, those times I cherished as I see the light return to my loved one’s eyes, such moments that trigger it must have been the sounds and smells around me.",

            "dog": "Spot||The nurse has been helping me get through this process so that way I could still spend time with my family, my dog has been some help in getting me to move around and not be depressed for too long. But even with all of that help, a part of me is scared and afraid of what would happen.",

            "room": "Journal Entry #6||Whenever I can’t sleep I sometimes try to learn more of what I’m going through almost like it’s part of my routine or ritual, yet it still doesn’t take away this feeling. One day I won’t remember anything, it might take longer periods of time to remember where I am or who they are but I at least hope I will be there when it truly matters.",
        },

    },

    3: {
        "day" : {
            "lamp": "Lamp||Sometimes, I find myself just turning this lamp on and off repeatedly at random times during the day.",

            "room": "Journal Entry #7||Did you know that your brain shrinks when you have Alzheimer's disease? Because that is what feels like happened to me. Night turns to day and day turns to night. Things that I do are a blur. *Did I do this already or not?* Most of the time it is like walking through a door and forgetting what I came in there for. But I'm getting worse and worse as the years go by. The pictures on the wall are fading. My memory can not be trusted. Sometimes I don’t even know who I am. ",
        },

        "noon" : {
            "book": "Books||I've been trying to read these books, but it's been hard to remember what is going on in them.",

            "room": "Journal Entry #8||After going through the last passages for the week, I thought of writing down more of my experiences with living with Alzheimer’s, not just the process. Maybe then I would be able to provide a reference to my family if they were to go through it or at least for them to know what’s going on. That they’ll know what’s going on in my head and that I do see and hear them. With this notebook in hand, I’ll try to continue writing my experiences as I try to pace back to what I was doing, just something to help remind me. As I grasp at straws to who I was, maybe, this will bring me peace, no, because I just wish that all this would not be happening. I don’t want to lose my mind or who I was. I know this is going to get worse, my brain is shrinking and it’s plaguing my mind with so many toxins to the point where it’s failing. But what else could I do? The medication is only slowing the process and the bill is becoming insurmountable. I can't just leave this to my family; they'll just drown in debt to the point where it’s over $500 billion dollars. I don’t wish this upon anybody, even if they may be the worst person on earth.",
        },

        "night" : {
            "photo_1": "Photo of Someone||At first, it was simple forgetfulness. I would misplace my keys or struggle to recall recent conversations. But as time wore on, my condition worsened and spiraled into a haunting darkness. My memory lapses became more frequent and severe. I would forget names, and be unable to recognize friends and family that I cherished for decades. Familiar faces morphed into strangers, and the essence of my own existence slipped away like sand through my wrinkly fingers.",

            "photo_2": "Photo of Someone||At first, it was simple forgetfulness. I would misplace my keys or struggle to recall recent conversations. But as time wore on, my condition worsened and spiraled into a haunting darkness. My memory lapses became more frequent and severe. I would forget names, and be unable to recognize friends and family that I cherished for decades. Familiar faces morphed into strangers, and the essence of my own existence slipped away like sand through my wrinkly fingers.",

            "photo_3": "Photo of Someone||At first, it was simple forgetfulness. I would misplace my keys or struggle to recall recent conversations. But as time wore on, my condition worsened and spiraled into a haunting darkness. My memory lapses became more frequent and severe. I would forget names, and be unable to recognize friends and family that I cherished for decades. Familiar faces morphed into strangers, and the essence of my own existence slipped away like sand through my wrinkly fingers.",

            "photo_4": "Photo of Someone||At first, it was simple forgetfulness. I would misplace my keys or struggle to recall recent conversations. But as time wore on, my condition worsened and spiraled into a haunting darkness. My memory lapses became more frequent and severe. I would forget names, and be unable to recognize friends and family that I cherished for decades. Familiar faces morphed into strangers, and the essence of my own existence slipped away like sand through my wrinkly fingers.",

            "room": "Journal Entry #9||Living with this condition is dreadful. Days have turned into weeks, and weeks into months, with no sign of my sanity getting better. The weight of the unknown hung heavy on my fragile shoulders. My disease deteriorates the brain to the point where it becomes hollow. My family watched as the memories they had crafted together were swallowed by the abyss, leaving behind only a voiceless husk. Days turned into months, and months into years. In the end, Alzheimer's claimed me completely, robbing me of my very essence.",
        },

    },
    4: {
        "day" : {
            "photo_1": "Photo of a Girl||Oh, who is this? They seem important to me, but I can’t recall anything…She looks just like me when I was younger.",

            "photo_2": "Photo of Two Parents and Their Kid||I see these people from time to time, It’s so frustrating to me, their names are on the tip of my tongue.",

            "photo_3": "Rock Climbing||Is, is that me?! Oh gosh, when did I ever rock climb?? That is so dangerous. That couldn't have been me!",

            "photo_4": "Photo of a Large Group of People||These people have been trying to talk to me often recently, but I can’t remember what they said. Why? Why must I be left unable to remember?",

            "books": "Books||My doctor said that I should continue doing some old hobbies that I was doing before so I could remain active and it turns out that I used to do some writing to help me through my process. It is calming, but even then it feels like my mind is stuck in a constant fog, detached from everything where I couldn’t recall what I was doing earlier today.",

            "room": "Journal Entry #10||Those who’ve talked to me would either check to see whether I needed anything or just talk to me for some reason. Maybe it’s because I’m a good listener. Though there are moments when I would doze off for a moment, not out of poor manners I assure you, but it was more like blacking out or logging out from a computer. Whenever I come back on, my senses would come back “online” and it would only be a few minutes before I would become aware of the world. The minute the fog sets in again it feels like everything else around me nullifies, my body becomes a hollow husk where all I do is eat and breathe. As if a part of my mind is not there anymore and as much as I try to look for it there’s nothing I could find that remains. Is this all that I’ve become?",
        },

        "noon" : {
            "lamp": "Lamp||My surroundings seemed unfamiliar, and a sense of unease settled over me. I struggled to recall even the simplest details of my life. My name? It escaped me. Memories slipped through my fingers like water, leaving me grasping at empty air. Days turned into a blur as I wandered aimlessly through the labyrinth of my deteriorating mind.",

            "photo_2": "Photo of Two Parents and Their Kid||Faces that were once dear to me became strangers. Conversations become muddled and fragmented, like shards of glass piercing my thoughts. Reality twisted and contorted, a distorted reflection of what I once was. My loved ones visited me, their faces etched with sorrow and pity. They tried to bridge the gap. To remind me of the life I once had. But their efforts were in vain, as the fog of Alzheimer’s enveloped my every thought. The more they tried to reach me the faster I slipped away. In my mind, a grotesque carnival of confusion and fear played out. Shadows danced at the edge of my vision, whispering malicious secrets that I could never decipher. I could no longer trust my own senses, as they betrayed me time and time again. Was it really me in the mirror? Or a specter from a forgotten past. Every day brought new horrors.",

            "photo_4": "Photo of a Large Group of People||The faces of my loved one blurred together, blending into an indistinguishable mass of concern and sadness. I could no longer recognize the people who had once meant the world to me. Their tears and embraces were met with an empty stare, as if they were mere strangers to me. Passing through my existence. Loneliness was my only companion, as I became isolated in a world that I no longer recognized. Time lost all meaning as the days blended into one another. A ceaseless cycle of confusion and despair. I yearned for escape, to be free from my mental prison. Then one day everything faded away. Memories, pain, the carnival of my mind. It all dissolved into darkness.",

            "books": "Books||Simple tasks became insufferable challenges. I couldn’t remember how to tie my shoelaces or even how to feed myself. My once agile mind was reduced to a jumble of fragmented memories, disconnected from reality. I became a prisoner within my own mind and body. Trapped in a cruel, twisted nightmare.",

            "room": "Journal Entry #11||Alzheimer’s had claimed its final victory. Erasing the last remnants of my Identity. I no longer existed in my mind. I became nothing, just a forgotten name. A tragic tale of lost time. This merciless disease called Alzheimer's tore me apart piece by piece. Leaving only emptiness in its wake. My life, my story once vibrant with life now ended with a symphony of decay. For I have become an echo of a forgotten soul.",
        },

        "night" : {
            "lamp": "Lamp||I’m afraid of what happens when this lamp is turned off.",

            "meds": "Medication||The outside world, quiet and distant, could hardly touch you. There are moments when you hear or see something that brings you back but it’s only for a moment. No matter how much I tried to swim I was still stuck adrift, to the point where I couldn’t tell what was up or down, what was real or not. Flashes of light and color come into sight now and then, which may be the present or only a memory of the past. It’s hard to tell now. The string that tethers me down to the land of the living is thin yet I still hold on, hoping that I could at least see someone again even if I don’t remember who they are anymore.",

            "room": "Last Journal Entry||Experiencing Alzheimer's is like swimming in water. It was easier at first, all your muscles work as you swim across the watery sea, but then it gets harder. You’re moving slower and there are moments when it gets darker and harder to breathe, as your vision gets more and more blurry. There are moments when you could see and catch your breath but the more you swim the harder it is, it feels like the water is thicker like a swamp-like consistency. And then the next thing you know, you’re just floating in the water, you’re not sinking or floating up, you're just there, just suspended. That’s how it is, living with this disease when it comes to the mind and memory. This is the life I live, this is the space I’m in, just floating in water and space.",
        },

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