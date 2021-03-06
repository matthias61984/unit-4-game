$(document).ready(function() {

// Define chef characters as objects in an array
    character = [
        ramsay = {
            name: "Gordon Ramsay",
            hp: 150,
            baseAttack: 8,
            counterAttack: 120,
            pic: "Gordon_Ramsay.png"
        },
        swedish = {
            name: "Swedish Chef",
            hp: 80,
            baseAttack: 10,
            counterAttack: 3,
            pic: "Swedish_Chef.webp"
        },
        julia = {
            name: "Julia Childs",
            hp: 120,
            baseAttack: 9,
            counterAttack: 15,
            pic: "Julia_Childs.jpg"
        },
        fieri = {
            name: "Guy Fieri",
            hp: 175,
            baseAttack: 12,
            counterAttack: 2,
            pic: "Guy_Fieri.jpg"
        },
    ];

// Start game on click
    $("#playBtn").click(function() {
        $("#gameDiv").css("visibility", "visible");
        $("#playBtn").hide();
        playGame();
    });

// Start Game
    var playGame = function() {
// Loop to display characters' pictures and stats from their objects
    for (var i = 0; i < character.length; i++) {
        // Create a new div, add class character and id equal to index value from the character array
        var div = $("<div>").addClass("col-md-2 character sideline").attr("id", i);
        $("#characters").append(div);
        div.append($("<img>").attr("src", "assets/images/" + character[i]["pic"]).addClass("characterPic"));
        div.append($("<h5>").text(character[i]["name"]));
        div.append($("<p>").html("Health Points: " + character[i]["hp"]))
        div.append($("<p>").html("Attack Power: " + character[i]["baseAttack"]));
        div.append($("<p>").html("Counter Attack: " + character[i]["counterAttack"]))
    };

// When one of the four chefs are clicked, that chef is moved to the player div
    $(".sideline").click(function() {
        if ($("#yourChar").hasClass("empty") == true) {
            $("#yourChar").replaceWith(this);
            $(this).addClass("playerChar offset-md-3");
            $(this).removeClass("sideline");
            $("#yourChar").removeClass("empty");
        // Targeting classes for remaining chefs are changed
            $(".sideline").addClass("enemies");
            $(".enemies").removeClass("sideline");
        // Battle Log is updated with new instructions
            $("#battleLog").html("<p>Choose your first challenger from the remaining chefs!</p>");
        };

    // When one of the remaining chefs is clicked, that chef is moved to the enemy div
        $(".enemies").click(function() {
            if ($("#yourEnemy").hasClass("empty") == true) {
                $("#yourEnemy").replaceWith(this);
                $(this).addClass("enemyChar");
                $(this).removeClass("enemies");
                $("#yourEnemy").removeClass("empty");
            // Battle Log is updated with new instructions
                $("#battleLog").html("<p>Click the fight button when you are ready!</p>");
            };
        });        
    });

// When the fight button is clicked, playerChar and enemyChar deal damage to each other
    $("#fightBtn").click(function() {
        if (($("#yourChar").hasClass("empty") == false) && ($("#yourEnemy").hasClass("empty") == false)) {
        // Re-define combatant IDs as indices of the character array
            var attackerID = $(".playerChar").attr("id");
            var defenderID = $(".enemyChar").attr("id");
        // Set combatant hit point and attack power based on IDs
            var attackerHP = character[attackerID].hp;
            var defenderHP = character[defenderID].hp;
            var baseCounter = character[defenderID].counterAttack;
            var baseAttack = character[attackerID].baseAttack;
        // Chosen character deals damage, then attack increases
            defenderHP -= baseAttack;
            baseAttack += baseAttack;
        // Enemy deals damage to player's character
            attackerHP -= baseCounter;
        // Update objects to reflect new stats
            character[attackerID].hp = attackerHP;
            character[defenderID].hp = defenderHP;
            character[attackerID].baseAttack = baseAttack;
        // Update corresponding stat cards with new hp
            $(".playerChar p:nth-child(3)").text("Health Points: " + attackerHP);
            $(".playerChar p:nth-child(4)").text("Attack Power: " + baseAttack);
            $(".enemyChar p:nth-child(3)").text("Health Points: " + defenderHP);
        // Run HP check
            if (attackerHP <= 0) {
            // If attacker is defeated, empty the player's character card and remove the fight button
                $(".playerChar").empty();
                $("#battleLog").html("<p>You have been defeated!</p>");
                $("#fightBtn").hide();
                $("#playBtn").show();
            } else if (defenderHP <= 0) {
            // If defender is defeated, empty the defender's character card and prompt the next challenger to be chosen
                $(".enemyChar").addClass("empty");
                $(".enemyChar").attr("id", "yourEnemy");
                $(".enemyChar").empty();
                $("#battleLog").html("<p>Pick your next challenger!</p>");
            } else {
            };
        } else {
            $("#battleLog").html("<p>Please choose your character and an enemy to begin!</p>");
        };
    });
    };
});