function myfunction(){
    preloader.style.display="none";
  }
  let bucket = document.querySelector(".plans-section-1-cart");
  let homeurl = document.getElementById('homeurl');
  let detailurl = document.getElementById('detailurl');
  let reviewurl = document.getElementById('reviewurl');
  let loginurl = document.getElementById('loginurl');
  homeurl.addEventListener("click",function(){
    window.location.href = "/";

  })
  detailurl.addEventListener("click",function(){
    window.location.href = "/details";

  })
  loginurl.addEventListener("click",function(){
    window.location.href = "/login";

  })
  reviewurl.addEventListener("click",function(){
    window.location.href = "/reviews";

  })
  bucket.addEventListener("click",function(){
    window.location.href="/paymenthistory";
  })



  let namess = ["Eatland" , "BeastLand" , "Eat-Beast" , "Khana"];            

let changingText2 = document.querySelector("#changingtext");
let idx1 = 0;
let word1 = namess[idx1];
let text1 = "";
let isDeleting1 = false;

window.addEventListener("load" , function(){
    
  typeWords();

  function typeWords(){
    if(isDeleting1 && text1.length ==0){
        idx1 = (idx1+1) % namess.length;
        word1 = namess[idx1];
        isDeleting1 = false;
    }

    if(text1.length == word1.length){
        isDeleting1 = true;
    }
      
    text1 = isDeleting1 ? word1.substring(0 , text1.length-1) : word1.substring(0 , text1.length+1);
    changingText2.innerHTML = text1;
    setTimeout(typeWords ,  text1.length == word1.length ? 1000 : 100);
}
})