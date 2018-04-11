(function() {
    var gameBoard = $('.board-container');
    var col = '';

    var message = $('.message');

    var allSlots;

    function createBubbles() {
        col += "<div class='column'>";
        for (var i = 0; i <= 5; i++) {
            col += "<div class='bubble row" + i + "'></div>";
        }
        col += '</div>';

        gameBoard.append(col);
        gameBoard.append(col);
        gameBoard.append(col);
        gameBoard.append(col);
        gameBoard.append(col);
        gameBoard.append(col);
        gameBoard.append(col);
    }

    createBubbles();

    allSlots = gameBoard.find('.bubble');

    var column = $('.column');
    var curPlayer = 'player1';

    column.on('click', function(e) {
        var arrayOfPossibleDiagonal = [
            [0, 7, 14, 21],
            [7, 14, 21, 28],
            [14, 21, 28, 35],
            [1, 8, 15, 22],
            [8, 15, 22, 29],
            [2, 9, 16, 23],
            [6, 13, 20, 27],
            [13, 20, 27, 34],
            [20, 27, 34, 41],
            [12, 19, 26, 33],
            [19, 26, 33, 40],
            [18, 25, 32, 39],
            [24, 19, 14, 9],
            [19, 14, 9, 4],
            [24, 19, 14, 9],
            [19, 14, 9, 4],
            [30, 25, 20, 15],
            [25, 20, 15, 10],
            [20, 15, 10, 5],
            [36, 31, 26, 21],
            [26, 21, 16, 11],
            [37, 32, 27, 22],
            [32, 27, 22, 17],
            [38, 33, 28, 23]
        ];

        function victory() {
            for (var i = 0; i < arrayOfPossibleDiagonal.length; i++) {
                if (
                    allSlots
                        .eq(arrayOfPossibleDiagonal[i][0])
                        .hasClass(curPlayer) &&
                    allSlots
                        .eq(arrayOfPossibleDiagonal[i][1])
                        .hasClass(curPlayer) &&
                    allSlots
                        .eq(arrayOfPossibleDiagonal[i][2])
                        .hasClass(curPlayer) &&
                    allSlots
                        .eq(arrayOfPossibleDiagonal[i][3])
                        .hasClass(curPlayer)
                ) {
                    return true;
                }
            }
        }

        function switchPlayer() {
            if (curPlayer == 'player1') {
                curPlayer = 'player2';
            } else {
                curPlayer = 'player1';
            }
        }

        var emptySlot;

        var slotsInColumn = $(e.currentTarget).find('.bubble');

        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass('player1') &&
                !slotsInColumn.eq(i).hasClass('player2')
            ) {
                emptySlot = slotsInColumn.eq(i);
                emptySlot.addClass(curPlayer);
                var slotsInRow = $('.row' + i);
                break;
            }
        }

        function hasCurPlayerWon(element) {
            var string = '';
            for (var i = 0; i < element.length; i++) {
                if (element.eq(i).hasClass(curPlayer)) {
                    string += 'w';
                } else {
                    string += 'l';
                }
            }
            return string.indexOf('wwww') > -1;
        }

        function generateMessage() {
            message.css('display', 'block');
            if (curPlayer == 'player1') {
                message.css('background', '#e6e600');
                $('.won').css('color', '#202060');
                $('.start-again-button').css({
                    background: ' #b3b3e6',
                    border: '1px solid black'
                });
                $('.mask').show();

                $('.bubble.player1').addClass('pulsing');
            } else {
                message.css('background', 'purple');
                $('.bubble.player2').addClass('pulsing');
            }
        }

        if (hasCurPlayerWon(slotsInColumn)) {
            generateMessage();
        } else if (hasCurPlayerWon(slotsInRow)) {
            generateMessage();
        } else if (victory()) {
            generateMessage();
        } else {
            switchPlayer();
        }
    });

    var playAgainBtn = $('.start-again-button');
    playAgainBtn.on('click', function() {
        message.css('display', 'none');
        $('.mask').hide();
        $('.bubble').removeClass('player1');
        $('.bubble').removeClass('player2');
        $('.bubble').removeClass('pulsing');
    });
})();
