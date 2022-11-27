const banner2=document.querySelector(".container .banner2")

window.addEventListener('scroll',function(e){
    // console.log(window.scrollY);
    // console.log(document.body.offsetHeight)
    
    let position=Math.floor(window.scrollY/document.body.offsetHeight*200)*1.5
    banner2.style.backgroundPosition=`0% ${100-position+100}%`
})