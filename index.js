/* html de oluşturduğum değerleri burda çağırıyorum */
const search = document.querySelector(".search_area button");

/* Kullanıcının search e ne yazdığını dinleyip ona göre tepki vereceğim */
search.addEventListener("click", () => {
  const APIKey = "aeae66b81ae5580f73b50439c47f650a";
  const city = document.querySelector(".search_area input").value;

  if (city === "") return;

  /* apiden gelen responce doğrudan json göndermediği için jsona çevirip sonra kullaıyoruz */

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");

      /* önce jsondan gelen weather ve 0.indeksine göre if i çalıştırıyoruz.
      json.weather[0].main  burada main ile hava durumunun ana durmunu yani açık mı yağmurlu mu ona ulaşıp weatherMain değişkenine atıyorum  */
      if (json.weather && json.weather[0]) {
        const weatherMain = json.weather[0].main;

        if (weatherMain === "Clear") {
          image.src = "img/clear.png";
        } else if (weatherMain === "Rain") {
          image.src = "img/rain.png";
        } else if (weatherMain === "Snow") {
          image.src = "img/snow.png";
        } else if (weatherMain === "Clouds") {
          image.src = "img/cloud.png";
        } else if (weatherMain === "Haze") {
          image.src = "img/mist.png";
        } else {
          image.src = "";
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        /* veri ondalık olabilir diye tamsayıya döndürdük float da kullanılabilir.Hiçbirşey kullanmasakta olur*/
        description.innerHTML = `${json.weather[0].description}`;
      } else {
        image.src = "";
        temperature.innerHTML = "";
        description.innerHTML = "Hava durumu bilgisi bulunamadı.";
      }
    })
    .catch((error) => console.error("Hata:", error));
  /* fetch de bize promise yani bir söz yapısı döner.resolve ve reject. hata olursa yakalamak için catch kullanırız. */
});
