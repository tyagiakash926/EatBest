
function myfunction(){
    preloader.style.display="none";
  }

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