function start() {
    gapi.client.init({
        'apiKey': 'AIzaSyDE2s5psY3y30C40EUBEPgvQo0b_fCjQH4',
    }).then(function() {
        return gapi.client.request({
            'path': 'https://sheets.googleapis.com/v4/spreadsheets/1Lr5LGzj_dNYW0cvuypPO4VvYZOtmRmOHNkNPZDBNMd4/values/Sheet1!A1:D10',
        });
    }).then(function(response) {
        const data = response.result.values;
        const container = document.getElementById('sheet-data');
        data.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.textContent = row.join(' | '); // Adjust based on how you want to display data
            container.appendChild(rowDiv);
        });
    }, function(reason) {
        alert('Error: ' + reason.result.error.message);
    });
}

gapi.load('client', start);

const CLIENT_ID = '559511833873-qdm724gc649edfo707tlm6d4sa1ta1sp.apps.googleusercontent.com'; // Your Client ID
const API_KEY = 'AIzaSyDE2s5psY3y30C40EUBEPgvQo0b_fCjQH4'; // Your API Key
const SHEET_ID = '1Lr5LGzj_dNYW0cvuypPO4VvYZOtmRmOHNkNPZDBNMd4'; // Replace with your Sheet ID
const RANGE = 'Sheet1!A1:B1'; // Replace with your target range

gapi.load('client:auth2', initClient);

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets"
    }).then(function () {
        gapi.auth2.getAuthInstance().signIn();
    });
}

document.getElementById('data-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const data1 = document.getElementById('input1').value;
    const data2 = document.getElementById('input2').value;

    const values = [[data1, data2]]; // Data to insert
    const body = {
        values: values
    };
    
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: RANGE,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: body
    }).then((response) => {
        alert('Data inserted successfully');
        alert(response);
        document.getElementById('data-form').reset(); // Reset form fields
    }, (error) => {
        alert('Error inserting data '+error.message);
    });
});
