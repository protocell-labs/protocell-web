//////PHYSICS//////


// matter.js box / brick objects - simulated
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
    
    var nr_of_bricks_in_width = floor(width / brick_width) + 2;
    var nr_of_bricks_in_height = floor(height / brick_height) + 2;
    starting_nr_of_bricks = nr_of_bricks_in_width * nr_of_bricks_in_height;
    
    gradient_part_a = color(0, 255, 255); // cyan 
    gradient_part_b = color(255, 0, 255); // magenta

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