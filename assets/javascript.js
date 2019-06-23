// Initialize Firebase
// Make sure that your configuration matches your firebase script version
// (Ex. 3.0 != 3.7.1)

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCPfcR5EFD0XYWxvjx5QzemBtkitGKUXcw",
    authDomain: "trainscheduler-c58d5.firebaseapp.com",
    databaseURL: "https://trainscheduler-c58d5.firebaseio.com",
    projectId: "trainscheduler-c58d5",
    storageBucket: "",
    messagingSenderId: "407190504481",
    appId: "1:407190504481:web:3ab5aa6ab7dda793"
  };
  
// Initialize Firebase
firebase.initializeApp(config);

// Create a variable to reference the database
let database = firebase.database();

$("#add-employee-btn").on("click", function(event) {
    event.preventDefault();

    var empName = $("#name").val().trim();
    console.log(empName);

     // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: empName,
   /*  role: empRole,
    start: empStart,
    rate: empRate */
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);

});


/* 
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var empName = childSnapshot.val().name;
  
    // Employee Info
    console.log(empName);
    
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(empName)

    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  }); */