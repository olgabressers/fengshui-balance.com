$(document).ready(function(){
  $('#address').change( function(){
    changeHide()
    address = $('#address').val()
    geo(address)
  })
  $('#submit').on('click touch', function(){
    sunTime()
  })
  $('#day').change(function(){
    changeHide()
    ts()
  })
  $('#mounth').change(function(){
    changeHide()
    if($(this).val()==1){
      dayOfMounth(31)
    }
    if($(this).val()==2){
      dayOfMounth(28)
    }
    if($(this).val()==3){
      dayOfMounth(31)
    }
    if($(this).val()==4){
      dayOfMounth(30)
    }
    if($(this).val()==5){
      dayOfMounth(31)
    }
    if($(this).val()==6){
      dayOfMounth(30)
    }
    if($(this).val()==7){
      dayOfMounth(31)
    }
    if($(this).val()==8){
      dayOfMounth(31)
    }
    if($(this).val()==9){
      dayOfMounth(30)
    }
    if($(this).val()==10){
      dayOfMounth(31)
    }
    if($(this).val()==11){
      dayOfMounth(30)
    }
    if($(this).val()==12){
      dayOfMounth(31)
    }
    ts()
  })
  $('#year').change(function(){
    changeHide()
    ts()
  })

  // run all is need

  dayOfMounth(31)
  ts()
})
function dayOfMounth(mou){
  $('#day').html('')
  for (var i = 1; i < mou+1; i++) {
    $('#day').append('<option value='+i+'>'+i+'</option>')
  }
}
function ts(){
  day = $('#day').val()
  mounth = $('#mounth').val()
  year = $('#year').val()
  $.post('/instruments/function.php/',{'day': day, "mounth": mounth, "year": year})
    .done(function(data){
      $('#timestamp').val(data)
      utcFind()
    })
}
function utcFind(){
  lat = $('#lat').val()
  lon = $('#lon').val()
  timeS = $('#timestamp').val()
  $.get('https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+lon+'&timestamp='+timeS+'&key=AIzaSyD5hecqaGqoFsklAZACeUDbAkTiRv5493Q')
    .done(function(data){
      if(data.status == 'OK'){
        dstOffset = data.dstOffset
        rawOffset = data.rawOffset
        dstOffset = ((dstOffset /60)/60)
        rawOffset = ((rawOffset /60)/60)
        utc = dstOffset + rawOffset
      }
      if (utc>0){
        $('#utc').val('+'+utc)
      }else if (utc<0) {
        $('#utc').val(utc)
      }else{
        $('#utc').val(utc)
      }
    })
}
function geo(geocoder) {
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      cords = results[0].geometry.bounds
      cords = cords+' '
      cords = cords.split(',')
      cords[2] = cords[2].substring(2,12)
      cords[3] = cords[3].substring(0,10)
      $('#lat').val(cords[2])
      $('#lon').val(cords[3])
      utcFind()
    }
  });
}
function sunTime(){
  utc = $('#utc').val()
  lon = $('#lon').val()
  // console.log('utc='+utc+'; lon='+lon);
  meridian = utc * 15
  baseMeredian = meridian - (parseFloat(lon))
  sunCurle = baseMeredian * 4
  sunCurle = Math.ceil(sunCurle)
  // console.log('meridian='+meridian+'; baseMeredian='+baseMeredian+'; sunCurle='+sunCurle);
  $.post('/instruments/function.php', {'sunCurle': sunCurle, 'table': 'set'})
    .done(function(data){
      $('#suntime').css({'display':'block'})
      $('#suntime').html()
      $('#suntime').html(data)
    })

}
function changeHide(){
  $('#suntime').css({'display':'none'})
}
