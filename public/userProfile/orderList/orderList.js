const orderList=document.querySelector(".orderList")
            const noOrders=document.querySelector(".noOrders")
const getAllOrders=async()=>{
    await axios.get("/api/v1/getUserOrder").then((response)=>{
        console.log(response)
        if(response.data.response.length>0){
            let addedRow=""
            noOrders.style.display="none"

            orderList.style.display="static"
            for(let i=0;i<response.data.response.length;i++){
                let productCount=0;
                for(let j=0;j<response.data.response[i].productInfo.length;j++){
                    productCount+=parseInt(response.data.response[i].productInfo[j][1])
                }
                addedRow+=` <tr>
                <td>${response.data.response[i]._id}</td>
                <td>${response.data.response[i].userAddress.first_name} ${response.data.response[i].userAddress.last_name}</td>
                <td>${productCount}</td>
                <td>${response.data.response[i].status}</td>
                <td>${response.data.response[i].totalPrice}$</td>
                <td>${response.data.response[i].date.slice(0,10)}</td>
                <td class="detailsTd">
                    <a href="../userOrders/userOrders.html?orderId=${response.data.response[i]._id}"class="details" title="View">
                        <i class="fa-regular fa-eye"></i>
                    </div>
                </td>
            </tr>`
            }
            document.querySelector(".tableHeader").insertAdjacentHTML("afterend",addedRow)
        }
        else{
            
          
                orderList.style.display="none"
                noOrders.style.display="block"
           
        }
    }).catch((err)=>{
        console.log(err.response.data.msg)
        if(err.response.data.msg==="unauthrized"){
            window.location.href="../../login/index.html"
        }
    })
}
getAllOrders()