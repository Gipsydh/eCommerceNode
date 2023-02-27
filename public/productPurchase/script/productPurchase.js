const params=window.location.search
const purchaseStat=new URLSearchParams(params).get("purchaseStat")
if(purchaseStat==="true"){
    let productArea=document.querySelector(".productArea")
                                for(let i=0;i<productArea.children.length;i++){
                                    console.log(productArea.children[i])
                                    if(productArea.children[i].classList.contains('success')){
                                        productArea.children[i].style.display="block"
                                    }
                                    else{
                                        productArea.children[i].outerHTML=""
                                        productArea.children[i].innerHTML=""
                                    }
                                }
                                exit()
}
const tableHead=document.querySelector(".confirmDetails .header")
const prodId = new URLSearchParams(params).get('prodId')
const prodCount=new URLSearchParams(params).get('prodCount')
const prodItemsId=prodId.split(",")
const prodItemsCount=prodCount.split(",")
const productList=document.querySelector(".tagDetails .header")
const tags=document.querySelectorAll(".tag")
for(let i=1;i<tags.length;i++){
    tags[i].style.pointerEvents="none"
}
let totalPrice=0;
const userCheck=document.querySelector(".userCheck")
userCheck.addEventListener("click",async(e)=>{
    console.log('check')
        await axios.get("/api/v1/loginInfo").then((response)=>{
            tags[1].style.pointerEvents="auto"
            tags[1].style.opacity="1"
            tags[1].click()
            
            document.querySelector('.getUserAddress').addEventListener('click',function(){
                let userAddress={}
                let userAddcheckFlag=true
                const userAddressInput=document.querySelectorAll(".productArea .billingDetails input")
                for(let i=0;i<userAddressInput.length;i++){
                    if(userAddressInput[i].value===""){
                        // console.log(userAddressInput[i].previousElementSibling.classList)
                        if(userAddressInput[i].previousElementSibling.classList.contains("errorMsg")){
                            userAddressInput[i].previousElementSibling.style.display="block"
                            userAddcheckFlag=false
                        }
                    }
                    else{
                        if(userAddressInput[i].previousElementSibling!=null && userAddressInput[i].previousElementSibling.classList.contains("errorMsg")){
                            userAddressInput[i].previousElementSibling.style.display="none"
                        }
                    }
                }
                console.log(userAddressInput[0].value)
                userAddress.first_name=userAddressInput[0].value
                userAddress.last_name=userAddressInput[1].value
                userAddress.e_mail=userAddressInput[2].value
                userAddress.phone=userAddressInput[3].value
                userAddress.company=userAddressInput[4].value
                userAddress.address_1=userAddressInput[5].value
                userAddress.address_2=userAddressInput[6].value
                userAddress.city=userAddressInput[7].value
                userAddress.post_code=userAddressInput[8].value
                if( userAddcheckFlag===true){

                    tags[2].style.pointerEvents="auto"
                    tags[2].style.opacity="1"
                    tags[2].click()
                    document.querySelector(".orderCommentComt").addEventListener("click",function(){
                        userAddress.orderComment=document.querySelector('#orderComment').value
                        if(document.querySelector('input[name="JTP"]:checked')){
                            userAddress.modeOfPayment="cash on delevery"
                        } 
                        tags[3].style.pointerEvents="auto"
                        tags[3].style.opacity="1"
                        tags[3].click()
                        document.querySelector(".finalCheckBtn").style.pointerEvents="auto"
                        document.querySelector(".finalCheckBtn").children[0].innerText="Continue"
                        document.querySelector(".finalCheckBtn").addEventListener('click',function(){
                            console.log(userAddress)
                            const productInfo=[]
                            for(let i=0;i<prodItemsId.length;i++){
                                const tempObj=[prodItemsId[i],prodItemsCount[i]]
                                productInfo.push(tempObj)
                            }
                            this.children[0].innerText="Loading..."
                            axios.post("/api/v1/placeOrder",{userAddress,"productInfo":productInfo,"totalPrice":totalPrice,"date":new Date().toLocaleString()}).then((response)=>{
                                window.location.href="/productPurchase/prodPurchase.html?purchaseStat=true"
                                this.children[0].innerText="Done"
                                this.style.pointerEvents="none"

                                
                            })
                        })                  
                    })
                }

            })
        }).catch((error)=>{
            console.log(error)
            if(document.querySelector('input[name="checkOutOptn"]:checked').value==="signUp"){
                window.location.href="../login/signUp.html"
            }
            else if(document.querySelector('input[name="checkOutOptn"]:checked').value==="logIn"){
                window.location.href="../login/"
        
            }
        })
    
    
})
function goTologin(){
    document.querySelector(".accounts").click()
}
const prodTag=document.querySelectorAll(".productArea .tag")
let temp=0;
let addedVal=0;
let tempHeight=""
prodTag.addEventListener('click',function(){
    for(let i=0;i<prodTag.length;i++){
        prodTag[i].nextElementSibling.children[0].style.height=`0px`

    }
    addedVal=0;
    for(let i=0;i<this.nextElementSibling.children[0].children.length;i++){
        console.log(i)
        if(window.getComputedStyle(this.nextElementSibling.children[0].children[i]).getPropertyValue('display')!="none"){
            addedVal+=parseInt(window.getComputedStyle(this.nextElementSibling.children[0].children[i]).getPropertyValue('height'))
            addedVal+=parseInt(window.getComputedStyle(this.nextElementSibling.children[0].children[i]).getPropertyValue('margin-top'))
            addedVal+=parseInt(window.getComputedStyle(this.nextElementSibling.children[0].children[i]).getPropertyValue('margin-bottom'))
            addedVal+=parseInt(window.getComputedStyle(this.nextElementSibling.children[0].children[i]).getPropertyValue('padding-top'))

            addedVal+=parseInt(window.getComputedStyle(this.nextElementSibling.children[0].children[i]).getPropertyValue('padding-bottom'))

            console.log(addedVal)
        }
        // console.log(addedVal)
    }
    if(window.getComputedStyle(this.nextElementSibling.children[0]).getPropertyValue('height')==="0px"){
        console.log(addedVal)
        setTimeout(() => {
            this.nextElementSibling.children[0].style.height=`${addedVal+150}px`
        }, 1);
    }
    else{
        setTimeout(() => {
            this.nextElementSibling.children[0].style.height=`0px`
        }, 1);
        
    }
})
axios.get("/api/v1/checkoutInfo",{params:{ids:prodItemsId}}).then((response)=>{
    let appendList=""
   totalPrice=0;
    for(let i=0;i<response.data.resp.length;i++){
        appendList+=`<tr>
        <td>${response.data.resp[i].p_name}</td>
        <td>${response.data.resp[i].p_company}</td>
        <td>${prodItemsCount[i]}</td>
        <td>${response.data.resp[i].p_price}$</td>
        <td style="text-align:right">${response.data.resp[i].p_price*prodItemsCount[i]}$</td>
    </tr>`
    totalPrice+=response.data.resp[i].p_price*prodItemsCount[i]
    }
    appendList+=`<tr><td colspan=4>Total</td><td>${totalPrice}$</td></tr> `
    productList.insertAdjacentHTML('afterend',appendList)
    let verifyProf=`<span>Your name: ${response.data.userinfo[0]+" "+response.data.userinfo[1]}</span><span>Your E-mail: ${response.data.userinfo[2]}</span>
                    <span class="changeAcct" style="margin-top:10px" onclick=goTologin()>Change your account</span>`
    document.querySelector(".acctInfoChecked").insertAdjacentHTML('afterend',verifyProf)
 
        
        document.querySelector(".uncheckedLogin").style.display="none"
        document.querySelector(".checkedLogin").style.display="block"



}).catch((error)=>{
   
        document.querySelector(".uncheckedLogin").style.display="block"
    
        document.querySelector(".checkedLogin").style.display="none"
        
    


})


