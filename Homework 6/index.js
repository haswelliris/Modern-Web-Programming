var ans = new Array();
var puzzle = {
    changetimes: 50,
    wait_for_transition: 40,
    wait_for_transition2: 333,
    game_begin: false,
    working: true,
    game_time: 0,
    game_time_counter: 0,
    game_moves_counter: 0,
    f: new Array(),
    blocks: new Array(),
    addMove: function () {
        puzzle.game_moves_counter++;
        //console.log(puzzle.game_moves_counter);
        document.getElementById("moves_counter").innerText = "移动次数: " + puzzle.game_moves_counter + " 次";
    },
    begin: function () {
        puzzle.game_begin = true;
        //clear time
        puzzle.game_time = 0;
        document.getElementById("time_counter").innerText = "时间: 0";
        //clear moves
        puzzle.game_moves_counter = 0;
        document.getElementById("moves_counter").innerText = "移动次数: 0";
        puzzle.working = true;
        puzzle.game_time_counter = setInterval(function () {
            puzzle.game_time += 1;
            document.getElementById("time_counter").innerText = "时间: " + puzzle.game_time + " 秒";
        }, 1000);
    },
    win: function () {
        puzzle.game_begin = false;
        puzzle.working = true;
        clearInterval(puzzle.game_time_counter);
        //win game
        while (ans.length > 0) {
            ans.pop();
        }
        alert("You Win");
    },
    end: function () {
        puzzle.game_begin = false;
        puzzle.working = true;
        clearInterval(puzzle.game_time_counter);
    }
}

function change_pos(new_p) {
    var obj = this;
    var cls = "puzzle_row_" + Math.floor(this.position / 4);
    var obj_class = ' ' + obj.className + ' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
    obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
    var removed = obj_class.replace(' ' + cls + ' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed;//替换原来的 class.
    cls = "puzzle_col_" + this.position % 4;
    obj_class = ' ' + obj.className + ' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
    obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
    removed = obj_class.replace(' ' + cls + ' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed;//替换原来的 class.
    this.position = new_p;
    obj = this;
    obj_class = obj.className;//获取 class 内容.
    var added = obj_class + " puzzle_row_" + Math.floor(this.position / 4) + " puzzle_col_" + this.position % 4;
    obj.className = added;//替换原来的 class.
}

function move_to_pos(new_p) {
    //wocao
    puzzle.blocks[puzzle.f[new_p]].change(this.position);
    puzzle.f[this.position] = puzzle.f[new_p];
    puzzle.f[new_p] = parseInt(this.id);
    //wocao
    this.change(new_p);
}

function f_swap(a, b) {
    var ttt = puzzle.blocks[puzzle.f[a]].position;
    puzzle.blocks[puzzle.f[a]].position = puzzle.blocks[puzzle.f[b]].position;
    puzzle.blocks[puzzle.f[b]].position = ttt;
    var temp = puzzle.blocks[puzzle.f[a]].className;
    puzzle.blocks[puzzle.f[a]].className = puzzle.blocks[puzzle.f[b]].className;
    puzzle.blocks[puzzle.f[b]].className = temp;
    var temp2 = puzzle.f[a];
    puzzle.f[a] = puzzle.f[b];
    puzzle.f[b] = temp2;
}

function get_candidate_block(position) {
    var dx = [-1, 0, 1, 0], dy = [0, -1, 0, 1];
    var neighbour = new Array(), x, y;
    for (var i = 0; i < 4; ++i) {
        x = position % 4 + dx[i], y = Math.floor(position / 4) + dy[i];
        if (x >= 0 && x < 4 && y >= 0 && y < 4) neighbour.push(x + 4 * y);
    }
    return neighbour;
}

function handleOnClick(event) {
    if (puzzle.working && puzzle.game_begin) {
        var valida = this.get_valida();
        for (var index in valida) {
            if (puzzle.f[valida[index]] == "15") {
                //console.log(this.position);
                ans.push(this.position);
                //console.log(valida[index]);
                ans.push(valida[index]);
                if (puzzle.game_begin) {
                    //console.log("add");
                    puzzle.addMove();
                }
                f_swap(this.position, valida[index]);
                if (puzzle.game_begin && ok(puzzle.f) == 0) {
                    //console.log("waiting");
                    puzzle.game_begin = false;
                    setTimeout(function () {
                        //console.log("win");
                        puzzle.win();
                    }, puzzle.wait_for_transition2);
                }
                break;
            }
        }
    }
}


// 初始化puzzle
function initPuzzle() {
    for (var i = 0; i < 16; ++i) {
        var temp_block = document.createElement("canvas");
        temp_block.className = "puzzle_block puzzle_block_hover puzzle_row_" + Math.floor(i / 4) + " puzzle_col_" + i % 4;
        //temp_block.change = change_pos;
        //temp_block.moveto = move_to_pos;
        temp_block.get_valida = function () { return get_candidate_block(this.position); }
        temp_block.onclick = handleOnClick;

        temp_block.id = "p" + i;
        temp_block.position = i;
        puzzle.f[i] = i;
        puzzle.blocks[i] = temp_block;
        document.getElementById("puzzle_content").appendChild(temp_block);
    }
    /*
    //remove class name "puzzle_block_hover"
    var obj = document.getElementById("15");
    var cls = "puzzle_block_hover";
    var obj_class = ' ' + obj.className + ' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
    obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
    var removed = obj_class.replace(' ' + cls + ' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed;//替换原来的 class.
    */
}

function drawPuzzle(imageName) {
    var image = new Image();
    image.src = imageName;
    image.onload = function () {
        for (var i = 0; i < 15; ++i) {
            var canvas = document.getElementById("p" + i);
            canvas.getContext("2d").drawImage(image, (image.width / 4) * (i % 4), (image.height / 4) * Math.floor(i / 4), image.width / 4, image.height / 4, 0, 0, canvas.width, canvas.height);
        }
    }
    image.onload();
}

function init_go(now, last, times) {
    if (times >= puzzle.changetimes) {
        puzzle.begin();
    } else {
        var nexts = puzzle.blocks[15].get_valida();
        nexts.splice(nexts.indexOf(last), 1);
        //避免又移回去了
        var next = nexts[Math.floor(Math.random() * nexts.length)]
        //puzzle.blocks[puzzle.f[next]].moveto(now);
        //console.log(next);
        ans.push(next);
        //console.log(now);
        ans.push(now);
        f_swap(next, now);
        //delete
        setTimeout(function () {
            init_go(next, now, times + 1);
        }, puzzle.wait_for_transition);
    }
}
// 打乱puzzle
function randompuzzle() {
    //console.log("to random");
    if (puzzle.game_begin) {
        alert("游戏正在进行中，请抓紧时间拼图哦！");
        return;
    }
    if (puzzle.working) {
        puzzle.end();
        puzzle.working = false;
        //clear time
        puzzle.game_time = 0;
        document.getElementById("time_counter").innerText = "时间: 0";
        //clear moves
        puzzle.game_moves_counter = 0;
        document.getElementById("moves_counter").innerText = "移动次数: 0";
        var st = puzzle.f.indexOf(15);
        init_go(st, st, 0);
    }
}


function ok(array) {
    for (var i = 0; i < array.length; ++i)
        if (array[i] != i)
            return 1;
    return 0;
}
function sssolve() {
    if (ans.length > 0) {
        var i = ans.length - 1;
        //console.log("...");
        f_swap(ans[i], ans[i - 1]);
        ans.pop();
        ans.pop();
        setTimeout(function () {
            sssolve();
        }, puzzle.wait_for_transition);
    } else {
        puzzle.working = true;
        return;
    }
}
function solvePuzzle() {
    //console.log("to solve");
    if (!puzzle.game_begin) {
        alert("游戏未开始！\n请点击开始按钮！");
        return;
    }
    if (puzzle.working) {
        puzzle.end();
        puzzle.working = false;
        sssolve();
        puzzle.game_moves_counter = 0;
        document.getElementById("moves_counter").innerText = "移动次数: ∞";
        alert("太菜了，连个图都拼不好。\n但是好好想想，你没有充钱能变得强大吗？");
        /*
        var temp = document.getElementById("puzzle_content");
        temp.parentNode.removeChild(temp);
        var temp2 = document.createElement("div");
        temp2.id = "puzzle_content";
        document.getElementById("main_content").insertBefore(temp2, document.getElementById("control"));
        initPuzzle();
        drawPuzzle("images/panda.jpg");
        puzzle.working = true;
        drawPuzzle("images/panda.jpg");
        */
    }
}


window.onload = function () {
    document.getElementById("start").onclick = function () {
        //console.log("start");
        randompuzzle();
    };
    document.getElementById("solve").onclick = function () {
        //console.log("solve");
        solvePuzzle();
    }
    initPuzzle();
    drawPuzzle("images/panda.jpg");
}