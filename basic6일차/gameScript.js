let submarine = $("#characters");
let shark = $("#obstacle");
let end = $("#gameover");
let start = $("#gamestart");

let isJumping = false;
let timeloop;

function jump() {
    if (isJumping) {
        return;
    }

    isJumping = true;
    submarine.animate({ bottom: "+=150px" }, 500).animate({ bottom: "-=150px" }, 500, function () {
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
    let sharkLeft = shark.offset().left;
    let submarineRight = submarine.offset().left + 50;

    let sharksize = shark.offset().top;
    let submarineBottom = submarine.offset().top + 100;

    if (!isJumping && submarineRight > sharkLeft && sharksize < submarineBottom && !(sharkLeft + 150 < submarineRight - 50)) gameOver();
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
