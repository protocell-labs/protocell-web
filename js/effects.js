//////EFFECTS//////



// screen container
function createScreenDiv() {
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
}



// intro button
function createIntroButton() {
    intro_button = createButton(); // create button
    intro_button.id('button_intro');
    intro_button.parent(screen_div);

    intro_button.style('color', secondary_color);
    intro_button.style('font-family', 'MonoMEK'); // 'monospace'
    intro_button.style('font-size', font_size_intro);

    intro_button.style('background-color', 'transparent');
    intro_button.style('border', 'none');

    intro_button.style('position', 'absolute');

    intro_button.mouseOver(buttonOver);
    intro_button.mouseOut(buttonOut);
    intro_button.mouseClicked(buttonIntroClicked);
    
    intro_button.hide(); // hide at the beginning
    
    text_intro_button_idx = 0; // set counting index to zero
    intro_button_input = "enter('{protocell:labs}');";
}



// intro counter
function createIntroCounter() {
    intro_counter = createP();
    intro_counter.id('intro_counter');
    intro_counter.parent(screen_div);

    let intro_font_color = lerpColor(gradient_part_a, gradient_part_b, 0.5);

    intro_counter.style('color', intro_font_color);
    intro_counter.style('font-family', 'MonoMEK'); // 'monospace'
    intro_counter.style('font-size', font_size_intro);

    intro_counter.style('text-align', 'center');

    intro_counter.style('background-color', 'transparent');
    intro_counter.style('border', 'none');

    intro_counter.style('position', 'absolute');
}



// terminal i1 - ascii image terminal
function createTerminalI1() {
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
}



// terminal i2 - iframe + image terminal
function createTerminalI2() {
    terminal_i2 = createDiv(); // div element contains blocks like images etc.
    terminal_i2.id('terminal_i2');

    terminal_i2.style('color', secondary_color);
    terminal_i2.style('background-color', primary_color);

    // fill up the whole window
    terminal_i2.style('width', '100%');
    terminal_i2.style('height', '100%');
    terminal_i2.style('margin', '0.0vmin');

    // these three properties are for horizontal and vertical alignment of the image block or the iframe
    terminal_i2.style('display', 'flex'); // we have to set this again when we show the element as it will automatically switch to 'block' and mess up image centering
    terminal_i2.style('justify-content', 'center');
    terminal_i2.style('align-items', 'center');
    
    terminal_i2.style('position', 'absolute');
    terminal_i2.style('z-index', '0');

    //terminal_i2.html(button_to_iframe['placeholder']); // insert iframe html tag
    terminal_i2.hide(); // hide at the beginning
}



// terminal p1 - text terminal
function createTerminalP1() {
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
}



// about, code
function createTopLevelButtons() {
    // position of the first button in the free-form line
    button_arrange_vec = createVector(windowWidth / 16, random(0, windowHeight / 8)); 

    // spawn top level buttons
    top_buttons.forEach(function (item, index) {
        button = createButton(item[1]); // create button, item[1] is title
        applyButtonStyle(button, item[0]); // apply style, item[0] is button_id
        buttons.push(button); // store button in array
    });
}



// T E C T O N I C A, rtrdgtzr, Structura...
function createProjectButtons() {
    // position of the first button in the free-form line
    button_arrange_vec = createVector(windowWidth / 16, random(windowHeight / 8, windowHeight / 2)); 
    sub_button_arrange_vec = button_arrange_vec.copy().add( createVector(sub_button_offset, button_offset / 2, 0) ); // copied vector but shifted to the right and down

    // spawn main project buttons
    project_buttons.forEach(function (item, index) {
        button = createButton(item[1]); // create button, item[1] is title
        applyButtonStyle(button, item[0]); // apply style, item[0] is button_id
        buttons.push(button); // store button in array
    });
}



// typing-out effect
function typingEffect(text_idx, text, text_input, terminal) {
    text_idx += typing_speed * random(); // position of the last letter in the string
    text = text_input.slice(0, Math.floor(text_idx)) + '▌';
    if (text_idx < text_input.length + 100) { terminal.html(text); } // update text until all letters are typed, then stop (so we can select the text if needed)
    return text_idx; // return current index - it will be stored globaly so we can track how much text is already typed out
}



// animate intro button as typing text
function typingButton() {
    text_intro_button_idx += 0.025 * typing_speed * random(); // position of the last letter in the string
    text_intro_button = intro_button_input.slice(0, Math.floor(text_intro_button_idx)) + '▌';
    intro_button.html(text_intro_button);
}



// applies animation to all buttons
function animateButtons() {

    // animate main buttons
    buttons.forEach(function (item, index) {
        let current_pos = button_positions[index].copy();
        let noise_vec = createVector(1.0 * (0.5 - noise(0.005 * frameCount + index)), 0); // noise() returns a number in range [0, 1]
        let new_pos = current_pos.add(noise_vec);

        // move button only if it will still remain within defined limits
        if ((new_pos.x > 0) && (new_pos.x < windowWidth / 8)) {
            item.position(new_pos.x, new_pos.y); // position based on this vector
            button_positions[index] = new_pos.copy(); // save position of the button
        }
    });

    // animate sub-buttons
    sub_buttons.forEach(function (item, index) {
        let current_pos = sub_button_positions[index].copy();
        let noise_vec = createVector(1.0 * (0.5 - noise(0.005 * frameCount + index + 111)), 0); // noise() returns a number in range [0, 1], 111 is an arbitrary noise offset from the main buttons
        let new_pos = current_pos.add(noise_vec);

        // move button only if it will still remain within defined limits
        if ((new_pos.x > windowWidth / 8) && (new_pos.x < windowWidth / 2)) {
            item.position(new_pos.x, new_pos.y); // position based on this vector
            sub_button_positions[index] = new_pos.copy(); // save position of the sub-button
        }
    });
}




// switch from the intro screen to the main website
function showMainWebsite() {
    // hide elements
    intro_screen = false;
    intro_counter.hide();

    intro_button.hide();
    screen_div.hide();
    
    // show elements
    terminal_i1.show();
    terminal_i2.show();
    terminal_i2.style('display', 'flex'); // for some reason we have to set this again as it reverts to 'none' when the element is hidden and later set to 'block' when shown

    terminal_p1.show();
    buttons.forEach(function (item, index) {item.show();});
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




// draw line connecting selected project button with its sub-menu
function drawMenuToSubMenuLine() {
    if (selected_button != '') {
        stroke(secondary_color);
        strokeWeight(1.5);

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
    stopPhysicsEngine();
    showMainWebsite();
    setStartState(); // manually "clicks" about button at the very start
}



// manually "clicks" about button at the very start
function setStartState() {
    text_p1_idx = 0;
    text_p1_input = button_to_text['button_about'];

    // change color of the clicked button to selected
    buttons[0].style('color', tertiary_color);

    // save the id and label of the clicked button
    selected_button = 'button_about';
    selected_button_label = buttons[0].elt.innerHTML;

    // remove previous sub-buttons
    if (sub_buttons.length != 0) {
        sub_buttons.forEach(function (item, index) { item.remove(); });
        sub_buttons = [];
    } 

    // reset position vector, shifted to the right and down from the button
    sub_button_arrange_vec_copy = button_positions[0].copy().add( createVector(sub_button_offset, button_offset / 2, 0) );

    // reset sub-button positions
    sub_button_positions = [];

    // spawn sub-buttons
    button_spawn[selected_button].forEach(function (item, index) {
        button = createA(item[2], item[1], '_blank'); // item[2] is link, item[1] is title, '_blank' parameter makes the link open in a new tab
        applySubButtonStyle(button, item[0]); // apply style, item[0] is button_id
        sub_buttons.push(button); // store button in array
    });

    // format and load ascii image
    ascii_image = formatASCII(button_to_ascii['button_about']);
    
    text_i1_idx = 0; // set counting index to zero
    text_i1_input = ascii_image;

    // load iframe generator (also image or video)
    terminal_i2.html(button_to_iframe['button_about']); // insert image/video html tag
    
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

    // load iframe generator (also image or video)
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

}