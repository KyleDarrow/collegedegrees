function fetchData() {
    // Reference: https://stackoverflow.com/questions/61456020/best-way-to-check-status-code-of-http-response
    //create a fetch request to return promise
    fetch("degree.json")
        //resolve promise using the response class
        .then((response) => {
            //check status code of response
            console.log("Status code: " + response.status, response.statusText);
            if (!response.ok){
                throw new Error(`HTML Error: ${response.status}`);
            }
            return response.json();
        })
        //process the returned JSON data
        .then(data => {
            console.log("Data:", data);
            const degrees = data.collegeDegrees;
            const degreeList = document.getElementById("degreeList");
            degreeList.innerHTML = "";
            const table = document.createElement("table");

            //add table headers
            const headerRow = table.insertRow();
            const headers = ["School", "Program", "Type", "Year"];
            for (const header of headers) {
                const th = document.createElement("th");
                th.textContent = header;
                headerRow.appendChild(th);
            }

            //add table content
            for (let i = 0; i < degrees.length; i++) {
                const elements = degrees[i];
                const degree = elements.degree;
                const row = table.insertRow();
                const cells = ["school", "program/major", "type", "year conferred"];
                for (const cell of cells) {
                    const td = row.insertCell();
                    td.textContent = degree[cell];
                }
            }
            degreeList.appendChild(table);
            degreeList.style.display = "flex";
        })
        .catch(error => {
            console.error("Error:", error.message);
        });
}

document.getElementById("degrees").addEventListener("click", fetchData);
