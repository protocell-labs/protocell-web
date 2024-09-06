/*

                    p r o t o c e l l . x y z

           { p r o t o c e l l : l a b s }  |  2 0 2 4

*/



let primary_color = '#000000'; // black
let secondary_color = '#00ff00'; // green
let tertiary_color = '#ff00ff'; // magenta

let terminal_p1, text_p1_input, text_p1, text_p1_idx;
let button_obscvrvm, button_tectonica;

let typing_speed = 5.0; // speed of typing for the text
let font_size_text = '1.5vmin'; // used for text
let font_size_buttons = '2.0vmin'; // used for buttons

let lorem_impsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum nunc id felis sollicitudin porttitor. ";

// buttons for all art collections, will also determine their order, [button_id, title]
let project_buttons = [
    ['button_tectonica', 'T E C T O N I C A'],
    ['button_rtrdgtzr', 'rtrdgtzr'],
    ['button_structura', 'Structura'],
    ['button_gltchvrs', 'ǥᵍłˡŧᵗȼᶜħʰvᵛɍʳsˢ'],
    ['button_obscvrvm', 'O B S C V R V M'],
    ['button_crystalyx', 'Crystalyx'],
    ['button_chromoplasm', 'Chromoplasm'],
    ['button_monocell', 'Monocell'],
    ['button_retroids', 'Retroids'],
    ['button_morphogens', 'Morphogens'],
    ['button_unfoldings', 'Unfoldings']
];


// this will be the text displayed after the corresponding button is clicked - button_id : text
let button_to_text = {
    'button_unfoldings': "Spatial unfolding of grid lattices obtained through graph algebra operations (Cartesian, strong and tensor products) from basic primitives (path graphs) with node filtering. Simulations are based on Fruchterman and Reingold's method for force-directed placement of nodes which includes both attraction (between nodes connected with edges) as well as repulsion (between all nodes). This collection was produced as an experiment in computational design research on lattice algebras. ",
    'button_morphogens': "Spatial unfolding of grid lattices obtained through graph algebra operations (Cartesian, strong and tensor products) from basic primitives (path graphs) with node filtering. Simulations are based on Fruchterman and Reingold's method for force-directed placement of nodes which includes both attraction (between nodes connected with edges) as well as repulsion (between all nodes). This collection was produced as an experiment in computational design research on lattice algebras. ",
    'button_retroids': "Retroids are primitive artificial life forms that inhabit low-memory digital environments. The first specimens were discovered on old game cartridges salvaged from junkyards and exposed to the elements. In this state, they exist in a digitally frozen form, but once inserted into a powered system, they evolve rapidly before re-uploading themselves back onto the cartridge. This automatic process is prone to frequent errors and glitches due to the physical deterioration of the cartridges, yet it is so deeply ingrained in the retroids that they repeat it endlessly. Their flawed digital evolution is cyclical, trapped in an infinite loop, oscillating between chaos and order in a bounded universe where space is measured in bits and time in CPU cycles - a glimpse into digital purgatory. ",
    'button_monocell': "As the first iteration of protocells, monocells are primitive, digital, artificial life forms based on lattice structures. Guided by artificial selection, they evolved rigid, springy, naked skeletons with no membranes or differentiation in material and resemble organic Radiolarians living in Earth's oceans. Monocells tend to cycle through different configurations in their evolutionary path, some stable, some in perpetual motion. Undiscovered earlier versions of protocells probably had no way of interacting with the graphics pipeline and, if at all, existed as simple graph data structures. Monocells were the first protocells which evolved monochrome display through ordered dithering. ",
    'button_chromoplasm': "Second protocell collection features chromoplasms, semi-fluidic, artificial living substance connecting pigmented organelles into a membrane-like cell. They resemble unicellular prokaryotic microorganisms found on Earth. Structure and dynamics of each chromoplasm is guided by behavioral features like reconfiguration (affecting topology), modulation (affecting geometry) and degeneration (affecting both). Organelles or nodes evolved dithered 3-bit color, rendered in hundreds of color palettes and featuring luminescence. Chromoplasm creatures are found both in dark as well as light-abundant environments. They are rendered in real-time in your browser and can be interacted with. ",
    'button_crystalyx': "Crystalyxes are crystalline-like artificial organisms with transparent, iridescent and faceted membrane which forms their main body. They are first protocells to have evolved a triangulated mesh capable of rendering simple material properties like translucency, specular shine, color variation and luminescence. Not resembling any organism found on Earth, their compositions are named after precious stones, with the most common one being lapis lazuli. Rare ruby and emerald compositions are also occasionally observed. Crystalyxes come in 3-bit as well as monochrome variants, with latter being rarer. Structure and dynamics of each crystalyx is guided by behavioral features like reconfiguration (affecting topology) and modulation (affecting geometry). They inhabit both darker and light-abundant environments. Some mimic the color of their environment for camouflage, while others create contrasting shades to intimidate competitors. They are rendered in real-time in your browser and can be interacted with by pulling the tips of their facets. ",
    'button_obscvrvm': "“Felix, qui potuit rerum cognoscere causas”<br>Virgil, from Georgica, 29 BCE<br><br>The miracle of the appropriateness of the language of mathematics for the formulation of the laws of physics is a wonderful gift which we neither understand nor deserve. OBSCVRVM, meaning “darkness” in Latin, takes this profound insight from physicist Eugene Wigner and explores it through a series of code generated spatial compositions. This collection redefines basic concepts of distance and time, with elements in the scene seemingly evolving at different spatial and temporal scales. Its universe exists on the ambiguous boundary between the cosmic and subatomic, forgoing color in place of structure, articulated through a single light source and myriad of shadows it casts on the intricate lattice geometries. ",
    'button_gltchvrs': "“And in the bloodlit dark behind his eyes, silver phosphenes boiled in from the edge of space, hypnagogic images jerking past like a film compiled of random frames.”<br>William Gibson, “Neuromancer”, 1984<br><br>It's 1980 and the future is finally here. Collection of 256 unique GIFs, ǥᵍłˡŧᵗȼᶜħʰvᵛɍʳsˢ pays homage to two great sci-fi works of the 20th century: George Orwell's prophetic “1984” and William Gibson's cyberpunk novel “Neuromancer” published the same year. Using visual language to merge their dystopian storytelling surrounding the failed promises of technology and societal progress, the collection features dithered alien landscapes and cityscapes made of interference, their citizens bound in consensual hallucinations imprisoned in their own flesh, seekers of true names in pacts with demons and visions crawled with ghost hieroglyphs. The login screen to ǥᵍłˡŧᵗȼᶜħʰvᵛɍʳsˢ offers a warning: All hope abandon ye who enter here, for your minds can enter, but your souls shall follow not. ",
    'button_structura': "Structura is a long form generative collection exploring tension between the tectonic and the amorphous through a three-dimensional digital composition.<br><br>In the 1960s, German-born American architect Konrad Wachsmann created a series of designs for USAF aircraft hangars. His design used flat space truss system composed of tetrahedra and semi-octahedra fabricated out of modular steel elements to create a lightweight and structurally efficient structure with a large span. Space frames have an almost 200 year long history in architecture, yet at the same time they are considered to be futuristic, especially when we con ural deformations of this kind through their projects. ",
    'button_rtrdgtzr': "“And in the bloodlit dark behind his eyes, silver phosphenes boiled in from the edge of space, hypnagogic images jerking past like a film compiled of random frames.”<br>William Gibson, “Neuromancer”, 1984<br><br>rtrdgtzr (/ˈɹɛ.tɹoʊ ˈdɪdʒɪtaɪzə(ɹ)/, pronounced same as retro digitizer) is a long-form collaborative collection celebrating pixel and glitch art, graphics from the '80s and '90s, and techno-dystopian aesthetics of William Gibson's novels. What you see when you open the minting interface is an editor which takes an input image provided by the minter, applies generative post-processing to it, and finally outputs an animated composition. The input image itself is compressed and stored on-chain through params mechanic as a signal in string format, retrieved every time the artwork is regenerated. Minters are in fact authors of minted tokens, implicit collaborators, who are appropriately entitled to half the royalties. To facilitate co-creation, minting process provides an intuitive interface as well as WYSIWYG (what you see is what you get) for full control of the output. Effect stacks in rtrdgtzr were originally developed for the ǥᵍłˡŧᵗȼᶜħʰvᵛɍʳsˢ collection released on GlitchForge in 2023 and feature customized diffusion dithering and aberrated pixel sorting. In terms of narrative and aesthetics, these two collections form an artistic continuum. ",
    'button_tectonica': "“In the boundless loneliness of space, strangeness abounds.”<br>T E C T O N I C A logs<br><br>Standing here are the digital engrams of a spacefaring civilization, the final remnants of the Universe's vast computer, a layered stratum of glitched, galaxy-sized digital memory banks. These calcified data deposits have accumulated over eons, forming physical tectons that span light-years of space. They offer a glimpse into the fundamental building blocks employed by a forgotten alien civilization which encoded its entire culture as digital data in physical form. While the specifications for this stellar machine have been lost to time, its fractured components continue to perform computations, seemingly trapped in an eternal loop. We can observe the inner workings of this enigmatic structure, but its true meaning remains forever silent, its message encrypted. "
}

// each button can spawn other buttons (like a menu) - button_id : [[button_id_a, title_a, link_a], [button_id_b, title_b, link_b]...]
let button_spawn = {
    'button_unfoldings': [['button_unfoldings_teia', 'teia ↗', 'https://teia.art/luka'], ['button_unfoldings_objkt', 'objkt ↗', 'https://objkt.com/profile/luka/created']],
    'button_morphogens': [['button_morphogens_objkt', 'objkt ↗', 'https://objkt.com/profile/luka/created']],
    'button_retroids': [['button_retroids_nifty', 'nifty ↗', 'https://www.niftygateway.com/marketplace/collection/0x4399af3886a646226c6affcfd6c847c3d1d110cb/6']],
    'button_monocell': [['button_monocell_source', 'source ↗', 'https://github.com/protocell-labs/monocell'], ['button_monocell_gen', 'generator ↗', 'https://protocell-labs.github.io/monocell/'], ['button_monocell_fxhash', 'fxhash ↗', 'https://www.fxhash.xyz/generative/slug/monocell'], ['button_monocell_fxfam', 'fxfam ↗', 'https://fxfam.xyz/2679']],
    'button_chromoplasm': [['button_chromoplasm_source', 'source ↗', 'https://github.com/protocell-labs/chromoplasm'], ['button_chromoplasm_gen', 'generator ↗', 'https://protocell-labs.github.io/chromoplasm/'], ['button_chromoplasm_fxhash', 'fxhash ↗', 'https://www.fxhash.xyz/generative/slug/chromoplasm'], ['button_chromoplasm_fxfam', 'fxfam ↗', 'https://fxfam.xyz/7879']],
    'button_crystalyx': [['button_crystalyx_source', 'source ↗', 'https://github.com/protocell-labs/crystalyx'], ['button_crystalyx_gen', 'generator ↗', 'https://protocell-labs.github.io/crystalyx/'], ['button_crystalyx_fxhash', 'fxhash ↗', 'https://www.fxhash.xyz/generative/slug/crystalyx'], ['button_crystalyx_fxfam', 'fxfam ↗', 'https://fxfam.xyz/10555']],
    'button_obscvrvm': [['button_obscvrvm_source', 'source ↗', 'https://github.com/protocell-labs/obscvrvm'], ['button_obscvrvm_gen', 'generator ↗', 'https://protocell-labs.github.io/obscvrvm/'], ['button_obscvrvm_fxhash', 'fxhash ↗', 'https://www.fxhash.xyz/generative/slug/o-b-s-c-v-r-v-m'], ['button_obscvrvm_fxfam', 'fxfam ↗', 'https://fxfam.xyz/22182']],
    'button_gltchvrs': [['button_gltchvrs_source', 'source ↗', 'https://github.com/protocell-labs/gltchvrs'], ['button_gltchvrs_objkt', 'objkt ↗', 'https://objkt.com/collections/glitchforge']],
    'button_structura': [['button_structura_source', 'source ↗', 'https://github.com/protocell-labs/structura'], ['button_structura_gen', 'generator ↗', 'https://protocell-labs.github.io/structura/'], ['button_tectonica_verse', 'verse ↗', 'https://verse.works/artworks/f1059227-34f7-4887-af29-6f8c79632b16']],
    'button_rtrdgtzr': [['button_rtrdgtzr_source', 'source ↗', 'https://github.com/protocell-labs/rtrdgtzr'], ['button_rtrdgtzr_fxhash', 'fxhash ↗', 'https://www.fxhash.xyz/generative/slug/rtrdgtzr'], ['button_rtrdgtzr_fxfam', 'fxfam ↗', 'https://fxfam.xyz/28552']],
    'button_tectonica': [['button_tectonica_source', 'source ↗', 'https://github.com/protocell-labs/tectonica'], ['button_tectonica_gen', 'generator ↗', 'https://protocell-labs.github.io/tectonica/'], ['button_tectonica_fxhash', 'fxhash ↗', 'https://www.fxhash.xyz/generative/slug/t-e-c-t-o-n-i-c-a'], ['button_tectonica_fxfam', 'fxfam ↗', 'https://fxfam.xyz/30286']]
}


let selected_button = ''; // save the id of the clicked button
let selected_button_label = ''; // save the label of the clicked button
let buttons = []; // array to store all buttons
let button_positions = []; // store positions of the buttons
let sub_button_positions = []; // store positions of the sub-buttons
let sub_buttons = []; // array to store all sub-buttons
let button_arrange_vec, sub_button_arrange_vec, sub_button_arrange_vec_copy; // these vector will help us arrange buttons in a free-form line
let button_offset = 40.0; // approximate value the buttons will be offset from each other
let sub_button_offset = 250.0; // horizontal shift of sub-buttons
let selected_button_sequence = 0; // storing the sequence (relative position) of the selected button

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

    terminal_p1.style('width', '40vmin');
    terminal_p1.style('height', '20vmin');

    terminal_p1.style('border-style', 'solid');
    terminal_p1.style('border-width', 'thin');
    terminal_p1.style('padding', '1.5vmin 1.5vmin');

    text_p1_idx = 0;
    text_p1_input = lorem_impsum;


    // PROJECT BUTTONS

    // position of the first button in the free-form line
    button_arrange_vec = createVector(windowWidth / 16, random(windowHeight / 8, windowHeight / 2)); 
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

    // draw line connecting selected project button with its sub-menu
    drawMenuToSubMenuLine();

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


// draw line connecting selected project button with its sub-menu
function drawMenuToSubMenuLine() {
    if (selected_button != '') {
        stroke(secondary_color);
        strokeWeight(1.0);
        let right_shift = 0.5 * selected_button_label.length * min(windowWidth, windowHeight) * 0.02; // min(windowWidth, windowHeight) * 0.02 corresponds to css units 2.0vmin
        line(button_positions[selected_button_sequence].x + right_shift, button_positions[selected_button_sequence].y + 0.4 * button_offset, sub_button_positions[0].x, sub_button_positions[0].y + 0.4 * button_offset);
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
    if (this.elt.id != selected_button) { this.style('color', secondary_color); } // if the button was not clicked, change the color back to original

}

// triggers when the mouse is pressed and released over the button
function buttonClicked() {
    text_p1_idx = 0;
    text_p1_input = button_to_text[this.elt.id];
    
    // change color of all buttons back to the original
    buttons.forEach(function (item, index) { item.style('color', secondary_color); });

    // change color of the clicked button to selected
    this.style('color', tertiary_color);

    // save the id and label of the clicked button
    selected_button = this.elt.id;
    selected_button_label = this.elt.innerHTML;

    // remove previous sub-buttons
    if (sub_buttons.length != 0) {
        sub_buttons.forEach(function (item, index) { item.remove(); });
        sub_buttons = [];
    } 

    // get the vertical sequence number of the button
    let clicked_button_id = this.elt.id; // we have to copy this value because this.elt.id cannot be accessed inside forEach loop
    buttons.forEach(function (item, index) { if (item.elt.id == clicked_button_id) { selected_button_sequence = index}; });

    // reset position vector, shifted to the right and down from the button
    sub_button_arrange_vec_copy = button_positions[selected_button_sequence].copy().add( createVector(sub_button_offset, button_offset / 2, 0) );

    // reset sub-button positions
    sub_button_positions = [];

    // spawn sub-buttons
    button_spawn[selected_button].forEach(function (item, index) {
        button = createA(item[2], item[1], '_blank'); // item[2] is link, item[1] is title, '_blank' parameter makes the link open in a new tab
        applySubButtonStyle(button, item[0]); // apply style, item[0] is button_id
        sub_buttons.push(button); // store button in array
    });

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
    button_positions.push(button_arrange_vec.copy()); // save position of the button

    let ran_x_vec = createVector(random(-button_offset, button_offset), button_offset); // next button position with some randomness
    button_arrange_vec.add(ran_x_vec); // move position vector
    if (button_arrange_vec.x <= 0) {button_arrange_vec.x = 0;} // if the x position goes out of the screen, clamp the x coordinate to zero

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

    button.style('text-decoration-line', 'underline');
    button.style('text-decoration-style', 'dotted');
    button.style('text-decoration-thickness', '1px');

    button.position(sub_button_arrange_vec_copy.x, sub_button_arrange_vec_copy.y); // position based on this vector
    sub_button_positions.push(sub_button_arrange_vec_copy.copy()); // save position of the sub-button
    sub_button_arrange_vec_copy.add(createVector(random(-button_offset, button_offset), button_offset)); // move position vector with some randomness

    button.mouseOver(buttonOver);
    button.mouseOut(buttonOut);

}


// clamp a number between a minimum and a maximum
function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }