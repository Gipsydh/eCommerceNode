NodeList.prototype.addEventListener = function (event_name, callback, useCapture) {
    for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(event_name, callback, useCapture);
    }
};
let footer=document.querySelector(".container .footer")
footer.innerHTML=`<div class="footerContainer">

<div class="upper">
    <div class="col col1">
        <div class="heading">
            <span>Store Information</span>
        </div>
        <div class="options">
            <div class="option">
                <i class="fa-solid fa-location-dot"></i>
                <span>Demo store United States</span>
            </div>
            <div class="option">
                <i class="fa-solid fa-envelope"></i>
                <span>demo@gmail.com</span>
            </div>
            <div class="option">
                <i class="fa-solid fa-phone"></i>
                <span>0123456789</span>
            </div>
        </div>
    </div>
    <div class="colMobile">
        <div class="heading">
            <span>Store Information</span>
        </div>
        <i class="fa-solid fa-plus"></i>
    </div>
    <div class="options colMobileMore">
        <div class="option">
            <i class="fa-solid fa-location-dot"></i>
            <span>Demo store United States</span>
        </div>
        <div class="option">
            <i class="fa-solid fa-envelope"></i>
            <span>demo@gmail.com</span>
        </div>
        <div class="option">
            <i class="fa-solid fa-phone"></i>
            <span>0123456789</span>
        </div>
    </div>
    <div class="col col2">
        <div class="heading">
            <span>Extras</span>
        </div>
        <div class="options">
            <div class="option">
                <span>Brands</span>
            </div>
            <div class="option">
                <span>Gift Certificates</span>
            </div>
            <div class="option">
                <span>Specials</span>
            </div>
        </div>
    </div>
    <div class="colMobile">
        <div class="heading">
            <span>Extras</span>
        </div>
        <i class="fa-solid fa-plus"></i>

    </div>
    <div class="options colMobileMore">
        <div class="option">
            <span>Brands</span>
        </div>
        <div class="option">
            <span>Gift Certificates</span>
        </div>
        <div class="option">
            <span>Specials</span>
        </div>
    </div>
    <div class="col col3">
        <div class="heading">
            <span>My Account</span>
        </div>
        <div class="options">
            <div class="option">
                <span>My Account</span>
            </div>
            <div class="option">
                <span>Order History</span>
            </div>
            <div class="option">
                <span>Wish List</span>
            </div>
        </div>
    </div>
    <div class="colMobile">
        <div class="heading">
            <span>My Account</span>
            
        </div>
        <i class="fa-solid fa-plus"></i>
    </div>
    <div class="options colMobileMore">
        <div class="option">
            <span>My Account</span>
        </div>
        <div class="option">
            <span>Order History</span>
        </div>
        <div class="option">
            <span>Wish List</span>
        </div>
    </div>
    
    <div class="col col4">
        <div class="heading">
            <i class="fa-solid fa-envelope-open"></i>
            <span>Sign Up For Newsletter</span>
        </div>
        <div class="options">
           <form action="">
               <input type="text" placeholder="Enter your E-mail address">
               <input type="submit" value="Subscribe">
           </form>
        </div>
    </div>
</div>
<div class="lower">
    <div class="socials">
        <div class="socialBlock">
            <div class="social">
                <i class="fa-brands fa-twitter"></i>
            </div>
            <div class="social">
                <i class="fa-brands fa-linkedin"></i>
            </div>
            <div class="social">
                <i class="fa-brands fa-instagram"></i>
            </div>
            <div class="social">
                <i class="fa-brands fa-facebook-f"></i>
            </div>
        </div>
    </div>
    <div class="options">
        <div class="option">
            <span>Specials</span>
        </div>
        <div class="option">
            <span>Site Map</span>
        </div>
        <div class="option">
            <span>Wish List</span>
        </div>
        <div class="option">
            <span>Contact Us</span>
        </div>
        <div class="option">
            <span>Brands</span>
        </div>
    </div>
    <div class="copyright">
        <span>Powered By me Your Store &#169; 2022</span>
    </div>
</div>
</div>`
const footerMoreOptns=document.querySelectorAll(".container .footer .footerContainer .upper .colMobile")
footerMoreOptns.addEventListener('click',function(){
    if(this.childNodes[3].outerHTML==='<i class="fa-solid fa-plus"></i>'){

        this.childNodes[3].outerHTML=`<i class="fa-solid fa-minus"></i>`
        // const temp1height=this.nextElementSibling.childNodes[1].innerHeight;
        // console.log(this.nextElementSibling.children.length)
        // console.log(this.nextElementSibling.childNodes[1].offsetHeight)
        this.nextElementSibling.style.height=`${this.nextElementSibling.children.length*(this.nextElementSibling.childNodes[1].offsetHeight+8)}px`
    }
    else{
        this.childNodes[3].outerHTML=`<i class="fa-solid fa-plus"></i>`
        this.nextElementSibling.style.height="0px"
    }
})