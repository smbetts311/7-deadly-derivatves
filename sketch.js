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
  { label: "quotient rule", yPos: 280, size: { width: 250, height: 40 }, action: () => { chosenLevel = "quotientRule"; changeLevel("quotientRule") } },
  { label: "chain rule", yPos: 330, size: { width: 250, height: 40 }, action: () => { chosenLevel = "chainRule"; changeLevel("chainRule") } }
];


function preload(){
  gameFont = loadFont("assets/PressStart2P-Regular.ttf");
  rulesImage = loadImage("assets/Seven_Deadly_Derivatives (1).jpeg");
  
}

class Question{
  constructor(question, answer){
    this.question = question;
    this.answer = answer;
  } 
}

//class Monster{
  //constructor(){ }
//}

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
 
  answerBox = createInput('');
  answerBox.position(200, 330);
  answerBox.hide();
  submitButton = createButton('▶');
  submitButton.position(350,330);
  submitButton.mousePressed(checkAnswer);
  submitButton.hide();
  
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
  
  text("Lives: " + lives, width/2, 50);
}

  
function gameUI(){
    Object.values(buttons).forEach(button => button.hide());
    answerBox.show();
    submitButton.show(); 
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
    --lives;
  }
  if(lives == 0){
    changeGameState('gameOver');
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
  Object.values(buttons).forEach(button => button.hide());
  buttons.backButton.show();  
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
      questions = [new Question("f(x) = 2", "0"), 
                   new Question("f(x) = 27", "0"), 
                   new Question("f(x) = 59", "0"), 
                   new Question("f(x) = 357", "0"), 
                   new Question("f(x) = 45", "0")];
      break;
    case 'powerRule':
      questions = [new Question("f(x) = 2x", "2"),
                   new Question("f(x) = 13x^2", "26x"),
                   new Question("f(x) = 5x^3", "15x^2"),
                   new Question("f(x) = 4x^7", "28x^6"),
                   new Question("f(x) = 10x^8", "80^7")];
      break;
    case 'sumRule':
      questions = [new Question("f(x) = 3x^4 + 27x", "12x^3 + 27"),
                   new Question("f(x) = 30x^4 + 21x^3", "120x^3 + 63x^2"),
                   new Question("f(x) = 6x^9 + 9x^8", "54x^8, 72x^7"),
                   new Question("f(x) = 15x^2 + 13x^2", "30x + 26x"),
                   new Question("f(x) = 69x + 24x^3", "69 + 72x^2")];
      break;
    case 'differenceRule':
      questions = [new Question("f(x) = 12x^6 - 21x^2", "72x^5 - 42x"),
                   new Question("f(x) = 6x^3 - 4x^5", "18x^2 - 20x^4"), 
                   new Question("f(x) = 2x^20 - 20x^2", "40x^19 - 40x"),
                   new Question("f(x) = 100x^2 - 36x^3", "200x - 108x^2"),
                   new Question("f(x) = 9x^10 - 10x^7", "90x^9 - 70x^6")];
      break;
    case 'productRule':
      questions = [new Question("f(x) = (20x + 1) * (10 + x)", "40x + 201"), 
                   new Question("f(x) = (x^2 - 1) * (x + 5)", "3x^2 + 20x - 1"), 
                   new Question("f(x) = (x^3 + 4) * (x^2 + 3)", "5x^4 + 9x^2 + 8x"), 
                   new Question("f(x) = (3 - x^2) * (x + 4)", "-3x^2 - 8x + 3"), 
                   new Question("f(x) = (x^6 - 3x^(20)) * (24x^2 + 3)", "-1584x^21 - 180x^19 + 192x^7 + 18x^5")];
      break;
    case 'quotientRule':
      questions = [new Question("f(x) = (10x + 1)/(x^2 + 2)", "(-10x^2 - 2x + 20)/(x^2 + 2)^2"), 
                   new Question("f(x) = (15x)/(3x-5x^2)", "75/(5x-3)^2"), 
                   new Question("f(x) = (7x^3 - 2x^2 - 12)/(2x^2)", "(7x^3 + 24)/(2x^3)"), 
                   new Question("f(x) = (24x + 3)/(12x^2)", "(-4x-1)/(2x^3)"), 
                   new Question("f(x) = x^2/(4-25x)", "(8x-25x^2)/(4-25x)^2")];
      break;
    case 'chainRule':
      questions = [new Question("f(x) = (x^4 - 3x^2 + 1)^3", "3(x^4 - 3x^2 + 1) ^2(4x^3 - 6x)"),
                   new Question("f(x) = (13 + x)^5", "5(13 + x)^4"), 
                   new Question("f(x) = (25 - 30x)^7", "-210(25 - 30x)^6"), 
                   new Question("f(x) = (8x^2 - 4x^5)^2", "2(8x^2 - 4x^5)(16x- 20x^4)"), 
                   new Question("f(x) = (36 - 20x + 10x^2)^4", "4(36 - 20x + 10x^2)^3 (20x - 20)")];
      break;
  }
  
  lives = 3;
  currentQuestion = 0;
  changeGameState('gamePlay');
 
}
  
