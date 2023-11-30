

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
            const degreeInfo = document.getElementById("degreeList");
            for (let i = 0; i < degrees.length; i++) {
                const elements = degrees[i];
                const degree = elements.degree;
                const degreeInformation = document.createElement("div");
                degreeInformation.innerHTML = `
                <p><strong>School:</strong> ${degree.school}</p>
                <p><strong>Program:</strong> ${degree["program/major"]}</p>
                <p><strong>Type:</strong> ${degree.type}</p>
                <p><strong>Year Conferred:</strong> ${degree["year conferred"]}</p>
                <br>`;
                degreeList.appendChild(degreeInformation);
            }
            degreeInfo.style.display = "flex";
        })
        .catch(error => {
            console.error("Error:", error.message);
        });
}

document.getElementById("degrees").addEventListener("click", fetchData);
