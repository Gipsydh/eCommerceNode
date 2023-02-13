
const category1=document.querySelector(".container .category1")
const trending1=document.querySelector(".container .trending1 .options")
const navbarShowHome=async()=>{
    try {

        const {data:{productOutput}} =await axios.get('/api/v1/products')
        for(let i=0;i<productOutput.length;i++){
            if(productOutput[i].p_trending){
                let flag=false;
                if(productOutput[i].p_discPrice>0){
                    flag=true;
                }
                trending1.innerHTML+=`
                <a class="card" href="./productInfo/productInfo.html?prod_id=${productOutput[i]._id}">
                <div class="productImg">
                    <div class="productState">
                        <div class="states discount ${flag}"><span>${Math.floor(100-(productOutput[i].p_discPrice/productOutput[i].p_price)*100)}%</span></div>
                        <div class="states newArrival blackBG ${productOutput[i].p_new}"><span>NEW</span></div>
                        <div class="states sale"><span>SALE</span></div>
                        <div class="states outOfStock blackBG ${productOutput[i].p_outOfStock}"><span>OUT STOCK</span></div>
                    </div>
                    <img src="../resources/${productOutput[i].p_id}.jpg" alt="">
                    <div class="productImgWrapper">
                        <div class="shortView productHoverView">
                            <i class="fa-solid fa-eye"></i>
                        </div>
                        <div class="longView productHoverView">
                            <i class="fa-solid fa-info"></i>
                        </div>
                    </div>
                </div>
                <div class="productInfo">
                    <div class="productName">
                        <span>${productOutput[i].p_name}</span>
                    </div>
                    <div class="productPrice">
                        <span class="${flag}">${productOutput[i].p_price}$</span>
                        <span class="newPrice newPrice${flag}">${productOutput[i].p_discPrice}$</span>
                    </div>
                </div>
            </a>
                `
            }
           
        }
        console.log(productOutput)
       
        groupProductObject=productOutput
        let groups = groupProductObject.reduce((types, item) => {
            const type= (types[item.p_type] || []);
            type.push(item);
            types[item.p_type] = type;
            return types;
        },{});
        groupsNames=Object.keys(groups)
        groups=Object.values(groups)
        for(let i=0;i<4;i++){
            category1.innerHTML+=` <div class="card">
            <div class="image">
                <img src="./resources/category1img-1.jpg" alt="">
            </div>
            <div class="categoryName">
                <span class="heading">${groupsNames[i]}</span>
                <span class="heading">Collection</span>
                <span class="desc">- ${groups[i].length} items -</span>
            </div>
        </div>`
        }
      
     
           
       


    } catch (err) {
        console.log(err);
    }
}
navbarShowHome()
