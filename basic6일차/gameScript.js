const submarine = $("#characters");
const shark = $("#obstacle");
const attack = $("#attack");
const end = $("#gameover");
const start = $("#gamestart");

// 상태용
let isJumping = false;
let timeloop;

let score = 0;

function jump() {
    if (isJumping) return;

    isJumping = true;
    submarine.animate({ bottom: "+=200px" }, 500).animate({ bottom: "-=200px" }, 1000, () => {
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
        checkScore(false);
    });
}

// 미사일 공격
function shootAttack() {
    attack.show();
    attack.animate({ left: "120%" }, 2000, function () {
        attack.css({ left: `109px` });
        attack.hide();
    });
    sharkDead();
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
    const submarineRight = submarine.offset().left + 100;

    const sharktop = shark.offset().top;
    const submarineBottom = submarine.offset().top + 50;

    const sharkRight = sharkLeft + 100;
    const submarineLeft = submarineRight - 100;

    if (!isJumping && sharkLeft < submarineRight && sharktop < submarineBottom && !(sharkRight < submarineLeft)) gameOver();
}

// 미사일 hit check
function sharkDead() {
    const sharkLeft = shark.offset().left;
    const attackRight = attack.offset().left + 50;

    if (sharkLeft < attackRight) {
        $("#bomb")
            .css({ left: `${shark.offset().left}px` })
            .css({ top: `${shark.offset().top}px` })
            .fadeIn(50)
            .fadeOut(50);
        shark.hide(); // 공격맞은 상어 소멸
        attack.hide(); // 성공한 미사일도 소멸
        checkScore(true);
    }
}

function checkScore(shoot) {
    if (shoot) score += 200; // 장애물 공격성공일때 +200점
    else score += 100; // 장애물 피할때 +100점

    $("#score").text("score : " + score);
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
    $("#pause").show();

    score = 0;
    $("#score").text("score : " + score);

    gameLoad();
}

function gameStart() {
    end.hide();
    shark.show();
    start.hide();
    $("#pause").show();

    gameLoad();
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

function gamePause() {
    // 게임 정지
    clearInterval(timeloop);
    shark.stop(true, true);
    // pause창 보이기
    $("#forPause").show();

    $("#continue").click(() => {
        // pause창 다시 숨기기
        $("#forPause").hide();
        // game 이어서
        gameLoad();
    });

    $("#reset").click(() => {
        // pause창 숨기기
        $("#forPause").hide();
        // game종료
        gameOver();
    });
}
//  spacebar입력시 user캐릭터 jump
$("body").keydown(function (event) {
    // console.log(event.key);
    if (event.key == " ") jump();
    else if (event.key == "Enter") shootAttack();
});

// restart버튼 입력시 재시작
$("#resetbtn").click(function () {
    gameReStart();
});
// pause버튼 입력시 all stop
$("#pause").click(function () {
    gamePause();
});

$(() => {
    // gameover용 img 우선 숨기기
    end.hide();
    // pause창도 숨기기
    $("#pause").hide();
    // gamestart 클릭시 게임 시작
    start.click(function () {
        gameStart();
    });
});
