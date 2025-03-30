let gameFont;
let buttons = {}; 
let currentGame = 'Title Card';
let rulesImage;
let monster = [];
let questions = [];
let lives = 3;
let chosenLevel;
let answerBox;
let submitButton;
let currentQuestion = 0;
let givenQuestion;
let monster1, monster2, monster3;

const levelButtonsData = [
  { label: "constant rule", yPos: 30, size: { width: 250, height: 40 }, action: () => { chosenLevel = "constantRule"; changeLevel(); } },
  { label: "power rule", yPos: 80, size: { width: 250, height: 40 }, action: () =>  { chosenLevel = "powerRule"; changeLevel("powerRule") } },
  { label: "sum rule", yPos: 130, size: { width: 250, height: 40 }, action: () => { chosenLevel = "sumRule"; changeLevel("sumRule") } },
  { label: "product rule", yPos: 180, size: { width: 250, height: 40 }, action: () => { chosenLevel = "productRule"; changeLevel("productRule") } },
  { label: "difference rule", yPos: 230, size: { width: 250, height: 40 }, action: () => { chosenLevel = "differenceRule"; changeLevel("differenceRule") } },
  { label: "quotient rule", yPos: 280, size: { width: 250, height: 40 }, action: () => { chosenLevel = " quotientRule"; changeLevel("quotientRule") } },
  { label: "chain rule", yPos: 330, size: { width: 250, height: 40 }, action: () => { chosenLevel = "chainRule"; changeLevel("chainRule") } }
];


function preload(){
  gameFont = loadFont("assets/PressStart2P-Regular.ttf");
  rulesImage = loadImage("assets/Seven_Deadly_Derivatives.jpeg");
  
}

class Question{
  constructor(question, answer){
    this.question = question;
    this.answer = answer;
  } 
}

class Monster{
  constructor(){ }
}

function setup() {
  createCanvas(400, 400);
  
  initializeButtons();
}

function draw() {
  background(220);
  switch(currentGame) {
    case 'Title Card':
      drawTitleCard();
      break;
    case 'rules':
      drawRules();
      break;
    case 'levels':
      drawLevels();
      break;
    case 'gamePlay':
      drawGame();
      gameUI();
      break; 
    case 'gameOver':
      drawGameOver();
      break; 
  }
  
}

function initializeButtons() {
  const buttonStyle = {
    size: { width: 200, height: 50 },
    font: { family: "PressStart2P", size: "20px" }
  };

  buttons.levelButton = createStyledButton('levels', width / 2 - 100, 160, buttonStyle, () => changeGameState('levels'));
  buttons.rulesButton = createStyledButton('rules', width / 2 - 100, 230, buttonStyle, () => changeGameState('rules'));
  buttons.quitButton = createStyledButton('quit?', width / 2 - 100, 300, buttonStyle, quit);
  buttons.backButton = createStyledButton('◀', 10, 300, { size: { width: 50, height: 50 }, font: { family: "PressStart2P", size: "24px" } }, () => changeGameState('Title Card'));
  buttons.backButton.hide();
 
  
  

  levelButtonsData.forEach(data => {
    const button = createButton(data.label);
    button.size(data.size.width, data.size.height);
    button.position(width / 2 - data.size.width / 2, data.yPos); 
    button.style("font-family", "PressStart2P");
    button.style("font-size", "16px");
    button.mousePressed(data.action);
    buttons[data.label] = button;
    button.hide();});
}

function createStyledButton(label, xPos, yPos, style, action) {
  const button = createButton(label);
  button.size(style.size.width, style.size.height);
  button.position(xPos, yPos);
  button.style("font-family", style.font.family);
  button.style("font-size", style.font.size);
  button.mousePressed(action);
  
  return button;
}

function changeGameState(state) {
  currentGame = state;

  Object.values(buttons).forEach(button => button.hide());
  
  if (answerBox) answerBox.hide();
  if (submitButton) submitButton.hide();

  switch (state) {
    case 'Title Card':
      buttons.levelButton.show();
      buttons.rulesButton.show();
      buttons.quitButton.show();
      drawTitleCard();
      break;
    case 'levels':
      drawLevels();
      buttons.backButton.show();
      levelButtonsData.forEach(data => {     
        buttons[data.label].show();});
      break;
    case 'rules':
      buttons.backButton.show();
      drawRules();
      break;
    case 'gamePlay':
      drawGame();
      break;
    case 'gameOver':
      buttons.backButton.show()
      drawGameOver();
      break;
  }
}
  
  
function drawTitleCard() {
  background(100, 205, 209);
  
  textSize(20);
  fill(255,255,255);
  textFont(gameFont);
  textAlign(CENTER,CENTER);
  text('7', width / 2, 40);
  
  textAlign(CENTER,CENTER);
  text('Deadly', width / 2, 60);
  
  textAlign(CENTER,CENTER);
  text('Derivatves', width / 2, 80);
  
}

function drawLevels(){
  background(100, 205, 209);
}

function drawGame(){
  background(100, 205, 209);
  if(lives == 0){
    changeGameState('gameOver');
  }
  givenQuestion = questions[currentQuestion].question;
  textSize(16);
  textAlign(CENTER);
  fill(255);
  text(givenQuestion, 90, 340);
}

  
function gameUI(){
    Object.values(buttons).forEach(button => button.hide());
    answerBox = createInput('');
    answerBox.position(150, 330);
    submitButton = createButton('▶');
    submitButton.position(300,330);
    submitButton.mousePressed(checkAnswer);
}


function checkAnswer(){
  const currentAnswer = answerBox.value().trim();
  const correctAnswer = questions[currentQuestion].answer;
  
  if(currentAnswer == correctAnswer){
    ++currentQuestion;
    //kill monster
    drawGame();
  }
  else if(currentAnswer != correctAnswer){
    ++currentQuestion;
    --lives;
  }
  answerBox.value('');
}

function drawRules(){
    background(100, 205, 209);
    imageMode(CENTER);
    image(rulesImage, width / 2, height / 2, width, height);
}

function quit(){}

function drawGameOver(){
background(100 ,205 ,209)
textSize(20)
fill(255 ,255 ,255)
textFont(gameFont)
textAlign(CENTER,CENTER)
text("GAME OVER",width/2,height/2-50)

}

function changeLevel(){
  switch(chosenLevel){
    case 'constantRule':
      questions = [new Question("1 + 1 =", "2")];
      break;
    case 'powerRule':
      questions = [new Question("1 + 1 =", "2")];
      break;
    case 'sumRule':
      questions = [];
      break;
    case 'differenceRule':
      questions = [];
      break;
    case 'productRule':
      questions = [];
      break;
    case 'quotientRule':
      questions = [];
      break;
    case 'chainRule':
      questions = [];
      break;
  }
  
  lives = 3;
  currentQuestion = 0;
  changeGameState('gamePlay');
 
}
  
