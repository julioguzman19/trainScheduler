// Initialize Firebase
// Make sure that my configuration matches my firebase script version
// (Ex. 3.0 != 3.7.1)

  // My web app's Firebase configuration
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

// Variable to reference the database
let database = firebase.database();

// Submit on Click
$("#addTrainButton").on("click", function(event) {
    event.preventDefault();

    // Capturing user inputs
    let trainName = $("#trainName").val().trim();
    let destinationName = $("#destinationName").val().trim();
    let firstTrainTime = $("#firstTrainTime").val().trim();
    let frequencyTime = $("#frequencyTime").val().trim();

  // Creates local "temporary" object for holding train data
  let newTrain = {
    name: trainName,
    destination: destinationName ,
    time: firstTrainTime,
    frequency: frequencyTime 
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

});

database.ref().on("child_added",function(childSnapshot){
    
    // Storing train name in firebase data into variables
    let trainName = childSnapshot.val().name;
    let destinationName = childSnapshot.val().destination;
    let frequencyTime = childSnapshot.val().frequency;
    let time = childSnapshot.val().time; 

    // Current time
    let currentTime = moment().format("HH:mm");

    // Math for calculating next arrival using first train time and current time and frequency
    
    // First Train vs currentTime minutes difference
    let firstTrainTimeMinutes = moment.duration(time).minutes();
    let currentTimeMinutes= moment.duration(currentTime).minutes();
    let diff = Math.abs(firstTrainTimeMinutes - currentTimeMinutes); 

    // Diff % frequency to get remainder to use to calculate minutes for next train
    let remainder = diff % frequencyTime;

    // Minutes away for next train
    let minutesNextTrain = frequencyTime - remainder;

    // Calculating next arrival 
    let nextArrival = moment().add(minutesNextTrain,"minutes")
    let nextArrivalConverted = moment(nextArrival).format("HH:mm");

    // Appends new row
     newRow = $("<tr>").append(
        $("<td>").text(trainName),$("<td>").text(destinationName),
        $("<td>").text(frequencyTime),$("<td>").text(nextArrivalConverted),
        $("<td>").text(minutesNextTrain));
    

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

    // Clear button to remove database nodes and web html
    $("#clear").on("click", function(event) {
    database.ref().remove(); 
    $("#train-table > tbody").empty();
  
  });
  
});

