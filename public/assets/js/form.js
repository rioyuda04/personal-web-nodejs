function showData(){
    //dom get data
    let name = document.getElementById("input-name").value
    let email = document.getElementById("input-email").value
    let phone = document.getElementById("input-phone").value
    let subject = document.getElementById("input-subject").value
    let message = document.getElementById("input-message").value
    // dom send data
    document.getElementById("input-name").value=""
    document.getElementById("input-email").value=""
    document.getElementById("input-phone").value=""
    document.getElementById("input-subject").value=""
    document.getElementById("input-message").value=""
    
    // let fieldData = {
    //     name,
    //     email,
    //     phone,
    //     subject,
    //     message, 
    // } 

    //alert
    //logic
    if ( name == "" ){
        alert('Sorry, Please input name!')
    }
    else if ( email == ""){
        alert('sorry, Please input email!')
    }
    else if ( phone == ""){
        alert('sorry, Please input phone number!')
    }
    else if ( subject == ""){
        alert('sorry, Please input subject!')
    }
    else if ( message == ""){
        alert('sorry, Please input message!')
    } 
    else {
    //dom create element & send mail 
        let emailReceiver = `customer@kopisenjaberdua.com`
        let a = document.createElement("a")
        a.href = `mailto:${emailReceiver}?subject=${subject}&body= Hello my name is ${name}, this my phone number ${phone}, ${message}`
        a.click();
    }
}