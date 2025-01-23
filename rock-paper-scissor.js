/*const score={
    wins:0,
    losses:0,
    ties:0
  };*/

  let score= JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
  };

  
  updateScoreElement();

  /*if(score===null){ //(!score)
    score={
      wins:0,
      losses:0,
      ties:0
  };
  }*/

  let isAutoPlaying = false;
  let intervalId;

 /* const autoPlay = ()=>{

  };*/
  function autoPlay() {
    if(!isAutoPlaying){

      intervalId = setInterval(()=>{
        const playerMove = pickComputerMove();
        playGame(playerMove);
      },1000);
      document.querySelector('.js-auto-play').innerHTML='Stop Play';
      isAutoPlaying=true;
    } else{
      document.querySelector('.js-auto-play').innerHTML='Auto Play';
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }

  document.querySelector('.js-rock-button')
    .addEventListener('click',()=>{
      playGame('rock');
    });
  
  document.querySelector('.js-paper-button')
    .addEventListener('click',()=>{
      playGame('paper');
    });
  
  document.querySelector('.js-scissor-button')
    .addEventListener('click',()=>{
      playGame('scissors');
    });
  
  /*document.querySelector('.js-reset-button')
    .addEventListener('click',()=>{
      resetScore();
    });*/

  document.querySelector('.js-auto-play')
    .addEventListener('click',()=>{
      autoPlay();
    });
  document.querySelector('.js-reset-button')
    .addEventListener('click',()=>{
      showResetConfirmation();
    });
  document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'r'){
      playGame('rock');
    }else if(event.key === 'p'){
      playGame('paper');
    }else if(event.key === 's'){
      playGame('scissors');
    }else if(event.key === 'a'){
      autoPlay();
    } else if(event.key === 'Backspace'){
      showResetConfirmation();
    }
  })

  function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML=`Are you sure you want to reset the score?
    <button class="js-reset-confirmation-yes reset-confirmation-button">Yes</button>
    <button class="js-reset-confirmation-no reset-confirmation-button">No</button>`;

    document.querySelector('.js-reset-confirmation-yes')
      .addEventListener('click',()=>{
        resetScore();
        hideResetConfirmation();
      });
    
    document.querySelector('.js-reset-confirmation-no')
      .addEventListener('click',()=>{
        hideResetConfirmation();
      });

  }
  function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML='';
  }

  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    result='';
    if(playerMove==='rock'){
      if(computerMove==='rock'){
        result='Tie.';
      } else if(computerMove==='paper'){
        result='You lose.';
      } else if(computerMove === 'scissors'){
        result='You Win.';
      }
    }
    else if(playerMove==='paper'){
      if(computerMove==='rock'){
        result='You Win.';
      } else if(computerMove==='paper'){
        result='Tie.';
      } else if(computerMove === 'scissors'){
        result='You lose.';
      }
    }
    else if(playerMove==='scissors'){

      if(computerMove==='rock'){
        result='You lose.';
      } else if(computerMove==='paper'){
        result='You Win.';
      } else if(computerMove === 'scissors'){
        result='Tie.';
      }
    }


    if(result === 'You Win.'){
      score.wins+=1;
    }else if(result === 'Tie.'){
      score.ties+=1;
    }else if(result === 'You lose.'){
      score.losses+=1;
    }

    localStorage.setItem('score',JSON.stringify(score));
    
    updateScoreElement();

    document.querySelector('.js-result').innerHTML=result;
    document.querySelector('.js-moves').innerHTML=`You <img src="Images/${playerMove}-emoji.png" class="move-icon"> <img src="Images/${computerMove}-emoji.png" class="move-icon">computer`;
    /*alert(`You Picked ${playerMove}. Computer picked ${computerMove}. ${result}
    Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`);*/
  }
  
  function updateScoreElement() {
    document.querySelector('.js-score')
     .innerHTML=`Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
  }

  function resetScore() {
    score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    updateScoreElement();
  }

  function pickComputerMove() {
    randomNumber=Math.random();
    let computerMove='';

    if(randomNumber>=0 && randomNumber< 1/3){
      computerMove='rock';
    }else if(randomNumber>= 1/3 && randomNumber< 2/3){
      computerMove='paper';
    }else if(randomNumber>= 2/3 && randomNumber<1){
      computerMove='scissors';
    }

    return computerMove;
  }

  