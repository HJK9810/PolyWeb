const WIDTH = 800;
const HEIGHT = 500;

let submarine = $("#characters");
let shark = $("#obstacle");

let isJumping = false;

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
    // let bomStart = Math.ceil(Math.random() * 245) + 400;
    shark.animate({ right: "120%" }, 3000, function () {
        shark.css({ right: "-100px" });
        // shark.css({ left: `${bomStart}px` });
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
    shark.stop();
    // gameover 화면 출력
    $("#gameover").show();
}

function gameStart() {
    $("#gameover").hide();

    gameRoad();
}

function gameRoad() {
    // game화면 그리기
    setInterval(function () {
        // 1초에 30번 그리기
        moveShark();
        // 죽었는지 체크
        submarineDead();
    }, 1000 / 30);
}

$("body").keydown(function (event) {
    // 잠수함
    let left = submarine.offset().left;
    let top = submarine.offset().top;
    let right = left + 100;
    let bottom = top + 100;
    let move = 25; // 이동할 픽셀

    switch (event.key) {
        case " ":
            jump();
            break;
    }
});

$("#gameover").click(function () {
    gameStart();
});

gameStart();
