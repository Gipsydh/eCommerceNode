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
