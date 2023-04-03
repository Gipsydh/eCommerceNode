
const cartDetailsInfo = async () => {
    await axios.get("/api/v1/addToCartDetails").then((response) => {

        console.log(response)
        let addedVal = ` <tr>
        <th>Image</th>
        <th>Product Name</th>
        <th>Product ID</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total</th>
        </tr>`
        if(response.data.resp.length===0){
            document.querySelector(".emptyCartData").style.display="block"
            document.querySelector(".checkout").style.display="none"

        }
        else{
            document.querySelector(".emptyCartData").style.display="none"

        }
        for (let i = 0; i < response.data.resp.length; i++) {
            axios.get("/api/v1/getSingleProductCart", {
                params: {
                    prodId: response.data.resp[i].p_id,
                    prodObjId: response.data.resp[i].p_obj_id
                }
            }).then((response1) => {
                let prodPrice = 0;

                if (response1.data[0].p_discPrice > 0) {
                    prodPrice = response1.data[0].p_discPrice
                }
                else {
                    prodPrice = response1.data[0].p_price
                }
                addedVal += ` <tr>
                <td class="img"><img src="../resources/${response.data.resp[i].p_id}.0.jpg" alt=""></td>
                <td>${response.data.resp[i].p_name}</td>
                <td>product id</td>
                <td>
                    <div class="options">
                        <div class="option" style="padding:12px 18px;">
                            <span>${response.data.resp[i].p_count}</span>
                        </div>
                        <div class="option btn removeCart" data-value="${response.data.resp[i]._id}" title="remove">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                </td>
                <td>${prodPrice}$</td>
                <td>${prodPrice * response.data.resp[i].p_count}$</td>
            </tr>`
            document.querySelector(".tableWrap table").innerHTML = addedVal
            const removeCart = document.querySelectorAll(".removeCart")
        console.log(removeCart)
        removeCart.addEventListener("click", async (e) => {
            if (confirm("Are you sure to want to remove this product from the cart?") == true) {
                let dataValue=""
                let currentClass=""
                if(e.target.classList.contains("fa-circle-xmark")){
                    dataValue=e.target.parentNode.getAttribute("data-value")
                    currentClass=e.target.parentNode
                }
                else{
                    dataValue=e.target.getAttribute("data-value")
                    currentClass=e.target
                }
                console.log(dataValue)
                await axios.post("/api/v1/removeProductCart",{_id:dataValue}).then((response)=>{
                    console.log(currentClass)
                    currentClass.parentNode.parentNode.parentNode.style.transition="0.3s ease-in-out"

                    currentClass.parentNode.parentNode.parentNode.style.opacity="0.4"
                    currentClass.parentNode.parentNode.parentNode.style.pointerEvents="none"

                })
            }
            else {
                console.log("no")
            }
        })

        })
    }
        
    }).catch((err)=>{
        document.querySelector(".checkout").style.display="none"
        document.querySelector(".emptyCartData").style.display="block"

    })
}
cartDetailsInfo()
document.querySelector(".checkout").addEventListener("click",function(){
    cartCheckout.click()
})
document.querySelector(".continue").addEventListener("click",function(){
    history.back()
})
