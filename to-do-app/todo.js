const inpbox=document.getElementById("input-box");
const lst_cntnr=document.getElementById("list-container");

function add_task(){
    if(inpbox.value==='') alert("You Must Write Something!");
    else{
        let li=document.createElement("li");
        li.innerHTML=inpbox.value;
        lst_cntnr.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    inpbox.value="";
    save_data();
}

lst_cntnr.addEventListener("click",function(evt){
    if(evt.target.tagName==="LI"){
        evt.target.classList.toggle("checked");
        save_data();
    }
    else if(evt.target.tagName==="SPAN"){
        evt.target.parentElement.remove();
        save_data();
    }
},false);

function save_data(){
    localStorage.setItem("data",lst_cntnr.innerHTML);
}

function show_task(){
    lst_cntnr.innerHTML=localStorage.getItem("data");
}
show_task();