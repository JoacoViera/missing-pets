window.onload = function() {
    const dir = window.localStorage.getItem('city');
    if(dir ===  null){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
          const url = "https://dev.virtualearth.net/REST/v1/Locations/" + position.coords.latitude + "," + position.coords.longitude + "?includeEntityTypes=%20address&o=json&key=Aohmz8pwJwwdCVXI2IxXHSY3l4O4XP8sp-YII9zt1M5CJd9wKar4IoDAvPP_e0xU";
    
          const Http = new XMLHttpRequest();
    
          Http.open('GET', url);
          Http.send();
          let department = '';
          try {
            Http.onreadystatechange = e => {
                if (Http.readyState === XMLHttpRequest.DONE) {
                    department = Http.responseText;
                    department = JSON.parse(`${department}`);
                    if(typeof department.resourceSets[0].resources[0] === 'undefined'){
                      window.localStorage.setItem('city', "none");
                      window.location.reload();
                    }else{
                      department = department.resourceSets[0].resources[0].address.locality;
                      window.localStorage.setItem('city', department);
                      window.location.reload();
                    }

                }
            };
          } catch (error) {
            window.localStorage.setItem('city', "none");
            window.location.reload();
          }
        },function(){
          // Si se bloquea o hay algun error en obtener la geolocalizacion, se pasara a seleccionarla manualmente.
          window.localStorage.setItem('city', "none");
          window.location.reload();
        });

      } else {
        alert('Sorry, your browser does not support HTML5 geolocation.');
      }
    }
};