function dropdownOptions(){
 console.log("ok")

}
let HeaderMenuTrigger=true
const HeaderMobileMenu=document.querySelector(".navbar .checking")
document.querySelector(".container .navbar .bottomBar .mobileNavbarMenu .btn").addEventListener('click',function(){
    if(HeaderMenuTrigger){
        HeaderMobileMenu.style.height="auto"
        HeaderMenuTrigger=false;
        HeaderMobileMenu.style.padding="20px"


    }
    else{
        HeaderMobileMenu.style.height="0px"
        HeaderMenuTrigger=true;
        HeaderMobileMenu.style.padding="0px"



    }
})
document.querySelectorAll(".navbar .checking .option .more").addEventListener('click',function(){
    if(this.classList.contains('more')){
        this.classList.remove('more')
        this.classList.add("less")
        this.innerHTML='<i class="fa-solid fa-minus"></i>'
        const thisStyle=getComputedStyle(this.parentNode.nextElementSibling.childNodes[1])
        
        const thisLength=this.parentNode.nextElementSibling.childElementCount;
        const thisHeight=thisStyle.height;
        console.log(thisLength)
        this.parentNode.nextElementSibling.style.height=`calc(${thisHeight}*${thisLength})`
    }
    else{
        this.classList.remove('less')
        this.classList.add("more")
        this.parentNode.nextElementSibling.style.height="0px"

        this.innerHTML='<i class="fa-solid fa-plus"></i>'
    }
})

