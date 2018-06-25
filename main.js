const speedDash = document.querySelector('.speedDash');
const scoreDash = document.querySelector('.scoreDash');
const lifeDash = document.querySelector('.lifeDash');
const container = document.getElementById('container');
const btnStart = document.querySelector('.btnStart');



//Listeners
btnStart.addEventListener('click',startGame);
document.addEventListener('keydown',pressKeyOn);
document.addEventListener('keyup',pressKeyOff);


//Game variables

let animationGame = requestAnimationFrame(playGame);
let gamePlay= false;

let player;

let keys={
  ArrowUp:false,
  ArrowDown:false,
  ArrowLeft:false,
  ArrowRight:false
}


//Main functions 

function startGame(){
  console.log(gamePlay)
  btnStart.style.display= 'none';
  var div = document.createElement('div');
  div.setAttribute('class','playerCar');
  div.x = 250;
  div.y =500;
  container.appendChild(div);
  gamePlay = true;
  player = {
    ele:div,
    speed:6,
    lives:3,
    gameScore:0,
    carstoPass:10,
    score:0,
    roadWidth:250
  }
  startBoard();
}

function startBoard(){
  for(let x= 0; x<13;x++){
    let div = document.createElement('div');
    div.setAttribute('class','road');
    div.style.top =(x*50)+'px';
    div.style.width = player.roadWidth + 'px';
    container.appendChild(div);
  }
}


function pressKeyOn(event){
  event.preventDefault();
  console.log(keys)
  keys[event.key] = true;

}

function pressKeyOff(event){
event.preventDefault();
keys[event.key]= false;
}


function updateDash(){
  scoreDash.innerHTML = player.score;
  lifeDash.innerHTML = player.lives;
  speedDash.innerHTML =Math.round(player.speed*13);

} 

function moveRoad(){
  let tempRoad = document.querySelectorAll('.road')
  let previousRoad = tempRoad[0].offsetLeft;
  let previousWidth = tempRoad[0].width;
  for(let x = 0; x<tempRoad.length;x++){
    let num = tempRoad[x].offsetTop + player.speed;
    if(num>600){
      num = num-650;
      let mover = tempRoad[x].offsetLeft + (Math.floor(Math.random()*6)-3);
      let roadWidth = (Math.floor(Math.random()*11)-5)+previousWidth;
    }
    tempRoad[x].style.top = num + 'px'
  }
}


function playGame(){
  if(gamePlay){
  updateDash();
//movement
moveRoad();
if(keys.ArrowUp){
  if(player.ele.y > 400) player.ele.y -=1;
  player.speed = player.speed < 20 ? (player.speed+0.05)
  :20;
}
if(keys.ArrowDown){
  if(player.ele.y < 500){player.ele.y +=1;}
  player.speed = player.speed > 0 ? (player.speed-0.2)
  :0;
}
if(keys.ArrowRight){
  player.ele.x += (player.speed/4);
}
if(keys.ArrowLeft){
  player.ele.x -= (player.speed/4);
}
//Move car

player.ele.style.top = player.ele.y + 'px';
player.ele.style.left = player.ele.x + 'px';

}
  animationGame = requestAnimationFrame(playGame);
}