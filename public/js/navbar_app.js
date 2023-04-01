const shopDDlist = document.querySelector(".ddShop .ddShopInfo")
const shopDDlistMob = document.querySelector(".navbar .checking .ddShopInfo")
const accountsBtn = document.querySelector(".container .navbar .topBar .accounts")
const shopBtn=document.querySelector(".container .navbar .bottomBar .bottomNavbar .shopNavbar")
shopBtn.addEventListener("click",function(){
    window.location.href="../shop/shop.html?pageId=1"
})
function goToHome() {
    console.log("working")
    window.location.href = "/"
}
console.log(accountsBtn)
// const checkStatus=async()=>{
//     const resp=await axios.get('/api/v1/currStatus')
//     console.log(resp.body)
// }
document.querySelector(".container .navbar .bottomBar .bottomNavbar .homeNavbar").addEventListener('click',function(){
    window.location.href="../../index.html"
})
document.querySelector(".ddShopLink").addEventListener("click",(e)=>{
    if(e.target.classList.contains("ddShopLink") || e.target.tagName==="SPAN"){

        window.location.href="../../shop/shop.html?pageId=1"
    }
    // console.log(e.target.tagName)
    // console.log(e.target)
})
document.querySelector(".ddHomeInfo").addEventListener("click",(e)=>{
    if(e.target.classList.contains("ddHomeInfo")|| e.target.tagName==="SPAN"){
        window.location.href="/"
    }
    console.log(e.target)

})
accountsBtn.addEventListener('click', async (e) => {
    console.log("yes")
    await axios.get('/api/v1/currStatus').then((response) => {
        if (response.status === 200) {
            window.location.href = "../../userProfile/userProfile.html"
        }
    }).catch((err) => {
        if (err.response.status === 401) {
            window.location.href = "../login/index.html"
        }
    })

})

const navbarShow = async () => {
    try {

        const { data: { productOutput } } = await axios.get('/api/v1/products')

        groupProductObject = productOutput
        let groups = groupProductObject.reduce((types, item) => {
            const type = (types[item.p_type] || []);
            type.push(item);
            types[item.p_type] = type;
            return types;
        }, {});


        let productTypes = productOutput.map((product) => {
            const { p_type } = product
            return p_type
        })
        productTypes = [...new Set(productTypes)]

        for (let i = 0; i < productTypes.length; i++) {

            shopDDlistMob.innerHTML += `<div class="listHead">
            <span>${productTypes[i]}</span>
        </div>`
            shopDDlist.innerHTML += ` <div class="listHead">
            <span>${productTypes[i]}</span>
        </div>`

            productOutput.map((product) => {
                const { _id, p_type, p_name, p_rating } = product
                if (p_type === productTypes[i] && p_rating >= 4.5) {
                    shopDDlist.innerHTML += ` <div class="listItems">
                    <a href="/productInfo/productInfo.html?prod_id=${_id}" style="color:#666666";><span>${p_name}</span></a>
                </div>`
                    shopDDlistMob.innerHTML += ` <div class="listItems">
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
try {
    const headerPoster = document.querySelector(".headerPoster")
    window.addEventListener('scroll', function () {
        // console.log(window.scrollY);
        // console.log(document.body.offsetHeight)
        if (headerPoster != null) {

            let position = (window.scrollY / 5000 * 100) * 8
            headerPoster.style.backgroundPosition = `0% ${(50 - position)}%`
        }
    })

} catch (error) {
    console.log("checked")
}
const searchInput = document.querySelector(".searchScreen .searchBox .searchBar input")
const searchOutput = document.querySelector(".searchScreen .searchBox .outputBar")
searchInput.addEventListener("input", async (e) => {
    console.log(searchInput.value)
    if (searchInput.value != "") {
        axios.get("/api/v1/searchProduct", {
            params: {
                prodName: searchInput.value
            }
        }).then((response) => {
            let addedDiv = ""

            for (let i = 0; i < response.data.length; i++) {
                if (i == 5) {
                    break
                }
                addedDiv += `<a href="../productInfo/productInfo.html?prod_id=${response.data[i]._id}"><div class="searchProductCard">
                <div class="img">
                    <img src="../resources/${response.data[i].p_id}.0.jpg"></img>
                </div>
                <div class="productName">
                    <span>${response.data[i].p_name}</span>
                </div>
                <div class="productPrice">
                    <span style="font-weight:bold;">${response.data[i].p_price}$</span>
                </div>
            </div></a>`
            }
            searchOutput.innerHTML = addedDiv
        })

    }
    else {
        searchOutput.innerHTML = ""
    }
})
const cartDD = document.querySelector(".cartDD")
const cartBtn = document.querySelector(".container .navbar .bottomBar .sideNavs .cart")
const cartBG = document.querySelector(".container .cartBG")
const navbarElmOp = document.querySelectorAll(".navbarElmOp")
const cartInnerAdd = document.querySelector(".cartDD .cartProd")
const cartElm = document.querySelectorAll(".cartElm")
const emptyCart = document.querySelector(".emptyCart")
const cartDetails = async () => {

    await axios.get("/api/v1/addToCartDetails").then(async (response) => {
        let cartInnerText = "<table class='cartTable'>"
        if (response.data.msg === "the cart is empty") {
            console.log("no cart")
            for (let i = 0; i < cartElm.length; i++) {
                cartElm[i].style.display = 'none'
            }
            emptyCart.style.display = "block"
        }
        else {
            for (let i = 0; i < cartElm.length; i++) {
                cartElm[i].style.display = 'block'
            }
            emptyCart.style.display = "none"
            document.querySelector(".container .navbar .bottomBar .sideNavs .cart .count span").innerText = response.data.resp.length
            for (let i = 0; i < response.data.resp.length; i++) {

                console.log(response.data.resp[i].p_name)
                await axios.get("/api/v1/getSingleProductCart", {
                    params: {
                        prodId: response.data.resp[i].p_id,
                        prodObjId: response.data.resp[i].p_obj_id
                    }
                }).then((response1) => {
                    console.log(response1)
                    let prodPrice = 0;

                    if (response1.data[0].p_discPrice > 0) {
                        prodPrice = response1.data[0].p_discPrice
                    }
                    else {
                        prodPrice = response1.data[0].p_price
                    }
                    cartInnerText += ` <tr>
                    <td> <img src="../resources/cart-1.jpg" alt=""></td>
                    <td>${response.data.resp[i].p_name}</td>
                    <td>${response.data.resp[i].p_count}</td>
                    <td class="cartProdPrice">${prodPrice*response.data.resp[i].p_count}$</td>
                    </tr>`
                })
            }
        }
        console.log(cartInnerText + "</table>")
        cartInnerAdd.innerHTML = cartInnerText
        let totalPrice=0;
        const cartProdPrice=document.querySelectorAll(".cartProdPrice")
        for(let i=0;i<cartProdPrice.length;i++){
            totalPrice+=parseFloat(cartProdPrice[i].innerText)
        }
        document.querySelector(".totalCartPrice").innerText=`${totalPrice}$`


    }).catch((e) => {
        console.log(e)
        for (let i = 0; i < cartElm.length; i++) {
            cartElm[i].style.display = 'none'
        }
        emptyCart.style.display = "block"

    })
}

cartDetails()
setTimeout(() => {
  
    cartBG.style.height = `${document.querySelector("body").clientHeight}px`
}, 1000);
cartBtn.addEventListener("click", (e) => {
    if (window.getComputedStyle(cartDD).getPropertyValue("height") === "0px") {
        cartDetails().then((response) => {
            cartBG.style.display = "block"
            // cartBG.classList.remove("searchScreenOff")
            // cartDD.style.padding="20px"

            let cartHeight = 0;

            for (let i = 0; i < cartDD.children.length; i++) {
                if (window.getComputedStyle(cartDD.children[i]).getPropertyValue("display") != "none") {

                    cartHeight += cartDD.children[i].scrollHeight;
                    // for(let j=0;j<cartDD.children[i].children.length;j++){
                    //     cartHeight+=parseInt(window.getComputedStyle(cartDD.children[i].children[j]).getPropertyValue("margin-top"))
                    //     cartHeight+=parseInt(window.getComputedStyle(cartDD.children[i].children[j]).getPropertyValue("margin-bottom"))


                    // }
                    cartHeight += parseInt(window.getComputedStyle(cartDD.children[i]).getPropertyValue("margin-top"))
                    cartHeight += parseInt(window.getComputedStyle(cartDD.children[i]).getPropertyValue("margin-bottom"))
                    // cartHeight += parseInt(window.getComputedStyle(cartDD.children[i]).getPropertyValue("padding-top"))
                    // cartHeight += parseInt(window.getComputedStyle(cartDD.children[i]).getPropertyValue("padding-bottom"))

                }
                // cartHeight+=parseInt(window.getComputedStyle(cartDD).getPropertyValue("padding-top"))
                //     cartHeight+=parseInt(window.getComputedStyle(cartDD).getPropertyValue("padding-bottom"))
            }
            if(window.getComputedStyle(emptyCart).getPropertyValue("display") ==="none"){

                cartDD.style.height = `${cartHeight-25}px`
            }
            else{
                cartDD.style.height = `${cartHeight}px`

            }


        })




    }
    else {
        cartBG.style.animation = "none"
        // cartBG.classList.add("searchScreenOff")
        cartBG.style.animation = "searchDeactive 0.5s 1"

        cartDD.style.height = "0px"
        setTimeout(() => {
            cartBG.style.animation = "searchActive 0.5s 1"

            // cartDD.style.padding="0px"
            cartBG.style.display = "none"

        }, 300);

    }

})
const cartCheckout = document.querySelector(".cartCheckout")
cartCheckout.addEventListener('click', async () => {
    await axios.get("/api/v1/addToCartDetails").then((response) => {
        let paramPayloadID = ""
        let paramPayloadCount = ""
        paramPayloadID = "prodId=" + response.data.resp.map(u => u.p_obj_id).join(",")
        paramPayloadCount = "prodCount=" + response.data.resp.map(u => u.p_count).join(",")

        // for(let i=0;i<response.data.resp.length;i++){
        //     paramPayloadID+=`${response.data.resp[i].p_obj_id}&prodCount=${response.data.resp[i].p_count}`
        // }
        window.location.href = `../../productPurchase/prodPurchase.html?${paramPayloadID}&${paramPayloadCount}`
    })
})
