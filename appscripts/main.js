require(
   // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
    ["../jslibs/raphael.lonce", "../jslibs/raphael-paragraph"],  // raphael paragraph library to auto-fit text onto raphael objects


    function () {

        // -------------------------------------------------- General Set Up ------------------------------------------------------------------
        console.log("Yo, I am alive!");

        // Grab the div where we will put our Raphael paper
        var centerDiv = document.getElementById("centerDiv");

        // Create the Raphael paper that we will use for drawing and creating graphical objects
        var paper = new Raphael(centerDiv);

        // put the width and heigth of the canvas into variables for our own convenience
        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
        
        // Create a background rectangle covering the canvas so that we can add event listeners to it
        var bgRect = paper.rect(0,0,pWidth, pHeight);
        bgRect.attr({
            'fill': 'white',
            'fill-opacity': 0 //made transparent
        })

        // ------------------------------------------ Setting Up the Interactive Layout ------------------------------------------------------

        var person = prompt("Welcome! Please enter your name to begin!"); //prompts the user to key in their name
        
        if (person==false) {
            document.getElementById("header").innerHTML = "My Dreamboard!"; //if the user does not key in anything, the header is set to the default - "My Dreamboard!"
        } else if (person==null) {
            document.getElementById("header").innerHTML = "My Dreamboard!"; //if the user cancels, the header is also set to the default
        } else if (person!=false) {
            document.getElementById("header").innerHTML = person + "'s Dreamboard!"; //header is customized using the name that was keyed in
        };

        //Using DOM, grabs elements (the stickers that the users can add to the canvas) in the HTML file
        var postit = document.getElementById("square");
        var heart = document.getElementById("heart");
        var like = document.getElementById("like");
        var star = document.getElementById("star");

        //Adding event listeners to the sticker buttons such that they become less opaque when the user hovers over them; this signals that these buttons are clickable
        postit.addEventListener("mouseover", function(){
            postit.style.opacity = "0.75"
        });
        postit.addEventListener("mouseout", function(){
            postit.style.opacity = "1"
        });

        heart.addEventListener("mouseover", function(){
            heart.style.opacity = "0.75"
        });
        heart.addEventListener("mouseout", function(){
            heart.style.opacity = "1"
        });

        like.addEventListener("mouseover", function(){
            like.style.opacity = "0.75"
        });
        like.addEventListener("mouseout", function(){
            like.style.opacity = "1"
        });

        star.addEventListener("mouseover", function(){
            star.style.opacity = "0.75"
        });
        star.addEventListener("mouseout", function(){
            star.style.opacity = "1"
        });

        //Using DOM, grabs the hue, saturation and lightness sliders
        var hSlider = document.getElementById("mySliderH");
        var sSlider = document.getElementById("mySliderS");
        var lSlider = document.getElementById("mySliderL");

        //A function to construct the HSL color string for use later
        var makeColorString = function(ih, is, iv) {
            var colorString = "hsl(" + mySliderH.value + ", " + mySliderS.value + "%, " + mySliderL.value + "%)";
            return colorString;
        };

        //Adding event listeners to the hue, saturation, and lightness sliders, and changing the post-it button's color in real-time to show the user what color it will be
        hSlider.addEventListener("input", function(){
            postit.style.backgroundColor = makeColorString(hSlider.value, sSlider.value, lSlider.value);
            return;
        });

        sSlider.addEventListener("input", function(){
            postit.style.backgroundColor = makeColorString(hSlider.value, sSlider.value, lSlider.value);
            return;
        });

        lSlider.addEventListener("input", function(){
            postit.style.backgroundColor = makeColorString(hSlider.value, sSlider.value, lSlider.value);
            return;
        });

        //Using DOM, grabs the post-it size slider
        var sizeSlider = document.getElementById("mySliderSize");

        //Declare an attribute to hold the post-it size value; Sets the default size of post-it to 100 (the default value on the slider)
        postit.scale = 100;

        //Adding event listener to the post-it size slider, which changes the size of the post-it size to the size slider value
        sizeSlider.addEventListener("input", function(){
            postit.scale = sizeSlider.value;
        });

        //Using DOM, grabs the text box element where the user can input the text they want on the post-it
        var postitText = document.getElementById("postitText");

        //Adding event listener to the text box, which returns the text box value
        postitText.addEventListener("text", function(){
            return postitText.value
        })

        //Using DOM, grabs the image size slider
        var imageScale = document.getElementById("mySliderImage");
        
        //Declare a variable to hold the image size value; Sets the default size of the image to be 50% (the default value on the slider)
        var scale = 0.5;

        //Adding event listener to the image size slider        
        imageScale.addEventListener("input", function(){
            scale = imageScale.value/100; //converts the value of the slider into percentage terms (or decimal terms)
        });

        //Using DOM, grabs the add image button
        var imageButton = document.getElementById("imageButton");

        //-------------------------------------------- Adding Raphael Objects to the Canvas ---------------------------------------------------

        //Adding event listener to the add image button
        imageButton.addEventListener("click", function(){
            var imageURL = document.getElementById("imageURL"); //Using DOM, grabs the image url text box
            var imageSource = imageURL.value; //Declares new variable imageSource to hold the value in the image url text box
            var newImage = new Image(); //Declares new variable, newImage
            newImage.src = imageSource; //Sets the image's source to the URL as keyed into the image url text box

            var width = newImage.width*scale; //Scales the width of the source image according to the size set by the user
            var height = newImage.height*scale; //Scales the height of the source image according to the size set by the user

            //When the width of the image is bigger than the width of the canvas
            if (width > pWidth) {
                width = pWidth*scale; //We set the width of the source image to the maximum (i.e. that width of the canvas), then scale it to the size that the user has set
                var widthfactor = newImage.width*scale/pWidth; //We calculate the width factor in order to keep the aspect ratio the same -- this ensures the picture is not distorted
                height = height/widthfactor*scale; //We scale the height down accordingly
            };

            //When the height of the image is bigger than the height of the canvas
            if (height > pHeight) {
                height = pHeight*scale; //We set the height of the source image to the maximum (i.e. that height of the canvas), then scale it to the size that the user has set
                var heightfactor = newImage.height*scale/pHeight; //We calculate the height factor in order to keep the aspect ratio the same -- this ensures the picture is not distorted
                width = width/heightfactor*scale; //We scale the width down accordingly
            };

            //Creates a new image object on the canvas according to the attributes as set earlier
            var image1 = paper.image(imageSource, 0, 0, width, height);

            var ox = 0; //Arbitrary variable to hold the x coordinate
            var oy = 0; //Arbitrary variable to hold the y coordinate
            var mousedown = false; //Arbitrary variable to hold mousestate, mousedown = false when mouse is up

            //Adding mousedown, mousemove and mouseup event listeners to the image directly to allow the user to move over other objects
            //Weakness: the user must move the object slowly; may not work when the images are too small
            image1.mousedown(function(event) {
                ox = event.screenX;
                oy = event.screenY;
                image1.attr({
                    opacity: .5 //Changes the image to become more translucent when the mouse is down
                }); 
                mousedown = true; //Sets the mousedown variable to become true
            });

            image1.mousemove(function(event) {
                if (mousedown == true) {
                    image1.translate(event.screenX - ox, event.screenY - oy); //Contingent on the mousedown variable being true (i.e. that mouse is down), moves the image as the mouse moves on the canvas
                    ox = event.screenX;
                    oy = event.screenY;
                };
            });

            image1.mouseup(function(event) {
                mousedown = false; //Sets the mosuedown variable to become false 
                image1.attr({
                    opacity: 1 //Changes the image to become opaque again when the mouse is up
                });
            });

        });

        //Adding event listener to the post-it button
        postit.addEventListener("click", function(){
            var newRect = paper.rect(pWidth/2, pHeight/2, postit.scale, postit.scale); //Creates a new post-it on the canvas according to the size set by the user
            newRect.colorString = "hsl(" + hSlider.value + "," + sSlider.value + "," + lSlider.value + ")"; //Declare a new attribute to hold the HSL color string   
            newRect.attr({
                "fill": newRect.colorString //Sets the fill of the new post-it to the HSL color string
            });

            //Create text on the post-it using the raphael paragraph library
            var newpostitText = paper.paragraph({
                x: pWidth/2+2, 
                y: pHeight/2+7,
                maxWidth: postit.scale-2,
                maxHeight: postit.scale-2,
                text: postitText.value, //Sets the text to what the user keyed into the post-it text box
                textStyle: {"font-family": "Helvetica", "font-size": 14}
            });

            //Group the post-it and the text together so that we can add event listeners to it as a whole (i.e. both the text and post-it object moves together)
            var set = paper.set();
            set.push(newRect, newpostitText);

            var ox = 0;
            var oy = 0;
            var mousedown = false;

            //Event listeners added to move the post-it, similar to the movement of images
            //Adding mousedown, mousemove and mouseup event listeners to the post-it and text set directly to allow the user to move over other objects (overlapping objects)
            //Weakness: the user must move the object slowly (mouse must be on the post-it at all times)
            set.mousedown(function(event) {
                ox = event.screenX;
                oy = event.screenY;
                set.attr({
                    opacity: .5
                });
                mousedown = true;
            });

            set.mousemove(function(event) {
                if (mousedown == true) {
                    set.translate(event.screenX - ox, event.screenY - oy);
                    ox = event.screenX;
                    oy = event.screenY;
                };
            });

            set.mouseup(function(event) {
                mousedown = false;
                set.attr({
                    opacity: 1
                });
            });

        });

        //Adding event listener to the heart button
        heart.addEventListener("click", function(){
            var newHeart = paper.image("resources/heart.png", pWidth/2, pHeight/2, 45, 40);
            
            var mousedown = false;
            
            //Event listeners added to move the heart sticker, similar to the movement of images
            newHeart.addEventListener("mousedown", function(ev){
                mousedown = true;
                newHeart.attr({
                    'opacity': .5
                });
            });

            bgRect.addEventListener("mousemove", function(ev){
                var x = ev.offsetX;
                var y = ev.offsetY;
                if (mousedown == true) {
                    newHeart.attr({
                        'x': x,
                        'y': y
                    });
                };
            });

            newHeart.addEventListener("mouseup", function(ev){
                mousedown = false;
                newHeart.attr({
                    'opacity': 1
                });
            });
        });

        //Adding event listener to the like button
        like.addEventListener("click", function(){
            var newLike = paper.image("resources/like.png", pWidth/2, pHeight/2, 45, 40);
            
            var mousedown = false;
            
            //Event listeners added to move the like sticker, similar to the movement of images            
            newLike.addEventListener("mousedown", function(ev){
                mousedown = true;
                newLike.attr({
                    'opacity': .5
                });
            });

            bgRect.addEventListener("mousemove", function(ev){
                var x = ev.offsetX;
                var y = ev.offsetY;
                if (mousedown == true) {
                    newLike.attr({
                        'x': x,
                        'y': y
                    });
                };
            });

            newLike.addEventListener("mouseup", function(ev){
                mousedown = false;
                newLike.attr({
                    'opacity': 1
                });
            });
        });

        //Adding event listener to the star button
        star.addEventListener("click", function(){
            var newStar = paper.image("resources/star.png", pWidth/2, pHeight/2, 45, 40);
            
            var mousedown = false;

            //Event listeners added to move the star sticker, similar to the movement of images                  
            newStar.addEventListener("mousedown", function(ev){
                mousedown = true;
                newStar.attr({
                    'opacity': .5
                });
            });

            bgRect.addEventListener("mousemove", function(ev){
                var x = ev.offsetX;
                var y = ev.offsetY;
                if (mousedown == true) {
                    newStar.attr({
                        'x': x,
                        'y': y
                    });
                };
            });

            newStar.addEventListener("mouseup", function(ev){
                mousedown = false;
                newStar.attr({
                    'opacity': 1
                });
            });
        });
        
        //Using DOM, grabs the clear button
        var clearButton = document.getElementById("clearButton");
        clearButton.addEventListener("click", function(){
            paper.clear(); //Clears the canvas on click
        });

        //Declare a new array
        var quoteArray = [];

        quoteArray[1] = "Say yes and you\'ll figure it out afterwards. -- Tina Fey";
        quoteArray[2] = "Education without values, as useful as it is, seems rather to make man a more clever devil. -- C. S. Lewis";
        quoteArray[3] = "So we beat on, boats against the current, borne back ceaselessly into the past. -- F. Scott Fitzgerald, The Great Gatsby"
        quoteArray[4] = "Far above the world, Planet Earth is blue and there\'s nothing I can do. -- David Bowie, Space Oddity"
        quoteArray[5] = "A ship is safe in harbor, but that\'s not what ships are for. -- William G. T. Shedd"
        
        //Using DOM, grabs the quotes div from HTML
        var quotes = document.getElementById("quotes");
        quotes.innerHTML = quoteArray[Math.floor((Math.random()*5)+1)]; //Sets the text in the quotes div to a random one from the quoteArray

        //Some background music :)
        var backgroundSound = new Audio("resources/naxsy.mp3");
        backgroundSound.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        backgroundSound.play();

        //Intended to add a function in which users can upload their own photos to be added onto the canvas, but did not manage to make it work
        /*
        var imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);
        var canvas = document.getElementById('imageCanvas');
        var ctx = canvas.getContext('2d');

        function handleImage(e){
            var reader = new FileReader();
            reader.onload = function(event){
                var img = new Image();
                img.onload = function(){
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img,0,0);
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);     
        }

        var imageButtonUpload = document.getElementById("imageButton2");
        imageButtonUpload.addEventListener("click", function(e){
            var reader = new FileReader();
            reader.onload = function(event){
                var img = new Image();
                img.onload = function(){
                    canvas.width = img.width;
                    canvas.height = img.height;
                };
                img.src = event.target.result;
                var width = img.width*scale; 
                var height = img.height*scale; 

                if (width > pWidth) {
                    width = pWidth*scale; //We set the width of the source image to the maximum (i.e. that width of the canvas), then scale it to the size that the user has set
                    var widthfactor = img.width*scale/pWidth; //We calculate the width factor in order to keep the aspect ratio the same -- this ensures the picture is not distorted
                    height = height/widthfactor*scale; //We scale the height down accordingly
                };

                if (height > pHeight) {
                    height = pHeight*scale; //We set the height of the source image to the maximum (i.e. that height of the canvas), then scale it to the size that the user has set
                    var heightfactor = img.height*scale/pHeight; //We calculate the height factor in order to keep the aspect ratio the same -- this ensures the picture is not distorted
                    width = width/heightfactor*scale; //We scale the width down accordingly
                };

                var image2 = paper.image(img.src, 0, 0, width, height);

                var ox = 0; //Arbitrary variable to hold the x coordinate
                var oy = 0; //Arbitrary variable to hold the y coordinate
                var mousedown = false; //Arbitrary variable to hold mousestate, mousedown = false when mouse is up

                image2.mousedown(function(event) {
                    ox = event.screenX;
                    oy = event.screenY;
                    image2.attr({
                        opacity: .5 //Changes the image to become more translucent when the mouse is down
                    }); 
                    mousedown = true; //Sets the mousedown variable to become true
                });

                image2.mousemove(function(event) {
                    if (mousedown == true) {
                        image2.translate(event.screenX - ox, event.screenY - oy); //Contingent on the mousedown variable being true (i.e. that mouse is down), moves the image as the mouse moves on the canvas
                        ox = event.screenX;
                        oy = event.screenY;
                    };
                });

                image2.mouseup(function(event) {
                    mousedown = false; //Sets the mosuedown variable to become false 
                    image2.attr({
                        opacity: 1 //Changes the image to become opaque again when the mouse is up
                    });
                });                
            }
            reader.readAsDataURL(e.target.files[0]);     
        })*/

});