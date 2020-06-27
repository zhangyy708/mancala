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
    var language = 0; // which language (0 - English; 1 - 简体中文)
    var language_temp = 0; // do not change until press button
    var cpu = 0; // play local or cpu (0 - local; 1 - cpu)
    var cpu_temp = 0; // do not change until press button

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

    // welcome page initial display
    $('#title_cn').hide();
    $('#welcome_buttons_cn').hide();

    // rules display
    $('.menu .item')
        .tab()
    ;
    
    // page selection -------------------------------------------------------------------------------------------
    // start the game
    $('#to_start_en').click(function() {
        // language = 0;
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        $('#title_game_en').show();
        $('#title_game_cn').hide();
        display_player();
    });

    $('#to_start_cn').click(function() {
        // language = 1;
        // console.log(language);
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        $('#title_game_cn').show();
        $('#title_game_en').hide();
        display_player();
    });

    // set options
    // default: local players
    $('#ai_off_cn').hide();
    $('#ai_off_en').show();
    $('#ai_off_en').text('Local players \u2713');
    $('#ai_off_en').css({
        'background-color': 'white',
        'color': '#2d2d2d'
    });

    $('#to_options_en').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('options').style.display = 'block';

        $('#title_options_en').show();
        $('#sub_options_en').show();
        $('#des_options_en').show();
        $('#options_to_welcome_en').show();
        $('#title_options_cn').hide();
        $('#sub_options_cn').hide();
        $('#des_options_cn').hide();
        $('#options_to_welcome_cn').hide();
        
        $('#ai_off_en').show();
        $('#ai_off_cn').hide();
        
        if (cpu === 0) {
            $('#ai_off_en').text('Local players \u2713');
            $('#ai_off_en').css({
                'background-color': 'white',
                'color': '#2d2d2d'
            });
        } else if (cpu === 1) {
            $('#ai_off_en').text('Local players');
            $('#ai_off_en').css({
                'background-color': '#2d2d2d',
                'color': 'white'
            });
        };
    });

    $('#to_options_cn').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('options').style.display = 'block';

        $('#title_options_cn').show();
        $('#sub_options_cn').show();
        $('#des_options_cn').show();
        $('#options_to_welcome_cn').show();
        $('#title_options_en').hide();
        $('#sub_options_en').hide();
        $('#des_options_en').hide();
        $('#options_to_welcome_en').hide();
        
        $('#ai_off_cn').show();
        $('#ai_off_en').hide();
        
        if (cpu === 0) {
            $('#ai_off_cn').text('本地 \u2713');
            $('#ai_off_cn').css({
                'background-color': 'white',
                'color': '#2d2d2d'
            });
        } else if (cpu === 1) {
            $('#ai_off_cn').text('本地');
            $('#ai_off_cn').css({
                'background-color': '#2d2d2d',
                'color': 'white'
            });
        };
    });

    // read rules
    $('#to_rules_en').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('rules').style.display = 'block';

        $('#title_rules_en').show();
        $('#sub_rules_en').show();
        $('#tab_en').show();
        $('#ref_en').show();
        $('#basic_rules_en').show();
        $('#rules_to_welcome_en').show();

        $('#title_rules_cn').hide();
        $('#sub_rules_cn').hide();
        $('#tab_cn').hide();
        $('#ref_cn').hide();
        $('#basic_rules_cn').hide();
        $('#rules_to_welcome_cn').hide();
    });

    $('#to_rules_cn').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('rules').style.display = 'block';

        $('#title_rules_cn').show();
        $('#sub_rules_cn').show();
        $('#tab_cn').show();
        $('#ref_cn').show();
        $('#basic_rules_cn').show();
        $('#rules_to_welcome_cn').show();

        $('#title_rules_en').hide();
        $('#sub_rules_en').hide();
        $('#tab_en').hide();
        $('#ref_en').hide();
        $('#basic_rules_en').hide();
        $('#rules_to_welcome_en').hide();
    });

    // back to menu
    $('#options_to_welcome_en').click(function() {
        cpu = cpu_temp;
        language = language_temp;

        document.getElementById('welcome').style.display = 'block';
        document.getElementById('options').style.display = 'none';
        if (language === 0) {
            $('#title_cn').hide();
            $('#welcome_buttons_cn').hide();
            $('#title_en').show();
            $('#welcome_buttons_en').show();
        } else if (language === 1) {            
            $('#title_cn').show();
            $('#welcome_buttons_cn').show();
            $('#title_en').hide();
            $('#welcome_buttons_en').hide();
        };
    });

    $('#options_to_welcome_cn').click(function() {
        cpu = cpu_temp;
        language = language_temp;
        
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('options').style.display = 'none';
        if (language === 0) {            
            $('#title_cn').hide();
            $('#welcome_buttons_cn').hide();
            $('#title_en').show();
            $('#welcome_buttons_en').show();
        } else if (language === 1) {            
            $('#title_cn').show();
            $('#welcome_buttons_cn').show();
            $('#title_en').hide();
            $('#welcome_buttons_en').hide();
        };
    });

    $('#rules_to_welcome_en').click(function() {
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('rules').style.display = 'none';
        
        $('#title_cn').hide();
        $('#welcome_buttons_cn').hide();
        $('#title_en').show();
        $('#welcome_buttons_en').show();
    });

    $('#rules_to_welcome_cn').click(function() {
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('rules').style.display = 'none';
                  
        $('#title_cn').show();
        $('#welcome_buttons_cn').show();
        $('#title_en').hide();
        $('#welcome_buttons_en').hide();
    });

    $('#end_to_welcome_en').click(function() {
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('end').style.display = 'none';
        
        $('#title_cn').hide();
        $('#welcome_buttons_cn').hide();
        $('#title_en').show();
        $('#welcome_buttons_en').show();
    });

    $('#end_to_welcome_cn').click(function() {
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('end').style.display = 'none';
                  
        $('#title_cn').show();
        $('#welcome_buttons_cn').show();
        $('#title_en').hide();
        $('#welcome_buttons_en').hide();
    });

    // options --------------------------------------------------------------------------------------------------

    // if click on "vs CPU"
    $('#ai_on').click(function() {
        cpu_temp = 1;

        $('#ai_on').text('vs CPU \u2713');
        $('#ai_on').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });

        if (language === 0) {
            $('#ai_off_en').text('Local players');
            $('#ai_off_en').css({
                'background-color': '#2d2d2d',
                'color': 'white'
            });
        } else if (language === 1) {
            $('#ai_off_cn').text('本地');
            $('#ai_off_cn').css({
                'background-color': '#2d2d2d',
                'color': 'white'
            });
        };
    });

    // if click on "Local players"
    $('#ai_off_en').click(function() {
        cpu_temp = 0;

        $('#ai_on').text('vs CPU');
        $('#ai_on').css({
            'background-color': '#2d2d2d',
            'color': 'white'
        });

        $('#ai_off_en').text('Local players \u2713');
        $('#ai_off_en').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });
    });

    $('#ai_off_cn').click(function() {
        cpu_temp = 0;

        $('#ai_on').text('vs CPU');
        $('#ai_on').css({
            'background-color': '#2d2d2d',
            'color': 'white'
        });

        $('#ai_off_cn').text('本地 \u2713');
        $('#ai_off_cn').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });
    });

    // default: English
    $('#en').text('English \u2713');
    $('#en').css({
        'background-color': 'white',
        'color': '#2d2d2d'
    });

    // if click on "简体中文"
    $('#cn').click(function() {
        language_temp = 1;

        $('#cn').text('简体中文 \u2713');
        $('#cn').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });

        $('#en').text('English');
        $('#en').css({
            'background-color': '#2d2d2d',
            'color': 'white'
        });
    });

    // if click on "English"
    $('#en').click(function() {
        language_temp = 0;

        $('#cn').text('简体中文');
        $('#cn').css({
            'background-color': '#2d2d2d',
            'color': 'white'
        });

        $('#en').text('English \u2713');
        $('#en').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });
    });

    // game start -----------------------------------------------------------------------------------------------
    // display_player();

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
            if (language === 0) {
                $('#p' + currentP).html('Player ' + currentP + ' choosing ...');
            } else if (language === 1) {
                $('#p' + currentP).html('玩家' + currentP + '选择中……');
            };
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

        // reset numbers
        for (let i = 1; i <= 14; i ++) {
            if (i % 7 === 0) {
                $('#ele' + i).html('0');
            } else {
                $('#ele' + i).html('4');
            };
        };

        document.getElementById('game').style.display = 'none';
        document.getElementById('end').style.display = 'block';

        if (language === 0) {
            $('#title_rst_en').show();
            $('#sub_rst_en').show();
            $('#p1_en').show();
            $('#p2_en').show();
            $('#end_to_welcome_en').show();

            $('#title_rst_cn').hide();
            $('#sub_rst_cn').hide();
            $('#p1_cn').hide();
            $('#p2_cn').hide();
            $('#end_to_welcome_cn').hide();
        } else if (language === 1) {
            $('#title_rst_cn').show();
            $('#sub_rst_cn').show();
            $('#p1_cn').show();
            $('#p2_cn').show();
            $('#end_to_welcome_cn').show();

            $('#title_rst_en').hide();
            $('#sub_rst_en').hide();
            $('#p1_en').hide();
            $('#p2_en').hide();
            $('#end_to_welcome_en').hide();
        };

        if (numEach[6] > numEach[13]) {
            if (language === 0) {
                $('#win').html('Player 1 wins!');
            } else if (language === 1) {
                $('#win').html('玩家1胜利！');
            };
        } else if (numEach[6] < numEach[13]) {
            if (language === 0) {
                $('#win').html('Player 2 wins!');
            } else if (language === 1) {
                $('#win').html('玩家2胜利！');
            };
        } else {
            if (language === 0) {
                $('#win').html('Draw game');
            } else if (language === 1) {
                $('#win').html('平局');
            };
        };

        $('#results1').html(String(numEach[6]));
        $('#results2').html(String(numEach[13]));

        // reset numbers
        for (let i = 1; i <= 14; i ++) {
            if (i % 7 === 0) {
                numEach[i - 1] = 0;
            } else {
                numEach[i - 1] = 4;
            };
        };

        // reset the first player
        currentP = 1;
    };

});







