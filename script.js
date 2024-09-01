let jsonData = [];

// Fetch the JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        console.log('Data fetched successfully:', jsonData);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to generate random leads
function generateLeads() {
    const numLeads = parseInt(document.getElementById('numLeads').value);
    const randomLeads = [];

    if (numLeads > jsonData.length) {
        alert("Not enough leads available.");
        return;
    }

    while (randomLeads.length < numLeads) {
        const randomIndex = Math.floor(Math.random() * jsonData.length);
        const randomLead = jsonData[randomIndex];
        if (!randomLeads.includes(randomLead)) {
            randomLeads.push(randomLead);
        }
    }

    displayResults(randomLeads);
}

// Function to display results in a table
function displayResults(leads) {
    const resultsContainer = document.getElementById('results');
    
    // Clear previous results
    resultsContainer.innerHTML = '';

    if (leads.length === 0) {
        resultsContainer.textContent = 'No leads available.';
        return;
    }

    // Create table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table header
    const headerRow = document.createElement('tr');
    const headers = ['USERNAME', 'Name', 'OCCUPATION', 'EMAIL']; // Include 'Email' in the header
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table rows
    leads.forEach(lead => {
        const row = document.createElement('tr');
        const cells = [lead.id, lead.name, lead.type, lead.email]; // Include 'email' in the cells
        cells.forEach(cellText => {
            const td = document.createElement('td');
            td.textContent = cellText;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    resultsContainer.appendChild(table);
}
