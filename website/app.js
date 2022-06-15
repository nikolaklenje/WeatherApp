 let d = new Date();
let newDate = d.getMonth() +1 +'.'+ d.getDate()+'.'+ d.getFullYear();


let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e631090799cff1e8d2f9c76b92ed97f9&units=imperial Depe';


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    let newZip =  document.getElementById('zip').value;
    let uContent = document.getElementById('feelings').value;
    getWeather(baseURL,newZip, apiKey) // no semicolon before .then
    .then(function(weatherData){
        postData('/add', {temp: weatherData.main.temp, date: newDate, content: uContent})
    })
    .then(()=>
        updateUI()
    )
}

const updateUI = async () => {
  const request = await fetch('/all');
  //retrieve data from our app
  try{
    const allData = await request.json();
    
    //select the necessary elements on the DOM (index.html), 
    //update their necessary values to reflect the dynamic values for temp, date, user input
    document.getElementById('date').innerHTML = "DATE: " + allData.date;
    document.getElementById('temp').innerHTML = "TEMP: " + allData.temp;
    document.getElementById('content').innerHTML = "NOTE: "+ allData.content;

}catch(error){
    console.log("error", error);
  }
}


/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL+zip+key)
    try {
      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

/* Function to POST data */
const postData = async ( url = '/add', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),         
  })
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};