const getUserInfo = async () => {
    await axios.get("/api/v1/getCurrUserInfo").then((response) => {
        document.getElementById("firstName").value = response.data.first_name;
        document.getElementById("lastName").value = response.data.last_name;
        document.getElementById("telephone").value = response.data.telephone;
    })  .catch((error) => {
      
        if (error.response.status === 401) {
            window.location.href = "../../login/index.html";
        }
    });;
};
getUserInfo();
document.querySelector(".continueBtn").addEventListener("click", async (e) => {
    const newInfo = {};
    const inputCred = document.querySelectorAll(".personalDetails input");
    let emptyCheck = false;
    for (let i = 0; i < inputCred.length; i++) {
        inputCred[i].nextElementSibling.style.display = "none";
    }
    for (let i = 0; i < inputCred.length; i++) {
        if (inputCred[i].value === "") {
            inputCred[i].nextElementSibling.style.display = "block";
            emptyCheck = true;
        }
    }

    if (emptyCheck === false) {
        document.querySelector(".continueBtn").children[0].innerText = "Loading...";
        newInfo.first_name = document.querySelector("#firstName").value;
        newInfo.last_name = document.querySelector("#lastName").value;
        newInfo.telephone = document.querySelector("#telephone").value;
        try {
            const resp=await axios
                .patch("/api/v1/updateUserInfo", { newInfo })
                .then((response) => {
                    document.querySelector(".continueBtn").children[0].innerText = "Done";
                    document.querySelector(".continueBtn").style.pointerEvents = "none";
                    document.querySelector(".continueBtn").style.opacity = "0.5";
                })
                .catch((error) => {
                    
                    if (error.response.status === 401) {
                        window.location.href = "../../login/index.html";
                    }
                });
              
        } catch (error) {
        }
    }
});
