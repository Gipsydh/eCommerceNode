const getAllOrders=async()=>{
    await axios.get("/api/v1/getUserOrder").then((response)=>{
        console.log(response)
        if(response.data.response.length>0){
            let addedRow=""
            for(let i=0;i<response.data.response.length;i++){
                addedRow+=` <tr>
                <td>${response.data.response[i]._id}</td>
                <td>${response.data.response[i].userAddress.first_name} ${response.data.response[i].userAddress.last_name}</td>
                <td>10</td>
                <td>${response.data.response[i].status}</td>
                <td>${response.data.response[i].totalPrice}$</td>
                <td>${response.data.response[i].date.slice(0,10)}</td>
                <td class="detailsTd">
                    <a class="details" title="View">
                        <i class="fa-regular fa-eye"></i>
                    </div>
                </td>
            </tr>`
            }
            document.querySelector(".tableHeader").insertAdjacentHTML("afterend",addedRow)
        }
    }).catch((err)=>{
        console.log(err.response.data.msg)
        if(err.response.data.msg==="unauthrized"){
            window.location.href="../../login/index.html"
        }
    })
}
getAllOrders()