const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('akash');
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector(".SIGNIN-btn");
let Username = document.querySelector("#name");
let emailSu = document.querySelector("#email-su");
let passwordSu = document.querySelector("#password-su");
let confirmPasswordSu = document.querySelector("#confirm-password-su");
let message = document.querySelector("#message");
let createAccBtn = document.querySelector(".SIGNUP-btn");
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

loginBtn.addEventListener("click", async function(e){
    e.preventDefault();
    // alert("LOgin Cicked");
    try{
        e.preventDefault(); // prevent page refresh
        if(email.value && password.value){
            let obj = await axios.post( "http://localhost:3000/api/users/login" , {email:email.value , password:password.value});
            console.log(obj);
            if(obj.data.data){
                window.location.href = "/";
            }else{
                message.innerHTML = obj.data.message;
                password.value="";
            }
        }
    }
    catch(error){
        console.log(error);
    }

})

createAccBtn.addEventListener("click",async function(e){
    e.preventDefault();
    try{
        if(emailSu && passwordSu && confirmPasswordSu && Username){
            let obj = await axios.post( "http://localhost:3000/api/users/signup" , {name:Username.value ,email:emailSu.value , password:passwordSu.value , confirmPassword:confirmPasswordSu.value});
            console.log(obj);
        }
    }catch(error){
        console.log(error);
    }
})


function myfunction(){
    preloader.style.display="none";
  }