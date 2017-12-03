// javascript for the "crystal collector" game of week-4 assignment
// // define image sources
var c_src = ["https://www.jewelsforme.com/images/articles/amethyst.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjhKWX-s7Dx_6UapxHCyyaTCR6K04RhPC3vsQo7IZhg0vSXKSp",
    "https://www.gemsociety.org/wp-content/uploads/2015/12/3.03ct-Oval-Ruby-from-Winza.png",
    "https://image.brilliantearth.com/media/v360/imaged/EMLC6.0RD3/still.jpg"
];

// assign random number between 19 and 120(inclusive of both 19 and 120) to variable called compRandom and display
// it in the div called compRandom

var compRandom = Math.floor(Math.random() * (121 - 19)) + 18;

// display compRandom in html page
$("#compRandom").html(compRandom);

//assign random number between 1 and 12 to each of the four crystal images.  This value is stored in variables 
//crystal1, crystal2, crystal3 and crystal4

var crystal1 = Math.floor(Math.random() * 12) + 1;
var crystal2 = Math.floor(Math.random() * 12) + 1;
var crystal3 = Math.floor(Math.random() * 12) + 1;
var crystal4 = Math.floor(Math.random() * 12) + 1;

//initiate counters 
var counter = 0; //total score counter - each click on any crystal will add the crystal's value to this counter 
var winCounter = 0; // increments each time the player wins by matching total score to computer chosen random number
var lossCounter = 0; // increments each time the player loses by going past the computer chosen random number

// refresh screen and display the above three counter values onto html page
$("#totalScore").html(counter);
$("#losses").html(lossCounter);
$("#wins").html(winCounter);


// Creating multiple crystals each with their own unique number value

// We begin with an array to include four options for the four crystal values for which we created the variables above
var numberOptions = [crystal1, crystal2, crystal3, crystal4];
//console.log(numberOptions[]); - to check while debugging

// Next we create a for loop to create crystals for every numberOption.
for (var i = 0; i < numberOptions.length; i++) {

    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".imageClass".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("imageClass");

    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", c_src[i]);

    // Each imageCrystal will be given a data attribute called crystalValue.
    // This data attribute will be set equal to the value from the array.
    imageCrystal.attr("crystalValue", numberOptions[i]);

    // Lastly, each crystal image (with all it classes and attributes) will get added to the display page.
    $("#images").append(imageCrystal);
}

// This time, our click event applies to every single crystal on the page. Not just one.
$(".imageClass").on("click", function() {

        // Clear banner first.  This id holds the player's current total score.  
        // When game starts, this will be cleared and reset
        $("#banner").html("");

        // Determining the crystal's value requires us to extract the value from the data attribute.
        // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
        // Using the .attr("crystalValue") allows us to grab the value out of the "crystalValue" attribute.
        // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

        var crystalValue = parseInt($(this).attr("crystalValue"));
        // We then add the crystalValue to the user's "counter" which is a global variable.
        // Every click, from every crystal adds to the global counter.
        counter += crystalValue;

        // update the display/html page with current total score
        $("#totalScore").html(counter);

        // determine if game is over
        // Did we win?
        if (counter === compRandom) {
            winCounter++;

            // Give user chance to see his final score matching with computer guess
            // and bask in glory for 3 seconds
            // Set up for next game by resetting user counter, 
            // updating wins and losses counters and
            // setting the new computer chosen random number
            $("#banner").html(" Yay!!! You won! <br>I was thinking <br>of number " + counter);
            setTimeout(function() {
                $("#banner").html("You are good!<br>Have another go.");
                counter = 0;
                $("#totalScore").html(counter);
                compRandom = Math.floor(Math.random() * (121 - 19)) + 18;
                $("#compRandom").html(compRandom);
                $("#losses").html(lossCounter);
                $("#wins").html(winCounter);
            }, 3000);
        }
        // or did we lose?
        else if (counter >= compRandom) {
            lossCounter++;

            $("#banner").html("Oops! I was thinking <br> of number " + counter +
                                 "<br> You went over by " + (counter - compRandom));
            //setting timer for 3 secs before continuing, for the player to realise why he lost, if he did
            setTimeout(function() {
                $("#banner").html("Don't give up! <br>Try again!<br> Good Luck!!");
                counter = 0;
                $("#totalScore").html(counter);
                compRandom = Math.floor(Math.random() * (121 - 19)) + 18;
                $("#compRandom").html(compRandom);
                $("#losses").html(lossCounter);
                $("#wins").html(winCounter);
            }, 3000);
        } // counter >= compRandom

    } // end onClick.function()
);