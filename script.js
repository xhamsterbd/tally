const CLIENT_ID = '559511833873-qdm724gc649edfo707tlm6d4sa1ta1sp.apps.googleusercontent.com'; // Your Client ID
const API_KEY = 'AIzaSyDE2s5psY3y30C40EUBEPgvQo0b_fCjQH4'; // Your API Key
const SHEET_ID = '1Lr5LGzj_dNYW0cvuypPO4VvYZOtmRmOHNkNPZDBNMd4'; // Your Sheet ID
const RANGE = 'Sheet1!A1:D10'; // Range for appending data

// Initialize the Google API client
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets"
    }).then(function () {
        gapi.auth2.getAuthInstance().signIn();
    }).catch(function (error) {
        alert('Error initializing client: ' + error.message);
    });
}

// Load the client library and initialize it
function start() {
    gapi.load('client:auth2', initClient);
}

// Fetch and display data from Google Sheets
function fetchData() {
    gapi.client.request({
        'path': `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:D10`,
    }).then(function(response) {
        const data = response.result.values;
        const container = document.getElementById('sheet-data');
        container.innerHTML = ''; // Clear previous data
        if (data) {
            data.forEach(row => {
                const rowDiv = document.createElement('div');
                rowDiv.textContent = row.join(' | '); // Display data
                container.appendChild(rowDiv);
            });
        } else {
            alert('No data found.');
        }
    }, function(reason) {
        alert('Error fetching data: ' + reason.result.error.message);
    });
}

// Handle form submission and insert data into Google Sheets
document.getElementById('data-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const data1 = document.getElementById('input1').value;
    const data2 = document.getElementById('input2').value;

    const values = [[data1, data2]]; // Data to insert
    const body = {
        values: values
    };
    alert(data1);
    
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: RANGE,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: body
    }).then((response) => {
        alert('Data inserted successfully');
        document.getElementById('data-form').reset(); // Reset form fields
    }), function( (error) => {
        const container = document.getElementById('sheet-data');
        container.innerHTML = JSON.stringify(error);
        alert('Error inserting data: ' + error.message);
    });
});

// Start the Google API client
gapi.load('client:auth2', start);

// Fetch initial data when the page loads
window.onload = fetchData;
