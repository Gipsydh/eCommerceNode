function viewFunc(parameter) {

    const showProducts = document.querySelectorAll(".productArea .showProducts .card")
    const showProductOption = document.querySelectorAll(".productArea .arrange .showingOptn")
    showProductOption.addEventListener("click", function () {

        let tempOptn = ""
        if (this.classList.contains("gridView")) {
            tempOptn = "grid"
        }
        else if (this.classList.contains("listView")) {
            tempOptn = "list"
        }
        else {
            tempOptn = "sort"
        }
        
        
        for (let i = 0; i < showProducts.length; i++) {
            showProducts[i].classList.remove('grid')
            showProducts[i].classList.remove('list')
            showProducts[i].classList.remove('sort')
            showProducts[i].classList.add(tempOptn)

        }
        document.cookie = `cardview=${tempOptn}`
    })
    if(getCookie('cardview')!=null){
        if(getCookie("cardview")==="grid"){
            document.querySelector(".gridView").click()
        }
        else if(getCookie("cardview")==="list"){
            console.log(getCookie('cardview'))
            const something=document.querySelector(".listView")
            something.click()
        }
        else{
            const sortView=document.querySelector(".sortView")
            sortView.click()
        }
    }
}
viewFunc()
const showProductsInner = document.querySelector(".productArea .showProducts")

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const getAllProduct = async () => {
    // const payload={}
    // payload.minPrice=parseInt(document.querySelector(".min_val").value)
    // payload.maxPrice=parseInt(document.querySelector(".max_val").value)
    document.querySelector(".min_val").value = getCookie("minPrice")
    document.querySelector(".max_val").value = getCookie("maxPrice")
    // if(payload.minPrice>payload.maxPrice){
    //    setTimeout(() => {
    //     let temp=payload.minPrice
    //     payload.minPrice=payload.maxPrice
    //     document.querySelector(".min_val").value=payload.maxPrice
    //     payload.maxPrice=temp;
    //     document.querySelector(".max_val").value=temp
    //    }, 2000);
    // }
    // const tempCompArr=[]
    // const companyChecked=document.querySelectorAll(".company")
    // for(let i=0;i<companyChecked.length;i++){
    //     if(companyChecked[i].checked){
    //         tempCompArr.push(companyChecked[i].nextElementSibling.innerText.toLowerCase())
    //     }
    // }
    // const tempSizeArr=[]
    // const sizeChecked=document.querySelectorAll(".size")
    // for(let i=0;i<sizeChecked.length;i++){
    //     if(sizeChecked[i].checked){
    //         tempSizeArr.push(sizeChecked[i].nextElementSibling.innerText)
    //     }
    // }
    await axios.get("/api/v1/getAllProducts", {
        params: {
            pageId: pageId
        }
    }).then((response) => {
        let addTemp2 = ""
        viewPageList(10, response.data.totalProd)

        for (let i = 0; i < response.data.response.length; i++) {
            let p_rating = response.data.response[i].p_rating
            p_rating = (100 * p_rating) / 5;

            addTemp2 += `<a href="../productInfo/productInfo.html?prod_id=${response.data.response[i]._id}" class="card grid">
            <div class="img">
                <img src="../../resources/${response.data.response[i].p_id}.0.jpg" alt="">
            </div>
            <div class="bind">
                <div class="bind2">

                    <div class="rating">
                    <div class="box blank">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div class="slider" style="transform:translateX(${p_rating}%)">

                </div>
                <div class="fill">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                    </div>
                    <div class="name elm">
                        <span>${response.data.response[i].p_name}</span>
                    </div>
                </div>
                <div class="details elm">
                    <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, earum.</span>
                </div>
                <div class="price elm">
                    <span>${response.data.response[i].p_price}$</span>
                </div>
                <div class="moreOptns elm">
                    <div class="option addCart">
                        <i class="fa-solid fa-plus"></i>
                        <span>Add To Cart</span>
                    </div>
                    <div class="option wishList">
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="option compare">
                        <i class="fa-solid fa-copy"></i>
                    </div>
                    <div class="option view">
                        <i class="fa-regular fa-eye"></i>
                    </div>
                </div>
            </div>
        </a>`
        }

        showProductsInner.innerHTML = addTemp2
        viewPageList(payload.productPageLength, response.data.length)

        viewFunc()
    })
}
// getAllProduct()
