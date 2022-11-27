const card=document.querySelector(".container .right .display .card")
const searchInput=document.querySelector(".container .right .display .search")
const productFindSubmit=document.querySelector(".container .right .display .productFindSubmit")
const collapseBtn=document.querySelector(".container .leftBar .collapse")
const leftOptions=document.querySelectorAll(".container .leftBar .box .category .option")
const leftLogo=document.querySelector(".container .leftBar .heading")
const leftBar=document.querySelector(".container .leftBar")
let collapseFlag=true;
collapseBtn.addEventListener('click',function(){
    if(collapseFlag===false){
        collapseFlag=true
        this.children[0].style.transform="rotate(180deg)"
        for(let i=0;i<leftOptions.length;i++){
            console.log(leftOptions[i])
            leftOptions[i].children[1].style.display="none"
            
            leftOptions[i].children[0].children[1].style.display="none"
            leftOptions[i].children[1].style.opacity="0"
            leftOptions[i].children[0].children[1].style.opacity="0"
        }
        leftLogo.children[0].innerText="L"
        if(document.querySelector('.container').clientWidth<1000){
            leftBar.style.left="-300px";

        }
        else
        leftBar.style.width="76px";
    }
    else{
        collapseFlag=false
        this.children[0].style.transform="rotate(0deg)"
        leftLogo.children[0].innerText="LOGO"
        if(document.querySelector('.container').clientWidth<1000){
            leftBar.style.left="0px";

        }
        else
        leftBar.style.width="260px";
        setTimeout(() => {
            for(let i=0;i<leftOptions.length;i++){
                console.log(leftOptions[i])
                leftOptions[i].children[1].style.opacity="1"
                leftOptions[i].children[0].children[1].style.opacity="1"
                leftOptions[i].children[1].style.display="flex"
                leftOptions[i].children[0].children[1].style.display="inline"
            }
            
        }, 300);
    }
})
const allProducts=async()=>{
    try {
        const {data:{productOutput}}=await axios.get('/adminPanel/api/v1/adminProducts')
        for(let i=0;i<productOutput.length;i++){
            card.innerHTML+=`
            <div class="product">
                        <div class="productInfo">
                            <span class="elm">${productOutput[i].p_id}</span>
                            <span class="elm">${productOutput[i].p_name}</span>
                            <span class="elm">${productOutput[i].p_price}$</span>
                            <a href="editProduct.html?id=${productOutput[i]._id}" class="elm"><i class="elm fa-solid fa-pen-to-square"></i></a>

                        </div>
                        
                    </div>
            `
        }
    } catch (error) {
        console.log(error);
    }
}
productFindSubmit.addEventListener('submit',async(e)=>{
    e.preventDefault()
})
searchInput.addEventListener('input',function(){
    
    findProduct(this.value)
})
const findProduct=async(name)=>{
    try {
        
        await axios.post("/adminPanel/api/v1/adminProducts",{
            name:name
        }).then((response)=>{
            // console.log(response.data.resultProducts)
            card.innerHTML=``;
            for(let i=0;i<response.data.resultProducts.length;i++){
                card.innerHTML+=`
                <div class="product">
                            <div class="productInfo">
                                <span class="elm">${response.data.resultProducts[i].p_id}</span>
                                <span class="elm">${response.data.resultProducts[i].p_name}</span>
                                <span class="elm">${response.data.resultProducts[i].p_price}$</span>
                                <a href="editProduct.html?id=${response.data.resultProducts[i]._id}" class="elm"><i class="elm fa-solid fa-pen-to-square"></i></a>
    
                            </div>
                            
                        </div>
                `
            }
        })
        // console.log(returnProduct)
    } catch (error) {
        console.log(error)
    }
}
console.log("working")
allProducts()