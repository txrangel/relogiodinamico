const horas         = document.getElementById('horas');
const minutos       = document.getElementById('minutos');
const segundos      = document.getElementById('segundos');
const data          = document.getElementById('data');
const cidade        = document.getElementById('cidade');
const estado        = document.getElementById('estado');
const pais          = document.getElementById('pais');
const temperatura   = document.getElementById('temperatura');

const relogio = setInterval(function time(){
    let dateToday   = new Date();      
    let hr          = dateToday.getHours();
    let min         = dateToday.getMinutes();
    let seg         = dateToday.getSeconds();
    let d           = dateToday.getDate();
    let m           = dateToday.getMonth() + 1;
    let y           = dateToday.getFullYear();
    let dayweek     = dateToday.getDay();

    var diaSemanaTexto;
    switch (dayweek) {
        case 0:
            diaSemanaTexto = 'Domingo';
            break;
        case 1:
            diaSemanaTexto = 'Segunda-feira';
            break;
        case 2:
            diaSemanaTexto = 'Terça-feira';
            break;
        case 3:
            diaSemanaTexto = 'Quarta-feira';
            break;
        case 4:
            diaSemanaTexto = 'Quinta-feira';
            break;
        case 5:
            diaSemanaTexto = 'Sexta-feira';
            break;
        case 6:
            diaSemanaTexto = 'Sábado';
            break;
        }

    if (hr < 10)    hr      = '0' + hr;
    if (min < 10)   min     = '0' + min;
    if (seg < 10)   seg     = '0' + seg;
    if (d < 10)     d       = '0' + d;
    if (m < 10)     m       = '0' + m;

    horas.textContent       = hr;
    minutos.textContent     = min;
    segundos.textContent    = seg;
    data.textContent        = diaSemanaTexto + ' - ' + d + '/' + m + '/' + y;
})

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      var xhr       = new XMLHttpRequest();
      var url       = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + latitude + "&lon=" + longitude;
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response          = JSON.parse(xhr.responseText);
          cidade.textContent    = response.address.city;
          estado.textContent    = response.address.state;
          pais.textContent      = response.address.country;
          var weatherUrl        = "https://api.weatherbit.io/v2.0/current?lang=pt&lat=" + latitude + "&lon=" + longitude + "&key=44c22fe785284fa58bf2b1b8ba5b7cc0&include=minutely";
          var weatherXhr        = new XMLHttpRequest();
          weatherXhr.open("GET", weatherUrl, true);
          weatherXhr.onreadystatechange = function() {
            if (weatherXhr.readyState === 4 && weatherXhr.status === 200) {
              var weatherResponse       = JSON.parse(weatherXhr.responseText);
              temperatura.textContent   = weatherResponse.data[0].temp;
            }
          };
          weatherXhr.send();
        }
      };
      xhr.send();
    });
} else {
    console.log("Geolocalização não suportada");
}
  
  
  
  