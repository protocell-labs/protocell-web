/*

                    p r o t o c e l l . x y z

           { p r o t o c e l l : l a b s }  |  2 0 2 4

*/



let primary_color = '#000000'; // black
let secondary_color = '#00ff00'; // green
let tertiary_color = '#ff00ff'; // magenta

let terminal_p1, text_p1_input, text_p1, text_p1_idx;
let button_obscvrvm, button_tectonica;

let typing_speed = 2.0; // speed of typing for the text
let font_size_text = '1.5vmin'; // used for text
let font_size_buttons = '2.0vmin'; // used for buttons

let lorem_impsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum nunc id felis sollicitudin porttitor.";

// [button_id, title]
let project_buttons = [
    ['button_monocell', 'Monocell'],
    ['button_chromoplasm', 'Chromoplasm'],
    ['button_crystalyx', 'Crystalyx'],
    ['button_obscvrvm', 'O B S C V R V M'],
    ['button_rtrdgtzr', 'rtrdgtzr'],
    ['button_tectonica', 'T E C T O N I C A']
];


// this will be the text displayed after the corresponding button is clicked - button_id : text
let button_to_text = {
    'button_monocell': "As the first iteration of protocells, monocells are primitive, digital, artificial life forms based on lattice structures. Guided by artificial selection, they evolved rigid, springy, naked skeletons with no membranes or differentiation in material and resemble organic Radiolarians living in Earth’s oceans. Monocells tend to cycle through different configurations in their evolutionary path, some stable, some in perpetual motion. Undiscovered earlier versions of protocells probably had no way of interacting with the graphics pipeline and, if at all, existed as simple graph data structures. Monocells were the first protocells which evolved monochrome display through ordered dithering.",
    'button_chromoplasm': "Second protocell collection features chromoplasms, semi-fluidic, artificial living substance connecting pigmented organelles into a membrane-like cell. They resemble unicellular prokaryotic microorganisms found on Earth. Structure and dynamics of each chromoplasm is guided by behavioral features like reconfiguration (affecting topology), modulation (affecting geometry) and degeneration (affecting both). Organelles or nodes evolved dithered 3-bit color, rendered in hundreds of color palettes and featuring luminescence. Chromoplasm creatures are found both in dark as well as light-abundant environments. They are rendered in real-time in your browser and can be interacted with.",
    'button_crystalyx': "Crystalyxes are crystalline-like artificial organisms with transparent, iridescent and faceted membrane which forms their main body. They are first protocells to have evolved a triangulated mesh capable of rendering simple material properties like translucency, specular shine, color variation and luminescence. Not resembling any organism found on Earth, their compositions are named after precious stones, with the most common one being lapis lazuli. Rare ruby and emerald compositions are also occasionally observed. Crystalyxes come in 3-bit as well as monochrome variants, with latter being rarer. Structure and dynamics of each crystalyx is guided by behavioral features like reconfiguration (affecting topology) and modulation (affecting geometry). They inhabit both darker and light-abundant environments. Some mimic the color of their environment for camouflage, while others create contrasting shades to intimidate competitors. They are rendered in real-time in your browser and can be interacted with by pulling the tips of their facets.",
    'button_obscvrvm': "“Felix, qui potuit rerum cognoscere causas”<br>Virgil, from Georgica, 29 BCE<br><br>The miracle of the appropriateness of the language of mathematics for the formulation of the laws of physics is a wonderful gift which we neither understand nor deserve. OBSCVRVM, meaning “darkness” in Latin, takes this profound insight from physicist Eugene Wigner and explores it through a series of code generated spatial compositions. This collection redefines basic concepts of distance and time, with elements in the scene seemingly evolving at different spatial and temporal scales. Its universe exists on the ambiguous boundary between the cosmic and subatomic, forgoing color in place of structure, articulated through a single light source and myriad of shadows it casts on the intricate lattice geometries.",
    'button_rtrdgtzr': "“And in the bloodlit dark behind his eyes, silver phosphenes boiled in from the edge of space, hypnagogic images jerking past like a film compiled of random frames.”<br>William Gibson, “Neuromancer”, 1984<br><br>rtrdgtzr (/ˈɹɛ.tɹoʊ ˈdɪdʒɪtaɪzə(ɹ)/, pronounced same as retro digitizer) is a long-form collaborative collection celebrating pixel and glitch art, graphics from the '80s and '90s, and techno-dystopian aesthetics of William Gibson's novels. What you see when you open the minting interface is an editor which takes an input image provided by the minter, applies generative post-processing to it, and finally outputs an animated composition. The input image itself is compressed and stored on-chain through params mechanic as a signal in string format, retrieved every time the artwork is regenerated. Minters are in fact authors of minted tokens, implicit collaborators, who are appropriately entitled to half the royalties. To facilitate co-creation, minting process provides an intuitive interface as well as WYSIWYG (what you see is what you get) for full control of the output. Effect stacks in rtrdgtzr were originally developed for the ǥᵍłˡŧᵗȼᶜħʰvᵛɍʳsˢ collection released on GlitchForge in 2023 and feature customized diffusion dithering and aberrated pixel sorting. In terms of narrative and aesthetics, these two collections form an artistic continuum.",
    'button_tectonica': "“In the boundless loneliness of space, strangeness abounds.”<br>T E C T O N I C A logs<br><br>Standing here are the digital engrams of a spacefaring civilization, the final remnants of the Universe's vast computer, a layered stratum of glitched, galaxy-sized digital memory banks. These calcified data deposits have accumulated over eons, forming physical tectons that span light-years of space. They offer a glimpse into the fundamental building blocks employed by a forgotten alien civilization which encoded its entire culture as digital data in physical form. While the specifications for this stellar machine have been lost to time, its fractured components continue to perform computations, seemingly trapped in an eternal loop. We can observe the inner workings of this enigmatic structure, but its true meaning remains forever silent, its message encrypted."
}

// each button can spawn other buttons (like a menu) - button_id : [[button_id_a, title_a], [button_id_b, title_b]...]
let button_spawn = {
    'button_monocell': [['button_monocell_source', 'source'], ['button_monocell_gen', 'generator'], ['button_monocell_fxhash', 'fxhash'], ['button_monocell_fxfam', 'fxfam']],
    'button_chromoplasm': [['button_chromoplasm_source', 'source'], ['button_chromoplasm_gen', 'generator'], ['button_chromoplasm_fxhash', 'fxhash'], ['button_chromoplasm_fxfam', 'fxfam']],
    'button_crystalyx': [['button_crystalyx_source', 'source'], ['button_crystalyx_gen', 'generator'], ['button_crystalyx_fxhash', 'fxhash'], ['button_crystalyx_fxfam', 'fxfam']],
    'button_obscvrvm': [['button_obscvrvm_source', 'source'], ['button_obscvrvm_gen', 'generator'], ['button_obscvrvm_fxhash', 'fxhash'], ['button_obscvrvm_fxfam', 'fxfam']],
    'button_rtrdgtzr': [['button_rtrdgtzr_source', 'source'], ['button_rtrdgtzr_gen', 'generator'], ['button_rtrdgtzr_fxhash', 'fxhash'], ['button_rtrdgtzr_fxfam', 'fxfam']],
    'button_tectonica': [['button_tectonica_source', 'source'], ['button_tectonica_gen', 'generator'], ['button_tectonica_fxhash', 'fxhash'], ['button_tectonica_fxfam', 'fxfam']]
}


let selected_button = ''; // save the id of the clicked button
let selected_sub_button = ''; // save the id of the clicked sub-button
let buttons = []; // array to store all buttons
let sub_buttons = []; // array to store all sub-buttons
let button_arrange_vec, sub_button_arrange_vec, sub_button_arrange_vec_copy; // these vector will help us arrange buttons in a free-form line
let button_offset = 40.0; // approximate value the buttons will be offset from each other
let sub_button_offset = 200.0; // horizontal shift of sub-buttons

let wireframes = []; // array to store all wireframes
let wireframe_temp = 1.0; // speed of movement of vertices



function setup() {

    // canvas will take the full width of the window so we can draw on it, DOM elements are on top
    createCanvas(windowWidth, windowHeight);


    // TERMINAL P1

    terminal_p1 = createP(lorem_impsum);
    terminal_p1.id('terminal_p1');

    terminal_p1.style('color', secondary_color);
    terminal_p1.style('font-family', 'MonoMEK'); // 'monospace'
    terminal_p1.style('font-size', font_size_text);

    terminal_p1.position(windowWidth / 2, windowHeight / 2);
    //terminal_p1.draggable();

    terminal_p1.style('width', '20vmin');
    terminal_p1.style('height', '20vmin');

    terminal_p1.style('border-style', 'solid');
    terminal_p1.style('border-width', 'thin');
    terminal_p1.style('padding', '1.5vmin 1.5vmin');

    text_p1_idx = 0;
    text_p1_input = lorem_impsum;


    // PROJECT BUTTONS

    // position of the first button in the free-form line
    button_arrange_vec = createVector(windowWidth / 16, random(windowHeight / 4, 3 * windowHeight / 4)); 
    sub_button_arrange_vec = button_arrange_vec.copy().add( createVector(sub_button_offset, button_offset / 2, 0) ); // copied vector but shifted to the right and down

    // spawn main project buttons
    project_buttons.forEach(function (item, index) {
        button = createButton(item[1]); // create button, item[1] is title
        applyButtonStyle(button, item[0]); // apply style, item[0] is button_id
        buttons.push(button); // store button in array
    });


    // WIREFRAMES

    let wireframe_bound_x = windowWidth / 4; // buffer distance left-right where no wireframe point will be initially placed
    let wireframe_bound_y = windowHeight / 4; // buffer distance top-bottom where no wireframe point will be initially placed

    createWireframe(wireframe_bound_x, wireframe_bound_y);
    createWireframe(wireframe_bound_x, wireframe_bound_y);
    createWireframe(wireframe_bound_x, wireframe_bound_y);

}




function draw() {

    background(primary_color);

    //terminal_p1.position(mouseX, mouseY);

    text_p1_idx += typing_speed * random(); // position of the last letter in the string
    text_p1 = text_p1_input.slice(0, Math.floor(text_p1_idx)) + '▌'; // blinking_input(lorem_impsum.length, text_p1_idx)
    
    if (text_p1_idx < text_p1.length + 1) { terminal_p1.html(text_p1); } // update text until all letters are typed, then stop (so we can select the text if needed)
    //else { terminal_p1.html('▌', true); }

    // animate all wireframes
    wireframeAnimation();

}



// creates wireframe points and stores them into an array
function createWireframe(bound_x, bound_y) {
    // create two random points within bounds
    let wireframe_p1 = createVector(random(bound_x, windowWidth - bound_x), random(bound_y, windowHeight - bound_y));
    let wireframe_p2 = createVector(random(bound_x, windowWidth - bound_x), random(bound_y, windowHeight - bound_y));

    // store both points into a wireframes array
    wireframes.push([wireframe_p1, wireframe_p2]);
}



// random jittering lines on the canvas
function wireframeAnimation() {
    // set wireframe line styling
    stroke(secondary_color);
    strokeWeight(1.0);

    // draw a line for every pair of wireframe points
    for (let i = 0; i < wireframes.length; i++) {
        wireframes[i][0].add(createVector(random(-wireframe_temp, wireframe_temp), random(-wireframe_temp, wireframe_temp)));
        wireframes[i][1].add(createVector(random(-wireframe_temp, wireframe_temp), random(-wireframe_temp, wireframe_temp)));
        line(wireframes[i][0].x, wireframes[i][0].y, wireframes[i][1].x, wireframes[i][1].y);
    }
}



function blinking_input(text_length, last_letter_idx) {
    if (last_letter_idx < text_length) { return '▌'; } // no blinking until typing finishes
    else if (Math.floor(frameCount / 20) % 2 == 0) { return '▌'; }
    else { return ''; }
}



// triggers when the mouse moves over the button
function buttonOver() {
    this.style('color', tertiary_color);
}

// triggers when the mouse moves off the button
function buttonOut() {
    if ((this.elt.id != selected_button) && (this.elt.id != selected_sub_button)) { this.style('color', secondary_color); } // if the button or sub-button was not clicked, change the color back to original
}

// triggers when the mouse is pressed and released over the button
function buttonClicked() {
    text_p1_idx = 0;
    text_p1_input = button_to_text[this.elt.id];
    
    // change color of all buttons back to the original
    buttons.forEach(function (item, index) { item.style('color', secondary_color); });

    // change color of the clicked button to selected
    this.style('color', tertiary_color);

    // save the id of the clicked button
    selected_button = this.elt.id;

    // remove previous sub-buttons
    if (sub_buttons.length != 0) {
        sub_buttons.forEach(function (item, index) { item.remove(); });
        sub_buttons = [];
    } 


    // get the vertical sequence number of the button
    let sequence_nr = 0;
    let clicked_button_id = this.elt.id; // we have to copy this value because this.elt.id cannot be accessed inside forEach loop
    buttons.forEach(function (item, index) { if (item.elt.id == clicked_button_id) { sequence_nr = index}; });

    // reset position vector but add some randomness
    sub_button_arrange_vec_copy = sub_button_arrange_vec.copy().add( createVector(random(-button_offset, button_offset), sequence_nr * button_offset, 0) );

    // spawn sub-buttons
    button_spawn[selected_button].forEach(function (item, index) {
        button = createButton(item[1]); // create button, item[1] is title
        applySubButtonStyle(button, item[0]); // apply style, item[0] is button_id
        sub_buttons.push(button); // store button in array
    });

}


// triggers when the mouse is pressed and released over the sub-button
function subButtonClicked() {
    // change color of all sub-buttons back to the original
    sub_buttons.forEach(function (item, index) { item.style('color', secondary_color); });

    // change color of the clicked button to selected
    this.style('color', tertiary_color);

    // save the id of the clicked sub-button
    selected_sub_button = this.elt.id;
}


// applies styling to a button
function applyButtonStyle(button, button_id) {
    button.id(button_id);

    button.style('color', secondary_color);
    button.style('font-family', 'MonoMEK'); // 'monospace'
    button.style('font-size', font_size_buttons);

    button.style('background-color', primary_color);
    button.style('border', 'none');

    button.position(button_arrange_vec.x, button_arrange_vec.y); // position based on this vector
    button_arrange_vec.add(createVector(random(-button_offset, button_offset), button_offset)); // move position vector with some randomness

    button.mouseOver(buttonOver);
    button.mouseOut(buttonOut);
    button.mouseClicked(buttonClicked);

}



// applies styling to a sub-button
function applySubButtonStyle(button, button_id) {
    button.id(button_id);

    button.style('color', secondary_color);
    button.style('font-family', 'MonoMEK'); // 'monospace'
    button.style('font-size', font_size_buttons);

    button.style('background-color', primary_color);
    button.style('border', 'none');

    button.position(sub_button_arrange_vec_copy.x, sub_button_arrange_vec_copy.y); // position based on this vector
    sub_button_arrange_vec_copy.add(createVector(random(-button_offset, button_offset), button_offset)); // move position vector with some randomness

    button.mouseOver(buttonOver);
    button.mouseOut(buttonOut);
    button.mouseClicked(subButtonClicked);

}