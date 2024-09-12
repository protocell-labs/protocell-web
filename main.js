/*

                    p r o t o c e l l . x y z

           { p r o t o c e l l : l a b s }  |  2 0 2 4

*/



let canvas, ascii_image;
let primary_color = '#000000'; // black
let secondary_color = '#00ff00'; // green
let tertiary_color = '#ff00ff'; // magenta

let terminal_p1, text_p1_input, text_p1, text_p1_idx; // text terminal
let terminal_i1, text_i1_input, text_ip1, text_i1_idx; // ascii image terminal
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



// top level buttons, will also determine their order, [button_id, title]
let top_buttons = [
    ['button_about', 'about'],
    ['button_code', 'code']
];

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
    'placeholder': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum nunc id felis sollicitudin porttitor. ", // placeholder text
    'button_about': "{protocell:labs} was founded in 2021 as a digital laboratory that merges artistic and research practices. Within the lab, we explore computational structures, mathematical organizational forms, design algorithms, artificial biology, emergent morphogenesis, and digital graphics. Our preferred mode of expression is chain-agnostic, long-form generative collections, which we began releasing on the fxhash.xyz platform in 2021. These collections often feature a strong emphasis on complex 3D geometry, choreographed animation, and interactivity.<br><br>Team<br><br>Luka Piskorec and Kane Borg met in Helsinki as researchers in the Aalto Design of Structures group. Both are practicing architects with extensive backgrounds in algorithmic design and digital fabrication, and have been teaching and researching at the university level since 2011 (at ETH Zürich and Aalto University). Over the past decade, they have independently co-founded an architecture studio (TEN Studio in Zürich and Belgrade), a computational design consultancy (Borg Markkula Oy in Finland), and a fab lab (in Valletta, Malta). Along the way, they’ve created some weird and wonderful projects. ",
    'button_code': "As a matter of principle, we keep our code open—unminified, unobfuscated, and available in public repositories like GitHub. It is thoroughly documented through code comments, GitHub commits, articles, and recorded talks to serve as a source of inspiration for others. Additionally, the code for our generative collections is stored on-chain on blockchains such as Ethereum and Tezos, or on decentralized protocols like IPFS. We believe that the development of open generative tools, the fusion of artistic expression with scholarship, and the promotion of responsible Web3 practices are missions that every generative artist should embrace. ",
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
    'button_about': [['button_luka_twitter', 'twitter/X ↗', 'https://twitter.com/LukaPiskorec'], ['button_luka_fc', 'farcaster ↗', 'https://warpcast.com/luka']],
    'button_code': [['button_code', 'GitHub ↗', 'https://github.com/protocell-labs']],
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


let wireframe_temp = 1.0; // speed of movement of vertices
let wireframes = []; // array to store all wireframes


// SETUP

function setup() {

    // ORDER of elements

    // intro button - z-index 4
    // buttons + sub-buttons - z-index 4
    // canvas - z-index 3
    // text terminal p1 - z-index 2
    // ascii image terminal i1 - z-index 1
    // iframe + image terminal i2 - z-index 0


    // canvas will take the full width of the window so we can draw on it
    canvas = createCanvas(windowWidth, windowHeight);

    canvas.style('position', 'absolute');
    canvas.style('z-index', '3');
    //canvas.style('pointer-events', 'none'); // ignore mouse events on the canvas so we can interact with the generator on the iframe

    

    // MASONRY PLAYGROUND

    // create an engine
    engine = Engine.create();
    world = engine.world;
    
    // zero-gravity
    world.gravity.y = 0;
    
    // create platforms
    //platforms.push(new Boundary(width/2, 3*height/4, width/2, 25, 0.0));
    
    
    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity(); // fix mouse coordinate scaling
    
    var options = {
        mouse: canvasmouse
    }
    
    mConstraint = MouseConstraint.create(engine, options);
    Composite.add(world, mConstraint);
    
    var brick_width = 75;
    var brick_height = 25;
    
    var nr_of_bricks_in_width = floor(width / brick_width) + 2;
    var nr_of_bricks_in_height = floor(height / brick_height) + 2;
    starting_nr_of_bricks = nr_of_bricks_in_width * nr_of_bricks_in_height;
    
    var gradient_part_a = color(0, 255, 255); // cyan 
    var gradient_part_b = color(255, 0, 255); // magenta

    let intro_font_color = lerpColor(gradient_part_a, gradient_part_b, 0.5);

    // create wall of bricks filling the canvas
    for (var i = 0; i < nr_of_bricks_in_width; i++) {
        for (var j = 0; j < nr_of_bricks_in_height; j++) {
        let gradient = lerpColor(gradient_part_a, gradient_part_b, j / nr_of_bricks_in_height);
        
        // running bond
        let brick_x_shift = j % 2 == 0 ? -brick_width / 4 : brick_width / 4;
        boxes.push(new Box(i * brick_width + brick_x_shift, j * brick_height, brick_width, brick_height, gradient));
        }
    }
    
    
    // remove default for right-click
    for (var element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }




    // SCREEN CONTAINER

    screen_div = createDiv(); // div element encompasing the whole screen
    screen_div.id('screen_div');

    screen_div.style('width', '100%');
    screen_div.style('height', '100%');
    screen_div.style('position', 'absolute');

    // these three properties are for horizontal and vertical alignment of elements inside the div
    screen_div.style('display', 'flex');
    screen_div.style('justify-content', 'center');
    screen_div.style('align-items', 'center');

    screen_div.style('background-color', 'transparent');
    screen_div.style('border', 'none');

    screen_div.style('z-index', '2');


    // INTRO BUTTON

    intro_button = createButton(); // create button
    intro_button.id('button_intro');
    intro_button.parent(screen_div);

    intro_button.style('color', secondary_color);
    intro_button.style('font-family', 'MonoMEK'); // 'monospace'
    intro_button.style('font-size', font_size_intro);

    intro_button.style('background-color', 'transparent');
    intro_button.style('border', 'none');

    intro_button.style('position', 'absolute');
    //intro_button.style('z-index', '4'); // will be inherited from the screen_div

    intro_button.mouseOver(buttonOver);
    intro_button.mouseOut(buttonOut);
    intro_button.mouseClicked(buttonIntroClicked);
    
    intro_button.hide(); // hide at the beginning
    
    text_intro_button_idx = 0; // set counting index to zero
    intro_button_input = "enter('{protocell:labs}');";


    // INTRO COUNTER
    
    intro_counter = createP();
    intro_counter.id('intro_counter');
    intro_counter.parent(screen_div);

    intro_counter.style('color', intro_font_color);
    intro_counter.style('font-family', 'MonoMEK'); // 'monospace'
    intro_counter.style('font-size', font_size_intro);

    intro_counter.style('text-align', 'center');

    intro_counter.style('background-color', 'transparent');
    intro_counter.style('border', 'none');

    intro_counter.style('position', 'absolute');
    //intro_counter.style('z-index', '2'); // will be inherited from the screen_div



    // TERMINAL I2 - iframe + image terminal

    terminal_i2 = createDiv(); // div element contains blocks like images etc.
    terminal_i2.id('terminal_i2');
    terminal_i2.position(windowWidth / 2, 5 * windowHeight / 8);

    terminal_i2.style('color', secondary_color);
    terminal_i2.style('background-color', primary_color);

    terminal_i2.position(0, 0);
    terminal_i2.style('position', 'absolute');
    terminal_i2.style('z-index', '0');

    // these three properties are for horizontal and vertical alignment of the image block or the iframe
    terminal_i2.style('display', 'flex');
    terminal_i2.style('justify-content', 'center');
    terminal_i2.style('align-items', 'center');

    // fill up the whole window
    terminal_i2.style('width', '100%');
    terminal_i2.style('height', '100%');
    terminal_i2.style('margin', '0.0vmin');


    terminal_i2.html(button_to_iframe['placeholder']); // insert iframe html tag
    terminal_i2.hide(); // hide at the beginning
    

    // TERMINAL I1 - ascii image terminal

    terminal_i1 = createP(ascii_image);
    terminal_i1.id('terminal_i1');

    terminal_i1.style('color', secondary_color);
    terminal_i1.style('background-color', primary_color);
    terminal_i1.style('font-family', 'monospace'); // 'monospace', 'MonoMEK'
    terminal_i1.style('font-size', font_size_image);

    terminal_i1.position(random(0, windowWidth / 4), random(0, windowHeight / 4));
    terminal_i1.style('position', 'absolute');
    terminal_i1.style('z-index', '1');

    terminal_i1.style('width', 'auto');

    terminal_i1.style('border-style', 'solid');
    terminal_i1.style('border-width', 'thin');
    terminal_i1.style('padding', '2ch 2ch');

    terminal_i1.hide(); // hide at the beginning

    text_i1_idx = 0; // set counting index to zero
    ascii_image = formatASCII(button_to_ascii['placeholder']);

    text_i1_input = ascii_image;
    


    // TERMINAL P1 - text terminal

    terminal_p1 = createP(button_to_text['placeholder']); // lorem ipsum
    terminal_p1.id('terminal_p1');

    terminal_p1.style('color', secondary_color);
    terminal_p1.style('background-color', primary_color);
    terminal_p1.style('font-family', 'MonoMEK'); // 'monospace', 'MonoMEK'
    terminal_p1.style('font-size', font_size_text);

    terminal_p1.position(windowWidth / 2, windowHeight / 8);
    terminal_p1.style('position', 'absolute');
    terminal_p1.style('z-index', '2');

    terminal_p1.style('width', '40vmin');

    terminal_p1.style('border-style', 'solid');
    terminal_p1.style('border-width', 'thin');
    terminal_p1.style('padding', '2ch 2ch'); // '1.5vmin 1.5vmin'

    terminal_p1.hide(); // hide at the beginning

    text_p1_idx = 0; // set counting index to zero
    text_p1_input = button_to_text['placeholder']; // lorem ipsum
    



    // TOP LEVEL BUTTONS

    // position of the first button in the free-form line
    button_arrange_vec = createVector(windowWidth / 16, random(0, windowHeight / 8)); 

    // spawn top level buttons
    top_buttons.forEach(function (item, index) {
        button = createButton(item[1]); // create button, item[1] is title
        applyButtonStyle(button, item[0]); // apply style, item[0] is button_id
        buttons.push(button); // store button in array
    });


    
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

    let nr_of_wireframes = Math.floor(random(1, 8)); // number of free-floating wireframes

    let wireframe_bound_x = windowWidth / 4; // buffer distance left-right where no wireframe point will be initially placed
    let wireframe_bound_y = windowHeight / 4; // buffer distance top-bottom where no wireframe point will be initially placed

    for (let i = 0; i < nr_of_wireframes; i++) {
        createWireframe(wireframe_bound_x, wireframe_bound_y);
    }
    

}



// MAIN ANIMATION LOOP

function draw() {

    canvas.clear(); // transparent background


    // once 50% of the bricks are cleared from the screen, we can show the rotating animation and intro button
    if ((box_to_void_ratio < 0.50) && (intro_screen)) {

        intro_button.show(); // show intro button
        intro_counter.hide(); // hide intro counter

        //screen_div.style('z-index', '4'); // bring the intro_button up front
        canvas.style('pointer-events', 'none'); // ignore mouse events on the canvas so we can interact with intro button


        // animate intro button as typing text
        text_intro_button_idx += 0.025 * typing_speed * random(); // position of the last letter in the string
        text_intro_button = intro_button_input.slice(0, Math.floor(text_intro_button_idx)) + '▌';
        intro_button.html(text_intro_button);

        applyRotationForce(); // applies rotation force on all bricks

    }


    if (intro_screen) { // show intro screen

        // update physics engine
        Engine.update(engine);
        
        // determine which bricks to show and which are off screen
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].show();
            
            // remove boxes that are off screen
            if (boxes[i].isOffScreen()){
                boxes[i].removeFromWorld();
                boxes.splice(i,1);
                // check the same index again in next iteration (to counteract the splice which shifts the rest of the array)
                i--; 
            }
        }
        
        // show platforms
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].show();
        }

        // display intro counter
        box_to_void_ratio = boxes.length / starting_nr_of_bricks;
        let intro_counter_string = round(clamp((1 - box_to_void_ratio) * 200, 0, 100)).toString() + '%'
        if (box_to_void_ratio > 0.65) { intro_counter.html('keep going<br>progress ' + intro_counter_string); }
        else { intro_counter.html('almost there<br>progress ' + intro_counter_string); }



    } else { // show main website

        

        text_p1_idx += typing_speed * random(); // position of the last letter in the string
        text_p1 = text_p1_input.slice(0, Math.floor(text_p1_idx)) + '▌';
        
        if (text_p1_idx < text_p1_input.length + 100) { terminal_p1.html(text_p1); } // update text until all letters are typed, then stop (so we can select the text if needed)
        //else { terminal_p1.html('▌', true); }



        text_i1_idx += typing_speed * random(); // position of the last letter in the string
        text_i1 = text_i1_input.slice(0, Math.floor(text_i1_idx)) + '▌';
        
        if (text_i1_idx < text_i1_input.length + 100) { terminal_i1.html(text_i1); } // update text until all letters are typed, then stop (so we can select the text if needed)


        // animate all wireframes
        wireframeAnimation();

        // draw line connecting selected project button with its sub-menu
        drawMenuToSubMenuLine();

    }


}



// applies rotation force on all bricks
function applyRotationForce() {
    let strength = 0.0002; // dependent on the size of the bricks as well (inertia)
    let balancing_f = 0.50; // factor for the balancing centripetal force
    
    boxes.forEach(function (item, index) {
        //let from_cent_force = new Vector.mult(new Vector.normalise(new Vector.sub(item.body.position, new Vector.create(width / 2, height / 2))), strength); // from the center pf the screen
        //let to_cent_force = new Vector.mult(new Vector.normalise(new Vector.sub(item.body.position, new Vector.create(width / 2, height / 2))), -strength); // to the center of the screen
        
        let centripetal_force = new Vector.mult(new Vector.normalise(new Vector.sub(item.body.position, new Vector.create(width / 2, height / 2))), -strength * balancing_f); // to the center of the screen, balancing the rotation
        let rot_force = new Vector.rotate(new Vector.mult(new Vector.normalise(new Vector.sub(item.body.position, new Vector.create(width / 2, height / 2))), strength), Math.PI / 2); // rotating force around the center

        Body.applyForce(item.body, item.body.position, rot_force);
        Body.applyForce(item.body, item.body.position, centripetal_force);
    });

}




// switch from the intro screen to the main website
function showMainWebsite() {
    // hide elements
    intro_screen = false;
    intro_counter.hide();
    intro_button.hide();
    
    // show elements
    terminal_i1.show();
    terminal_i2.show();
    terminal_p1.show();
    buttons.forEach(function (item, index) {item.show();});
}



// stop matter.js physics engine and clear out elements
function stopPhysicsEngine() {
    // clear out boxes array with bricks
    boxes.forEach(function (item, index) {item.removeFromWorld();});
    boxes = [];

    World.clear(world);
    Engine.clear(engine);
}




// replace white-space characters and add line breaks
function formatASCII(input_ascii) {
    let ascii_no_whitespace = input_ascii.replaceAll(' ', '-'); // replace all white-space with some other character
    let image_char_width = 100; // length of each line before <br> is inserted
    let output_ascii = "";

    // insert newline <br> character at regular intervals into the string
    for (let i = 0; i < ascii_no_whitespace.length; i += image_char_width) {
        let slice = ascii_no_whitespace.slice(i, i + image_char_width);
        if (slice.length == image_char_width) { output_ascii += slice + '<br>';}
        else { output_ascii += slice; }
    }

    return output_ascii;
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
        // create random temperature vectors
        let rand_temp_vec_a = createVector(random(-wireframe_temp, wireframe_temp), random(-wireframe_temp, wireframe_temp));
        let rand_temp_vec_b = createVector(random(-wireframe_temp, wireframe_temp), random(-wireframe_temp, wireframe_temp));

        // add temperature vectors to vertices
        wireframes[i][0].add(rand_temp_vec_a);
        wireframes[i][1].add(rand_temp_vec_b);

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
    else { return '_'; }
}


// triggers when the mouse moves over the button
function buttonOver() {
    this.style('color', tertiary_color);
}


// triggers when the mouse moves off the button
function buttonOut() {
    if (this.elt.id != selected_button) { this.style('color', secondary_color); } // if the button was not clicked, change the color back to original
}



// triggers when the intro button is clicked
function buttonIntroClicked() {
    showMainWebsite();
    stopPhysicsEngine();
}



// triggers when the button is clicked
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


    // load ascii image
    if (this.elt.id == 'button_code') { // here we are not loading an ascii image but a preformatted code snippet
        ascii_image = button_to_preformat[this.elt.id];
    } else { // format and load ascii image
        ascii_image = formatASCII(button_to_ascii[this.elt.id]);
    }

    text_i1_idx = 0; // set counting index to zero
    text_i1_input = ascii_image;

    // load iframe generator
    terminal_i2.html(button_to_iframe[this.elt.id]); // insert iframe html tag

}


// applies styling to a button
function applyButtonStyle(button, button_id) {
    button.id(button_id);

    button.style('color', secondary_color);
    button.style('font-family', 'MonoMEK'); // 'monospace'
    button.style('font-size', font_size_buttons);

    button.style('background-color', primary_color);
    button.style('border', 'none');

    button.style('position', 'absolute');
    button.style('z-index', '4');

    button.position(button_arrange_vec.x, button_arrange_vec.y); // position based on this vector
    button_positions.push(button_arrange_vec.copy()); // save position of the button

    let ran_x_vec = createVector(random(-button_offset, button_offset), button_offset); // next button position with some randomness
    button_arrange_vec.add(ran_x_vec); // move position vector
    if (button_arrange_vec.x <= 0) {button_arrange_vec.x = 0;} // if the x position goes out of the screen, clamp the x coordinate to zero

    button.mouseOver(buttonOver);
    button.mouseOut(buttonOut);
    button.mouseClicked(buttonClicked);

    button.hide(); // hide at the beginning

}


// applies styling to a sub-button
function applySubButtonStyle(button, button_id) {
    button.id(button_id);

    button.style('color', secondary_color);
    button.style('font-family', 'MonoMEK'); // 'monospace'
    button.style('font-size', font_size_buttons);

    button.style('background-color', primary_color);
    button.style('border', 'none');

    button.style('position', 'absolute');
    button.style('z-index', '4');

    button.style('text-decoration-line', 'underline');
    button.style('text-decoration-style', 'dotted');
    button.style('text-decoration-thickness', '1px');

    button.position(sub_button_arrange_vec_copy.x, sub_button_arrange_vec_copy.y); // position based on this vector
    sub_button_positions.push(sub_button_arrange_vec_copy.copy()); // save position of the sub-button
    sub_button_arrange_vec_copy.add(createVector(random(-button_offset, button_offset), button_offset)); // move position vector with some randomness

    button.mouseOver(buttonOver);
    button.mouseOut(buttonOut);

    button.hide(); // hide at the beginning

}





function Box(x, y, w, h, c = color(0,0,0)) {
    var options = {
      friction: 1.0,
      restitution: 0.0
    };
    
    // create body
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    this.c = c;
    
    // add body to the world
    Composite.add(world, this.body);
    
    // check if body is off screen
    this.isOffScreen = function() {
      var pos = this.body.position;
      // returns true if outside of screen
      return ((pos.x > width + 100) || (pos.x < -100) || (pos.y > height + 100) || (pos.y < -100));
    }
    
    // remove body from the world
    this.removeFromWorld = function () {
      Composite.remove(world, this.body);
    }
    
    this.show = function() {
      var pos = this.body.position;
      var angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      noStroke();
      fill(this.c); // white brick
      rect(0, 0, this.w, this.h);
      pop();
    }
    
}


function Boundary(x, y, w, h, a) {
    var options = {
      friction: 1.0,
      restitution: 0.0,
      angle: a,
      isStatic: true
    };
    
    // create body
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    
    // add body to the world
    Composite.add(world, this.body);
    
    this.show = function() {
      var pos = this.body.position;
      var angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      noStroke();
      fill(0);
      rect(0, 0, this.w, this.h);
      pop();
    }
    
}


// clamp a number between a minimum and a maximum
function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }