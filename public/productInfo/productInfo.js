const params = window.location.search
const id = new URLSearchParams(params).get('prod_id')
console.log(id)

const getOneProduct=async()=>{
    try {
        await axios.get("/api/v1/oneProduct",{
           params:{
            id:id
           }
        }).then(async(response)=>{
            console.log(response.data[0].p_name)
            document.querySelector(".container .productArea .productName h1").innerHTML=response.data[0].p_name
            document.querySelector(".container .productArea .productDetails .heading .p_brand").innerHTML=response.data[0].p_company
            let p_avail="Out of Stock";
            if(response.data[0].p_outOfStock===false){
                p_avail="In Stock"
            }
            document.querySelector(".container .productArea .productDetails .p_availablity").innerHTML=p_avail
            let p_rating=response.data[0].p_rating
            p_rating=(100*p_rating)/5;
            document.querySelector(".container .productArea .review .rating .slider").style.transform=`translateX(${p_rating}%)`
            let p_discPrice="none"
            if(response.data[0].p_discPrice){
                p_discPrice="static"
            }
            document.querySelector(".container .productArea .price .mainPrice").innerText=`$${response.data[0].p_price}`
            document.querySelector(".container .headerPoster .posterContainer .productName span").innerHTML=`${response.data[0].p_name.toUpperCase()}`
            document.querySelector(".container .headerPoster .posterContainer .productPath span").innerHTML=`${response.data[0].p_name}`
            document.querySelector(".container .productArea .price .discPrice").innerText=`$${response.data[0].p_discPrice}`
            document.querySelector(".container .productArea .price .discPrice").style.display=p_discPrice
            
            await axios.get("/api/v1/relatedProduct",{
                params:{
                 p_type:response.data[0].p_type
                }
             }).then((response)=>{
                console.log(response.data)
                const relatedProductList=document.querySelector(".container .productArea .relativeProduct .scrollOptns")
                for(let i=0;i<response.data.length;i++){
                    relatedProductList.innerHTML+=` <a class="productCard" href="/productInfo/productInfo.html?prod_id=${response.data[i]._id}">
                    <div class="productImg">
                        <img src="../resources/related-1.jpg" alt="">
                    </div>
                    <div class="productName">
                        <span>${response.data[i].p_name}</span>
                    </div>
                    <div class="price">
                        <span>${response.data[i].p_price}$</span>
                    </div>
                </a>`
                }
                const slideMoveBtns=document.querySelectorAll(".container .productArea .rel-nav .sliderMove")
                const productCard=document.querySelectorAll(".container .productArea .relativeProduct .scrollOptns .productCard")

                slideMoveBtns.addEventListener('click',(e)=>{
                    if(e.target.parentNode.classList.contains('moveLeft')){
                        scrollBox.scrollLeft-=productCard[0].clientWidth
                       
                        console.log('left')
                    }
                    else if(e.target.parentNode.classList.contains('moveRight')){
                        scrollBox.scrollLeft+=productCard[0].clientWidth
                
                        console.log("right")
                    }
                
                    console.log(scrollBox.scrollLeft)
                })
             })
        })
        
    } catch (error) {
        console.log("error")
    }
}
getOneProduct()
const shopDDlist=document.querySelector(".ddShop .ddShopInfo")
const shopDDlistMob=document.querySelector(".navbar .checking .ddShopInfo")

const navbarShow=async()=>{
    try {

        const {data:{productOutput}} =await axios.get('/api/v1/products')
        
        groupProductObject=productOutput
        let groups = groupProductObject.reduce((types, item) => {
            const type= (types[item.p_type] || []);
            type.push(item);
            types[item.p_type] = type;
            return types;
        },{});
       
       
        let productTypes=productOutput.map((product)=>{
            const{p_type}=product
            return p_type
        })
        productTypes=[...new Set(productTypes)]
       
        for(let i=0;i<productTypes.length;i++){
           
            shopDDlistMob.innerHTML+=`<div class="listHead">
            <span>${productTypes[i]}</span>
        </div>`
            shopDDlist.innerHTML+=` <div class="listHead">
            <span>${productTypes[i]}</span>
        </div>`
           
            productOutput.map((product)=>{
                const{_id,p_type,p_name,p_rating}=product
                if(p_type===productTypes[i]&&p_rating>=4.5){
                    shopDDlist.innerHTML+=` <div class="listItems">
                    <a href="/productInfo/productInfo.html?prod_id=${_id}" style="color:#666666";><span>${p_name}</span></a>
                </div>`
                shopDDlistMob.innerHTML+=` <div class="listItems">
                <a href="/productInfo/productInfo.html?prod_id=${_id}" style="color:#666666";><span>${p_name}</span></a>
                
            </div>`
                }
            })
        }
        // console.log(productOutput)
        // const allProducts=productOutput.map((product)=>{
        //     const{p_name,p_type}=product
            
        //     console.log(p_name)
        //     console.log(p_type)
        // })


    } catch (err) {
        console.log(err);
    }
}
navbarShow()
// ...............................buttons&logics.......................
NodeList.prototype.addEventListener = function (event_name, callback, useCapture) {
    for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(event_name, callback, useCapture);
    }
};
const headerPoster=document.querySelector(".headerPoster")
window.addEventListener('scroll',function(e){
    // console.log(window.scrollY);
    // console.log(document.body.offsetHeight)
    
    let position=Math.floor(window.scrollY/document.body.offsetHeight*100)*1
    headerPoster.style.backgroundPosition=`0% ${(50+position)}%`
})
function productQuantity(el){
    console.log(el.nextElementSibling)
    if(el.classList.contains('minus')){
        var prodCounter=parseInt(el.nextElementSibling.children[0].innerText)
        if(prodCounter>=1)
        el.nextElementSibling.children[0].innerText=prodCounter-1;
    }
    else{
        var prodCounter=parseInt(el.previousElementSibling.children[0].innerText)
        el.previousElementSibling.children[0].innerText=prodCounter+1;
    }
}
// const moveLeftNav=document.querySelector(".container .productArea .rel-nav .moveLeft")
// const moveRightNav=document.querySelector(".container .productArea .rel-nav .moveRight")
const scrollBox=document.querySelector(".container .productArea .relativeProduct .scrollOptns")

console.log(scrollBox.scrollWidth-scrollBox.clientWidth)
scrollBox.addEventListener('scroll',(e)=>{
    console.log(scrollBox.scrollLeft)

    if(scrollBox.scrollLeft===0){
        
        document.querySelector(".container .productArea .rel-nav .moveLeft").style.color="#e5e5e5"

    }
    else{
        document.querySelector(".container .productArea .rel-nav .moveLeft").style.color="#777"

    }
    if(scrollBox.scrollLeft>=scrollBox.scrollWidth-scrollBox.clientWidth-10){
        document.querySelector(".container .productArea .rel-nav .moveRight").style.color="#e5e5e5"

    }
    else{
        document.querySelector(".container .productArea .rel-nav .moveRight").style.color="#777"

    }
})
// ........................api.............................

