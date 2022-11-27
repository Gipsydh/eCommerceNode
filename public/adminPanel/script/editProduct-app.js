
const p_outOfStock=document.querySelector(".p_outOfStock")
const submitForm=document.querySelector(".submitForm")
const submitFormImg=document.querySelector(".submitForm")
const params = window.location.search
const id = new URLSearchParams(params).get('id')

submitFormImg.addEventListener('click',(e)=>{
    e.preventDefault();

})
submitForm.addEventListener("click",(e)=>{
    e.preventDefault()
    let editedProduct={}
    editedProduct.p_id=document.querySelector(".p_input_id").value
    editedProduct.p_name=document.querySelector(".p_input_name").value
    editedProduct.p_price=document.querySelector(".p_input_price").value
    editedProduct.p_discPrice=document.querySelector(".p_input_discPrice").value
    editedProduct.p_company=document.querySelector(".p_company").value
    editedProduct.p_type=document.querySelector(".p_type").value
    editedProduct.p_rating=document.querySelector(".p_rating").value
    editedProduct.p_trending=document.querySelector(".p_trending").checked
    editedProduct.p_new=document.querySelector(".p_new").checked
    editedProduct.p_outOfStock=document.querySelector(".p_outOfStock").checked
    
    console.log(editedProduct)
    postEditedProduct(editedProduct)

})
const postEditedProduct=async(editedProduct)=>{
    let confirmS=false;
    confirmS=confirm("are you sure?")
    if(confirmS){

        try {
            
           
            await axios.patch("/adminPanel/api/v1/adminEditProduct",
            {id:id,editedProduct:editedProduct}
            
                
            ).then((response)=>{
                console.log(response.data.status)
                if(response.data.status===true){
                    document.querySelector(".screen").style.opacity='1'

                    setTimeout(() => {
                        document.querySelector(".screen").style.opacity='0'
                    }, 1000);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

}
let singleProduct=null
const getOneProduct=async()=>{
    try {
        
        await axios.post("/adminPanel/api/v1/adminEditProduct",{
            id:id
        }).then((response)=>{
            console.log(response.data)
            singleProduct=response.data.singleProductDB
            companiesDb=response.data.companiesDB
            typesDb=response.data.typesDB
            console.log(singleProduct.p_outOfStock)
            document.querySelector(".p_photo_current").nextElementSibling.outerHTML=`<img src="../resources/${singleProduct.p_id}.jpg" style="height:100%;width:100%">`
            document.querySelector(".p_input_id").value=singleProduct.p_id
            document.querySelector(".p_input_name").value=singleProduct.p_name
            document.querySelector(".p_input_price").value=singleProduct.p_price
            document.querySelector(".p_input_discPrice").value=singleProduct.p_discPrice

            let innerDomCompany=null;
            let innerDomType=null;
            for(let i=0;i<companiesDb.length;i++){
                innerDomCompany+=` <option value="${companiesDb[i].c_name}">${companiesDb[i].c_name}</option>`
            }
            for(let i=0;i<typesDb.length;i++){
                innerDomType+=` <option value="${typesDb[i].t_name}">${typesDb[i].t_name}</option>`
            }
            innerDomCompany+=`<option value="${singleProduct.p_company}" selected>${singleProduct.p_company}</option>`
            innerDomType+=`<option value="${singleProduct.p_type}" selected>${singleProduct.p_type}</option>`
            const p_companyDom=document.querySelector(".p_company")
            const p_typeDom=document.querySelector(".p_type")

            p_companyDom.outerHTML=`
            <select class="p_company">${innerDomCompany}
            </select>
            `
            p_typeDom.outerHTML=`
            <select class="p_type">${innerDomType}
            </select>
            `
            document.querySelector(".p_rating").value=singleProduct.p_rating
            document.querySelector(".p_trending").checked=singleProduct.p_trending
            document.querySelector(".p_new").checked=singleProduct.p_new
            document.querySelector(".p_outOfStock").checked=singleProduct.p_outOfStock
        })
    } catch (error) {
        console.log(error)
    }
}
getOneProduct()

