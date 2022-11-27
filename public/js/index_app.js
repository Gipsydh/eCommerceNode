const shopDDlist=document.querySelector(".ddShop .ddShopInfo")
const shopDDlistMob=document.querySelector(".navbar .checking .ddShopInfo")
const category1=document.querySelector(".container .category1")
const trending1=document.querySelector(".container .trending1 .options")
const navbarShow=async()=>{
    try {

        const {data:{productOutput}} =await axios.get('/api/v1/products')
        for(let i=0;i<productOutput.length;i++){
            if(productOutput[i].p_trending){
                let flag=false;
                if(productOutput[i].p_discPrice>0){
                    flag=true;
                }
                trending1.innerHTML+=`
                <div class="card">
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
            </div>
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
                const{p_type,p_name,p_rating}=product
                if(p_type===productTypes[i]&&p_rating>=4.5){
                    shopDDlist.innerHTML+=` <div class="listItems">
                    <span>${p_name}</span>
                </div>`
                shopDDlistMob.innerHTML+=` <div class="listItems">
                <span>${p_name}</span>
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
