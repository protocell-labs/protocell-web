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

    // draggable bar

    bar_i1 = createDiv();
    bar_i1.id('bar_i1');
    bar_i1.position(windowWidth / 4, random(0, windowHeight / 2));
    bar_i1.style('width', '43vmin');
    bar_i1.style('height', bar_height); // bar_height
    bar_i1.style('z-index', '2');
    bar_i1.style('color', primary_color);
    bar_i1.style('background-color', secondary_color);
    bar_i1.style('border-color', secondary_color);
    bar_i1.style('border-style', 'solid');
    bar_i1.style('border-width', 'thin');

    bar_i1.style('font-family', 'MonoMEK'); // 'monospace', 'MonoMEK'
    bar_i1.style('font-size', font_size_buttons);
    bar_i1.style('line-height', bar_height);

    bar_i1.draggable(); // make element draggable
    bar_i1.hide();

    // terminal - position will be relative to the bar above - calculateDraggableBarOffset() function

    terminal_i1 = createP();
    terminal_i1.id('terminal_i1');

    terminal_i1.style('color', secondary_color);
    terminal_i1.style('background-color', primary_color);
    terminal_i1.style('font-family', 'monospace'); // 'monospace', 'MonoMEK'
    terminal_i1.style('font-size', font_size_image);

    terminal_i1.style('position', 'absolute');
    terminal_i1.style('width', '40vmin'); // 'auto'
    terminal_i1.style('height', 'auto');
    terminal_i1.style('z-index', '1');

    terminal_i1.style('border-style', 'solid');
    terminal_i1.style('border-width', 'thin');
    terminal_i1.style('padding', '1.5vmin 1.5vmin'); // '2ch 2ch'
    terminal_i1.style('margin', '0');

    terminal_i1.hide(); // hide at the beginning

    text_i1_idx = 0; // set counting index to zero
    ascii_image = formatASCII(button_to_ascii['placeholder'][1]);

    text_i1_input = ascii_image + '<br>&bsol;> ';

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

    terminal_i2.hide(); // hide at the beginning
}



// terminal p1 - text terminal
function createTerminalP1() {

    // draggable bar

    bar_p1 = createDiv();
    bar_p1.id('bar_p1');
    bar_p1.position(windowWidth / 2, random(windowHeight / 16, windowHeight / 4));
    bar_p1.style('width', '43vmin');
    bar_p1.style('height', bar_height); // bar_height
    bar_p1.style('z-index', '2');
    bar_p1.style('color', primary_color);
    bar_p1.style('background-color', secondary_color);
    bar_p1.style('border-color', secondary_color);
    bar_p1.style('border-style', 'solid');
    bar_p1.style('border-width', 'thin');

    bar_p1.style('font-family', 'MonoMEK'); // 'monospace', 'MonoMEK'
    bar_p1.style('font-size', font_size_buttons);
    bar_p1.style('line-height', bar_height);

    bar_p1.draggable(); // make element draggable
    bar_p1.hide();

    // terminal - position will be relative to the bar above - calculateDraggableBarOffset() function

    terminal_p1 = createDiv(button_to_text['placeholder']);
    terminal_p1.id('terminal_p1');

    terminal_p1.style('position', 'absolute');
    terminal_p1.style('width', '40vmin');
    terminal_p1.style('height', 'auto');
    terminal_p1.style('z-index', '2');

    terminal_p1.style('color', secondary_color);
    terminal_p1.style('background-color', primary_color);
    terminal_p1.style('font-family', 'MonoMEK'); // 'monospace', 'MonoMEK'
    terminal_p1.style('font-size', font_size_text);

    terminal_p1.style('border-style', 'solid');
    terminal_p1.style('border-width', 'thin');
    terminal_p1.style('padding', '1.5vmin 1.5vmin'); // '1.5vmin 1.5vmin', '2ch 2ch'
    terminal_p1.style('margin', '0');

    terminal_p1.hide();

    text_p1_idx = 0; // set counting index to zero
    text_p1_input = button_to_text['placeholder']; // lorem ipsum

}



// terminal p2 - project data terminal
function createTerminalP2() {

    // draggable bar

    bar_p2 = createDiv();
    bar_p2.id('bar_p2');
    bar_p2.position(3 * windowWidth / 8, random(windowHeight / 2, 2 * windowHeight / 3));
    bar_p2.style('width', '28vmin');
    bar_p2.style('height', bar_height); // bar_height
    bar_p2.style('z-index', '2');
    bar_p2.style('color', primary_color);
    bar_p2.style('background-color', secondary_color);
    bar_p2.style('border-color', secondary_color);
    bar_p2.style('border-style', 'solid');
    bar_p2.style('border-width', 'thin');

    bar_p2.style('font-family', 'MonoMEK'); // 'monospace', 'MonoMEK'
    bar_p2.style('font-size', font_size_buttons);
    bar_p2.style('line-height', bar_height);

    bar_p2.draggable(); // make element draggable
    bar_p2.hide();

    // terminal - position will be relative to the bar above - calculateDraggableBarOffset() function

    terminal_p2 = createDiv(button_to_text['placeholder']);
    terminal_p2.id('terminal_p2');

    terminal_p2.style('position', 'absolute');
    terminal_p2.style('width', '25vmin');
    terminal_p2.style('height', 'auto');
    terminal_p2.style('z-index', '2');

    terminal_p2.style('color', secondary_color);
    terminal_p2.style('background-color', primary_color);
    terminal_p2.style('font-family', 'MonoMEK'); // 'monospace', 'MonoMEK'
    terminal_p2.style('font-size', font_size_text);

    terminal_p2.style('border-style', 'solid');
    terminal_p2.style('border-width', 'thin');
    terminal_p2.style('padding', '1.5vmin 1.5vmin'); // '1.5vmin 1.5vmin', '2ch 2ch'
    terminal_p2.style('margin', '0');

    terminal_p2.hide();

    text_p2_idx = 0; // set counting index to zero
    text_p2_input = button_to_data['placeholder']; // lorem ipsum

}



// calculate offset of draggable bar elements, and use it to position terminals (which are themselves not draggable)
function calculateDraggableBarOffset() {
    // bar_p1

    let bar_p1_el = document.getElementById('bar_p1');
    let terminal_p1_el = document.getElementById('terminal_p1');

    let top_offset_p1 = bar_p1_el.getBoundingClientRect().top + 25; // offset for bar_height = '25 px'
    let left_offset_p1 = bar_p1_el.getBoundingClientRect().left;

    terminal_p1_el.style.top = top_offset_p1.toString() + 'px';
    terminal_p1_el.style.left = left_offset_p1.toString() + 'px';

    // bar_p2

    let bar_p2_el = document.getElementById('bar_p2');
    let terminal_p2_el = document.getElementById('terminal_p2');

    let top_offset_p2 = bar_p2_el.getBoundingClientRect().top + 25; // offset for bar_height = '25 px'
    let left_offset_p2 = bar_p2_el.getBoundingClientRect().left;

    terminal_p2_el.style.top = top_offset_p2.toString() + 'px';
    terminal_p2_el.style.left = left_offset_p2.toString() + 'px';
    
    // bar_i1

    let bar_i1_el = document.getElementById('bar_i1');
    let terminal_i1_el = document.getElementById('terminal_i1');

    let top_offset_i1 = bar_i1_el.getBoundingClientRect().top + 25; // offset for bar_height = '25 px'
    let left_offset_i1 = bar_i1_el.getBoundingClientRect().left;

    terminal_i1_el.style.top = top_offset_i1.toString() + 'px';
    terminal_i1_el.style.left = left_offset_i1.toString() + 'px';

}




// {protocell:labs}
function createHeader() {

    header_div = createDiv()
    header_div.id('header_div');

    header_div.style('width', '100%');
    header_div.style('top', font_size_buttons);
    header_div.style('background-color', 'transparent');
    header_div.style('border', 'none');
    header_div.style('position', 'absolute');
    header_div.style('z-index', '4');

    // these three properties are for horizontal and vertical alignment of elements inside the div
    header_div.style('display', 'flex');
    header_div.style('justify-content', 'center');
    header_div.style('align-items', 'center');

    header = createP('{protocell:labs} ');
    header.parent(header_div);
    header.id('header');

    header.style('color', secondary_color);
    header.style('background-color', primary_color);
    header.style('border', 'none');
    header.style('font-family', 'MonoMEK'); // 'monospace', 'MonoMEK'
    header.style('font-size', font_size_buttons);

    header.style('position', 'absolute');
    
    header.hide(); // hide at the beginning

    header_idx = 0; // set counting index to zero
    header_input = '{protocell:labs} ';

}



// website source code
function createFooter() {
    
    footer_div = createDiv()
    footer_div.id('footer_div');

    footer_div.style('width', '100%');
    footer_div.style('bottom', font_size_buttons);
    footer_div.style('background-color', 'transparent');
    footer_div.style('border', 'none');
    footer_div.style('position', 'absolute');
    footer_div.style('z-index', '4');

    // these three properties are for horizontal and vertical alignment of elements inside the div
    footer_div.style('display', 'flex');
    footer_div.style('justify-content', 'center');
    footer_div.style('align-items', 'center');

    footer = createA('https://github.com/protocell-labs', 'clone website from GitHub ↗', '_blank'); // link, title, '_blank' parameter makes the link open in a new tab
    footer.parent(footer_div);
    footer.id('footer');

    footer.style('color', secondary_color);
    footer.style('background-color', primary_color);
    footer.style('border', 'none');
    footer.style('font-family', 'MonoMEK'); // 'monospace', 'MonoMEK'
    footer.style('font-size', font_size_buttons);

    footer.style('position', 'absolute');
    
    footer.mouseOver(buttonOver);
    footer.mouseOut(buttonOut);

    footer.hide(); // hide at the beginning

    footer_idx = 0; // set counting index to zero
    footer_input = 'clone website from GitHub ↗ ';

}



// about, code
function createTopLevelButtons() {
    // set vertical height of the first button
    button_y_start = windowHeight / 16;

    // position of the first button in the free-form line
    button_arrange_vec = createVector(windowWidth / 16, button_y_start); 

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
    button_arrange_vec = createVector(windowWidth / 16, random(windowHeight / 4, windowHeight / 2)); 
    let sub_button_offset = min(sub_button_offset_max, windowWidth / 4);
    sub_button_arrange_vec = button_arrange_vec.copy().add( createVector(sub_button_offset, button_offset / 2) ); // copied vector but shifted to the right and down

    // spawn main project buttons
    project_buttons.forEach(function (item, index) {
        button = createButton(item[1]); // create button, item[1] is title
        applyButtonStyle(button, item[0]); // apply style, item[0] is button_id
        buttons.push(button); // store button in array
    });
}



// typing-out effect
function typingEffect(text_idx, text, text_input, terminal, speed) {
    text_idx += speed * random(); // position of the last letter in the string
    text = text_input.slice(0, Math.floor(text_idx)) + '▌';
    if (text_idx < text_input.length + 100) { terminal.html(text); } // update text until all letters are typed, then stop (so we can select the text if needed)
    return text_idx; // return current index - it will be stored globaly so we can track how much text is already typed out
}



// animate intro button as typing text
function typingButton() {
    text_intro_button_idx += 0.050 * typing_speed * random(); // position of the last letter in the string
    text_intro_button = intro_button_input.slice(0, Math.floor(text_intro_button_idx)) + '▌';
    intro_button.html(text_intro_button);
}



// applies animation to all buttons
function animateButtons() {

    // animate main buttons
    buttons.forEach(function (item, index) {
        let y_gap = index > buttons_idx_y_gap ? buttons_y_gap_size : 0; // introducing a gap that separates top level buttons from project buttons
        let y_shift = windowWidth < windowHeight ? 0.01 * windowWidth * (index + y_gap) : 0.01 * windowHeight * (index + y_gap);

        let current_pos = button_positions[index].copy();
        let noise_vec = createVector(1.0 * (0.5 - noise(0.005 * frameCount + index)), 0); // noise() returns a number in range [0, 1]
        let new_pos = current_pos.add(noise_vec);
        new_pos.y = button_y_start + button_offset * y_shift;

        // move button only if it will still remain within defined limits
        if ((new_pos.x > 0) && (new_pos.x < windowWidth / 8)) {
            item.position(new_pos.x, new_pos.y); // position based on this vector
            button_positions[index] = new_pos.copy(); // save position of the button
        } else { // otherwise, we only shift in y and leave x position the same
            item.position(current_pos.x, new_pos.y); // position based on this vector
            button_positions[index].y = new_pos.y; // save position of the button
        }

    });

    // animate sub-buttons
    sub_buttons.forEach(function (item, index) {
        let y_shift = windowWidth < windowHeight ? 0.01 * windowWidth * index : 0.01 * windowHeight * index;

        let current_pos = sub_button_positions[index].copy();
        let noise_vec = createVector(1.0 * (0.5 - noise(0.005 * frameCount + index + 111)), 0); // noise() returns a number in range [0, 1], 111 is an arbitrary noise offset from the main buttons
        let new_pos = current_pos.add(noise_vec);
        new_pos.y = sub_button_positions[0].y + button_offset * y_shift;

        // move button only if it will still remain within defined limits
        if ((new_pos.x > windowWidth / 8) && (new_pos.x < windowWidth / 2)) {
            item.position(new_pos.x, new_pos.y); // position based on this vector
            sub_button_positions[index] = new_pos.copy(); // save position of the sub-button
        } else { // otherwise, we only shift in y and leave x position the same
            item.position(current_pos.x, new_pos.y); // position based on this vector
            sub_button_positions[index].y = new_pos.y; // save position of the button
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

    bar_p1.show();
    bar_p2.show();
    bar_i1.show();

    bar_p1.html('&nbsp;' + selected_button_label);
    bar_p2.html('&nbsp;data');
    bar_i1.html('&nbsp;CCSID 437');

    terminal_p1.show();
    terminal_p2.show();

    buttons.forEach(function (item, index) {item.show();});

    header.show();
    footer.show();
    header_div.style('display', 'flex');
    footer_div.style('display', 'flex');

    setStartState(); // manually "clicks" about button at the very start
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


// triggers when the mouse moves off the sub-button
function buttonSubOut() {
    if (this.elt.id != selected_sub_button) { this.style('color', secondary_color); } // if the sub-button was not clicked, change the color back to original
}


// triggers when the intro button is clicked
function buttonIntroClicked() {
    showMainWebsite(); // close intro page and show main website
    repulsing_force = true;; // activate repulsing force on the bricks
    setTimeout(stopPhysicsEngine, 3000); // stops matter.js physics engine and clears the brick elements
}



// manually "clicks" about button at the very start
function setStartState() {
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
    let sub_button_offset = min(sub_button_offset_max, windowWidth / 4);
    sub_button_arrange_vec_copy = button_positions[0].copy().add( createVector(sub_button_offset, button_offset / 2) );

    // reset sub-button positions
    sub_button_positions = [];

    // spawn sub-buttons
    button_spawn[selected_button].forEach(function (item, index) {
        if (item[2] == 'internal') { // item[2] is type of button - 'internal'
            button = createButton(item[1]); // item[1] is title
            applySubButtonStyle(button, item[0]); // apply style, item[0] is button_id
            sub_buttons.push(button); // store button in array
        } else { // item[2] is type of button - 'external'
            button = createA(item[3], item[1], '_blank'); // item[3] is link, item[1] is title, '_blank' parameter makes the link open in a new tab
            applySubButtonLinkStyle(button, item[0]); // apply style, item[0] is button_id
            sub_buttons.push(button); // store button in array
        }
    });

    // load terminal text
    text_p1_idx = 0;
    text_p1_input = button_to_text['button_about'];

    // load project data
    text_p2_idx = 0;
    text_p2_input = button_to_data['button_about']; // this entry has a simple string format

    // format and load ascii image
    ascii_image = formatASCII(button_to_ascii['button_about'][1]);
    
    text_i1_idx = 0; // set counting index to zero
    text_i1_input = ascii_image + '<br>&bsol;> ';

    // load iframe generator (also image or video)
    terminal_i2.html(gene_weighted_choice(button_to_iframe['button_about'])); // insert image/video html tag

    header_idx = 0; // set counting index to zero
    footer_idx = 0; // set counting index to zero

    // show button label on the bar
    bar_p1.html('&nbsp;' + selected_button_label);
    bar_p2.html('&nbsp;contact');
    bar_i1.html('&nbsp;CCSID 437');
    
}




// triggers when the button is clicked
function buttonClicked() {
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
    let sub_button_offset = min(sub_button_offset_max, windowWidth / 4);
    sub_button_arrange_vec_copy = button_positions[selected_button_sequence].copy().add( createVector(sub_button_offset, button_offset / 2) );

    // reset sub-button positions
    sub_button_positions = [];

    // spawn sub-buttons
    button_spawn[selected_button].forEach(function (item, index) {
        if (item[2] == 'internal') { // item[2] is type of button - 'internal'
            button = createButton(item[1]); // item[1] is title
            applySubButtonStyle(button, item[0]); // apply style, item[0] is button_id
            sub_buttons.push(button); // store button in array
        } else { // item[2] is type of button - 'external'
            button = createA(item[3], item[1], '_blank'); // item[3] is link, item[1] is title, '_blank' parameter makes the link open in a new tab
            applySubButtonLinkStyle(button, item[0]); // apply style, item[0] is button_id
            sub_buttons.push(button); // store button in array
        }
    });

    // load terminal text
    text_p1_idx = 0;
    text_p1_input = button_to_text[this.elt.id];

    // load project data
    text_p2_idx = 0;

    if (selected_button == 'button_about') { // this entry has a simple string format
        text_p2_input = button_to_data[this.elt.id]; 
        bar_p2.html('&nbsp;contact');
    } else { // button_to_data is of the form [type, status, editions, released, chain, storage, platform]
        text_p2_input = 'type:&nbsp;&nbsp;&nbsp;&nbsp; ' + button_to_data[this.elt.id][0] + '<br>status:&nbsp;&nbsp; ' + button_to_data[this.elt.id][1] + '<br>editions: ' + button_to_data[this.elt.id][2] + '<br>released: ' + button_to_data[this.elt.id][3] + '<br>chain:&nbsp;&nbsp;&nbsp; ' + button_to_data[this.elt.id][4] + '<br>storage:&nbsp; ' + button_to_data[this.elt.id][5] + '<br>platform: ' + button_to_data[this.elt.id][6] + '<br>&bsol;> ';
        bar_p2.html('&nbsp;data');
    }

    // load terminal i1 image (ascii or media)
    if (button_to_ascii[this.elt.id][0] == 'ascii') { // format is 'ascii'
        ascii_image = formatASCII(button_to_ascii[this.elt.id][1]);
        text_i1_input = ascii_image + '<br>&bsol;> ';
        bar_i1.html('&nbsp;CCSID 437');
    } else { // format is 'media'
        ascii_image = button_to_ascii[this.elt.id][1];
        text_i1_input = ascii_image;
        bar_i1.html('&nbsp;media');
    } 

    text_i1_idx = 0; // set counting index to zero

    // load iframe generator (also image or video)
    terminal_i2.html(gene_weighted_choice(button_to_iframe[this.elt.id])); // insert iframe html tag

    header_idx = 0; // set counting index to zero
    footer_idx = 0; // set counting index to zero

    // show button label on the bar
    bar_p1.html('&nbsp;' + selected_button_label);

}




// triggers when the sub-button is clicked if it is NOT a link (!) - otherwise, there is no click event for a sub-button aside from opening an external link
function buttonSubClicked() {
    // change color of all sub-buttons back to the original
    sub_buttons.forEach(function (item, index) { item.style('color', secondary_color); });

    // change color of the clicked sub-button to selected
    this.style('color', tertiary_color);

    // save the id and label of the clicked button
    selected_sub_button = this.elt.id;
    selected_sub_button_label = this.elt.innerHTML;

    // load terminal text
    text_p1_idx = 0;
    text_p1_input = button_to_text[this.elt.id];

    // load terminal i1 image (ascii or media)
    if (button_to_ascii[this.elt.id][0] == 'ascii') { // format is 'ascii'
        ascii_image = formatASCII(button_to_ascii[this.elt.id][1]);
        text_i1_input = ascii_image + '<br>&bsol;> ';
        bar_i1.html('&nbsp;CCSID 437');
    } else { // format is 'media'
        ascii_image = button_to_ascii[this.elt.id][1];
        text_i1_input = ascii_image;
        bar_i1.html('&nbsp;media');
    } 

    text_i1_idx = 0; // set counting index to zero

    // show sub-button label on the bar
    bar_p1.html('&nbsp;' + selected_sub_button_label);
    
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



// applies styling to a sub-button that is a link
function applySubButtonLinkStyle(button, button_id) {
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
    button.mouseOut(buttonSubOut);

    button.mouseClicked(buttonSubClicked);
}



// triggers when browser's size changes
function windowResized() {
    // resize canvas
    resizeCanvas(windowWidth, windowHeight); 

    // reposition terminals to fixed default locations
    //bar_p1.position(windowWidth / 2, windowHeight / 16);
    //bar_p2.position(3 * windowWidth / 8, 2 * windowHeight / 3);
    //bar_i1.position(windowWidth / 4, windowHeight / 4);
  }