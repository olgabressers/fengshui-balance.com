$(document).ready(function(){
  var lat,lon,z;
  if (lat == undefined){
    lat = 52.37;
    lon = 4.89;
    z = 11
  }
  $('input[name=declination_check]').css({'display':'none'})
  $('#24mounts').on('change',function(){
    svgChange();
  })
  // $('#angel_select').propeller({inertia: 0, speed: 0, step: 0});
  $('#angel_select').on('mousedown touchstart', function(e) {
    e.preventDefault(); // prevents the dragging of the image.
    $(document).bind('mousemove.rotateImg', function(e2) {
      rotateOnMouse(e2, $('#angel_select'));
    });
  });
  $(document).on('mouseup touchend',function(e) {
    $(document).unbind('mousemove.rotateImg');
  });
  $('input[name=fasad_degree]').on('mousewheel', function(){
    degrees();
  })
  $('input[name=fasad_degree]').on('mouseup', function(){
    degrees();
  })
  $('input[name=fasad_degree]').on('change', function(){
    degrees();
  })

  $('button[name=declination_switch]').on('click', function(){
    if (!$('input[name=declination_check]').is(':checked')){
      $.post('https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination',{
        browserRequest:"true",
        lat1: $('input[name=lat]').val(),
        lat1Hemisphere: "N",
        lon1: $('input[name=lon]').val(),
        lon1Hemisphere: "E",
        model:"WMM",
        startYear: $('input[name=year]').val(),
        startMonth: $('input[name=mounth]').val(),
        resultFormat:"xml",
        ajax:"true"
        })
        .done(function(data){
          respode = $(data).find('declination').first().text();
          $('input[name=declination]').val(respode);
          $('i.fa.fa-check').css({'color': 'green'});
          declination_degree_change(respode);
          $('input[name=declination_check]').attr('checked','true')
        })
        .fail(function(data){
          console.log(data);
          $('input[name=declination_check]').removeAttr('checked')
        })
    }else{
      $('input[name=declination_check]').removeAttr('checked')
      declination_degree_change(0);
      $('input[name=declination]').val('')
      $('i.fa.fa-check').css({'color': 'grey'})
    }
  })
  $('input[name=address]').keypress(function(e){
    if(e.keyCode == 13)
    {
        $('button[name=search]').click();
    }
  })
  $('button[name=search]').on('click',function(){
    search_text = $('input[name=address]').val()
    if (window.location.pathname == '/instruments/24mount/'){
      if (window.location.search == '?map=google'){
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18
        });
        var geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, map);
      }
      if (window.location.search == '?map=yandex'){
        get_coords(search_text)
      }
    }
    declination_degree_change(0);
    $('input[name=declination_switch]').removeAttr('checked')
  })
  mapSize();
  // console.log(window.location);
  if (window.location.pathname == '/instruments/24mount/'){
    if (window.location.search == '?map=google'){
      $('#gmaps').css({'background-color':'rgba(152,32,179,0.7)', 'border-radius': '5px', 'padding': '10px'})
      $('#map').html('');
      gmap(lat,lon,11);
      $('.navbar').css({'background-color': 'rgba(0,0,0,0.9)'})
    }
    if (window.location.search == '?map=yandex'){
      $('#ymaps').css({'background-color':'rgba(152,32,179,0.7)', 'border-radius': '5px', 'padding': '10px'})
      $('#map').html('');
      ymap(lat,lon,11);
      $('.navbar').css({'background-color': 'rgba(0,0,0,0.9)'})
    }
  }
  $.get('/instrumenty/' ,function(data){
    let d = $(data)
    mains = d.find('#et-top-navigation').html()
    $('#site_menu').html(mains)
  })


})
$(window).resize(function(){
  mapSize();
})
function degrees(){
  degree = parseFloat($('input[name=fasad_degree]').val());
  $('#angel_select').attr('transform', 'rotate(' + degree.toFixed(2) +' 315 315)');
}
function mapSize(){
  width = window.innerWidth;
  height  = window.innerHeight;
  $('#map').css({'width': width, 'height': height,});
  tops = (height/2)-(630/2);
  left = (width/2)-(630/2);
  $('#map_settings').css({'top': tops , 'left': left, 'display': 'none'});
  $("#sizes").html('width:'+width+'; height:'+height);
}
function ymap(lat,lon,z){

  ymaps.ready(init);
  var myMap,
      myPlacemark;

  function init(){
      myMap = new ymaps.Map("map", {
          center: [lat, lon],
          zoom: z
      });
  }
}
function gmap(lati,long,z) {
  $('#search').css({'text-overflow': 'ellipsis'})
  var uluru = {lat: parseFloat(lati), lng: parseFloat(long)};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: z,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
function svgChange(){
  data_mount = $('#24mounts').val();
  if (data_mount==1){
    // console.log(1);
    svgHide();
    $('#map_settings').css({'display':'block'});
    $('g#angel_select').css({'display':'block'});
    $('g#sanuan_lines').css({'display':'block'});
    $('g#sanuan').css({'display':'block'});
  }else if (data_mount==2) {
    // console.log(2);
    svgHide();
    $('#map_settings').css({'display':'block'});
    $('g#angel_select').css({'display':'block'});
    $('g#sanhe_lines').css({'display':'block'});
    $('g#sanhe').css({'display':'block'});
  }else if (data_mount==3) {
    // console.log(3);
    svgHide();
    $('#map_settings').css({'display':'block'});
    $('g#angel_select').css({'display':'block'});
    $('g#12vetvey_lines').css({'display':'block'});
    $('g#12vetvey').css({'display':'block'});
  }else{
    svgHide();
  }
}
function svgHide(){
  $('#map_settings').css({'display':'none'});
  $('g#sanuan_lines').css({'display':'none'});
  $('g#sanuan').css({'display':'none'});
  $('g#sanhe_lines').css({'display':'none'});
  $('g#sanhe').css({'display':'none'});
  $('g#12vetvey_lines').css({'display':'none'});
  $('g#12vetvey').css({'display':'none'});
  $('g#angel_select').css({'display':'none'});
}
function rotateOnMouse(e, pw) {
      // console.log($('svg24mounts'));
      var offset = $('svg24mounts').offset();
      var center_x = ((((window.innerWidth / 100) * 83.333) - 10)/2);
      var center_y = (((window.innerHeight-50)/2)-50);
      var mouse_x = e.pageX;
      var mouse_y = e.pageY;
      var degree = (Math.atan2(center_y - mouse_y, center_x - mouse_x)/Math.PI)*180;
      if (degree < 0) {
          degree = 360 + degree
      } else {
          if (degree > 180) {
              degree = degree - 360
          }
      };
      // console.log(degree);
      $(pw).attr('transform', 'rotate(' + degree.toFixed(2) +' 315 315)');
      $('input[name=fasad_degree]').val(degree.toFixed(2));


  }
function declination_degree_change(degrees){
  $('g#sanuan_lines').attr('transform','rotate('+degrees+' 315 315)');
  $('g#sanuan').attr('transform','rotate('+degrees+' 315 315)');
  $('g#sanhe_lines').attr('transform','rotate('+degrees+' 315 315)');
  $('g#sanhe').attr('transform','rotate('+degrees+' 315 315)');
  $('g#12vetvey_lines').attr('transform','rotate('+degrees+' 315 315)');
  $('g#12vetvey').attr('transform','rotate('+degrees+' 315 315)');
}
function get_coords(address){ // Поиск координат
  if (window.location.pathname == '/instruments/24mount/'){
    if (window.location.search == '?map=yandex'){
      ymaps.geocode(address, { results: 1 }).then(function (res)
        { // Выбираем первый результат геокодирования
        var firstGeoObject = res.geoObjects.get(0);
        var cords = firstGeoObject.geometry.getCoordinates();
        $('#map').html('');
        $('input[name=lat]').val(cords[0]);
        $('input[name=lon]').val(cords[1]);

        ymap(cords[0],cords[1],18);
        $('.navbar').css({'background-color': 'rgba(0,0,0,0.9)'})
        // console.log(cords[0],cords[1]);
      },
      function (err)
      {
        console.log(err.message);
      })
    }
  }
}
function geocodeAddress(geocoder, resultsMap) {
        var address = $('input[name=address]').val();
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            // console.log(resultsMap.setCenter(results[0].geometry.location));
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
