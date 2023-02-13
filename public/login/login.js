
const loginBtn=document.querySelector(".container .productArea .loginSubmitBtn input")
const errorMsg=document.querySelectorAll(".errorMsg")
const loginElm=document.querySelectorAll(".loginElm")

let allFill=true;
loginBtn.addEventListener('click',(e)=>{
    
    e.preventDefault()
    for(let i =0;i<loginElm.length;i++){
        loginElm[i].style.border="1px solid var(--borderColor)"
        loginElm[i].nextElementSibling.style.display="none"

    }
    for(let i =0;i<loginElm.length;i++){
        if(loginElm[i].value===""){
            allFill=false
            loginElm[i].style.border="1px solid var(--buttonHover)"
            loginElm[i].nextElementSibling.style.display="block"
        }
        
    }
    if(allFill){
        
        const obj={
            "email":document.getElementById("email").value,
            "password":document.getElementById("password").value
        }
       sendReq(obj);
       
    }

})
const sendReq=async(obj)=>{
    const loginFlag=document.querySelectorAll(".loginFlag")
    for (let i=0;i<loginFlag.length;i++){
        loginFlag[i].style.display="none"
    }
    try {
            
        await axios.post("/api/v1/signIn",obj).then((response)=>{
            
            document.querySelector(".loggedIn").style.display="block"
          
            window.location.href="../userProfile/userProfile.html"
        }).catch((err)=>{
            if(err.response.status===401){
                document.querySelector(".wrongPass").style.display="block"
            }
        })
        
         
     } catch (error) {
        //  console.log(error)
     }
}