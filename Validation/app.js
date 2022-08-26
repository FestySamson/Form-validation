const form = document.getElementById('form')
const text = document.getElementById('user')
const email = document.getElementById('email')
const password1 = document.getElementById('password1')
const password2 = document.getElementById('password2')

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const formDataRaw = [...e.target.children].filter((v) => v.classList.contains('inputs'))
    .map((v) => [...v.children].find((v)=> v.nodeName === 'INPUT') || null)
    .map((v) => {
        v && v.value ? 
            v.name === 'email' 
                ?  isEmail(v.value) ? setSuccessFor(v) :  setErrorFor(v, `Please enter apropriate email`) :
                    setSuccessFor(v) 
            : setErrorFor(v, `${v.name} is invalid`);
        return v
    })
    .reduce((acc, v) => {
       return {
        ...acc,
        formInvalidStateArr: [...acc.formInvalidStateArr,v.parentElement.classList.contains('error')],
       formValue : {
           ...acc.formValue,
           ...(v && v.name? {[v.name]:v.value || ''} : {})
       }
       }
    }, {
        formInvalidStateArr: [],
        formValue: {}
    });
    const formData = {
        formValue: formDataRaw.formValue,
        isFormValid:  !formDataRaw.formInvalidStateArr.some((v) => v === true)
    }
    console.log(formData);
    if(formData.isFormValid){
       
        btnChange()
    }else{
        console.log('your form is invalid')
        failed()
    }
    console.log(formData.formValue)

});   
 function setErrorFor(inputs, message){
     const formControl = inputs.parentElement
     const small = formControl.querySelector('small')

     small.innerText = message
     formControl.className = 'inputs error'
 } 
 function setSuccessFor(inputs){
    const formControl = inputs.parentElement
    formControl.className = 'inputs success'
 }

 function isEmail(email){
     return  (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
 }

 const Succ_Message =document.querySelector('#suc')
 const btn = document.getElementById('btn')

 function btnChange(){
     
     btn.style.backgroundColor='rgb(8, 170, 116)'
     Succ_Message.style.color = 'rgb(8, 170, 116)'
     Succ_Message.innerHTML = 'Registration Successful!'
 }
 function failed(){
     btn.style.backgroundColor='rgb(240, 56, 56)'
     Succ_Message.innerHTML = 'Registration not Successful! check form'
     Succ_Message.style.color = 'rgb(240, 56, 56)'
 }