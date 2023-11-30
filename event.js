
function fetchData() {
    // Reference: https://stackoverflow.com/questions/61456020/best-way-to-check-status-code-of-http-response
    //create a fetch request to return promise
    fetch("degree.json")
        //resolve promise using the response class
        .then((response) => {
            //check status code of response
            console.log(response.status, response.statusText);
            if (!response.ok){
                throw new Error(`HTML Error: ${response.status}`);
            }
            return response.json();
        })
        //process the returned JSON data
        .then(data => {
            console.log("Data:", data);
        })
        .catch(error => {
            console.error("Error:", error.message);
        })
}

document.getElementById("degrees").addEventListener("click", fetchData)
