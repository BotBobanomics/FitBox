title = "Fit Box";

description = `
[HOLD] 
  Move left/up
[RELEASE]
  Stop
`;

characters = [
`
 rrrr
rrrrrr
rrrrrr
rrrrrr
 rrrr
`,
`
 l  l

llllll
l    l
l    l
 llll
`
];

const G = {
    WIDTH: 100,
    HEIGHT: 100,
    PLAYER_SPEED_MIN: 0.3,
    PLAYER_SPEED_MAX: 0.8,
};
  
/**
 * @typedef {{
 * pos: Vector,
 * speed: number,
 * isGoingUp: boolean,
 * isGoingRight: boolean,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector
 * }} TargetBox
 */

/**
 * @type { TargetBox }
 */
let targetbox;

options = {
    isPlayingBgm: true,
    isReplayEnabled: true,
    viewSize: { x: G.WIDTH, y: G.HEIGHT },
};

let isPressing;

function update() {
    if (!ticks){

        const posX =  rndi(30, G.WIDTH - 10);
        const posY =  rndi(30, G.HEIGHT - 10);
        isPressing = false;
        targetbox = {
            pos: vec(posX, posY)
        };

        player = {
            pos: vec(5 , G.HEIGHT - 5),
            speed: rnd(G.PLAYER_SPEED_MIN, G.PLAYER_SPEED_MAX),
            isGoingRight: true,
            isGoingUp: false
        }
    }

    color('light_green');
    rect(0, 0, G.WIDTH, 1); // Top border
    rect(0, 0, 1, 99); // left border
    rect(G.WIDTH - 1, 0, 1, G.HEIGHT); // right border
    rect(0, G.HEIGHT - 1, G.WIDTH, 1); // floor border

    color('light_yellow');
    text("WIN A PRIZE?", 20, 10);

    color('black');
    char('b', 10, 10);

    if (input.isJustPressed){
        isPressing = true;
    }

    color('yellow');
    box(targetbox.pos, 8);

    const A = 'a';
    player.pos.clamp(3, G.WIDTH - 3, 3, G.HEIGHT - 3);
    color('red');
    char(A, player.pos);

    if ( (player.isGoingRight == true) && (input.isPressed) && (isPressing) ){
        player.pos.x += player.speed;
    }
    else if ( (player.pos.x > 5) && (player.isGoingRight == true) ){
        player.isGoingRight = false;
        player.isGoingUp = true;
    }

    if ( (player.isGoingUp == true) && (input.isPressed) ){
        player.pos.y -= player.speed;
    }
    else if ( (player.pos.y < G.HEIGHT - 5) && (player.isGoingUp == true) ){
        player.isGoingUp = false;
        let diffx = abs(player.pos.x - targetbox.pos.x);
        let diffy = abs(player.pos.y - targetbox.pos.y);
        if ( (diffx <= 2 && diffx >= 0) && (diffy <= 2 && diffy >= 0) && (!input.isPressed) ){
            play("laser");
            player.isGoingRight = true;
            const posX =  rnd(10, G.WIDTH - 10);
            const posY =  rnd(10, G.HEIGHT - 10);
            targetbox.pos = vec(posX, posY);
            player.pos = vec(5 , G.HEIGHT - 5);
            player.speed = rnd(G.PLAYER_SPEED_MIN, G.PLAYER_SPEED_MAX);
            addScore(10);
        }
    }
    else if ( (player.isGoingRight == false && player.isGoingUp == false) ){
        end();
    }
    
}