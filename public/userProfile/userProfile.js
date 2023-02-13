const logoutBtn=document.querySelector(".productArea .box .body .logOut")
logoutBtn.addEventListener('click',(e)=>{
    axios.get("/api/v1/userLogOut").then((response)=>{
        if(response.status===200){
            window.location.href="../login/index.html"
        }
    })
})