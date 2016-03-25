// JavaScript Document
var weather_codes = ['395', '392', '371', '368', '365', '362', '338', '335', '332', '329', '326', '323', '320', '317', '230', '227', '182', '179', '389', '386', '362', '356', '353', '314', '311', '308', '305', '302', '299', '296', '293', '176', '359', '377', '374', '350', '284', '281', '266', '185', '260', '248', '143', '200', '122', '119', '116', '113'];
var weather_imag=[];
weather_imag[0] = weather_imag[1] = weather_imag[2] = weather_imag[3] = weather_imag[4] = weather_imag[5] = weather_imag[6] = weather_imag[7] = weather_imag[8] = weather_imag[9] = weather_imag[10] = weather_imag[11] = weather_imag[12] = weather_imag[13] = weather_imag[14] =  weather_imag[15] = weather_imag[16] = weather_imag[17] = 'http://content.screencast.com/users/natein/folders/weather_cond/media/ce3559da-a522-41a2-93d8-94b4d143736b/snow.jpg';
weather_imag[18] = weather_imag[19] = weather_imag[20] = weather_imag[21] = weather_imag[22] = weather_imag[23] = weather_imag[24] = weather_imag[25] = weather_imag[26] = weather_imag[27] = weather_imag[28] = weather_imag[29] =weather_imag[30] = weather_imag[31] = 'http://content.screencast.com/users/natein/folders/weather_cond/media/47fedd9e-5ca2-47a2-9eb3-fa7c0e192524/rain.jpg';
weather_imag[32] = 'http://content.screencast.com/users/natein/folders/weather_cond/media/fc3bf867-f972-42a5-a9d1-2df01ccb6ed4/shower_tr.jpg';
weather_imag[33] = weather_imag[34] = weather_imag[35] = 'http://content.screencast.com/users/natein/folders/weather_cond/media/ac69044c-1c1f-4688-aec3-3045f5754bd0/ice_pellets2.jpg';
weather_imag[36] = weather_imag[37] = weather_imag[38] = weather_imag[39] = 'http://content.screencast.com/users/natein/folders/weather_cond/media/c4be070e-84e7-4d86-9e0a-55484d2ac99d/freezing_drizzle.jpg';
weather_imag[40] = weather_imag[41] = weather_imag[42] = 'http://content.screencast.com/users/natein/folders/weather_cond/media/e6370bb6-636d-4d44-b0b0-a873167b08e0/fog.jpg';
weather_imag[43] = 'http://content.screencast.com/users/natein/folders/weather_cond/media/8c3b2d0f-6181-4b4b-be41-eec3dd2246db/lightings.jpg';
weather_imag[44] = 'http://content.screencast.com/users/natein/folders/weather_cond/media/d6269499-f145-47f2-87d0-13b65fc9fff7/overcast.jpg';
weather_imag[45] = weather_imag[46] = 'http://content.screencast.com/users/natein/folders/weather_cond/media/0b2ab89c-5507-4d5b-abd3-19a9e8ac9f12/cloudy.jpg';
weather_imag[47] = 'http://content.screencast.com/users/natein/folders/weather_cond/media/8c623511-e3f2-4e6a-a03f-1d08126c5355/clear.jpg';

function changeBackground(weather_code) {
    for(var i = 0; i < weather_codes.length; i++) {
        if (weather_codes[i] === weather_code) {
            var el = document.getElementById('weather_image');
            el.style.backgroundImage ="url('" + weather_imag[i] + "')";            
        }    
    }  
}

var cels;
var temp_C;
var temp_F;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

var weather_query;
var location_query;

function success(pos) {
	var crd = pos.coords;
	var lat=crd.latitude;
	var long=crd.longitude;
	
	weather_query='http://api.worldweatheronline.com/free/v2/weather.ashx?q=' + lat + ',' +  long + '&format=JSON&num_of_days=1&date=today&tp=24&key=56d6a3f791112896160f4010a4f0c';
	location_query='http://api.worldweatheronline.com/free/v2/search.ashx?query=' + lat + ',' +  long + '&num_of_results=1&format=json&key=56d6a3f791112896160f4010a4f0c';
	
	request_data();
};

function error(err) {  
	weather_query='http://api.worldweatheronline.com/free/v2/weather.ashx?q=' + userip + '&format=JSON&num_of_days=1&date=today&tp=24&key=56d6a3f791112896160f4010a4f0c';
	location_query='http://api.worldweatheronline.com/free/v2/search.ashx?query=' + userip + '&num_of_results=1&format=json&key=56d6a3f791112896160f4010a4f0c';
	
	request_data();
};

function request_data() {

	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;	
	var xhr = new XHR();
	xhr.open('GET', weather_query, true);
	
	xhr.onload = function() {
		var weather = JSON.parse(this.responseText);
		var temp = document.getElementById('temp');
cels=false;
    temp_C=weather.data.current_condition[0].temp_C;
    temp_F=weather.data.current_condition[0].temp_F;

recalculate();
    cond=document.getElementById('condition');		    cond.innerHTML=weather.data.current_condition[0].weatherDesc[0].value;    
		changeBackground(weather.data.current_condition[0].weatherCode);	
	}
	
	xhr.onerror = function() {
	  alert( 'Ошибка ' + this.status );
	}
	
	xhr.send();

	xhr = new XHR();
	xhr.open('GET', location_query, true);
	
	xhr.onload = function() {
		var loc = JSON.parse(this.responseText);
		var locat=document.getElementById('location');
    
		locat.innerHTML = loc.search_api.result[0].areaName[0].value + ', ' + loc.search_api.result[0].country[0].value;	
	}
	
	xhr.onerror = function() {
	  alert( 'Ошибка ' + this.status );
	}
	
	xhr.send();
		
}

function recalculate() {
  var temp = document.getElementById('temp');	
  if(cels===true) { //текущая погода в цельсиях
    temp.innerHTML = temp_F + ' °F';
    temp.style.color="purple";
    cels=false;
  }
  else {
    temp.innerHTML = temp_C + ' °C';
    if (temp_C>0) {
      temp.style.color="red";
    }
    else
    {
      temp.style.color="blue";
    }    
    cels=true;    
  }
}

navigator.geolocation.getCurrentPosition(success, error, options);
