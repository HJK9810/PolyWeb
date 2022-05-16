const WIDTH = 800;
const HEIGHT = 500;

let submarine = $("#characters");
let shark = $("#obstacle");

let isJumping = false;
let isGameing = true;
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
    shark.animate({ right: "120%" }, 5000, function () {
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
    $("#gameover").show();
}

function gameReStart() {
    $("#gameover").hide();
    shark.show();
    $("#gamestart").show();
}

function gameStart() {
    $("#gameover").hide();
    shark.show();

    gameRoad();
    // gameOver();
}

function gameRoad() {
    // game화면 그리기
    timeloop = setInterval(function () {
        // 1초에 30번 그리기
        moveShark();
        // 죽었는지 체크
        submarineDead();
    }, 1000 / 30);
}

$(() => {
    $("#gameover").hide();

    $("body").keydown(function (event) {
        if (event.key == " ") jump();
    });

    $("button").click(function () {
        gameReStart();
    });

    $("#gamestart").click(function () {
        $("#gamestart").hide();
        gameStart();
    });
});
