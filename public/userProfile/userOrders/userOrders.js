const params = window.location.search
const id = new URLSearchParams(params).get('orderId')
console.log(id)
const getOrderInfo=async()=>{
    await axios.get("/api/v1/getOrderInfo",{params:{
        id:id
    }}).then((response)=>{
        console.log(response.data)
        document.querySelector(".res_orderId").innerText=response.data[0]._id
        const res_orderDate=document.querySelectorAll(".res_orderDate")
        for(let i=0;i<res_orderDate.length;i++){
            res_orderDate[i].innerText=response.data[0].date.slice(0,10)
        }

        document.querySelector(".res_user_name").innerText=response.data[0].userAddress.first_name+" "+response.data[0].userAddress.last_name
        document.querySelector(".res_user_company").innerText=response.data[0].userAddress.company
        document.querySelector(".res_user_address1").innerText=response.data[0].userAddress.address_1
        document.querySelector(".res_user_address2").innerText=response.data[0].userAddress.address_2
        document.querySelector(".res_city").innerText=response.data[0].userAddress.city
        document.querySelector(".res_pin").innerText=response.data[0].userAddress.post_code
        document.querySelector(".res_statusPending").innerText=response.data[0].status
        document.querySelector(".country").innerText=response.data[0].userAddress.country
        document.querySelector(".dist").innerText=response.data[0].userAddress.state
        let addedTable=""
        let totalProductPrice=0
        for(let i=0;i<response.data[0].productInfo.length;i++){
          
            addedTable+=`<tr>
            <td>${response.data[0].productInfo[i][2]}</td>
            <td>product model</td>
            <td>${response.data[0].productInfo[i][1]}</td>
            <td>${response.data[0].productInfo[i][3]}</td>
            <td>${parseInt(response.data[0].productInfo[i][3])*response.data[0].productInfo[i][1]}$</td>

        </tr>`
        totalProductPrice+=parseInt(response.data[0].productInfo[i][3])*response.data[0].productInfo[i][1]
        }
        console.log(addedTable)
        document.querySelector(".productDetailsTableHeader").insertAdjacentHTML("afterend",addedTable)
        document.querySelector(".totalProductPrice").innerText=`${totalProductPrice}$`
        document.querySelector(".subTotalProductPrice").innerText=`${totalProductPrice}$`
        document.querySelector(".res_orderComment").innerText=`${response.data[0].userAddress.orderComment}`







    }).catch((err)=>{
        console.log(err)
    })
}
getOrderInfo()
const continue_btn=document.querySelector(".continue-btn")
continue_btn.addEventListener("click",function(){
    history.back()
})