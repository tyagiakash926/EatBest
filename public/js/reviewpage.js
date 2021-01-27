
var slide = document.querySelector(".plan-corosel");
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var btn4 = document.getElementById('btn4');
var btn5 = document.getElementById('btn5');
var btn6 = document.getElementById('btn6');
var btn7 = document.getElementById('btn7');
var btn8 = document.getElementById('btn8');
var btn9 = document.getElementById('btn9');

btn1.onclick = function () {
    slide.style.transform = "translateX(0px)";
    btn1.classList.add('corosel-active');
    btn2.classList.remove('corosel-active');
    btn3.classList.remove('corosel-active');
    btn4.classList.remove('corosel-active');
    btn5.classList.remove('corosel-active');
    btn6.classList.remove('corosel-active');
    btn7.classList.remove('corosel-active');
    btn8.classList.remove('corosel-active');
    btn9.classList.remove('corosel-active');
    
};
btn2.onclick = function () {
    slide.style.transform = "translateX(-100%)";
    btn1.classList.remove('corosel-active');
    btn2.classList.add('corosel-active');
    btn3.classList.remove('corosel-active');
    btn4.classList.remove('corosel-active');
    btn5.classList.remove('corosel-active');
    btn6.classList.remove('corosel-active');
    btn7.classList.remove('corosel-active');
    btn8.classList.remove('corosel-active');
    btn9.classList.remove('corosel-active');
};
btn3.onclick = function () {
    slide.style.transform = "translateX(-200%)";
    btn1.classList.remove('corosel-active');
    btn2.classList.remove('corosel-active');
    btn3.classList.add('corosel-active');
    btn4.classList.remove('corosel-active');
    btn5.classList.remove('corosel-active');
    btn6.classList.remove('corosel-active');
    btn7.classList.remove('corosel-active');
    btn8.classList.remove('corosel-active');
    btn9.classList.remove('corosel-active');
};
btn4.onclick = function () {
    slide.style.transform = "translateX(-300%)";
    btn1.classList.remove('corosel-active');
    btn2.classList.remove('corosel-active');
    btn3.classList.remove('corosel-active');
    btn4.classList.add('corosel-active');
    btn5.classList.remove('corosel-active');
    btn6.classList.remove('corosel-active');
    btn7.classList.remove('corosel-active');
    btn8.classList.remove('corosel-active');
    btn9.classList.remove('corosel-active');
} 
btn5.onclick = function () {
    slide.style.transform = "translateX(-400%)";
    btn1.classList.remove('corosel-active');
    btn2.classList.remove('corosel-active');
    btn3.classList.remove('corosel-active');
    btn4.classList.remove('corosel-active');
    btn5.classList.add('corosel-active');
    btn6.classList.remove('corosel-active');
    btn7.classList.remove('corosel-active');
    btn8.classList.remove('corosel-active');
    btn9.classList.remove('corosel-active');
} 
btn6.onclick = function () {
    slide.style.transform = "translateX(-500%)";
    btn1.classList.remove('corosel-active');
    btn2.classList.remove('corosel-active');
    btn3.classList.remove('corosel-active');
    btn4.classList.remove('corosel-active');
    btn5.classList.remove('corosel-active');
    btn6.classList.add('corosel-active');
    btn7.classList.remove('corosel-active');
    btn8.classList.remove('corosel-active');
    btn9.classList.remove('corosel-active');
} 
btn7.onclick = function () {
    slide.style.transform = "translateX(-600%)";
    btn1.classList.remove('corosel-active');
    btn2.classList.remove('corosel-active');
    btn3.classList.remove('corosel-active');
    btn4.classList.remove('corosel-active');
    btn5.classList.remove('corosel-active');
    btn6.classList.remove('corosel-active');
    btn7.classList.add('corosel-active');
    btn8.classList.remove('corosel-active');
    btn9.classList.remove('corosel-active');
} 
btn8.onclick = function () {
    slide.style.transform = "translateX(-700%)";
    btn1.classList.remove('corosel-active');
    btn2.classList.remove('corosel-active');
    btn3.classList.remove('corosel-active');
    btn4.classList.remove('corosel-active');
    btn5.classList.remove('corosel-active');
    btn6.classList.remove('corosel-active');
    btn7.classList.remove('corosel-active');
    btn8.classList.add('corosel-active');
    btn9.classList.remove('corosel-active');
} 
btn9.onclick = function () {
    slide.style.transform = "translateX(-800%)";
    btn1.classList.remove('corosel-active');
    btn2.classList.remove('corosel-active');
    btn3.classList.remove('corosel-active');
    btn4.classList.remove('corosel-active');
    btn5.classList.remove('corosel-active');
    btn6.classList.remove('corosel-active');
    btn7.classList.remove('corosel-active');
    btn8.classList.remove('corosel-active');
    btn9.classList.add('corosel-active');
} 
function myfunction(){
    preloader.style.display="none";
  }

  let buyPlansButtons = document.querySelectorAll(".plan-describe-page-detail-buyme");
  let buyPlansButtons2 = document.querySelectorAll(".featured-plan-1-1-price-buynow");


let allLis = document.querySelectorAll(".showcase-ul li");
const stripe = Stripe('pk_test_51I57ncLVmgB2cGGSLTxe7cyoDYqz4BjMjxeqr2UsLxPXzsvzNyghl9JVhavqXocURt0xDe9OBOPKB5QXkJ50QjDi00Qq6bLtbN');
for(let i=0 ; i<buyPlansButtons.length ; i++){
    buyPlansButtons[i].addEventListener("click" , async function(){
        console.log("hii");
        try{
            if(allLis.length < 6){
                window.location.href = "/login";
            }
            else{
                let planId = buyPlansButtons[i].getAttribute("planid");
                let session =  await axios.post("http://localhost:3000/api/booking/createPaymentSession" , {planId : planId });
                let sessId = session.data.session.id;
                let result = await stripe.redirectToCheckout({ sessionId: sessId });
                console.log(result);
            }
        }
        catch(error){
            alert(error.message);
        }
    })
}
for(let i=0 ; i<buyPlansButtons2.length ; i++){
    buyPlansButtons2[i].addEventListener("click" , async function(){
        try{
            if(allLis.length < 6){
                window.location.href = "/login";
            }
            else{
                let planId = buyPlansButtons2[i].getAttribute("planid");
                let session =  await axios.post("http://localhost:3000/api/booking/createPaymentSession" , {planId : planId });
                let sessId = session.data.session.id;
                let result = await stripe.redirectToCheckout({ sessionId: sessId });
                console.log(result);
            }
        }
        catch(error){
            alert(error.message);
        }
    })
}

let want_to_rate_us_Buttons = document.querySelectorAll(".plan-describe-page-review-button");
let reviewSubmitButton = document.querySelectorAll(".my-review-section-submit");
let rating_input =document.querySelectorAll("#my-review-rating")
let rating_message =document.querySelectorAll("#my-review-message")


for(let i=0;i<want_to_rate_us_Buttons.length;i++){
    want_to_rate_us_Buttons[i].addEventListener("click",function(){
        // console.log("hii");
        if(allLis.length < 6){
            window.location.href = "/login";
        }
        want_to_rate_us_Buttons[i].parentElement.parentElement.parentElement.classList.add("plan-no-see")
        want_to_rate_us_Buttons[i].parentElement.parentElement.parentElement.parentElement.lastElementChild.classList.remove("plan-no-see");
        document.querySelectorAll(".my-review-section-cancel")[i*2].addEventListener("click",function(){
            want_to_rate_us_Buttons[i].parentElement.parentElement.parentElement.parentElement.lastElementChild.classList.add("plan-no-see");
            want_to_rate_us_Buttons[i].parentElement.parentElement.parentElement.classList.remove("plan-no-see")
        })

        reviewSubmitButton[i*2].addEventListener("click",async function(){
            if(rating_input[i*2].value && rating_message[i*2].value){
                let message = rating_message[i*2].value;
                let rating = rating_input[i*2].value;
                let planId = document.querySelectorAll(".plans-describe-section-with-review-1")[i*2].firstElementChild.getAttribute("src");
                let mainPlanId = document.querySelectorAll(".my-review-section-submit")[i*2].getAttribute("planId");
                let obj = await axios.post("http://localhost:3000/api/review",{message:message,planId:planId,rating:rating,mainPlanId:mainPlanId});
                console.log(obj);
                rating_message[i*2].value ="";
                rating_input[i*2].value = "";
                window.location.href = "/reviews";
            }
        })
    })
}

let want_to_rate_us_Buttons1 = document.querySelectorAll(".featured-plan-1-1-want-to-buy");

for(let i=0;i<want_to_rate_us_Buttons1.length;i++){
    want_to_rate_us_Buttons1[i].addEventListener("click",function(){
        // console.log("hii");
        if(allLis.length < 6){
            window.location.href = "/login";
        }
        want_to_rate_us_Buttons1[i].parentElement.parentElement.parentElement.parentElement.classList.add("plan-no-see");
        want_to_rate_us_Buttons1[i].parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.classList.remove("plan-no-see");
        document.querySelectorAll(".my-review-section-cancel")[(i*2) + 1].addEventListener("click",function(){
            want_to_rate_us_Buttons1[i].parentElement.parentElement.parentElement.parentElement.classList.remove("plan-no-see");
            want_to_rate_us_Buttons1[i].parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.classList.add("plan-no-see");
        })

        reviewSubmitButton[(i*2) + 1].addEventListener("click",async function(){
            if(rating_input[(i*2)+1].value && rating_message[(i*2)+1].value){
                let message = rating_message[(i*2) + 1].value;
                let rating = rating_input[(i*2) + 1].value;
                let planId = document.querySelectorAll(".plans-describe-section-with-review-1")[(i*2) + 1].firstElementChild.getAttribute("src");
                let mainPlanId = document.querySelectorAll(".my-review-section-submit")[(i*2) + 1].getAttribute("planId")
                let obj = await axios.post("http://localhost:3000/api/review",{message:message,planId:planId,rating:rating,mainPlanId:mainPlanId});
                console.log(obj);
                rating_message[(i*2) + 1].value ="";
                rating_input[(i*2) + 1].value = "";
                window.location.href = "/reviews";
            }
        })
    })
}

