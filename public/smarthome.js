document.addEventListener("DOMContentLoaded", function(){
    var socket = io();

    fetch('http://api.openweathermap.org/data/2.5/weather?q=Gdansk&appid=3e08c3f2a397676a33c17ea578324f00').then(
        function(response) {
            response.json().then(function(data) {
                var externalTemp = data.main.temp - 273.15;
                var tempContainer = document.querySelector('#temp-outside-screen');
                tempContainer.innerHTML = externalTemp + '&deg;C';
            });
        }
    );

    document.querySelectorAll('.switchLight').forEach(function(icon) {
        icon.addEventListener('click', function () {
            var ledNumber = this.getAttribute('data-id');
            this.classList.toggle('toggle-light');
            var actionNr = this.classList.contains('toggle-light') ? 0 : 1;
            socket.emit('switch light', ledNumber, actionNr);
        });
    });

    document.querySelectorAll('.measureTemp').forEach(function(icon) {
        icon.addEventListener('click', function () {
            this.classList.toggle('toggle-temp');
        });
    });

    document.querySelector('.openDoor').addEventListener('click', function () {
        this.classList.toggle('toggle-door');
        var garageNr = this.getAttribute('data-id');
        var actionNr = this.classList.contains('toggle-door') ? 1 : 0;
        socket.emit('toggle door', garageNr, actionNr);
    });

    document.querySelector('#day-night').addEventListener('click', function () {
      this.classList.toggle('toggle-day');
      var dayState = this.getAttribute('data-id');
      var actionNr = this.classList.contains('toggle-day') ? 0 : 1;
      socket.emit('toggle day', dayState, actionNr);
    });
});
