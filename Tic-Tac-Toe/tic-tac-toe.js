// Board State
var orig_board;
// Players
const human='O';
const ai='X';
// Winning Combinations
const win_combos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];
// Selecting Cells
const cells=document.querySelectorAll('.cell');
// Start Game
start_game();
// Initialize Game
function start_game(){
    document.querySelector(".endgame").style.display="none";
    orig_board=Array.from(Array(9).keys());
    for(var i=0;i<cells.length;i++){
        cells[i].innerText='';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turn_click,false);
    }
}
// Player Click
function turn_click(sq){
    if(typeof orig_board[sq.target.id]=='number'){
        turn(sq.target.id,human);
        if(!check_win(orig_board,human)&&!tie()){
            turn(best_spot(),ai);
        }
    }
}
// Make Move
function turn(sq_id,player){
    orig_board[sq_id]=player;
    document.getElementById(sq_id).innerText=player;
    let vict=check_win(orig_board,player);
    if(vict){
        game_over(vict);
    }
}
// Check Win
function check_win(board,player){
    let p=board.reduce((a,e,i)=>(e===player)?a.concat(i):a,[]);
    let vict=null;
    for(let [index,win] of win_combos.entries()){
        if(win.every(elem=>p.indexOf(elem)>-1)){
            vict={index:index,player:player};
            break;
        }
    }
    return vict;
}
// Game Over
function game_over(vict){
    for(let index of win_combos[vict.index]){
        document.getElementById(index).style.backgroundColor=
            vict.player==human?"blue":"red";
    }
    for(var i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',turn_click,false);
    }
    declare_winner(vict.player==human?"Victory!":"Game Over!");
}
// Display Winner
function declare_winner(winner){
    document.querySelector(".endgame").style.display="block";
    document.querySelector(".endgame .text").innerText=winner;
}
// Empty Squares
function empty_sq(){
    return orig_board.filter(s=>typeof s=='number');
}
// Best Move For AI
function best_spot(){
    return minmax(orig_board,ai).index;
}
// Check Tie
function tie(){
    if(empty_sq().length==0){
        for(var i=0;i<cells.length;i++){
            cells[i].style.backgroundColor="green";
            cells[i].removeEventListener('click',turn_click,false);
        }
        declare_winner("Tie Game!");
        return true;
    }
    return false;
}
// Minmax Algorithm For AI Player
function minmax(new_board,player){
    var availspots=empty_sq();
    if(check_win(new_board,human))return{score:-10};
    else if(check_win(new_board,ai))return{score:10};
    else if(availspots.length===0)return{score:0};
    var moves=[];
    for(var i=0;i<availspots.length;i++){
        var m={};
        m.index=new_board[availspots[i]];
        new_board[availspots[i]]=player;
        if(player==ai){
            var res=minmax(new_board,human);
            m.score=res.score;
        }else{
            var res=minmax(new_board,ai);
            m.score=res.score;
        }
        new_board[availspots[i]]=m.index;
        moves.push(m);
    }
    var best_move;
    if(player===ai){
        var best_score=-10000;
        for(var i=0;i<moves.length;i++){
            if(moves[i].score>best_score){
                best_score=moves[i].score;
                best_move=i;
            }
        }
    }else{
        var best_score=10000;
        for(var i=0;i<moves.length;i++){
            if(moves[i].score<best_score){
                best_score=moves[i].score;
                best_move=i;
            }
        }
    }
    return moves[best_move];
}