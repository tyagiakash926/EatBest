let buyPlansButtons = document.querySelectorAll(".plans-section-2-plans-plan-no-1-buynow");
let buyPlansButtons2 = document.querySelectorAll(".featured-plan-1-1-price-buynow");


let allLis = document.querySelectorAll(".showcase-ul li");
const stripe = Stripe('pk_test_51I57ncLVmgB2cGGSLTxe7cyoDYqz4BjMjxeqr2UsLxPXzsvzNyghl9JVhavqXocURt0xDe9OBOPKB5QXkJ50QjDi00Qq6bLtbN');
for(let i=0 ; i<buyPlansButtons.length ; i++){
    document.querySelector(".header-nav-bar").style.display = "none";
    buyPlansButtons[i].addEventListener("click" , async function(){
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
function myfunction(){
    preloader.style.display="none";
  }
