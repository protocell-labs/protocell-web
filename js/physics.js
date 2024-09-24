//////PHYSICS//////


// matter.js box / brick objects - simulated
function Box(x, y, w, h, c = color(0,0,0)) {
    var options = {
        friction: 1.0,
        restitution: 0.0
    };
    
    // create body
    this.x = x; // original x position - used only to map graffiti image
    this.y = y; // original y position - used only to map graffiti image
    this.w = w; // box width
    this.h = h; // box height
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    this.c = c; // box color
    
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

        // scale the graffiti image so it fits the original screen size - no croping of the graffiti image
        var graffiti_scale = windowWidth < windowHeight ? original_windowWidth / graffiti_image.width : original_windowHeight / graffiti_image.height;
        
        // map animated graffiti onto bricks
        push();

        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);

        // brick outlines will be shown after the user clicks for the first time
        if (show_brick_outlines) {
            stroke(this.c);
            strokeWeight(0.5);
            fill(0);
            rect(0, 0, this.w, this.h);
        } else {
            noStroke();
            noFill();
        }

        let dx = -this.w / 2; // the x-coordinate of the destination rectangle in which to draw the source image
        let dy = -this.h / 2; // the y-coordinate of the destination rectangle in which to draw the source image
        let dWidth = this.w; // the width of the destination rectangle
        let dHeight = this.h; // the height of the destination rectangle
        let sx = this.x / graffiti_scale + graffiti_image.width / 2 - windowWidth / (2 * graffiti_scale) - this.w / (2 * graffiti_scale); // the x-coordinate of the subsection of the source image to draw into the destination rectangle - scales and centers the image on the screen in x
        let sy = this.y / graffiti_scale + graffiti_image.height / 2 - windowHeight / (2 * graffiti_scale) - this.h / (2 * graffiti_scale); // the y-coordinate of the subsection of the source image to draw into the destination rectangle - scales and centers the image on the screen in y... don't ask
        let sWidth = this.w / graffiti_scale; // the width of the subsection of the source image to draw into the destination rectangle
        let sHeight = this.h / graffiti_scale; // the height of the subsection of the source image to draw into the destination rectangle

        // draw a scaled and centered the graffiti image on the brick wall
        image(graffiti_image, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);

        pop();
        

        /*
        // just a rectangle with a fill
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        noStroke();
        fill(this.c); // white brick
        rect(0, 0, this.w, this.h);
        pop();
        */

    }
    
}


// matter.js boundary objects - fixed
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



// creates masonry wall at the intro page
function createMasonryPlayground() {
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
    
    var nr_of_bricks_in_width = floor(width / (brick_width + brick_gap)) + 2;
    var nr_of_bricks_in_height = floor(height / (brick_height + brick_gap)) + 2;
    starting_nr_of_bricks = nr_of_bricks_in_width * nr_of_bricks_in_height;
    
    gradient_part_a = color(0, 255, 255); // cyan 
    gradient_part_b = color(255, 0, 255); // magenta

    // create wall of bricks filling the canvas
    for (var i = 0; i < nr_of_bricks_in_width; i++) {
        for (var j = 0; j < nr_of_bricks_in_height; j++) {
            let gradient = lerpColor(gradient_part_a, gradient_part_b, j / nr_of_bricks_in_height);
            let brick_x_shift = j % 2 == 0 ? -(brick_width + brick_gap) / 4 : (brick_width + brick_gap) / 4; // running bond
            boxes.push(new Box(i * (brick_width + brick_gap) + brick_x_shift, j * (brick_height + brick_gap), brick_width, brick_height, gradient));
        }
    }
    
    // remove default for right-click
    for (var element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
}



// update physics engine and remove elements that are off screen
function runPhysics() {
    // update physics engine
    Engine.update(engine);
    
    // determine which bricks to show and which are off screen
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
        
        // remove boxes that are off screen
        if (boxes[i].isOffScreen()){
            boxes[i].removeFromWorld();
            boxes.splice(i,1);
            i--; // check the same index again in next iteration (to counteract the splice which shifts the rest of the array)
        }
    }
    
    // show platforms
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].show();
    }
}




// display intro counter - counts bricks that are outside of the screen
function showIntroCounter() {
    box_to_void_ratio = boxes.length / starting_nr_of_bricks;
    let intro_counter_string = round(clamp((1 - box_to_void_ratio) * 200, 0, 100)).toString() + '%'
    if (box_to_void_ratio > 0.65) { intro_counter.html('keep going<br>progress ' + intro_counter_string); }
    else { intro_counter.html('almost there<br>progress ' + intro_counter_string); }
}




// applies rotation force on all bricks (center of rotation is at screen center)
function applyRotationForce() {
    let strength = 0.0002; // dependent on the size of the bricks as well (inertia)
    let balancing_f = 0.50; // factor for the balancing centripetal force
    boxes.forEach(function (item, index) {
        let centripetal_force = new Vector.mult(new Vector.normalise(new Vector.sub(item.body.position, new Vector.create(width / 2, height / 2))), -strength * balancing_f); // to the center of the screen, balancing the rotation
        let rot_force = new Vector.rotate(new Vector.mult(new Vector.normalise(new Vector.sub(item.body.position, new Vector.create(width / 2, height / 2))), strength), Math.PI / 2); // rotating force around the center
        Body.applyForce(item.body, item.body.position, rot_force);
        Body.applyForce(item.body, item.body.position, centripetal_force);
    });

}



// applies repulsing force on all bricks (from screen center)
function applyRepulsingForce(strength) {
    // strength is dependent on the size of the bricks as well (inertia)
    boxes.forEach(function (item, index) {
        let from_cent_force = new Vector.mult(new Vector.normalise(new Vector.sub(item.body.position, new Vector.create(width / 2, height / 2))), strength); // from the center of the screen
        Body.applyForce(item.body, item.body.position, from_cent_force);
    });

}



// applies attracting force on all bricks (towards the screen center) - NOT CURRENTLY USED
function applyAttractingForce(strength) {
    // strength is dependent on the size of the bricks as well (inertia)
    boxes.forEach(function (item, index) {
        let to_cent_force = new Vector.mult(new Vector.normalise(new Vector.sub(item.body.position, new Vector.create(width / 2, height / 2))), -strength); // to the center of the screen
        Body.applyForce(item.body, item.body.position, to_cent_force);
    });

}



// stop matter.js physics engine and clear out elements
function stopPhysicsEngine() {
    // stop running engine and apply forces while the main site is shown
    physics_on = false;
    rotating_force = false;
    repulsing_force = false;

    // clear out boxes array with bricks
    boxes.forEach(function (item, index) {item.removeFromWorld();});
    boxes = [];

    // clear out all elements from the engine and shut it down
    World.clear(world);
    Engine.clear(engine);
}