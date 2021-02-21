let names = ["Everyone" , "Develpoers" , "Fit Freaks" , "Vegans"];            

let changingText = document.querySelector("#changingtext");
let idx = 0;
let word = names[idx];
let text = "";
let isDeleting = false;

window.addEventListener("load" , function(){
    
  typeWords();

  function typeWords(){
    if(isDeleting && text.length ==0){
        idx = (idx+1) % names.length;
        word = names[idx];
        isDeleting = false;
    }

    if(text.length == word.length){
        isDeleting = true;
    }
      
    text = isDeleting ? word.substring(0 , text.length-1) : word.substring(0 , text.length+1);
    changingText.innerHTML = text;
    setTimeout(typeWords ,  text.length == word.length ? 1000 : 100);
}
})

let humberburger = document.querySelector(".header-nav-bar-icon img");
let resul=document.querySelector(".showcase-ul");
let headerres=document.querySelector(".header-nav-bar");
humberburger.addEventListener("click",function(){
  

  if(headerres.classList.contains("height-resp")){
    headerres.classList.remove("height-resp");
    document.querySelector(".header-nav-bar-icon").classList.remove("nav-res-icon");
    resul.classList.add("vclass-resp");
  }else {
    headerres.classList.add("height-resp");
    resul.classList.remove("vclass-resp");
    document.querySelector(".header-nav-bar-icon").classList.add("nav-res-icon");
  }


})

let buynow_btn= document.querySelector(".buynow-btn");
let explore_btn = document.querySelector(".explore-btn");
let discount_template_btn=document.querySelector(".discount-template-btn");
buynow_btn.addEventListener("click",function(){
  window.location.href = "/plans";
})
explore_btn.addEventListener("click",function(){
  window.location.href = "/plans";
})
discount_template_btn.addEventListener("click",function(){
  window.location.href = "/plans";
})
function myfunction(){
  preloader.style.display="none";
}

  






