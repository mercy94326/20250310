let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let result = "";
let resultColor = 0;

function preload() {
  loadTable('questions.csv', 'csv', 'header', (table) => {
    for (let i = 0; i < table.getRowCount(); i++) {
      let question = table.getString(i, 'question');
      let options = table.getString(i, 'options').split('|');
      let correctAnswer = table.getNum(i, 'correctAnswer');
      questions.push({ question, options, correctAnswer });
    }
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#f5ebe0'); // 修改背景顏色
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0); // 確保題目顏色不變

  if (currentQuestionIndex < questions.length) {
    let currentQuestion = questions[currentQuestionIndex];
    text(currentQuestion.question, width / 2, height / 4);

    for (let i = 0; i < currentQuestion.options.length; i++) {
      let x = width / 2 - 150 + i * 100;
      let y = height / 2;
      fill(200);
      rect(x - 50, y - 20, 100, 40);
      fill(0);
      text(currentQuestion.options[i], x, y);
    }

    // 顯示下一題按鈕
    let buttonText = currentQuestionIndex < questions.length - 1 ? "下一題" : "送出";
    let buttonX = width / 2;
    let buttonY = height / 2 + 100;
    fill(200);
    rect(buttonX - 50, buttonY - 20, 100, 40);
    fill(0);
    text(buttonText, buttonX, buttonY);
  } else {
    textSize(24);
    fill(0);
    text(`測驗結束！`, width / 2, height / 4);
    text(`答對題數: ${correctAnswers}`, width / 2, height / 2 - 20);
    text(`答錯題數: ${incorrectAnswers}`, width / 2, height / 2 + 20);
  }

  textSize(24);
  fill(resultColor);
  text(result, width / 2, height - 100);
}

function mousePressed() {
  if (currentQuestionIndex < questions.length) {
    let currentQuestion = questions[currentQuestionIndex];
    for (let i = 0; i < currentQuestion.options.length; i++) {
      let x = width / 2 - 150 + i * 100;
      let y = height / 2;
      if (mouseX > x - 50 && mouseX < x + 50 && mouseY > y - 20 && mouseY < y + 20) {
        if (i === currentQuestion.correctAnswer) {
          result = "正確";
          resultColor = color(0, 255, 0); // 綠色
          correctAnswers++;
        } else {
          result = "錯誤";
          resultColor = color(255, 0, 0); // 紅色
          incorrectAnswers++;
        }
        break;
      }
    }

    // 檢查是否點擊了下一題或送出按鈕
    let buttonX = width / 2;
    let buttonY = height / 2 + 100;
    if (mouseX > buttonX - 50 && mouseX < buttonX + 50 && mouseY > buttonY - 20 && mouseY < buttonY + 20) {
      currentQuestionIndex++;
      result = ""; // 清除結果文字
    }
  }
}
