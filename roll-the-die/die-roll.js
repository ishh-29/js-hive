let imgs=[
    "dice-01.svg",
    "dice-02.svg",
    "dice-03.svg",
    "dice-04.svg",
    "dice-05.svg",
    "dice-06.svg"
];
let dice=document.querySelectorAll("img");
function roll(){
    dice.forEach(function(die){
        die.classList.add("shake");
    });
    setTimeout(function(){
        dice.forEach(function(die){
            die.classList.remove("shake")
        });
        let d1val=Math.floor(Math.random()*6);
        let d2val=Math.floor(Math.random()*6);
        document.querySelector("#d1").setAttribute("src",imgs[d1val]);
        document.querySelector("#d2").setAttribute("src",imgs[d2val]);
        document.querySelector("#total").innerHTML="Your Roll Is: "+((d1val+1)+(d2val+1));
    },1000);
}
roll();