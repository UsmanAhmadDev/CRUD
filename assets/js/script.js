// Variables 

let regForm = document.querySelector(".register-form");
let allInput = regForm.querySelectorAll("INPUT");
let closeBtn = document.querySelector(".btn-close"); 
let regList = document.querySelector(".reg-list");
let allBtn = regForm.querySelectorAll("button");
let addBtn = document.querySelector(".add-btn");
let searchEl = document.querySelector(".search");
let delAllBtn = document.querySelector(".delete-all-btn");
let allRegData = [];
let url = "";

// To Prevent data loss 

if (localStorage.getItem("allRegData") != null) {
    allRegData = JSON.parse(localStorage.getItem("allRegData"));
}

// Pushing values in Array through function 

regForm.onsubmit = (e) =>{
    e.preventDefault();
    let checkEmail = allRegData.find((data) => data.email == allInput[1].value);
    if (checkEmail == undefined) {
        allRegData.push({
            name : allInput[0].value,
            email : allInput[1].value,
            mobile : allInput[2].value,
            dob : allInput[3].value,
            password : allInput[4].value,
            profile : url == "" ? "profile.jpg" : url
        });

        // Local storage for storing data
        localStorage.setItem("allRegData",JSON.stringify(allRegData)); 
        swal("Data Inserted", "successfully !", "success");

        // To close button we used ClosedBtn Function
        closeBtn.click();

        // Reset is pre-defined function
        regForm.reset('');
        getRegData();
    }
    else{
        swal("Email already Exists", "failed", "warning");
    }
}

// For reading live data 

const getRegData = () => {

    // Empty inner HTML to prevent repeated data
    regList.innerHTML = "";

    // getting data in index form or index wise
    allRegData.forEach((data,index)=>{
        let dataStr = JSON.stringify(data);
        let finalData = dataStr.replace (/"/g,"'");
        regList.innerHTML += `
        <tr>
            <td style="align-content: center;">${index+1}</td>
            <td style="align-content: center;">
                <img width="30px" src="${data.profile}" alt="">
            </td>
            <td style="align-content: center;">${data.name}</td>
            <td style="align-content: center;">${data.email}</td>
            <td style="align-content: center;">${data.mobile}</td>
            <td style="align-content: center;">${data.dob}</td>
            <td>
                <button data="${finalData}" index="${index}"  class="edit-btn btn p-2">
                    <i class="fa-solid fa-pen" style="color: #fec61e" ></i>
                </button>
                <button index="${index}" class="del-btn btn p-2">
                    <i class="fa fa-trash" style="color: #f55549"></i>
                </button>
            </td>
        </tr>
        `;
    });
    action();
}

// Deleting data 

const action = () =>{
    let allDelBtn = document.querySelectorAll(".del-btn");
    for(let btn of allDelBtn)
    {
        btn.onclick = async () =>{
            let isConfirm = await confirm();
            if(isConfirm)
            {
                let index = btn.getAttribute("index");
                allRegData.splice(index,1);
                localStorage.setItem("allRegData",JSON.stringify(allRegData));
                getRegData();
            }
        }
    }

    // Updating data

    let allEditBtn = regList.querySelectorAll(".edit-btn");
    for(let btn of allEditBtn)
    {
        btn.onclick = () =>
        {
            let index = btn.getAttribute("index");
            let dataStr = btn.getAttribute("data");
            let finalData = dataStr.replace (/'/g,'"');
            let data = JSON.parse(finalData);
            addBtn.click();
            allInput[0].value = data.name;
            allInput[1].value = data.email;
            allInput[2].value = data.mobile;
            allInput[3].value = data.dob;
            allInput[4].value = data.password;
            url = data.profile;
            allBtn[0].disabled = false;
            allBtn[1].disabled = true;

            allBtn[0].onclick = () =>
            {
                allRegData[index] = {
                    name : allInput[0].value,
                    email : allInput[1].value,
                    mobile : allInput[2].value,
                    dob : allInput[3].value,
                    password : allInput[4].value,
                    profile : url == "" ? "profile.jpg" : url
                }
                localStorage.setItem("allRegData",JSON.stringify(allRegData)); 
                swal("Data Updated", "successfully !", "success");
                closeBtn.click();
                regForm.reset('');
                getRegData();
                allBtn[1].disabled = false;
                allBtn[0].disabled = true;
            }
        }
    }
}


getRegData();

// Reading Profile

allInput[5].onchange = () => {

    // FileReader is pre-defined API

    let fReader = new FileReader();
    fReader.readAsDataURL(allInput[5].files[0]);
    fReader.onload = (e) =>{
        url = e.target.result;
        console.log(url);
    }
}

// Delete all data

delAllBtn.onclick = async () =>{
    let isConfirm = await confirm();
    if(isConfirm)
    {
        allRegData = [];
        localStorage.removeItem("allRegData");
        getRegData();
    }
}



// Confirm from sweet alert

const confirm = () =>{
    return new Promise((resolve,reject)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                resolve(true);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
                reject(false);
              swal("Your imaginary file is safe!");
            }
          });
    });
}


// Searching data

searchEl.oninput = () =>{
    search();
}

const search = () =>{
    let value = searchEl.value.toLowerCase();
    let tr = regList.querySelectorAll("TR");
    let i;
    for(i=0; i<tr.length; i++){
        let allTd = tr[i].querySelectorAll("TD");
        let name = allTd[2].innerHTML;
        let email = allTd[3].innerHTML;
        let mobile = allTd[4].innerHTML;
        if(name.toLocaleLowerCase().indexOf(value) != -1)
        {
            tr[i].style.display = "";
        }
        else if(email.toLocaleLowerCase().indexOf(value) != -1)
        {
            tr[i].style.display = "";
        }
        else if(mobile.toLocaleLowerCase().indexOf(value) != -1)
        {
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none";
        }
    }
}

// To show and hide the Password

function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    var toggleIcon = document.getElementById("toggleIcon");
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.textContent = "visibility";
    } else {
        passwordField.type = "password";
        toggleIcon.textContent = "visibility_off";
    }
}


// clear the form fields if user do not update the content

const clearFormFields = () => {
    allInput.forEach(input => {
        input.value = '';
        allBtn[1].disabled = false;
        allBtn[0].disabled = true;
    });
    url = ''; 
};

addBtn.onclick = () => {
    clearFormFields();
};


