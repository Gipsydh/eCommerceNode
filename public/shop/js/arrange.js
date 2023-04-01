const pageInfo = document.querySelector(".pageNumber .pageInfo")
const pageBack = document.querySelector(".pageNumber .pageNav .pageNumbers")
const params = window.location.search
const pageId = new URLSearchParams(params).get("pageId")
function viewPageList(length, totalProduct) {
    let pageCount = 1;
    let pageCont = totalProduct / length
    let remainder = totalProduct % length
    let addedData2 = ""
    for (let i = 0; i < pageCont; i++) {
        if(parseInt(pageId)===pageCount){

            addedData2 += `<a href="./shop.html?pageId=${pageCount}" class="pageCount elm btn" style="background-color:#222;">
            <span style="color:white">${pageCount}</span>
            </a>`
        }
        else{
            addedData2 += `<a href="./shop.html?pageId=${pageCount}" class="pageCount elm btn">
            <span>${pageCount}</span>
            </a>`
        }
        pageCount++;
    }
    if (remainder > 0) {
        pageCount++;
    }
    let addedData3=`Showing page ${(length*(parseInt(pageId)-1))+1} to ${length*parseInt(pageId)>totalProduct? totalProduct:length*parseInt(pageId)} of ${totalProduct} (${Math.ceil(pageCont)} pages)`
    document.querySelector(".pageNumber .pageInfo span").innerText=addedData3
    pageBack.innerHTML = addedData2
}
const addCompany = document.querySelector(".sortListContainer .sortList .options .companyList")
const getProductCompany = async () => {
    await axios.get("/api/v1/getProductCompany").then((response) => {
        let addTemp1 = ""
        for (let i = 0; i < response.data.length; i++) {
            addTemp1 += ` <div class="option">
            <input type="checkbox" class="company">
            <span>${response.data[i].c_name.toUpperCase()}</span>
        </div>`
        }
        addCompany.innerHTML = addTemp1
        getSortedProd("firstLoad")

    })
}

getProductCompany()
const listOptions = document.querySelectorAll(".sortListContainer .sortList .options .listOption")
listOptions.addEventListener("click", function () {

    if (this.children[1].classList.contains("fa-angle-down")) {
        this.nextElementSibling.style.padding = "0px"

        this.children[1].classList.remove("fa-angle-down")
        this.children[1].classList.add("fa-angle-up")
        this.nextElementSibling.style.height = "0px"
        // this.nextElementSibling.style.display="none"
    }
    else {

        this.children[1].classList.remove("fa-angle-up")
        this.children[1].classList.add("fa-angle-down")
        this.nextElementSibling.style.display = "block"
        let tempHeight = 0;
        for (let i = 0; i < this.nextElementSibling.children.length; i++) {
            tempHeight += this.nextElementSibling.children[i].clientHeight;


            tempHeight += parseInt(window.getComputedStyle(this.nextElementSibling.children[i]).getPropertyValue("margin-top"))
            tempHeight += parseInt(window.getComputedStyle(this.nextElementSibling.children[i]).getPropertyValue("margin-bottom"))
            // tempHeight+=parseInt(window.getComputedStyle(this.nextElementSibling.children[i]).getPropertyValue("padding-top"))
            // tempHeight+=parseInt(window.getComputedStyle(this.nextElementSibling.children[i]).getPropertyValue("padding-bottom"))



        }
        this.nextElementSibling.style.height = `${tempHeight}px`
        //    this.nextElementSibling.style.padding="10px 0"

    }
})
const sortList = document.querySelector(".sortListContainer .sortList")
const sortListContainer = document.querySelector(".sortListContainer")
const sortListCloseBtn = document.querySelector(".sortListContainer .sortList .closeBtn")
const sortListOpenBtn = document.querySelector(".productArea .arrange .sortNsizeNfilter .filterBox")
sortListCloseBtn.addEventListener("click", function () {
    sortList.style.transform = "translateX(100%)"

    setTimeout(() => {
        sortList.style.transform = "translateX(0%)"
        sortListContainer.style.display = "none"
    }, 500);
})
sortListOpenBtn.addEventListener("click", function () {
    sortListContainer.style.display = "block"
    sortList.style.transform = "translateX(100%)"

    setTimeout(() => {
        sortList.style.transform = "translateX(0%)"
    }, 1);

})
for (let i = 0; i < listOptions.length; i++) {
    listOptions[i].click()
}
const arrangeOver = document.querySelector(".arrangeOver")
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const getSortedProd = async (flag) => {
    if (flag === "firstLoad"&&getCookie("minPrice")!=null) {
        
        document.querySelector(".min_val").value = getCookie("minPrice")
        document.querySelector(".max_val").value = getCookie("maxPrice")
        document.querySelector(".productPageLength").value = getCookie("productPageLength")
        document.querySelector(".productSort").value = getCookie("productSort")
        const sizeChecked = document.querySelectorAll(".size")
        const companyChecked = document.querySelectorAll(".company")
        let sizeCookie = getCookie("selectedSize")
        let companyCookie = getCookie("selectedCompany")
        companyCookie = companyCookie.split(',')
        sizeCookie = sizeCookie.split(',')
        for (let i = 0; i < sizeChecked.length; i++) {

            if (sizeCookie.includes(sizeChecked[i].nextElementSibling.innerText)) {

                sizeChecked[i].checked = true
            }
        }
        for (let i = 0; i < companyChecked.length; i++) {
            if (companyCookie.includes(companyChecked[i].nextElementSibling.innerText.toLowerCase())) {

                companyChecked[i].checked = true
            }
        }
    }

    const payload = {}
    payload.minPrice = parseInt(document.querySelector(".min_val").value)
    payload.maxPrice = parseInt(document.querySelector(".max_val").value)
    // if(payload.minPrice>payload.maxPrice){
    //    setTimeout(() => {
    //     let temp=payload.minPrice
    //     payload.minPrice=payload.maxPrice
    //     document.querySelector(".min_val").value=payload.maxPrice
    //     payload.maxPrice=temp;
    //     document.querySelector(".max_val").value=temp
    //    }, 2000);
    // }
    const tempCompArr = []
    const companyChecked = document.querySelectorAll(".company")
    for (let i = 0; i < companyChecked.length; i++) {
        if (companyChecked[i].checked) {
            tempCompArr.push(companyChecked[i].nextElementSibling.innerText.toLowerCase())
        }
    }
    const tempSizeArr = []
    const sizeChecked = document.querySelectorAll(".size")
    for (let i = 0; i < sizeChecked.length; i++) {
        if (sizeChecked[i].checked) {
            tempSizeArr.push(sizeChecked[i].nextElementSibling.innerText)
        }
    }

    payload.selectedCompany = tempCompArr
    payload.selectedSize = tempSizeArr
    payload.productSort = document.querySelector(".productSort").value
    payload.productPageLength = document.querySelector(".productPageLength").value
    payload.pageId = pageId
    await axios.get("/api/v1/getSortedProducts", {
        params: {
            payload: payload
        }
    }).then((response) => {
        let addData = ""
        const showProductsInner1 = document.querySelector(".productArea .showProducts")

        for (let i = 0; i < response.data.response.length; i++) {
            let p_rating = response.data.response[i].p_rating
            p_rating = (100 * p_rating) / 5;
            let p_disc=0;
            let styleText=""
            let styleText2=`style="display:none;"`
            if(response.data.response[i].p_discPrice>0){
                p_disc=response.data.response[i].p_discPrice
                styleText=`style="text-decoration:line-through;font-size:12px;color:#929292;"`
                styleText2=`style="display:inline-block;"`
            }
            addData += `<a href="../productInfo/productInfo.html?prod_id=${response.data.response[i]._id}" class="card grid">
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
                    <span ${styleText}>${response.data.response[i].p_price}$</span>
                    <span ${styleText2}> ${response.data.response[i].p_discPrice}$</span>
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
        showProductsInner1.innerHTML = addData
        viewFunc()
        console.log(response.data.payloadSession)
        for (const key in response.data.payloadSession) {
            document.cookie = `${encodeURIComponent(key)}=${decodeURIComponent(response.data.payloadSession[key])}`
        }
        document.querySelector("title").innerText="Shop"

        viewPageList(payload.productPageLength, response.data.length)
    })
}
arrangeOver.addEventListener('input', async () => {
    await getSortedProd()
})

