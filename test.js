const URL="https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=40ea1d2ba6ec059073b04e857a884579"
const getdata=async()=>{
    
    try{
        const weather =await fetch(URL)
        const data=await weather.json();
        
        if(data.cod!==200){
            console.log(data.message);
        }
        else{
            console.log(data);
        }
    }
    catch(err){
        console.log("fetch issue");
    }
}
getdata();