//challenge 1: Your Age in Days

    function ageInDays() {
        var birthYear = prompt('what year were your born');  
        var age = (2021 -birthYear) * 365;
        var h1 = document.createElement('h1');
        var textAnswer = document.createTextNode('You are '+ age + 'days old.');
        h1.setAttribute('id', 'ageInDays');
        h1.appendChild(textAnswer);
        var div= document.getElementById('flex-box-result')
        div.appendChild(h1);
        
    }
    function reset(){
        document.getElementById('ageInDays').remove();
    }
     
    //challenge 2: Cat generator
    function generateCat(){
        var image = document.createElement('img');
        var div = document.getElementById('flex-cat-gen');
        image.src = "https://cdn2.thecatapi.com/images/14g.gif";
        div.appendChild(image);
    }
    
    //challenge 3: Rock, Paper, Scissors
    function rpsGame(yourChoice){
        console.log(yourChoice);
        var humanChoice, botChoice;
        humanChoice = yourChoice.id;
        botChoice = numberToChoice(randToRpsInt());
        console.log('Computer choice:', botChoice);
        results = decideWinner(humanChoice,botChoice);
        console.log(results);
        message = finalMessage(results) //returns an object{'message','You Won!','color','green'}
        console.log(message)
        rpsFrontEnd(yourChoice.id,botChoice,message)
    }

    function randToRpsInt(){
        return Math.floor(Math.random() *3);
    }
    function numberToChoice(number){
        return['rock','paper','scissors'][number]
    }
    
    function decideWinner(yourChoice, computerChoice){
        var rpsDatabase = {
            'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
            'paper':{'rock': 1, 'paper': 0.5, 'scissors': 0},
            'scissors':{'paper': 1, 'scissors': 0.5,'rock':0}, 
        }
        var yourScore = rpsDatabase[yourChoice][computerChoice];
        var computerScore = rpsDatabase[computerChoice][yourChoice];
        return [yourScore,computerScore];
    }
     
    function finalMessage([yourScore,computerScore]){
        if (yourScore=== 0){
            return{'message': 'You Lost!', 'color': 'red'};
        }else if(yourScore===0.5){
            return {'message': 'Draw!', 'color': 'yellow'};
        }else{
            return {'message': 'You Won!', 'color': 'green'};
        }
    }
    
    //function for controlling frontend output
    function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
        var imagesDatabase = {
            'rock': document.getElementById('rock').src,
            'paper': document.getElementById('paper').src,
            'scissors': document.getElementById('scissors').src,
        }

        //lets remove all the images
        document.getElementById('rock').remove();
        document.getElementById('paper').remove();
        document.getElementById('scissors').remove();

        //creating div for each option on the front end
        var humanDiv = document.createElement('div');
        var botDiv = document.createElement('div');
        var messageDiv = document.createElement('div');

        humanDiv.innerHTML = "<img src='"+imagesDatabase[humanImageChoice] +"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
        messageDiv.innerHTML = "<h1 style='color: " +finalMessage['color'] + "; font-size: 60px; padding: 30px; '>"+ finalMessage['message']+ "</h1>"
        botDiv.innerHTML = "<img src='"+imagesDatabase[botImageChoice] +"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"

        document.getElementById('flex-box-rps-div').appendChild(humanDiv);
        document.getElementById('flex-box-rps-div').appendChild(messageDiv);
        document.getElementById('flex-box-rps-div').appendChild(botDiv);
        
    }

    //Challenge 4: Change the Color of All Buttons
    var all_buttons= document.getElementsByTagName('button');
    //console.log(all_buttons);

    var copyAllButtons = [];
    for(let i =0; i<all_buttons.length; i++){
        copyAllButtons.push(all_buttons[i].classList[1]);
    }
    console.log(copyAllButtons);

    function buttonColorChange(buttonThingy){
        //console.log(buttonThingy.value);
        if(buttonThingy.value==='red'){
            buttonRed();
        }else if(buttonThingy.value==='green'){
            buttonGreen();

        }else if(buttonThingy.value==='reset'){
            buttonColorReset();
        }else if(buttonThingy.value==='random'){
            randomColors();
        }


    }
    
    function buttonRed(){
        for(let i = 0; i<all_buttons.length; i++){
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add('btn-danger');

        }
    }

    function buttonGreen(){
        for(let i = 0; i<all_buttons.length; i++){
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add('btn-success');

        }
    }
    function buttonColorReset(){
        for(let i=0; i<all_buttons.length; i++) {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(copyAllButtons[i]);

        }
    }

    function randomColors(){
        var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
        for(let i=0; i<all_buttons.length; i++){
            var randomNumber = Math.floor(Math.random()*4);
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(choices[randomNumber]);
        }
    }

    //Challenge 5: Blackjack
    let blackjackGame = {
        'you': {'scoreSpan': '#your-blackjack-result' ,'div': '#your-box', 'score': 0},
        'dealer': {'scoreSpan': '#dealer-blackjack-result' ,'div': '#dealer-box', 'score': 0},
        'cards': ['2','3','4','5','6','7','8','9','10','J','K','Q','A'], 
        'cardsMap':{'2':2, '3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11] },
        'wins': 0,
        'losses': 0,
        'draws': 0,
        'isStand': false,
        'turnsOver': false,
    }; 
    const YOU = blackjackGame['you'];
    const DEALER = blackjackGame['dealer'];
    const hitSound = new Audio('static/sounds/swish.m4a');
    const winSound = new Audio('static/sounds/cash.mp3');
    const lossSound = new Audio('static/sounds/aww.mp3');
    const drawSound = new Audio('static/sounds/Ah.mp3');
    const bustSound = new Audio('static/sounds/wp.mp3');
    const dealSound = new Audio('static/sounds/gn.mp3');
    document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
    document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
    document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal); 
     
     function blackjackHit(){
         if (blackjackGame['isStand'] === false){
            let card = randomCard();
            showCard(card,YOU);
            updateScore(card,YOU);
            showScore(YOU);

         }else{
             bustSound.play();
         }

         
         
         
     }
    
    function randomCard(){
        let randomIndex= Math.floor(Math.random()*13);
        return blackjackGame['cards'][randomIndex];
    }
     function showCard(card,activePlayer){
         if (activePlayer['score'] <=21){
           let cardImage = document.createElement('img');
           cardImage.src = `static/images/${card}.png`;
           document.querySelector(activePlayer['div']).appendChild(cardImage);
           hitSound.play();
         }

     }
     function blackjackDeal(){
         //let winner = computeWinner();
         //showResult(winner);
         //computeWinner();
         if (blackjackGame['turnsOver']=== true){
            blackjackGame['isStand'] = false;
            
            let yourImages = document.querySelector('#your-box').querySelectorAll('img');
            let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
         
            for(let i=0; i < yourImages.length; i++){
                yourImages[i].remove();

           }
           for(let i=0; i < dealerImages.length; i++){
               dealerImages[i].remove();

           }
           YOU['score'] = 0;
           DEALER['score'] = 0;

           document.querySelector('#your-blackjack-result').textContent = 0;
           document.querySelector('#dealer-blackjack-result').textContent = 0;

           document.querySelector('#your-blackjack-result').style.color = '#ffffff';
           document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

           document.querySelector('#blackjack-result').textContent = "Let's play";
           document.querySelector('#blackjack-result').style.color = 'black';

           blackjackGame['turnsOver'] = true;
           dealSound.play();
         }else{
             bustSound.play();
         }
       
        }
        function updateScore(card, activePlayer){
            if (card ==='A'){
                if(activePlayer['score']+ blackjackGame['cardsMap'][card][1] <=21) {
                    activePlayer['score'] += blackjackGame['cardsMap'][card][1];
                }else{
                    activePlayer['score'] += blackjackGame['cardsMap'][card][0];
                }
            }else{
                activePlayer['score']+=blackjackGame['cardsMap'][card];

            }
            
        }
        function showScore(activePlayer){
            if (activePlayer['score'] > 21){
                document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
                document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
                //bustSound.play();
            }else{
            document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
            }
        }

        function sleep(ms){
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function dealerLogic(){
            blackjackGame['isStand'] = true;

            while(DEALER['score']< 16 && blackjackGame['isStand']=== true){
                let card = randomCard();
                showCard(card, DEALER);
                updateScore(card, DEALER);
                showScore(DEALER);
                await sleep(1000);

            }

            blackjackGame['turnsOver']= true;
            let winner = computeWinner();
            showResult(winner);
           

            
           
            
                
            
            
            
            
        }
        //compute winner
        //update wins, draws, and losses
        function computeWinner(){
            let winner;

            if (YOU['score'] <=21){
                // if you have higher score is greater than dealer 
                if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
                    //console.log('You won!');
                    blackjackGame['wins']++;
                    winner = YOU;
                }else if(YOU['score'] < DEALER['score']){
                    //console.log('You lost!');
                    blackjackGame['losses']++;
                    winner = DEALER;
                }else if(YOU['score'] === DEALER['score']){
                    //console.log('You drew!');
                    blackjackGame['draws']++;
                    //draw
                }

                //when you bust but dealer doesn't
            }else if (YOU['score']> 21 && DEALER['score']<= 21){
                //console.log('You lost!');
                blackjackGame['losses']++;
                winner = DEALER;

                //when you and dealer bust
            }else if (YOU['score'] > 21 && DEALER['score'] >21){
                //console.log('You drew!');
                blackjackGame['draws']++;
                //draw
            }
             
            // console.log('Winner is', winner);
            return winner;
            
        }
        
        function showResult(winner){
             let message, messageColor;
             if (blackjackGame['turnsOver'] === true){

             
                if (winner=== YOU){
                    document.querySelector('#wins').textContent = blackjackGame['wins'];
                    message = 'You Won!';
                    messageColor = 'green';
                    winSound.play();
                }else if (winner===DEALER){
                    document.querySelector('#losses').textContent = blackjackGame['losses'];
                    message = 'You Lost!';
                    messageColor = 'red';
                    lossSound.play();
                }else{
                    document.querySelector('#draws').textContent = blackjackGame['draws'];
                    message = 'You Drew!';
                    messageColor = 'blue';
                    drawSound.play();

                }
                document.querySelector('#blackjack-result').textContent = message;
                document.querySelector('#blackjack-result').style.color = messageColor;
             }    
        }