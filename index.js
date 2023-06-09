var SubmitForm=document.getElementById("submitForm");
var allInput = SubmitForm.querySelectorAll("INPUT")
var addBtn=document.querySelector("#add-btn");
var donorDetails=document.querySelector(".donorDetails");
var closeBtn=document.querySelector(".close-icon");
addBtn.onclick=function(){
    donorDetails.classList.add("active");
}

closeBtn.addEventListener("click",()=>{
    donorDetails.classList.remove("active");
    var i;
    for (i = 0; i < allInput.length; i++) {
    allInput[i].value="";
        
    }
})


/* To submit the Blood Donation form */
var donorData=[];
var Id=document.getElementById("id");
var Name=document.getElementById("name");
var Age=document.getElementById("age");
var BloodGroup=document.getElementById("bloodGroup");
var Email=document.getElementById("email");
var Address=document.getElementById("address");
var Occupation=document.getElementById("occupation");
var Date=document.getElementById("date");


var submitBtn=document.querySelector("#submit");
var updateBtn=document.querySelector("#update");

submitBtn.onclick=function(e){
    e.preventDefault();
    submitData();
    getDataFromLocal();
    SubmitForm.reset('');
    closeBtn.click();

}

if(localStorage.getItem("donorData") !=null){
donorData=JSON.parse(localStorage.getItem("donorData"));
}


function submitData(){
    donorData.push({ //store data in json
        id:Id.value,
        name:Name.value,
        age:Age.value,
        bloodGroup:BloodGroup.value,
        email:Email.value,
        address:Address.value, 
        occupation:Occupation.value,
        date:Date.value,
    })
    var donorString=JSON.stringify(donorData);
    localStorage.setItem("donorData",donorString);
    swal("Good job!", "Donor data submitted!", "success");
}

//getting data from local storage

var tableData=document.getElementById("table-data");
const getDataFromLocal=()=>{    
    tableData.innerHTML= "";
    donorData.forEach((data,index)=>{
        tableData.innerHTML +=`
        <tr index="${index}">
        <td>${index+1}</td>
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.age}</td>
        <td>${data.bloodGroup}</td>
        <td>${data.email}</td>
        <td>${data.address}</td>
        <td>${data.occupation}</td>
        <td>${data.date}</td>
        <td><button class="edit-btn"><i class="fa-solid fa-user-pen"></i></button></td>
        <td><button class="del-btn"><i class="fa-solid fa-user-slash"></i></button></td>
    </tr>
        `
    });

    /*to delete data */
    var i;
    var allDelBtn =document.querySelectorAll(".del-btn");
    for(i=0;i<allDelBtn.length;i++){
        allDelBtn[i].onclick =function(){
            var tr =this.parentElement.parentElement;
            var id= tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    donorData.splice(id,1);
                    localStorage.setItem("donorData",JSON.stringify(donorData));
                    tr.remove();
        
                  swal("Poof! Your Donor Data has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your Donor Data is safe!");
                }
              });

        }
    }

    /*to update data*/
    var allEditBtn=document.querySelectorAll(".edit-btn");
    for(i=0;i<allEditBtn.length;i++) {
        allEditBtn[i].onclick=function(){
        var tr=this.parentElement.parentElement;
        var td=tr.getElementsByTagName("TD");
            // console.log(td); 
        var index=tr.getAttribute("index");
    //   
        var id=td[1].innerHTML;
        var name=td[2].innerHTML;
        var age=td[3].innerHTML;
        var bloodGroup=td[4].innerHTML;
        var email=td[5].innerHTML;
        var address=td[6].innerHTML;
        var occupation=td[7].innerHTML;
        var date=td[8].innerHTML;
        addBtn.click();
        submitBtn.disabled=true;
        updateBtn.disabled=false;
        Id.value=id;
        Name.value=name;
        Age.value=age;
        BloodGroup.value=bloodGroup;
        Email.value=email;
        Address.value=address;
        Occupation.value=occupation;
        Date.value=date;
        updateBtn.onclick=function(e){
         donorData[index]={
            id:Id.value,
            name:Name.value,
            age:Age.value,
            bloodGroup:BloodGroup.value,
            email:Email.value,
            address:Address.value, 
            occupation:Occupation.value,
            date:Date.value
         }
         localStorage.setItem("donorData",JSON.stringify(donorData));
        }
       

        }
        
    }
}

getDataFromLocal();



//  Rupesh Vaigankar 7020471616 bus for sold at 8.5 lakh 

// to search blood group

var searchEl = document.querySelector("#bloodgrp");
searchEl.oninput=function(){
    searchFunc();
}
function searchFunc() {
    var tr=tableData.querySelectorAll("TR");
    var filter=searchEl.value.toLowerCase();
    var i;
    for (i =0;i < tr.length;i++) {
        var bloodGroup=tr[i].getElementsByTagName("TD")[4].innerHTML;
        var id=tr[i].getElementsByTagName("TD")[1].innerHTML;
        var name=tr[i].getElementsByTagName("TD")[2].innerHTML;
    //  var bloodGroup= td.innerHTML;
     if (bloodGroup.toLowerCase().indexOf(filter) > -1) {
        tr[i].style.display= "";
     }
     else if(id.toLowerCase().indexOf(filter) > -1) {
        tr[i].style.display= "";
     }
     else if(name.toLowerCase().indexOf(filter) > -1) {
        tr[i].style.display= "";
     }
     
     else{
        tr[i].style.display ="none";
     }
        
    }

}

// start clear all data

var delAllBtn = document.querySelector("#deleteall");
var allDelBox =  document.querySelector("#deleteallbox");
delAllBtn.addEventListener('click',()=>{
  if(allDelBox.checked == true){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
           localStorage.removeItem("donorData");
           window.location = location.href;
          swal("Proof! Your Donor Data has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Donor Data is safe!");
        }
      });
  }
  else{
    swal("Check The Box", "Please check the box to delete Donor Data","warning");
  }
})