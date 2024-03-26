const API_KEY="40ea1d2ba6ec059073b04e857a884579";

const MakeIconURL=(iconID)=>`https://openweathermap.org/img/wn/${iconID}.png`

const FormattedData=async(city,units = 'metric')=>{
    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data1 =await fetch(URL);

    const data = await data1.json();    // Converting data1 to json format
    const {weather,
        main:{feels_like,humidity,pressure,temp,temp_max,temp_min},
        wind:{speed},
        sys:{country},
        name
    }=data;
    const {description, icon, main}=weather[0];

    return{
        description, main,
        iconURL:MakeIconURL(icon)
        ,feels_like,humidity,pressure,temp,temp_max,temp_min,
        speed,country,name
    };

};

export default FormattedData;
