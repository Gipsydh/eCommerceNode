
const loginSubmit=document.getElementById("loginSubmit")
const username=document.getElementById("username")
const password=document.getElementById("password")
const loginContainer=document.querySelector(".loginContainer")
const errorModuleWrapper=document.querySelector(".errorModuleWrapper")
const closeError=document.querySelector(".closeError")

console.log(loginSubmit)
loginSubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(username.value,password.value)
    try {
        
        verifyAdmin(username.value,password.value)
    } catch (error) {
        console.log("error")
    }
})
const verifyAdmin=async(username,password)=>{
    try {
        
        await axios.post("/adminPanel/api/v1/adminVerify",{username:username,password:password})
        .then((response)=>{
            if(response.data.flag){
                window.location="/adminPanel"
            }
            
        })
    } catch (error) {
        errorModuleWrapper.style.display="block"
        errorModuleWrapper.addEventListener("click",(e)=>{
            console.log(e.target)
            if(e.target.classList.contains("closeError")||e.target.classList.contains("errorModuleWrapper"))
            errorModuleWrapper.style.display="none"
        })
    }
}