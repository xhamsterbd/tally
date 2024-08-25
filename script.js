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
