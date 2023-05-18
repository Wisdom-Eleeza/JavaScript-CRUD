//Validating form input before submitting
function validateForm() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;

  if (name == "") {
    alert("Name is required");
    return false;
  }

  if (age == "") {
    alert("Age is required");
    return false;
  } else if (age < 1) {
    alert("Age must not be zero or less than zero");
    return false;
  }

  if (address == "") {
    alert("Address is required");
    return false;
  }

  if (email == "") {
    alert("Email is required");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid email address");
    return false;
  }

  return true;
}

//Function to show data from local storage
function showData() {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  var htmlData = "";

  peopleList.forEach(function (element, index) {
    htmlData += "<tr>";
    htmlData += "<td>" + element.name + "</td>";
    htmlData += "<td>" + element.age + "</td>";
    htmlData += "<td>" + element.address + "</td>";
    htmlData += "<td>" + element.email + "</td>";
    htmlData +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
      index +
      ')" class="btn btn-warning m-2">Edit</button></td>';
    htmlData += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = htmlData;
}
//Loads All data from local storage when document or page load
document.onload = showData();

//Function to add data to the local storage
function AddData() {
  //if form is validated then do the following
  if (validateForm() == true) {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;

    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
  }
}

//Function to delete Data from the localStorage
function deleteData(index) {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

//function to update or edit data in the local storage
function updateData(index) {
  //submit button will hide and Update button will show for
  //updating of data in the local storage
  document.getElementById("submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  //if statement to delete
   peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("name").value = peopleList[index].name;
  document.getElementById("name").value = peopleList[index].age;
  document.getElementById("name").value = peopleList[index].address;
  document.getElementById("name").value = peopleList[index].email;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() == true) {
      peopleList[index].name = document.getElementById("name").value;
      peopleList[index].age = document.getElementById("age").value;
      peopleList[index].address = document.getElementById("address").value;
      peopleList[index].email = document.getElementById("email").value;

      localStorage.setItem("peopleList", JSON.stringify("peopleList"));

      showData();

      document.getElementById("name").value = "";
      document.getElementById("name").value = "";
      document.getElementById("name").value = "";
      document.getElementById("name").value = "";

      //Update button will hide and Submit button will show
      document.getElementById("submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}
