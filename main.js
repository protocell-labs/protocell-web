/*

                    p r o t o c e l l . x y z

           { p r o t o c e l l : l a b s }  |  2 0 2 4

*/



let primary_color = '#000000'; // black
let secondary_color = '#00ff00'; // green

let terminal_p1, text_p1_idx;

let typing_speed = 2.0; // speed of typing for the text

//let lorem_impsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum nunc id felis sollicitudin porttitor. Phasellus vulputate aliquam luctus. Sed pharetra cursus nisi, bibendum consectetur lectus elementum eu. Sed facilisis, urna nec lobortis faucibus, massa nisl suscipit ante, sed blandit ligula mi in est. Nulla facilisi. Fusce pellentesque pretium enim, id accumsan odio volutpat eget. Praesent at lectus cursus, faucibus velit non, lacinia nunc. Nullam luctus varius turpis accumsan ornare. Donec pharetra nibh ac sem ullamcorper pulvinar. Cras ornare dui id eros varius iaculis. Phasellus vestibulum, ipsum a malesuada bibendum, erat purus tincidunt magna, in condimentum ante massa nec ipsum. Etiam non nulla elit. Nullam fringilla nisl id felis imperdiet ornare. Donec posuere blandit mauris, eu rhoncus urna dignissim sed. Proin nec nisi sagittis, ultrices tortor vitae, tincidunt ante.';
let lorem_impsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum nunc id felis sollicitudin porttitor.';

let wireframe_p1, wireframe_p2;
let wireframe_temp = 1.0; // speed of movement of vertices



function setup() {

    createCanvas(windowWidth, windowHeight);

    terminal_p1 = createP(lorem_impsum);
    terminal_p1.id('terminal_p1');

    //terminal_p1.position(windowWidth / 2, windowHeight / 2);
    terminal_p1.style('color', secondary_color);
    terminal_p1.style('font-family', 'monospace');
    terminal_p1.style('font-size', '1.5vmin');

    //terminal_p1.style('position', 'absolute');
    terminal_p1.position(windowWidth / 2, windowHeight / 2);
    //terminal_p1.draggable();

    terminal_p1.style('width', '20vmin');
    terminal_p1.style('height', '20vmin');

    terminal_p1.style('border-style', 'solid');
    terminal_p1.style('border-width', 'thin');
    terminal_p1.style('padding', '1.5vmin 1.5vmin');

    text_p1_idx = 0;


    wireframe_p1 = createVector(random(windowWidth / 4, 3 * windowWidth / 4), random(windowWidth / 4, 3 * windowWidth / 4));
    wireframe_p2 = createVector(random(windowWidth / 4, 3 * windowWidth / 4), random(windowWidth / 4, 3 * windowWidth / 4));

    stroke(secondary_color);
    strokeWeight(1.0);

}




function draw() {

    background(primary_color);

    //terminal_p1.position(mouseX, mouseY);

    text_p1_idx += typing_speed * random(); // position of the last letter in the string
    let text_p1 = lorem_impsum.slice(0, Math.floor(text_p1_idx)) + blinking_input(lorem_impsum.length, text_p1_idx);
    terminal_p1.html(text_p1);

    wireframe_animation();

}





function wireframe_animation() {
    wireframe_p1.add(createVector(random(-wireframe_temp, wireframe_temp), random(-wireframe_temp, wireframe_temp)));
    wireframe_p2.add(createVector(random(-wireframe_temp, wireframe_temp), random(-wireframe_temp, wireframe_temp)));
    line(wireframe_p1.x, wireframe_p1.y, wireframe_p2.x, wireframe_p2.y);
}



function blinking_input(text_length, last_letter_idx) {
    if (last_letter_idx < text_length) { return '▌'; }
    else if (Math.floor(frameCount / 20) % 2 == 0) { return '▌'; }
    else { return ''; }
}