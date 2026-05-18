var post_url = '/instruments/baczi/function.php';
$(document).ready(function(){
  d = 0
  $('[data-toggle="tooltip"]').tooltip();
  $('#submit').on('click touch', function(){
    $(document).scrollTop( $("#results").offset().top );
    sex_people = $('#sex_people').val()
    if (sex_people =='0'){
      $('#sex_people').css({'border': '1px solid red'})
    }else{
      $('#sex_people').css({'border': '1px solid #ccc' ,  'border-radius': '4px'})
    }
    address = $('input[name=address]').val()
    lat = $('#lat').val()
    if (lat == ''){
      $('#lat').css({'border': '1px solid red'})
    }else{
      $('#lat').css({'border': '1px solid #ccc' ,  'border-radius': '4px'})
    }
    lon = $('#lon').val()
    if (lon == ''){
      $('#lon').css({'border': '1px solid red'})
    }else{
      $('#lon').css({'border': '1px solid #ccc' ,  'border-radius': '4px'})
    }

    if (sex_people !='0'){
      fio = $('#fio').val()
      sex_people = $('#sex_people').val()
      day = $('#day').val()
      mounth = $('#mounth').val()
      year = $('#year').val()
      hour = $('#hour').val()
      min = $('#min').val()
      if(hour=='none'||min=='none'){
          hour=12;
          min=00;
      }
        // console.log(hour+min);
      address = $('#address').val()
      utc = $('#utc').val()
      timestamp = $('#timestamp').val()
      lat = $('#lat').val()
      lon = $('#lon').val()
      magnet_dec = $('#magnetdec').prop('checked')
      $.post(post_url, {'magnet_dec':magnet_dec, 'baczi': 'request', 'fio': fio, 'sex_people':sex_people,'utc':utc,'timestamp':timestamp,'lat':lat,'lon':lon, 'day': day, 'mounth': mounth, 'year': year, 'hour': hour, 'min': min})
       .done(function(data){
         $('#results').html(data)
           goaAdd();
       })
    }

  });
  dataMounthNow = $('#mounth').attr('data-mounth-now');
  $('#mounth').val(dataMounthNow);
  $('#mounth').change(function(){
    if($(this).val()==1){
      dayOfMounth(31)
    }
    if($(this).val()==2){
      var y = $('#year').val()
      if ((y % 4 != 0) || (y % 100 == 0 && y % 400 != 0)){
    		dayOfMounth(28)
    	}
    	else{
    	  dayOfMounth(29)
    	}
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
  });
  $('#day').change(function(){
    ts();
  });
  $('#year').change(function(){
    $('#mounth').change();
    ts();
  });
  $('#hour').change(function(){
    ts()
  });
  $('#min').change(function(){
    ts()
  });
  $('input[name=address]').change(function(){
    address = $('input[name=address]').val()
    if (address == ''){
      $('input[name=address]').css({'border': '1px solid red'})
      $('button[name=search]').css({'border': '1px solid red'})
        $('#decCheck').css({'display': 'none'})
    }else{
      $('input[name=address]').css({'border': '1px solid #ccc' ,  'border-radius': '4px'})
      $('button[name=search]').css({'border': '1px solid #ccc' ,  'border-radius': '4px'})
      $('#lat').css({'border': '1px solid #ccc' ,  'border-radius': '4px'})
      $('#lon').css({'border': '1px solid #ccc' ,  'border-radius': '4px'})
        $('#decCheck').css({'display': 'block'})
    }
    geo(address)
  }).on('keyup',function(){
      if($(this).val().length==0){
          $('#decCheck').css({'display': 'none'})
      }
  })
  $('#prints').on('click touch', function(){
      $('#allbox').removeClass('container');
      print();


  });
  // run load
  dayOfMounth(31);
  ts();

});

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
  hour = $('#hour').val()
  min = $('#min').val()
  if ( (hour == 'hour')||(min=='min')){
    hour=0
    min=0
  }
  $.post(post_url,{'timestamp':'stamp', 'day': day, "mounth": mounth, "year": year, 'hour': hour, 'min': min})
    .done(function(data){
      $('#timestamp').val(data)
    })
}
function utcFind(){
  lat = $('#lat').val()
  lon = $('#lon').val()
  timeS = $('#timestamp').val()
    // AIzaSyAIlMdHbQZWC2dxvu9dqtJxfhuh4tmUbKk balance
    //AIzaSyCbDY2mggQDphg9QoyyWRM_fgxwoU6RghU new balance
    // AIzaSyD5hecqaGqoFsklAZACeUDbAkTiRv5493Q consultant
  $.get('https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+lon+'&timestamp='+timeS+'&key=AIzaSyCbDY2mggQDphg9QoyyWRM_fgxwoU6RghU')
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
  $.post(post_url, {'sunCurle': sunCurle, 'table': 'set'})
    .done(function(data){
      $('#suntime').css({'display':'block'})
      $('#suntime').html()
      $('#suntime').html(data)
    })

}
function goaAdd(){
    $('#11_0').css({'min-width': $('#0_0').css("width"), 'max-width': $('#0_0').css("width")+1 })
    $('#0_0').css({"min-width": $('#11_0').css("width")})
    $('#11_1').css({'min-width': $('#0_1').css("width"), 'max-width': $('#0_1').css("width")+1 })
    $('#0_1').css({"min-width": $('#11_1').css("width")})
    $('#11_2').css({'min-width': $('#0_2').css("width"), 'max-width': $('#0_2').css("width")+1 })
    $('#0_2').css({"min-width": $('#11_2').css("width")})
    $('#11_3').css({'min-width': $('#0_3').css("width"), 'max-width': $('#0_3').css("width")+1 })
    $('#0_3').css({"min-width": $('#11_3').css("width")})
    $('#11_4').css({'min-width': $('#0_4').css("width"), 'max-width': $('#0_4').css("width")+1 })
    $('#0_4').css({"min-width": $('#11_4').css("width")})
    $('#11_5').css({'min-width': $('#0_5').css("width"), 'max-width': $('#0_5').css("width")+1 })
    $('#0_5').css({"min-width": $('#11_5').css("width")})
    $('#11_6').css({'min-width': $('#0_6').css("width"), 'max-width': $('#0_6').css("width")+1 })
    $('#0_6').css({"min-width": $('#11_6').css("width")})
    $('#11_7').css({'min-width': $('#0_7').css("width"), 'max-width': $('#0_7').css("width")+1 })
    $('#0_7').css({"min-width": $('#11_7').css("width")})
    $('#11_8').css({'min-width': $('#0_8').css("width"), 'max-width': $('#0_8').css("width")+1 })
    $('#0_8').css({"min-width": $('#11_8').css("width")})
    $('#11_9').css({'min-width': $('#0_9').css("width"), 'max-width': $('#0_9').css("width")+1 })
    $('#0_9').css({"min-width": $('#11_9').css("width")})
    sex = $("#sex_people").val();
    year_people = $("#goa").attr('data-real-china-year');
    // console.log (year_people);
    goa = E(sex,year_people);
    goa_caption = '<div style="clear: right;"><span style="float: left; font-weight: 600;">ГУА </span>&nbsp&nbsp&nbsp&nbsp<span style="float: right">'+goa[2]+'</span></div>';
    g = goa[1]
    nav = goa[0]
    // console.log(nav)
    nav_caption=''
    for(i=0; i<4; i++){
        // console.log(nav[i])
        if(nav[i]==1){
            nav_caption = 'Юго-Восток'
        }else if(nav[i]==2) {
            nav_caption = 'Юго'
        }else if(nav[i]==3){
            nav_caption = 'Юго-Запад'
        }else if(nav[i]==4){
            nav_caption = 'Восток'
        }else if(nav[i]==6){
            nav_caption = 'Запад'
        }else if(nav[i]==7){
            nav_caption = 'Северо-Восток'
        }else if(nav[i]==8){
            nav_caption = 'Север'
        }else if(nav[i]==9){
            nav_caption = 'Северо-Запад'
        }
        goa_caption += '<div style="clear: right; border-top: 1px solid gray"><span style="float: left; font-weight: 600;">'+g[i]+'</span>&nbsp&nbsp&nbsp&nbsp<span style="float: right">'+nav_caption+'</span></div>';
    }

    $('#goa').prepend(goa_caption);
    $("#goa").css({"display": "inline-block", "width": "auto"});
    $('#prints').css({'display':'block'});
}