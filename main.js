/*

                    p r o t o c e l l . x y z

           { p r o t o c e l l : l a b s }  |  2 0 2 4

*/



let canvas, ascii_image;
let primary_color = '#000000'; // black
let secondary_color = '#00ff00'; // green
let tertiary_color = '#ff00ff'; // magenta

let terminal_p1, text_p1_input, text_p1, text_p1_idx; // text terminal
let terminal_i1, text_i1_input, text_i1, text_i1_idx; // ascii image terminal
let terminal_i2; // iframe + image terminal

let box_to_void_ratio = 1.0; // we start with the full screen of bricks on the intro screen
let screen_div, intro_counter;

let typing_speed = 50.0; // speed of typing for the text
let font_size_text = '1.5vmin'; // used for text, '1.5vmin'
let font_size_image = '0.5vmin'; // used for images
let font_size_buttons = '2.0vmin'; // used for buttons
let font_size_intro = '4.0vmin'; // used for intro button

let intro_screen = true;
let intro_button, text_intro_button, text_intro_button_idx, intro_button_input;



// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var boxes = [];
var platforms = [];
var mConstraint;

var create_elements = false;
var starting_nr_of_bricks;

var brick_width = 75;
var brick_height = 25;
var gradient_part_a, gradient_part_b;

var rotating_force = true; // rotating force applied to the bricks after intro counter triggers
var repulsing_force = false; // repulsing force applied to the bricks after intro button is clicked
var physics_on = true; // run matter.js physics engine while the main site is shown for a brief period

let selected_button = ''; // save the id of the clicked button
let selected_button_label = ''; // save the label of the clicked button
let buttons = []; // array to store all buttons
let button_positions = []; // store positions of the buttons
let sub_button_positions = []; // store positions of the sub-buttons
let sub_buttons = []; // array to store all sub-buttons
let button_arrange_vec, sub_button_arrange_vec, sub_button_arrange_vec_copy; // these vector will help us arrange buttons in a free-form line
let button_offset = 40.0; // approximate value the buttons will be offset from each other
let sub_button_offset = 200.0; // horizontal shift of sub-buttons
let selected_button_sequence = 0; // storing the sequence (relative position) of the selected button



// SETUP

function setup() {

    // ORDER of elements
    // intro button - z-index 4
    // buttons + sub-buttons - z-index 4
    // canvas - z-index 3
    // text terminal p1 - z-index 2
    // ascii image terminal i1 - z-index 1
    // iframe + image terminal i2 - z-index 0


    // CANVAS - canvas will take the full width of the window so we can draw on it
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'absolute');
    canvas.style('z-index', '3');


    // MASONRY PLAYGROUND
    createMasonryPlayground(); // creates masonry wall at the intro page


    // CREATE DOM ELEMENTS
    createScreenDiv(); // screen container
    createIntroButton(); // intro button
    createIntroCounter(); // intro counter
    createTerminalI1(); // terminal i1 - ascii image terminal
    createTerminalI2(); // terminal i2 - iframe + image terminal
    createTerminalP1(); // terminal p1 - text terminal
    createTopLevelButtons(); // about, code
    createProjectButtons(); // T E C T O N I C A, rtrdgtzr, Structura...
 
}




// MAIN ANIMATION LOOP

function draw() {
    canvas.clear(); // transparent background

    // once 50% of the bricks are cleared from the screen, we can show the rotating animation and intro button
    if ((box_to_void_ratio < 0.50) && (intro_screen)) {

        intro_button.show(); // show intro button
        intro_counter.hide(); // hide intro counter

        canvas.style('pointer-events', 'none'); // ignore mouse events on the canvas so we can interact with intro button

        typingButton(); // animate intro button as typing text

        if (rotating_force) { applyRotationForce(); } // applies rotation force on all bricks (center of rotation is at screen center)
        if (repulsing_force) { applyRepulsingForce(0.05); } // applies repulsing force on all bricks (from screen center), only parameter is force strength
    }


    if (intro_screen) { // show intro screen

        if (physics_on) { runPhysics(); } // update physics engine and remove elements that are off screen
        showIntroCounter(); // display intro counter - counts bricks that are outside of the screen

    } else { // show main website

        if (physics_on) { runPhysics(); } // update physics engine and remove elements that are off screen
        if (rotating_force) { applyRotationForce(); } // applies rotation force on all bricks (center of rotation is at screen center)
        if (repulsing_force) { applyRepulsingForce(0.01); } // applies repulsing force on all bricks (from screen center)

        // terminal p1 - text
        text_p1_idx = typingEffect(text_p1_idx, text_p1, text_p1_input, terminal_p1); // type out portion of the input text and return the current index

        // terminal i1 - ascii image
        text_i1_idx = typingEffect(text_i1_idx, text_i1, text_i1_input, terminal_i1); // type out portion of the input text and return the current index

        drawMenuToSubMenuLine(); // draw line connecting selected project button with its sub-menu
        animateButtons(); // animate buttons - they move left-rigth within predetermined bounds
    }

}