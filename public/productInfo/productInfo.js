const params = window.location.search
const id = new URLSearchParams(params).get('prod_id')
console.log(id)
let sliderImg
const slider = document.querySelector(".productImages")
slider.scrollLeft*=0
let productCounter = 0;
const getOneProduct = async () => {
    try {
        await axios.get("/api/v1/oneProduct", {
            params: {
                id: id
            }
        }).then(async (response) => {
            let addImg = document.querySelector(".productImages")
            let addedImg = ""
            for (let i = 0; i < 3; i++) {
                addedImg += `<img src="../resources/${response.data.resultProducts[0].p_id}.${i}.jpg" style="min-width:100%;scroll-snap-align:start"></img>`
            }
            
            addImg.insertAdjacentHTML('beforeEnd', addedImg)
            console.log(response.data.resultProducts[0].p_name)
            let count1=0;
            sliderImg=document.querySelectorAll(".productImages img")
            for(let i=0;i<sliderImg.length;i++){
                sliderImg[i].style.display="none"
            }
            sliderImg[0].style.display="block"
            document.querySelector(".leftNav").addEventListener('click', function () {
                console.log(slider.scrollLeft)
                // sliderImg = document.querySelectorAll(".productImages img")
                // console.log(sliderImg.length)
                // slider.insertAdjacentHTML("afterBegin",sliderImg[sliderImg.length-1].outerHTML)
                // slider.scrollLeft-=document.querySelector(".productImages img").clientWidth
                // slider.removeChild(slider.lastChild)
                count1--;
                if(count1<0){
                    count1=sliderImg.length-1
                }
                for(let i=0;i<sliderImg.length;i++){
                    if(count1===i){
                        sliderImg[i].style.display="block"
                    }
                    else{
                        sliderImg[i].style.display="none"
                    }
                }
                
            })
            document.querySelector(".rightNav").addEventListener('click', function () {
                if(count1>=sliderImg.length-1){
                    count1=-1
                }
                count1++;
                for(let i=0;i<sliderImg.length;i++){
                    if(count1===i){
                        sliderImg[i].style.display="block"
                    }
                    else{
                        sliderImg[i].style.display="none"
                    }
                }
                
            })
            slider.scrollLeft=0
            document.querySelector(".container .productArea .review .revControl .countRev span").innerText = `${response.data.resultReview} Reviews`
            document.querySelector(".container .productArea .productName h1").innerHTML = response.data.resultProducts[0].p_name
            document.querySelector(".productCode").innerText = response.data.resultProducts[0].p_id
            document.querySelector(".container .productArea .productDetails .heading .p_brand").innerHTML = response.data.resultProducts[0].p_company
            let p_avail = "Out of Stock";
            if (response.data.resultProducts[0].p_quantity != 0) {
                productCounter = response.data.resultProducts[0].p_quantity
                p_avail = "In Stock"
                const OOF = document.querySelectorAll(".actions .outOfStock")
                console.log(OOF)
                for (let i = 0; i < OOF.length; i++) {
                    OOF[i].style.display = "none"
                }
            }
            else {
                const inStock = document.querySelectorAll(".inStock")
                for (let i = 0; i < inStock.length; i++) {
                    inStock[i].style.display = "none"
                }
            }
            document.querySelector(".container .productArea .productDetails .p_availablity").innerHTML = p_avail
            let p_rating = response.data.resultProducts[0].p_rating
            p_rating = (100 * p_rating) / 5;
            document.querySelector(".container .productArea .review .rating .slider").style.transform = `translateX(${p_rating}%)`
            let p_discPrice = "none"
            if (response.data.resultProducts[0].p_discPrice) {
                p_discPrice = "static"
                document.querySelector(".container .productArea .price .mainPrice").innerText = `$${response.data.resultProducts[0].p_discPrice}`

            }
            else {
                document.querySelector(".container .productArea .price .mainPrice").innerText = `$${response.data.resultProducts[0].p_price}`

            }
            document.querySelector(".container .headerPoster .posterContainer .productName span").innerHTML = `${response.data.resultProducts[0].p_name.toUpperCase()}`
            document.querySelector("title").innerText=`${response.data.resultProducts[0].p_name.toUpperCase()}-Information`
            document.querySelector(".container .headerPoster .posterContainer .productPath span").innerHTML = `${response.data.resultProducts[0].p_name}`
            document.querySelector(".container .productArea .price .discPrice").innerText = `$${response.data.resultProducts[0].p_price}`
            document.querySelector(".container .productArea .price .discPrice").style.display = p_discPrice

            await axios.get("/api/v1/relatedProduct", {
                params: {
                    p_type: response.data.resultProducts[0].p_type
                }
            }).then((response) => {
                console.log(response.data)
                const relatedProductList = document.querySelector(".container .productArea .relativeProduct .scrollOptns")
                for (let i = 0; i < response.data.length; i++) {
                    relatedProductList.innerHTML += ` <a class="productCard" href="/productInfo/productInfo.html?prod_id=${response.data[i]._id}">
                    <div class="productImg">
                        <img src="../resources/${response.data[i].p_id}.0.jpg" alt="">
                    </div>
                    <div class="productName">
                        <span>${response.data[i].p_name}</span>
                    </div>
                    <div class="price">
                        <span>${response.data[i].p_price}$</span>
                    </div>
                </a>`
                }
                const slideMoveBtns = document.querySelectorAll(".container .productArea .rel-nav .sliderMove")
                const productCard = document.querySelectorAll(".container .productArea .relativeProduct .scrollOptns .productCard")

                slideMoveBtns.addEventListener('click', (e) => {
                    if (e.target.parentNode.classList.contains('moveLeft')) {
                        scrollBox.scrollLeft -= productCard[0].clientWidth

                        console.log('left')
                    }
                    else if (e.target.parentNode.classList.contains('moveRight')) {
                        scrollBox.scrollLeft += productCard[0].clientWidth

                        console.log("right")
                    }

                    console.log(scrollBox.scrollLeft)
                })
            })
        })
        document.querySelector(".container").style.opacity = "1"
    } catch (error) {
        console.log(error)
    }
}
getOneProduct()
const formSubmitBtn = document.querySelector(".container .productArea .review .reviewTemplate .reviewForm .submitBtn input")
formSubmitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    let ratCount = null;
    const ratingCount = document.getElementsByName('inputRating')
    for (let i = 0; i < ratingCount.length; i++) {
        if (ratingCount[i].checked) {
            ratCount = ratingCount[i].value
        }
    }
    const obj = {
        prod_base_id: id,
        custName: document.querySelector('#reviewName').value,
        custReviewDetails: document.querySelector("#userReview").value,
        ratingCount: parseInt(ratCount)
    }

    let revError = document.querySelectorAll(".revError")
    await axios.post("/api/v1/productReview", obj).then((response) => {
        if (response.status === 200) {
            for (let i = 0; i < revError.length; i++) {
                revError[i].style.display = "none"
            }
            revError[1].style.display = "block";
        }
    }).catch((err) => {

        if (err.response.status === 401) {
            for (let i = 0; i < revError.length; i++) {
                revError[i].style.display = "none"
            }
            revError[0].style.display = "block";

        }
        else if (err.response.status === 400) {
            for (let i = 0; i < revError.length; i++) {
                revError[i].style.display = "none"
            }
            revError[2].style.display = "block";


        }
    }).finally(() => {
        document.body.scrollTop = document.querySelector(".container .productArea .description").offsetTop
        document.documentElement.scrollTop = document.querySelector(".container .productArea .description").offsetTop

    })
})
// const shopDDlist=document.querySelector(".ddShop .ddShopInfo")
// const shopDDlistMob=document.querySelector(".navbar .checking .ddShopInfo")

// const navbarShow=async()=>{
//     try {

//         const {data:{productOutput}} =await axios.get('/api/v1/products')

//         groupProductObject=productOutput
//         let groups = groupProductObject.reduce((types, item) => {
//             const type= (types[item.p_type] || []);
//             type.push(item);
//             types[item.p_type] = type;
//             return types;
//         },{});


//         let productTypes=productOutput.map((product)=>{
//             const{p_type}=product
//             return p_type
//         })
//         productTypes=[...new Set(productTypes)]

//         for(let i=0;i<productTypes.length;i++){

//             shopDDlistMob.innerHTML+=`<div class="listHead">
//             <span>${productTypes[i]}</span>
//         </div>`
//             shopDDlist.innerHTML+=` <div class="listHead">
//             <span>${productTypes[i]}</span>
//         </div>`

//             productOutput.map((product)=>{
//                 const{_id,p_type,p_name,p_rating}=product
//                 if(p_type===productTypes[i]&&p_rating>=4.5){
//                     shopDDlist.innerHTML+=` <div class="listItems">
//                     <a href="/productInfo/productInfo.html?prod_id=${_id}" style="color:#666666";><span>${p_name}</span></a>
//                 </div>`
//                 shopDDlistMob.innerHTML+=` <div class="listItems">
//                 <a href="/productInfo/productInfo.html?prod_id=${_id}" style="color:#666666";><span>${p_name}</span></a>

//             </div>`
//                 }
//             })
//         }
//         // console.log(productOutput)
//         // const allProducts=productOutput.map((product)=>{
//         //     const{p_name,p_type}=product

//         //     console.log(p_name)
//         //     console.log(p_type)
//         // })


//     } catch (err) {
//         console.log(err);
//     }
// }
// navbarShow()
// ...............................buttons&logics.......................
NodeList.prototype.addEventListener = function (event_name, callback, useCapture) {
    for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(event_name, callback, useCapture);
    }
};


function productQuantity(el) {
    var prodCounter = 0;
    if (el.classList.contains('minus')) {
        prodCounter = parseInt(el.nextElementSibling.children[0].innerText)
        if (prodCounter >= 2)
            el.nextElementSibling.children[0].innerText = prodCounter - 1;
    }
    else {
        prodCounter = parseInt(el.previousElementSibling.children[0].innerText)
        if (prodCounter < productCounter)
            el.previousElementSibling.children[0].innerText = prodCounter + 1;

    }
}
// const moveLeftNav=document.querySelector(".container .productArea .rel-nav .moveLeft")
// const moveRightNav=document.querySelector(".container .productArea .rel-nav .moveRight")
const scrollBox = document.querySelector(".container .productArea .relativeProduct .scrollOptns")

console.log(scrollBox.scrollWidth - scrollBox.clientWidth)
scrollBox.addEventListener('scroll', (e) => {
    console.log(scrollBox.scrollLeft)

    if (scrollBox.scrollLeft === 0) {

        document.querySelector(".container .productArea .rel-nav .moveLeft").style.color = "#e5e5e5"

    }
    else {
        document.querySelector(".container .productArea .rel-nav .moveLeft").style.color = "#777"

    }
    if (scrollBox.scrollLeft >= scrollBox.scrollWidth - scrollBox.clientWidth - 10) {
        document.querySelector(".container .productArea .rel-nav .moveRight").style.color = "#e5e5e5"

    }
    else {
        document.querySelector(".container .productArea .rel-nav .moveRight").style.color = "#777"

    }
})
const descElm = document.querySelectorAll(".container .productArea .description .descBox .descElm")
const descNavBtn = document.querySelectorAll(".container .productArea .description .header .descBtn")
for (let i = 0; i < descElm.length; i++) {
    descElm[i].style.display = "none"
}
descNavBtn[0].classList.add("descCurrInd")

descElm[0].style.display = "block"
descNavBtn.addEventListener('click', function () {

    if (this.classList.contains("btnDescription")) {
        for (let i = 0; i < descElm.length; i++) {
            descElm[i].style.display = "none"
            descNavBtn[i].classList.remove("descCurrInd")
        }
        descElm[0].style.display = "block"
        descNavBtn[0].classList.add("descCurrInd")

    }
    else if (this.classList.contains("btnSpcification")) {
        for (let i = 0; i < descElm.length; i++) {
            descElm[i].style.display = "none"
            descNavBtn[i].classList.remove("descCurrInd")

        }
        descElm[1].style.display = "block"
        descNavBtn[1].classList.add("descCurrInd")

    }
    else if (this.classList.contains("btnReview")) {
        for (let i = 0; i < descElm.length; i++) {
            descElm[i].style.display = "none"
            descNavBtn[i].classList.remove("descCurrInd")

        }
        descNavBtn[2].classList.add("descCurrInd")

        descElm[2].style.display = "block"

    }

})
const revBtn = document.querySelector(".container .productArea .review .revControl .writeRev")
revBtn.addEventListener('click', function () {
    document.body.scrollTop = document.querySelector(".container .productArea .description").offsetTop;
    document.documentElement.scrollTop = document.querySelector(".container .productArea .description").offsetTop;
    document.querySelector(".container .productArea .description .header .btnReview").click();
})
// function checkout(){

//     window.location.href=`../productPurchase/prodPurchase.html?prodId=${id}&prodCount=${parseInt(document.querySelector(".counter").innerText)}`
// }
document.querySelector(".checkOutBtn").addEventListener('click', async (e) => {
    try {

        await axios.get("/api/v1/checkQuantity", {
            params: {
                id: id
            }
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = `../productPurchase/prodPurchase.html?prodId=${id}&prodCount=${parseInt(document.querySelector(".counter").innerText)}`

            }

        }).catch((err) => {
            if (err.response.status === 400) {
                console.log("display")
                document.querySelector(".prodOUF").style.display = "block"
                document.querySelector(".prodOUF").classList.add("prodOUFup")
                for (let i = 0; i < document.querySelectorAll(".inStock").length; i++) {
                    document.querySelectorAll(".inStock")[i].style.display = "none"
                }
                for (let i = 0; i < document.querySelectorAll(".outOfStock").length; i++) {
                    document.querySelectorAll(".outOfStock")[i].style.display = "flex"
                }
                setTimeout(() => {
                    document.querySelector(".prodOUF").classList.remove("prodOUFup")

                    document.querySelector(".prodOUF").style.display = "none"


                }, 3700);
            }
        })
    } catch (error) {

    }
})
const addToCartBtn=document.querySelector(".container .productArea .actions .buyingOptn .addToCart")
addToCartBtn.addEventListener("click",async(e)=>{
    let obj={}
    obj.p_id=document.querySelector(".productCode").innerText
    obj.p_name=document.querySelector(".productName").innerText
    obj.p_obj_id=id
    obj.p_count=document.querySelector(".counter").innerText
    await axios.post("/api/v1/addToCart",obj).then((response)=>{
        const busket=document.querySelector(".container .productArea .actions .buyingOptn .addToCart i")
        const letter=document.querySelector(".container .productArea .actions .buyingOptn .addToCart span")
        
        busket.style.animation="bucketSwipe 1s 1"
        letter.style.animation="bucketLetter 1s 1"
        setTimeout(function(){
            busket.style.animation="none"
            letter.style.animation="none"
            // letter.style.animation="bucketLetter2 0.5s 1"
            busket.style.animation="bucketSwipe2 1s 1"
            letter.innerText="Added"
            console.log("time out")
        }, 1000);
        setTimeout(function() {
            busket.style.animation="none"
            letter.style.animation="none"
            letter.style.animation="bucketLetter2 0.5s 1"
            busket.style.animation="bucketSwipe2 1s 1"
            letter.innerText="Add more"
        }, 1000);
        cartDetails()
    }).catch((err)=>{
        window.location.href="../login/index.html"
    })
})



