NodeList.prototype.addEventListener = function (event_name, callback, useCapture) {
    for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(event_name, callback, useCapture);
    }
};
const MainBannerCards=document.querySelectorAll(".container .mainBanner .card")
const MainBannerCardsNavs=document.querySelectorAll(".container .mainBanner .mainBannerNav .mainBannerNavBtn")

var arr = Array.prototype.slice.call(MainBannerCardsNavs);
let i=0;
function rollingover(){
    if(i===MainBannerCards.length){
        i=0
    }
    
    for(let j=0;j<MainBannerCards.length;j++){
        MainBannerCards[j].style.display="none"
    }
    MainBannerCards[i].style.display="flex"
    i++
}
rollingover()
mainBannerRollover=setInterval(rollingover, 3000);
MainBannerCardsNavs.addEventListener('click',function(){
   i=arr.indexOf(this)
   rollingover()
  clearInterval(mainBannerRollover)
  mainBannerRollover=setInterval(rollingover, 3000);

})




