const emptyMsg=document.querySelectorAll('.empty')
function showError(){

    for(let i=0;i<document.querySelectorAll('.empty').length;i++){
        if(emptyMsg[i].previousElementSibling.value===""){
            emptyMsg[i].style.display="block";
            emptyMsg[i].previousElementSibling.style.border="1px solid #a94442"
        }
        else{
            emptyMsg[i].style.display="none"
            emptyMsg[i].previousElementSibling.style.border="1px solid #e5e5e5"

        }
    }
}
document.querySelector('.continueBtn').addEventListener('click',async(e)=>{
    showError()
    if(document.querySelector('.continueBtn').children[0].innerText==="Go back"){
        history.back();
    }

    let payload={
        prevPass:document.querySelector("#currPass").value,
        newPass:document.querySelector("#newPass").value,
        confirmPass:document.querySelector("#cPass").value
    }
    document.querySelector('.continueBtn').children[0].innerText="Loading..."

    await axios.post("/api/v1/updateUserPassword",payload).then((response)=>{
        if(response.status===200){
            console.log("password changed")
            document.querySelector(".added").style.display="block"
            document.querySelector(".errorPsg").style.display="none"
            document.querySelector('.continueBtn').children[0].innerText="Go back"

        }
    }).catch((err)=>{
        console.log(err.response.data.msg)
        document.querySelector(".added").style.display="none"
        document.querySelector(".errorPsg").style.display="block"
        document.querySelector(".errorPsg").children[0].innerText=`${err.response.data.msg}`
        document.querySelector('.continueBtn').children[0].innerText="Continue"

    })
})