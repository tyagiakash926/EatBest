let resetB = document.querySelector(".ghost-r");
let forgetB = document.querySelector(".ghost-f");
let bcontainer = document.querySelector(".bcontainer");
let forgetbtn = document.querySelector(".forget-btn");
let emailF = document.querySelector(".email-f");
let message = document.querySelector("#message");



forgetbtn.addEventListener("click",async function(e){
    e.preventDefault();
    try{
        e.preventDefault(); // prevent page refresh

        if(emailF.value){
            let obj = await axios.post( "http://localhost:3000/api/users/forgetpassword" , {email:emailF.value });
            console.log(obj);
            message.innerHTML = obj.data.message;
            emailF.value="";
        }
    }
    catch(error){
        console.log(error);
    }

})

resetB.addEventListener("click",function(){
    bcontainer.classList.add("active");
})
forgetB.addEventListener("click",function(){
    bcontainer.classList.remove("active");
})