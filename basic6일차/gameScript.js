const submarine = $("#characters");
const shark = $("#obstacle");
const end = $("#gameover");
const start = $("#gamestart");

let isJumping = false;
let timeloop;

function jump() {
    if (isJumping) return;

    isJumping = true;
    submarine.animate({ bottom: "+=150px" }, 500).animate({ bottom: "-=150px" }, 500, () => {
        isJumping = false;
    });
}

function moveShark() {
    // img가 나타날 위치 무작위 생성
    let bomStart = Math.ceil(Math.random() * 200) - 100;
    // 속도 랜덤 카운트 - 2000~4000까지
    let shartSpeed = Math.ceil((Math.random() * 2 + 2) * 1000);
    shark.animate({ right: "120%" }, shartSpeed, function () {
        shark.css({ right: `${bomStart}px` });
    });
}

// gameover check
function submarineDead() {
    /**
     * gameover 이유
     * 1. 잠수함 우측 위치와 상어 좌측 위치가 일치 혹은 상어쪽이 더 작을 경우
     * 2. 잠수함 바닥 위치와 상어 위쪽 위치 비교시 잠수함쪽이 더 커질경우
     * 3. 잠수함 좌측 위치와 상어 우측 위치가 일치 혹은 상어쪽이 더 클 경우
     */

    const sharkLeft = shark.offset().left;
    const submarineRight = submarine.offset().left + 50;

    const sharktop = shark.offset().top;
    const submarineBottom = submarine.offset().top + 100;

    const sharkRight = sharkLeft + 150;
    const submarineLeft = submarineRight - 50;

    if (!isJumping && sharkLeft < submarineRight && sharktop < submarineBottom && !(sharkRight < submarineLeft)) gameOver();
}

function gameOver() {
    shark.stop(true, true);
    clearInterval(timeloop);
    shark.hide();
    // gameover 화면 출력
    end.show();
}

function gameReStart() {
    end.hide();
    shark.show();
    start.show();
}

function gameStart() {
    end.hide();
    shark.show();

    gameLoad();
    // gameOver();
}

function gameLoad() {
    // game화면 그리기
    timeloop = setInterval(function () {
        // 1초에 30번 그리기
        moveShark();
        // 죽었는지 체크
        submarineDead();
    }, 1000 / 30);
}

$(() => {
    // gameover용 img 우선 숨기기
    end.hide();
    //  spacebar입력시 user캐릭터 jump
    $("body").keydown(function (event) {
        if (event.key == " ") jump();
    });
    // restart버튼 입력시 재시작
    $("#resetbtn").click(function () {
        gameReStart();
    });
    // gamestart 클릭시 게임 시작
    start.click(function () {
        start.hide();
        gameStart();
    });
});
