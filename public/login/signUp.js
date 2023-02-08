

const signUpBtn=document.querySelector(".continueBtn")
let flag2=false
let flag3=false
let obj={}
signUpBtn.addEventListener('click',function(){
    if(signUpBtn.children[0].innerText==="Go Home"){
        console.log("yes")
        window.location.href="/";
    }
    if(flag2===true){
        yourOTP=document.querySelector("#OTP").value
        if(yourOTP.length===6){
            document.querySelector(".getOTP").style.opacity=0.5
            document.querySelector(".getOTP input").setAttribute('readonly',true)
            axios.post("/api/v1/signIn/verifyOTP",{obj,"currOTP":yourOTP}).then((response)=>{
               document.querySelector(".added").style.display="block"
               document.querySelector(".wrongOTP").style.display="none"
               console.log(signUpBtn)
               signUpBtn.children[0].innerText="Go Home"


            }).catch((error)=>{
                document.querySelector(".added").style.display="none"

                document.querySelector(".wrongOTP").style.display="block"
            })
        }
        else{
            document.querySelector(".added").style.display="none"

            document.querySelector(".wrongOTP").style.display="block"

        }
    }
    else{
        const allFields=document.querySelectorAll(".elm")
    let flag=true
    for(let i=0;i<allFields.length;i++){
        if(allFields[i].value===""){
            flag=false
            allFields[i].style.border="1px solid var(--buttonHover)"
            allFields[i].nextElementSibling.style.display="block"
        }
    }

    console.log(flag)
    if(flag){
        console.log("working")
        obj={
            "first_name":document.querySelector("#firstName").value,
            "last_name":document.querySelector("#lastName").value,
            "email":document.querySelector("#email").value,
            "telephone":document.querySelector("#telephone").value,
            "password":document.querySelector("#password").value,
            "cPassword":document.querySelector("#cPassword").value
        }
        if(obj.password!=obj.cPassword){
            
            const thisInp=document.querySelector("#password")
            thisInp.style.border="1px solid var(--buttonHover)"
            thisInp.nextElementSibling.style.display="block"
        }
        else{
            try {
               flag3=false
               axios.post("/api/v1/signUp",obj)
               .then((response)=>{
                console.log("inside")
                const data=response.data
                const status=response.status
                

               })
               .catch(error=>{
                    document.querySelector(".duplicateUser").style.display="block"
                    flag3=true
                    const getInfo=document.querySelectorAll(".getInfo")
                for(let i=0;i<getInfo.length;i++){
                    getInfo[i].style.display="block"
                }
                const getOTP=document.querySelector(".getOTP")
                getOTP.style.display="none"
                flag2=false;
               })
               
               if(flag3===false){
                
                const getInfo=document.querySelectorAll(".getInfo")
                for(let i=0;i<getInfo.length;i++){
                    getInfo[i].style.display="none"
                }
                const getOTP=document.querySelector(".getOTP")
                document.querySelector(".duplicateUser").style.display="none"

                getOTP.style.display="block"
                flag2=true;
               }
                
            
            } catch (error) {
                console.log("error happened")
            }
            console.log("yes")
          

        }
    }
    }
    
    
    // else if(obj.first_name==="" || obj.last_name==="" || obj.email==="" || obj.password===""||obj.telephone===""){
    //     for (const i in obj){
    //         if(obj[property]===""){

    //         }
    //     }
    // }
})