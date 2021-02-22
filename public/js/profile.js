let edit_profile_info_btn = document.querySelector(".edit-profile-info");
let edit_profile_cancel_btn = document.querySelector("#profile-edit-cancel-btn");
let container_profile_info = document.querySelector(".container-profile-info");
  
const profileImage = document.querySelector("#imgUpload");

function myfunction(){
    preloader.style.display="none";
  }

profileImage.addEventListener("change" , async function(e){
    e.preventDefault();
    let file = profileImage.files[0];
    console.log(file);
    let formData = new FormData();
    formData.append("user" , file);
    console.log(formData);
    let obj = await axios.patch("/api/users/updateprofilephoto" , formData);
    console.log(obj);
    if(obj.data.message){
        window.location.reload();
    }
})

edit_profile_info_btn.addEventListener("click",function(){
    container_profile_info.classList.add("side-aa")
})
edit_profile_cancel_btn.addEventListener("click",function(){
    container_profile_info.classList.remove("side-aa");
})


let review_edit_button = document.querySelectorAll(".my-review-section-container-1-review-edit-button");
for(let i=0;i<review_edit_button.length;i++){
    review_edit_button[i].addEventListener("click",function(){
        review_edit_button[i].classList.add("textarea-no-see");
        document.querySelectorAll(".my-review-section-container-1-review-edit-button")[i].nextElementSibling.classList.remove("textarea-no-see")
        document.querySelectorAll(".my-review-section-container-1-review-edit-button")[i].nextElementSibling.lastElementChild.lastElementChild.addEventListener("click",function(){
            review_edit_button[i].classList.remove("textarea-no-see");
        document.querySelectorAll(".my-review-section-container-1-review-edit-button")[i].nextElementSibling.classList.add("textarea-no-see")
        })
    })
}

let allsavebtn=document.querySelectorAll(".my-review-section-container-1-review-edit-content-save");
let alleditbtn = document.querySelectorAll(".my-review-section-container-1-review-edit-button");
let alltextarea = document.querySelectorAll("#review-message");
let allplanimage = document.querySelectorAll(".my-review-section-container-1-review-image img");
for(let i=0;i<allsavebtn.length;i++){
    allsavebtn[i].addEventListener("click",async function(){
        let reviewId = allsavebtn[i].getAttribute("reviewId");
        console.log(reviewId);
        let message =alltextarea[i].value;
        let mainPlanId = alleditbtn[i].getAttribute("mainplanid");
        // planModel.find({planImage})
        let obj = await axios.post(`/api/review/${reviewId}` , {message:message,mainPlanId:mainPlanId});
        window.location.reload();
    })
}

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