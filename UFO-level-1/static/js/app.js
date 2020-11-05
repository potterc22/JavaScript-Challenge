// from data.js
var tableData = data;

// Get a reference to the table body using d3
var tBody = d3.select('#ufo-table>tbody');


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

