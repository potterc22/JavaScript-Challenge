// from data.js
var tableData = data;

// Get a reference to the table body using d3
var tBody = d3.select('#ufo-table>tbody');

// Create Table
// Loop through each ufoSighting
tableData.forEach((ufoSighting) => {
    // append a row to the table body
    var row =  tBody.append('tr');
    // loop through each value in the object and append that value to the table
    Object.entries(ufoSighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    })
})

// Select the button
var button = d3.select("#button");

// Select the form
var form = d3.select("#ufo-form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);


// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#witness-form-input");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
  
    console.log(inputValue);
    console.log(tableData);

    // filter by user input datetime
    var filteredData = tableData.filter(sighting => sighting.datetime === inputValue)
    
    console.log(filteredData);

    // clear the table body, so we can return the filtered data
    tBody.html("")

    // Create filtered table
    // Loop through each filtered ufoSighting
    filteredData.forEach((ufoSighting) => {
        // append a row to the table body
        var row =  tBody.append('tr');
        // loop through each filtered result and append that value to the table
        Object.entries(ufoSighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        })
    })



}