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
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
let database = firebase.database();

//Submit on Click
$("#addTrainButton").on("click", function(event) {
    event.preventDefault();

    //Getting info entered by user
    let trainName = $("#trainName").val().trim();
    let destinationName = $("#destinationName").val().trim();
    let firstTrainTime = $("#firstTrainTime").val().trim();
    let frequencyTime = $("#frequencyTime").val().trim();

    // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destinationName ,
    time: firstTrainTime,
    frequency: frequencyTime 
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

});

database.ref().on("child_added",function(childSnapshot){
    
    console.log(childSnapshot.val());

    //Storing data into variable

    let trainName = childSnapshot.val().name;
    console.log(trainName)
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