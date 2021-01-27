let alllis=document.querySelectorAll(".nav.nav-pills li");
let allRows = document.querySelectorAll(".row");
for(let i=0;i<alllis.length;i++){
    alllis[i].addEventListener("click",function(){
        for(let j=0;j<alllis.length;j++){
            alllis[j].classList.remove("active1");
            allRows[j].classList.remove("review-row");
            allRows[j].classList.add("review-no-see");
        }
        alllis[i].classList.add("active1");
        allRows[i].classList.remove("review-no-see");
        allRows[i].classList.add("review-row");
    })
}
function myfunction(){
    preloader.style.display="none";
  }

