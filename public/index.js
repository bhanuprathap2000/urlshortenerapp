let validator=()=>{

    let url=document.querySelectorAll("#url")[0].value;
    if (url==="")
    {
        document.querySelectorAll("#errormsg")[0].innerHTML="Please enter the valid URL";
        return false;
    }
    else{
        document.querySelectorAll("#errormsg")[0].innerHTML="";
        console.log(url);
        return true;

    }
    

}

