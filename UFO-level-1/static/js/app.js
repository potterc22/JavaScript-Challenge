// from data.js
var tableData = data;

// Get a reference to the table body using d3
var tBody = d3.select('#ufo-table>tbody');

// Create Table
function createTable(data) {
    // Loop through each ufoSighting
    data.forEach((ufoSighting) => {
        // append a row to the table body
        var row =  tBody.append('tr');
        // loop through each value in the object and append that value to the table
        Object.entries(ufoSighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        })
    })
}

// create default overall table
createTable(tableData)

// Select the filter button
var button = d3.select("#filter-button");

// Select the form
var form = d3.select("#ufo-form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the date element and get the raw HTML node
    var dateElement = d3.select("#datetime-form-input");
  
    // Get the value property of the date element
    var dateValue = dateElement.property("value");
  
    console.log(dateValue);
    
    // Select the city element and get the raw HTML node
    var cityElement = d3.select("#city-form-input");
  
    // Get the value property of the city element
    var cityValue = cityElement.property("value").toLowerCase().trim();
  
    console.log(cityValue);

    // Select the state element and get the raw HTML node
    var stateElement = d3.select("#state-form-input");
  
    // Get the value property of the state element
    var stateValue = stateElement.property("value").toLowerCase().trim();
  
    console.log(stateValue);

    // // Select the country element and get the raw HTML node
    // var countryElement = d3.select("#country-form-input");
  
    // // Get the value property of the country element
    // var countryValue = countryElement.property("value").toLowerCase().trim();
  
    // console.log(countryValue);

    // Select the shape element and get the raw HTML node
    var shapeElement = d3.select("#shape-form-input");
  
    // Get the value property of the shape element
    var shapeValue = shapeElement.property("value").toLowerCase().trim();
  
    console.log(shapeValue);

    // clear the table body, so we can return the filtered data
    tBody.html("")
    
    // create filtered table
    if (dateValue != '') {
        // filter by user input datetime
        var filteredData = tableData.filter(sighting => sighting.datetime == dateValue);
    }

    if (cityValue != '') {
        // filter by city
        var filteredData = tableData.filter(data => data.city === cityValue);
    }

    if (stateValue != '') {
        // filter by state
        var filteredData = tableData.filter(data => data.state === stateValue);
    }

    if (shapeValue != '') {
        // filter by shape
        var filteredData = tableData.filter(data => data.shape === shapeValue);
    }

    // filter by both datetime and city
    if ((dateValue != '') && (cityValue != '')) {
        var filteredData = tableData.filter(data => {
            if ((data.datetime === dateValue) && (data.city === cityValue)) {
                return data;
            }
        })
    }

    // filter by datetime and state
    if ((dateValue != '') && (stateValue != '')) {
        var filteredData = tableData.filter(data => {
            if ((data.datetime === dateValue) && (data.state === stateValue)) {
                return data;
            }
        })
    }

    console.log(filteredData)
    createTable(filteredData)
}


d3.selectAll("#selDataset").on("change", countryFilter);

// Filter table based on country dropdown selection
function countryFilter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    // clear the table body, so we can return the filtered data
    tBody.html("")

    // defualt blank dropdown option should display full dataset
    if (dataset === 'default') {
        var filteredData = tableData
    }
    // us dropdown option should display us sightings only
    else if (dataset === 'us') {
        var filteredData = tableData.filter(data => data.country == 'us');
    }
    // canada dropdown option should display canada sightings only
    else if (dataset === 'canada') {
        var filteredData = tableData.filter(data => data.country == 'ca');
    }
    console.log(filteredData)
    createTable(filteredData)
}
    


// select the reset button
var reset = d3.select('#reset-button')
reset.on("click", runReset)

function runReset() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // clear the table body
    tBody.html("")
    // reset to overall table
    createTable(tableData)
    // clear form filters
    document.getElementById('ufo-form').reset()

    console.log("Reset the Table")
}
