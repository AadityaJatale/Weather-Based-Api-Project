const Box = document.querySelector(".Box"),
inputPart=Box.querySelector("#Middle_bar"),
infoTxt=inputPart.querySelector("#text-info"),
inputField=inputPart.querySelector("input");
locationBtn=inputPart.querySelector("button");
wIcon=document.querySelector(".weather-part img");

let api;
inputField.addEventListener("keyup",e =>{
    if(e.key=="Enter" && inputField.value!=""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert("Your browser not support geolocation api")
    }
});

function onSuccess(position){
    const{latitude,longitude}=position.coords;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e15c357631216d4ad48388233fb5e861`;
    fetchdata();
}

function onError(error){
    infoTxt.innerText=error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e15c357631216d4ad48388233fb5e861`;
    fetchdata();
}

function fetchdata(){
    infoTxt.innerText="Getting weather details.."
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function weatherDetails(info){
    if(info.cod == '404'){
        infoTxt.innerText=`${inputField.value} is not a valid city name`
        infoTxt.classList.replace("pending","error");
    }
    else{

        const city=info.name;
        const country=info.sys.country;
        const feels_like=info.main.feels_like;
        const humidity=info.main.humidity;
        const temp=info.main.temp;
        const weather_atmos=info.weather[0].description;
        const id=info.weather[0].id;
        

        if(id>=200 && id<=232){
            wIcon.src="Weather Icons/strom.svg";
        }
        else if(id>=300 && id<=321){
            wIcon.src="Weather Icons/haze.svg"
        }
        else if( id>=500 && id<=531){
            wIcon.src="Weather Icons/rain.svg";
        }
        else if( id>=600 && id<=622){
            wIcon.src="Weather Icons/snow.svg";
        }
        else if(id==800){
            wIcon.src="Weather Icons/clear.svg"
        }
        else if( id>=801 && id<=804){
            wIcon.src="Weather Icons/cloud.svg"
        }
        else{
            
        }
        Box.querySelector("#city").innerText=city;
        Box.querySelector("#country").innerText=country;
        Box.querySelector("#dumb-temp-2").innerText=Math.floor(feels_like);
        Box.querySelector("#box-text-humid").innerText=humidity;
        Box.querySelector("#dumb-temp").innerText=Math.floor(temp);
        Box.querySelector("#wether-atmos").innerText=weather_atmos;


        infoTxt.classList.remove("pending","error");
        Box.classList.add("active");
        console.log(info);

    }
}