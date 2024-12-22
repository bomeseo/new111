// 기본 변수 설정
const grid = document.getElementById('grid');
let score = 0;
let highScore = 0;
let previousBlueIndex = -1;
let clickTimer = null;

// 5x5 그리드 만들기 (총 25칸)
for (let i = 0; i < 25; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i; // 각 칸에 고유한 인덱스를 지정
  grid.appendChild(cell);
}

// 점수 업데이트 함수
function updateScore() {
  document.getElementById('score').innerText = `Score: ${score}`;
  updateHighScore();
}

// 최고 기록 업데이트 함수
function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    document.getElementById('high-score').innerText = `최고기록: ${highScore}`;
  }
}

// 랜덤으로 파란색 칸 변경
function changeBlueCell() {
  // 이전에 파란색이었던 칸을 흰색으로 변경
  if (previousBlueIndex !== -1) {
    const previousCell = grid.children[previousBlueIndex];
    previousCell.classList.remove('blue');

    // 클릭하지 못했을 경우 점수 차감
    if (!previousCell.clicked) {
      score -= 1;
      if (score < 0) score = 0; // 점수는 0 이하로 내려가지 않음
      updateScore();
    }

    // 상태 초기화
    previousCell.clicked = false;
  }

  // 새로운 랜덤 인덱스 계산
  const randomIndex = Math.floor(Math.random() * 25);
  const randomCell = grid.children[randomIndex];
  randomCell.classList.add('blue');
  randomCell.clicked = false; // 새로운 칸의 클릭 상태 초기화
  
  // 파란색 칸의 인덱스 저장
  previousBlueIndex = randomIndex;
}

// 우클릭으로 점수 증가
grid.addEventListener('contextmenu', function(event) {
  const target = event.target;

  // 우클릭한 요소가 파란색 셀인지 확인
  if (target.classList.contains('cell') && target.classList.contains('blue')) {
    score += 1;
    target.clicked = true; // 클릭 여부 저장
    updateScore();
  }

  event.preventDefault(); // 기본 우클릭 메뉴 방지
});

// 1초마다 랜덤한 칸을 파란색으로 변경
setInterval(changeBlueCell, 1000);
