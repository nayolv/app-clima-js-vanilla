window.addEventListener("load", () => {
  let lon;
  let lat;
  var secretkey = config.SECRET_KEY;

  let temperaturaValor = document.getElementById("temperatura-valor");
  let temperaturaDescripcion = document.getElementById("temperatura-descripcion");

  let ubicacion = document.getElementById("ubicacion");
  let iconoAnimado = document.getElementById("icono-animado");

  let vientoVelocidad = document.getElementById("viento-velocidad");


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      //console.log(posicion)
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;

      //ubicacion actual
       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=` + secretkey;

      //ubicacion por ciudad
      //const url = `https://api.openweathermap.org/data/2.5/weather?q=Mexico&lang=es&units=metric&appid=` + secretkey;

      //console.log(url);

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {

          const temp = Math.round(data.main.temp);
          temperaturaValor.textContent = `${temp} °C`;
          temperaturaDescripcion.textContent = data.weather[0].description;
          ubicacion.textContent = data.name
          vientoVelocidad.textContent = `${data.wind.speed} m/s`;

          console.log(data.weather[0].main);

          switch (data.weather[0].main) {
              case 'Clear':
                  iconoAnimado.src = 'animated/day.svg'
              break;
              case 'Rain':
                  iconoAnimado.src = 'animated/rainy-1.svg'
              break;
              case 'Thunderstorm':
                  iconoAnimado.src = 'animated/thunder.svg'
              break;
              case 'Drizzle':
                  iconoAnimado.src = 'animated/rainy-2.svg'
              break;
              case 'Snow':
                  iconoAnimado.src = 'animated/snowy-1.svg'
              break;
              case 'Atmosphere':
                  iconoAnimado.src = 'animated/weather.svg'
              break;
              case 'Clouds':
                  iconoAnimado.src = 'animated/cloudy.svg'
              break;
              case 'Dust':
                  iconoAnimado.src = 'animated/cloudy.svg'
              break;
              default:
                  iconoAnimado.src = 'animated/weather_sprite.svg'
          }

        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
});
