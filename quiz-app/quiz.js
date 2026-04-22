const ques=[
    {
        question:"What is the capital of France?",
        answers:[
            {text:"Paris",correct:true},
            {text:"London",correct:false},
            {text:"Berlin",correct:false},
            {text:"Madrid",correct:false}
        ]
    },
    {
        question:"Which planet is known as the Red Planet?",
        answers:[
            {text:"Earth",correct:false},
            {text:"Mars",correct:true},
            {text:"Jupiter",correct:false},
            {text:"Saturn",correct:false}
        ]
    },
    {
        question:"What is the largest mammal?",
        answers:[
            {text:"Elephant",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Giraffe",correct:false},
            {text:"Hippopotamus",correct:false}
        ]
    },
    {
        question:"Who wrote 'Romeo and Juliet'?",
        answers:[
            {text:"William Shakespeare",correct:true},
            {text:"Jane Austen",correct:false},
            {text:"Mark Twain",correct:false},
            {text:"Charles Dickens",correct:false}
        ]   
    },
    {
        question:"What is the chemical symbol for water?",
        answers:[
            {text:"H2O",correct:true},
            {text:"O2",correct:false},
            {text:"CO2",correct:false},
            {text:"NaCl",correct:false}
        ]   
    }
];

const q_elm=document.getElementById("ques");
const ans_elm=document.getElementById("ans-btn");
const nxt=document.getElementById("next");

let curr_qidx=0;
let score=0;

function start(){
    curr_qidx=0;
    score=0;
    nxt.innerHTML="Next";
    show_q();
}

function show_q(){
    resetq();
    let q=ques[curr_qidx];
    let qnum=curr_qidx+1;
    q_elm.innerHTML=qnum+". "+q.question;  
    q.answers.forEach(a=>{
        const btn=document.createElement("button");
        btn.innerHTML=a.text;
        btn.classList.add("btn");
        ans_elm.appendChild(btn);
        if(a.correct) btn.dataset.correct=a.correct;
        btn.addEventListener("click",select_ans);
    })
}

function resetq(){
    nxt.style.display="none";
    while(ans_elm.firstChild){
        ans_elm.removeChild(ans_elm.firstChild);
    }
}

function select_ans(evt){
    const selected=evt.target;
    const iscorrect=selected.dataset.correct==="true";
    if(iscorrect){
        selected.classList.add("correct");
        score++;
    }
    else selected.classList.add("wrong");
    Array.from(ans_elm.children).forEach(btn=>{
        if(btn.dataset.correct==="true") btn.classList.add("correct");
        btn.disabled=true;
    });
    nxt.style.display="block";
}

function revealpts(){
    resetq();
    q_elm.innerHTML="Your Score: "+score+"/"+ques.length;
    nxt.innerHTML="Play Again?";
    nxt.style.display="block";
}

function handle_nxtbtn(){
    curr_qidx++;
    if(curr_qidx<ques.length) show_q();
    else revealpts();
}

nxt.addEventListener("click",()=>{
    if(curr_qidx<ques.length) handle_nxtbtn();
    else start();
});

start();



