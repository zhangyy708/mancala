$(document).ready(function() {

    // variables
    // system
    var numEach = new Array(14); // the value of each column
    for (let i = 1; i <= 14; i ++) {
        numEach[i - 1] = Number($('#ele' + i).text());
    };
    var numSelected; // for temporary storage of the value of the selected column
    var idSelected; // for temporary storage of the id of the selected column
    var idUpdated; // id of the being-updated column
    var numTimeout; // number of time-outs (for process-controlling)
    var isClick; // check whether a button is clicked (prevent multiple clicking in one shot)
    var win; // which player wins

    // adjustable
    var timeMove = 250; // time of moving each stone to the next column; ms
    var timeBlinkP = 500; // time of player information highlighting after player changed; ms

    var currentP = 1; // current player; default = 1

    // initial display
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('options').style.display = 'none';
    document.getElementById('rules').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('end').style.display = 'none';

    // rules display
    $('.menu .item')
        .tab()
    ;
    
    // page selection -------------------------------------------------------------------------------------------
    // start the game
    $('#to_start').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        document.getElementById('end').style.display = 'none';
    });

    // set options
    $('#to_options').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('options').style.display = 'block';
    });

    // read rules
    $('#to_rules').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('rules').style.display = 'block';
    });

    // back to menu
    $('#options_to_welcome').click(function() {
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('options').style.display = 'none';
    });

    $('#rules_to_welcome').click(function() {
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('rules').style.display = 'none';
    });

    $('#end_to_welcome').click(function() {
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('end').style.display = 'none';
    });

    // options --------------------------------------------------------------------------------------------------
    // default: local players
    $('#ai_off').text('Local players \u2713');
    $('#ai_off').css({
        'background-color': 'white',
        'color': '#2d2d2d'
    });

    // if click on "vs CPU"
    $('#ai_on').click(function() {
        $('#ai_on').text('vs CPU \u2713');
        $('#ai_on').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });

        $('#ai_off').text('Local players');
        $('#ai_off').css({
            'background-color': '#2d2d2d',
            'color': 'white'
        });
    });

    // if click on "Local players"
    $('#ai_off').click(function() {
        $('#ai_on').text('vs CPU');
        $('#ai_on').css({
            'background-color': '#2d2d2d',
            'color': 'white'
        });
        $('#ai_on:hover').css({
            'background-color': 'white',
            'color': '#2d2d2d',
        });

        $('#ai_off').text('Local players  \u2713');
        $('#ai_off').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });
        $('#ai_off:hover').css({
            'background-color': 'white',
            'color': '#2d2d2d',
        });
    });

    // game start -----------------------------------------------------------------------------------------------
    display_player();

    for (let i = 1; i <= 14; i ++) { // adding onclick event to each button
        $('#ele_button' + i).on('click', function() {

            if (isClick) {
                isClick = false; // prevent from multiple clicking
                numSelected = numEach[i - 1];
                idSelected = i;
                numTimeout = 0;

                // selected button -> 0
                numEach[i - 1] = 0; 
                $('#ele' + i).html('0');
                
                // update each button after click
                var j = 1;
                while (j <= numSelected) {
                    (function() {
                        if ((idSelected + j) % 14 === (currentP - 1) * 7) { // do not add to the other player's goal button
                            j ++;
                            numSelected ++;
                            numTimeout ++;
                        } else {
                            if (idSelected + j === 14) { // id of the button to-be-updated
                                idUpdated = 14;
                            } else {
                                idUpdated = (idSelected + j) % 14;
                            };
            
                            numEach[idUpdated - 1] ++;
                            j ++;
                            numTimeout ++;
                            
                            var k = idUpdated;
                            setTimeout(function() {
                                $('#ele' + k).html(String(numEach[k - 1]));
                            }, timeMove * (j - 1));
                        };
                    })();     
                };
                
                // yokodori!
                    // idUpdated = id of the last-updated button
                    // (14 - idUpdated) - 1 = id of the other-side button
                    // 
                    // rules:
                    // 1) value of the last should be 1 (after updating)
                    // 2) value of the other side should > 0
                    // 3) id of the last should be on the current player side
                if (numEach[idUpdated - 1] === 1 && numEach[(14 - idUpdated) - 1] > 0 &&
                    (idUpdated < 7 * currentP && idUpdated > 7 * currentP - 7)) {
                    setTimeout(function() {

                        console.log('yokodori!');
                        
                        // goal button -> added
                        numEach[currentP * 7 - 1]  = numEach[currentP * 7 - 1] + numEach[(14 - idUpdated) - 1] + 1;

                        // last-updated button -> 0
                        numEach[idUpdated - 1] = 0;

                        // other-side button -> 0
                        numEach[(14 - idUpdated) - 1] = 0; 

                    }, timeMove * (numSelected + 1));

                    numTimeout = numSelected + 3;

                    setTimeout(function() {
                        $('#ele' + idUpdated).html('0'); // last-updated button -> 0
                        $('#ele' + ((14 - idUpdated))).html('0'); // other-side button -> 0
                    }, timeMove * (numSelected + 1));

                    setTimeout(function() {
                        $('#ele' + currentP * 7).html(String(numEach[currentP * 7 - 1])); // goal button -> added
                    }, timeMove * (numSelected + 2));
                };
        
                // check whether changing players
                setTimeout(function() {
                    if ((idSelected + numSelected) % 14 === (2 - currentP) * 7) {
                        currentP = currentP;
                        console.log('not changing.');
                    } else {
                        currentP = 3 - currentP;                    
                        console.log('now changed to player ' + currentP + '.');
                    };
                }, timeMove * (numTimeout + 1));

                // change player
                setTimeout(function() {
                    display_player();
                }, timeMove * (numTimeout + 2));

            };

        });
            
    };

    // display players information ------------------------------------------------------------------------------
    function display_player() {
        isClick = true;

        // all buttons disabled
        for (let i = 1; i <= 14; i ++) {
            $('#ele_button' + i).attr('disabled', true);
        };

        // check whether to end the game
        if (eval(numEach.slice(0, 6).join('+')) === 0 || eval(numEach.slice(7, 13).join('+')) === 0) {
            // BUG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            console.log('end the game');
            console.log(numEach);

            setTimeout(function() {
                // all row-buttons -> 0
                for (let i = 1; i <= 14; i ++) {
                    if (i !== 7 && i !== 14) {
                        $('#ele' + i).html('0');
                        // console.log('button ' + i + ' cleared.');
                    };
                };
            }, timeMove);

            setTimeout(function() {
                // goal-buttons -> added
                numEach[6] = eval(numEach.slice(0, 7).join('+'));
                $('#ele7').html(String(numEach[6]));
                // console.log('button 7 added.');
                numEach[13] = eval(numEach.slice(7, 14).join('+'));
                $('#ele14').html(String(numEach[13]));
                // console.log('button 14 added.')

                // go to the end
                end();
            }, timeMove * 2);

        } else {
            console.log('do not end!');
        
            // display player-information
            document.getElementById('p' + (3 - currentP)).style.visibility = 'hidden';
            document.getElementById('p' + currentP).style.visibility = 'visible';
            $('#p' + currentP).html('Player ' + currentP + ' choosing ...');
            $('#p' + currentP).css('color', 'purple');
            setTimeout(function() {

                $('#p' + currentP).css('color', 'white');

                // select-able buttons activateed
                var colStart = (currentP === 2) * 7 + 1; // start id of un-disabled row-buttons
                var colEnd = (currentP === 2) * 7 + 6;// end id of un-disabled row-buttons
                for (let i = colStart; i <= colEnd; i ++) {
                    if (numEach[i - 1] !== 0) {
                        $('#ele_button' + i).attr('disabled', false);
                    };
                };

            }, timeBlinkP);
        };

    };

    // end the game ---------------------------------------------------------------------------------------------
    function end() {
        console.log('end() function');
        document.getElementById('game').style.display = 'none';
        document.getElementById('end').style.display = 'block';

        if (numEach[6] > numEach[13]) {
            $('#win').html('Player 1 wins!');
        } else if (numEach[6] < numEach[13]) {
            $('#win').html('Player 2 wins!');
        } else {
            $('#win').html('Draw game');
        };

        $('#results1').html(String(numEach[6]));
        $('#results2').html(String(numEach[13]));

    };

});







