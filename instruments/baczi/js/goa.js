// author http://uniquesite.ru
$(document).ready(function(){
  $('#year_people').on('change',function(){
    sex = $("#sex_people").val();
    year_people = $("#year_people").val();
    goa = E(sex,year_people);

    if (window.location.pathname=='/calc/goa/'){
        goa_people_deg(goa[2])
    }
  })
  $('#sex_people').on('change',function(){
    sex = $("#sex_people").val();
    year_people = $("#year_people").val();
      goa = E(sex,year_people);

      if (window.location.pathname=='/calc/goa/'){
          goa_people_deg(goa[2])
      }

  })
})

function E(sex,year_people){
    result =''
    if (sex=="0"){
      $('#error_people').html('Не выбран пол');
      $('#error_people').css({'color': 'red'});
      setTimeout(function(){
        $('#error_people').html('');
      } , 1500);
    }else if (sex=="m"){
      if (year_people<2000){
          year = year_people.substr(-2);
          first = year.substr(0,1);
          second = year.substr(-1);
        sum = parseInt(first) + parseInt(second);
        // console.log('sum = first + second: ' +sum);
        if (sum>9){
          sum = sum+'';
          sum = [sum.substring(0,1),sum.substring(1,2)];
          sum = parseInt(sum[0])+parseInt(sum[1]);
          // console.log('sum = sum[0]+sum[1]' +sum);
        }
        i = 10 - sum;
        if (i<0){
          i = i* -1
        }else if(i==0){
          i = 9
        }else if(i==5){
          i = 2
        }
        // console.log(i);
        result = goa_numbers(i);
        // console.log(result)
        $('#goa').css({'display':'block'})
      }else if(year_people>=2000){
          year = year_people.substr(-2);
          first = year.substr(0,1);
          second = year.substr(-1);
        sum = first + second
        // console.log('sum = first + second: ' +sum);
        if (sum>9){
          sum = sum+'';
          sum = [sum.substring(0,1),sum.substring(1,2)];
          sum = parseInt(sum[0])+parseInt(sum[1]);
          // console.log('sum = sum[0]+sum[1]' +sum);
        }
        i = 9 - sum;
        if (i<0){
          i = i* -1
        }else if(i==0){
          i = 9
        }else if(i==5){
          i = 2
        }
        // console.log(i);
          result = goa_numbers(i);
        $('#goa').css({'display':'block'})
      }
    }else if (sex=="z"){
      if (year_people<2000){
          year = year_people.substr(-2);
          first = year.substr(0,1);
          second = year.substr(-1);
        sum = first + second
        // console.log('sum = first + second: ' +sum)
        if (sum>9){
          sum = sum+'';
          sum = [sum.substring(0,1),sum.substring(1,2)];
          sum = parseInt(sum[0])+parseInt(sum[1]);
          // console.log('sum = sum[0]+sum[1]' +sum);
          if (sum>9){
            sum = sum+'';
            sum = [sum.substring(0,1),sum.substring(1,2)];
            sum = parseInt(sum[0])+parseInt(sum[1]);
            // console.log('sum2 = sum[0]+sum[1]' +sum);
          }
        }
        i=sum+5
        if (i>9){
          i = i+'';
          i = [i.substring(0,1),i.substring(1,2)];
          i = parseInt(i[0])+parseInt(i[1]);
          // console.log('i = i[0]+i[1]' +i);
        }else if(i==5){
          i=8
        }
        // console.log(i);
          result = goa_numbers(i);
        $('#goa').css({'display':'block'})
      }else if (year_people>=2000){
          year = year_people.substr(-2);
          first = year.substr(0,1);
          second = year.substr(-1);
          sum = first + second
        // console.log('sum = first + second: ' +sum)
        if (sum>9){
          sum = sum+'';
          sum = [sum.substring(0,1),sum.substring(1,2)];
          sum = parseInt(sum[0])+parseInt(sum[1]);
          // console.log('sum = sum[0]+sum[1]' +sum);
          if (sum>9){
            sum = sum+'';
            sum = [sum.substring(0,1),sum.substring(1,2)];
            sum = parseInt(sum[0])+parseInt(sum[1]);
            // console.log('sum2 = sum[0]+sum[1]' +sum);
          }
        }
        i=sum+6
          // console.log(i)
        if (i>9){
          i = i+'';
          i = [i.substring(0,1),i.substring(1,2)];
          i = parseInt(i[0])+parseInt(i[1]);
          // console.log('i = i[0]+i[1]=' +i);
        }
        if(i==5){
          i=8
        }
        // console.log(i);
        result=goa_numbers(i);
        $('#goa').css({'display':'block'})
      }
    }
    // console.log(result)
    return result;
}
function goa_numbers(i){
  if (i == 1){
    clear_goa()
    $('#goa_people_1').html('Шен Ци')
    goa_info('+4','1')
    $('#goa_people_2').html('Янь Нянь')
    goa_info('+2','2')
    $('#goa_people_3').html('Цзюэ Мин')
    goa_info('-4','3')
    $('#goa_people_4').html('Тьен И')
    goa_info('+3','4')
    $('#goa_people_5').html(i+'<br> Кань')
    $('#goa_people_6').html('Хо Хай')
    goa_info('-1','6')
    $('#goa_people_7').html('У Гуй')
    goa_info('-3','7')
    $('#goa_people_8').html('Фу Вей')
    goa_info('+1','8')
    $('#goa_people_9').html('Лю Ша')
    goa_info('-2','9')
    // goa_people_deg(i)
    $('#goa_people_1').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_2').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_4').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_8').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    blocks = [1,2,4,8]
    caption_blocks = ['Шен Ци','Янь Нянь','Тьен И','Фу Вей']
      goa_num = i
    result= [blocks,caption_blocks,i]

  }else if(i==2){
    clear_goa()
    $('#goa_people_1').html('У Гуй')
    goa_info('-3','1')
    $('#goa_people_2').html('Лю Ша')
    goa_info('-2','2')
    $('#goa_people_3').html('Фу Вей')
    goa_info('+1','3')
    $('#goa_people_4').html('Хо Хай')
    goa_info('-1','4')
    $('#goa_people_5').html(i+'<br> Кунь')
    $('#goa_people_6').html('Тьен И')
    goa_info('+3','6')
    $('#goa_people_7').html('Шен Ци')
    goa_info('+4','7')
    $('#goa_people_8').html('Цзюэ Мин')
    goa_info('-4','8')
    $('#goa_people_9').html('Янь Нянь')
    goa_info('+2','9')
    // goa_people_deg(i)
    $('#goa_people_3').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_6').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_7').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_9').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    blocks = [3,6,7,9]
    caption_blocks = ['Фу Вей','Тьен И','Шен Ци','Янь Нянь']
      goa_num = i
      result= [blocks,caption_blocks,i]

  }else if(i==3){
    clear_goa()
    $('#goa_people_1').html('Янь Нянь')
    goa_info('+2','1')
    $('#goa_people_2').html('Шен Ци')
    goa_info('+4','2')
    $('#goa_people_3').html('Хо Хай')
    goa_info('-1','3')
    $('#goa_people_4').html('Фу Вей')
    goa_info('+1','4')
    $('#goa_people_5').html(i+'<br> Чжэнь')
    $('#goa_people_6').html('Цзюэ Мин')
    goa_info('-4','6')
    $('#goa_people_7').html('Лю Ша')
    goa_info('-2','7')
    $('#goa_people_8').html('Тьен И')
    goa_info('+3','8')
    $('#goa_people_9').html('У Гуй')
    goa_info('-3','9')
    // goa_people_deg(i)
    $('#goa_people_1').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_2').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_4').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_8').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    blocks = [1,2,4,8]
    caption_blocks = ['Янь Нянь','Шен Ци','Фу Вей','Тьен И']
    result= [blocks,caption_blocks]
      goa_num = i
      result= [blocks,caption_blocks,i]

  }else if(i==4){
    clear_goa()
    $('#goa_people_1').html('Фу Вей')
    goa_info('+1','1')
    $('#goa_people_2').html('Тьен И')
    goa_info('+3','2')
    $('#goa_people_3').html('У Гуй')
    goa_info('-3','3')
    $('#goa_people_4').html('Янь Нянь')
    goa_info('+2','4')
    $('#goa_people_5').html(i+'<br> Шунь')
    $('#goa_people_6').html('Лю Ша')
    goa_info('-2','6')
    $('#goa_people_7').html('Цзюэ Мин')
    goa_info('-4','7')
    $('#goa_people_8').html('Шен Ци')
    goa_info('+4','8')
    $('#goa_people_9').html('Хо Хай')
    goa_info('-1','9')
    // goa_people_deg(i)
    $('#goa_people_1').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_2').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_4').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_8').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
      blocks = [1,2,4,8]
      caption_blocks = ['Фу Вей','Тьен И','Янь Нянь','Шен Ци']
      goa_num = i
      result= [blocks,caption_blocks,i]

  }else if(i==6){
    clear_goa()
    $('#goa_people_1').html('Хо Хай')
    goa_info('-1','1')
    $('#goa_people_2').html('Цзюэ Мин')
    goa_info('-4','2')
    $('#goa_people_3').html('Янь Нянь')
    goa_info('+2','3')
    $('#goa_people_4').html('У Гуй')
    goa_info('-3','4')
    $('#goa_people_5').html(i+'<br> Тянь')
    $('#goa_people_6').html('Шен Ци')
    goa_info('+4','6')
    $('#goa_people_7').html('Тьен И')
    goa_info('+3','7')
    $('#goa_people_8').html('Лю Ша')
    goa_info('-2','8')
    $('#goa_people_9').html('Фу Вей')
    goa_info('+1','9')
    // goa_people_deg(i)
    $('#goa_people_3').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_6').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_7').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_9').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    blocks = [3,6,7,9]
    caption_blocks = ['Янь Нянь','Шен Ци','Тьен И','Фу Вей']
      goa_num = i
      result= [blocks,caption_blocks,i]

  }else if(i==7){
    clear_goa()
    $('#goa_people_1').html('Лю Ша')
    goa_info('-2','1')
    $('#goa_people_2').html('У Гуй')
    goa_info('-3','2')
    $('#goa_people_3').html('Тьен И')
    goa_info('+3','3')
    $('#goa_people_4').html('Цзюэ Мин')
    goa_info('-4','4')
    $('#goa_people_5').html(i+'<br> Дуй')
    $('#goa_people_6').html('Фу Вей')
    goa_info('+1','6')
    $('#goa_people_7').html('Янь Нянь')
    goa_info('+2','7')
    $('#goa_people_8').html('Хо Хай')
    goa_info('-1','8')
    $('#goa_people_9').html('Шен Ци')
    goa_info('+4','9')
    // goa_people_deg(i)
    $('#goa_people_3').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_6').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_7').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_9').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    blocks = [3,6,7,9]
    caption_blocks = ['Тьен И','Фу Вей','Янь Нянь','Шен Ци']
      goa_num = i
      result= [blocks,caption_blocks,i]

  }else if(i==8){
    clear_goa()
    $('#goa_people_1').html('Цзюэ Мин')
    goa_info('-4','1')
    $('#goa_people_2').html('Хо Хай')
    goa_info('-1','2')
    $('#goa_people_3').html('Шен Ци')
    goa_info('+4','3')
    $('#goa_people_4').html('Лю Ша')
    goa_info('-2','4')
    $('#goa_people_5').html(i+'<br> Гэнь')
    $('#goa_people_6').html('Янь Нянь')
    goa_info('+2','6')
    $('#goa_people_7').html('Фу Вей')
    goa_info('+1','7')
    $('#goa_people_8').html('У Гуй')
    goa_info('-3','8')
    $('#goa_people_9').html('Тьен И')
    goa_info('+3','9')
    // goa_people_deg(i)
    $('#goa_people_3').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_6').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_7').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_9').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
      blocks = [3,6,7,9]
      caption_blocks = ['Шен Ци','Янь Нянь','Фу Вей','Тьен И']
      goa_num = i
      result= [blocks,caption_blocks,i]

  }else if(i==9){
    clear_goa()
    $('#goa_people_1').html('Тьен И')
    goa_info('+3','1')
    $('#goa_people_2').html('Фу Вей')
    goa_info('+1','2')
    $('#goa_people_3').html('Лю Ша')
    goa_info('-2','3')
    $('#goa_people_4').html('Шен Ци')
    goa_info('+4','4')
    $('#goa_people_5').html(i+'<br> Ли')
    $('#goa_people_6').html('У Гуй')
    goa_info('-3','6')
    $('#goa_people_7').html('Хо Хай')
    goa_info('-1','7')
    $('#goa_people_8').html('Янь Нянь')
    goa_info('+2','8')
    $('#goa_people_9').html('Цзюэ Мин')
    goa_info('-4','9')
    // goa_people_deg(i)
    $('#goa_people_1').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_2').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_4').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
    $('#goa_people_8').css({'background-color': 'rgba(238,0,255,0.4)', 'color':'white'})
     blocks = [1,2,4,8]
     caption_blocks = ['Тьен И','Фу Вей','Шен Ци','Янь Нянь']
      goa_num = i
      result= [blocks,caption_blocks,i]

  }
    return result
}
function clear_goa() {
  $('#goa_people_1').css({'background-color': 'rgba(255,255,255,0.4)', 'color':'black'})
  $('#goa_people_2').css({'background-color': 'rgba(255,255,255,0.4)', 'color':'black'})
  $('#goa_people_3').css({'background-color': 'rgba(255,255,255,0.4)', 'color':'black'})
  $('#goa_people_4').css({'background-color': 'rgba(255,255,255,0.4)', 'color':'black'})
  $('#goa_people_6').css({'background-color': 'rgba(255,255,255,0.4)', 'color':'black'})
  $('#goa_people_7').css({'background-color': 'rgba(255,255,255,0.4)', 'color':'black'})
  $('#goa_people_8').css({'background-color': 'rgba(255,255,255,0.4)', 'color':'black'})
  $('#goa_people_9').css({'background-color': 'rgba(255,255,255,0.4)', 'color':'black'})
  $('#goa_people_1_modal').remove()
  $('#goa_people_1').removeAttr('data-toggle')
  $('#goa_people_1').removeAttr('data-target')
  $('#goa_people_2_modal').remove()
  $('#goa_people_2').removeAttr('data-toggle')
  $('#goa_people_2').removeAttr('data-target')
  $('#goa_people_3_modal').remove()
  $('#goa_people_3').removeAttr('data-toggle')
  $('#goa_people_3').removeAttr('data-target')
  $('#goa_people_4_modal').remove()
  $('#goa_people_4').removeAttr('data-toggle')
  $('#goa_people_4').removeAttr('data-target')
  $('#goa_people_6_modal').remove()
  $('#goa_people_6').removeAttr('data-toggle')
  $('#goa_people_6').removeAttr('data-target')
  $('#goa_people_7_modal').remove()
  $('#goa_people_7').removeAttr('data-toggle')
  $('#goa_people_7').removeAttr('data-target')
  $('#goa_people_8_modal').remove()
  $('#goa_people_8').removeAttr('data-toggle')
  $('#goa_people_8').removeAttr('data-target')
  $('#goa_people_9_modal').remove()
  $('#goa_people_9').removeAttr('data-toggle')
  $('#goa_people_9').removeAttr('data-target')
  $('#group').remove()

}
function goa_people_deg(i){
  if (i==1 || i==3 || i==4 || i==9){
      $('div.container.goa').append('<div id="group" style="font-style: italic;font-weight: bold">Вы относитесь к Восточной группе с благоприятными направлениями: Юг, Восток, Юго-восток, Север. </div>')
  }else if (i==2 || i==6 || i==7 || i==8){
      $('div.container.goa').append('<div id="group" style="font-style: italic;font-weight: bold">Вы относитесь к Западной группе с благоприятными направлениями: Северо-восток, Запад, Северо-запад, Юго-запад. </div>')
  }
}
function goa_info(number, goa_people_n){
  if (number=='+4'){
    id = 'goa_people_'+goa_people_n
    $('body').append('<div id="'+id+'_modal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">+4 (Шен Ци)</h4></div><div class="modal-body"><p>+4 (Шен Ци) - Самая Благоприятная энергия. Она очень сильная и мощная. Это направление лучше использовать сильным и целеустремлённым людям. Она приносит здоровье, богатство, успех в бизнесе. Используя эту энергию вы станете  гиперактивными, поэтому будьте аккуратнее с этим направлением если у вас есть проблемы со здоровьем. Это направление также вносит позитивный  окрас в сексуальную жизнь, даёт рождение детей. Но, как оборотная сторона медали, может привнести нестабильность, нервозную возбужденность и нарушение сна.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button></div></div></div></div>')
    $('#'+id).attr('data-toggle',"modal")
    $('#'+id).attr('data-target', "#"+id+"_modal")
    $('#'+id).css({'cursor':'pointer'})
  }
  if (number=='+3'){
    id = 'goa_people_'+goa_people_n
    $('body').append('<div id="'+id+'_modal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">+3 (Тьен И)</h4></div><div class="modal-body"><p>+3 (Тьен И) - "небесный доктор". Очень благоприятная энергия, особенно для тех, кто хочет поправить свое здоровье. Повышает активность, приносит здоровье. Очень благоприятно влияет на деньги и карьеру. В отличии от энергии Шен Ци (+4), Тьен И (+3) более мягкая. Её использование также может привнести в вашу жизнь помощь высших сил.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button></div></div></div></div>')
    $('#'+id).attr('data-toggle',"modal")
    $('#'+id).attr('data-target', "#"+id+"_modal")
    $('#'+id).css({'cursor':'pointer'})
  }
  if (number=='+2'){
    id = 'goa_people_'+goa_people_n
    $('body').append('<div id="'+id+'_modal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">+2 (Янь Нянь)</h4></div><div class="modal-body"><p>+2 (Янь Нянь) - энергия долголетия и хорошего потомства. Эта энергия помогает привнести баланс в отношении между двумя людьми. Также эта энергия гармонизирует и укрепляет связи, делает активным в обществе и расслабляет. Её использование очень подходит для налаживания отношений в паре.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button></div></div></div></div>')
    $('#'+id).attr('data-toggle',"modal")
    $('#'+id).attr('data-target', "#"+id+"_modal")
    $('#'+id).css({'cursor':'pointer'})
  }
  if (number=='+1'){
    id = 'goa_people_'+goa_people_n
    $('body').append('<div id="'+id+'_modal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">+1 (Фу Вей)</h4></div><div class="modal-body"><p>+1 (Фу Вей) - эта энергия направлена на укрепление отношений в семье, в первую очередь.  Она помогает человеку найти себя, обрести свой путь, раскрыть потенциал. Возвращает человека к реальности. Помогает повысить социальный потенциал.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button></div></div></div></div>')
    $('#'+id).attr('data-toggle',"modal")
    $('#'+id).attr('data-target', "#"+id+"_modal")
    $('#'+id).css({'cursor':'pointer'})
  }
  if (number=='-1'){
    id = 'goa_people_'+goa_people_n
    $('body').append('<div id="'+id+'_modal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">-1 (Хо Хай)</h4></div><div class="modal-body"><p>-1 (Хо Хай) - переводится с китайского языка как "мелкие неприятности ". Самая щадящая из всех негативных энергий.  Дает человеку ощущение постоянной усталости, беспокойства по пустякам. Человек, находясь под властью этой энергии, может себя потерять, ослабить здоровье, плохо спать, стать ленивым.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button></div></div></div></div>')
    $('#'+id).attr('data-toggle',"modal")
    $('#'+id).attr('data-target', "#"+id+"_modal")
    $('#'+id).css({'cursor':'pointer'})
  }
  if (number=='-2'){
    id = 'goa_people_'+goa_people_n
    $('body').append('<div id="'+id+'_modal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">-2 (Лю Ша)</h4></div><div class="modal-body"><p>-2 (Лю Ша) - переводится с китайского языка как "шесть убийц ". Используя эту энергию, человек может начать принимать неправильные решения, в силу своей самоуверенности. Эта энергия споров, разногласия, сплетен. Кроме того она несёт с  собой ограничение в финансах.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button></div></div></div></div>')
    $('#'+id).attr('data-toggle',"modal")
    $('#'+id).attr('data-target', "#"+id+"_modal")
    $('#'+id).css({'cursor':'pointer'})
  }
  if (number=='-3'){
    id = 'goa_people_'+goa_people_n
    $('body').append('<div id="'+id+'_modal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">-3 (У Гуй)</h4></div><div class="modal-body"><p>-3 (У Гуй) - "Пять призраков". Сильная негативная энергия. Может принести конфликты, потерю денег, в том числе и грабежи, несчастные случаи. Человеку становится трудно принимать решения.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button></div></div></div></div>')
    $('#'+id).attr('data-toggle',"modal")
    $('#'+id).attr('data-target', "#"+id+"_modal")
    $('#'+id).css({'cursor':'pointer'})
  }
  if (number=='-4'){
    id = 'goa_people_'+goa_people_n
    $('body').append('<div id="'+id+'_modal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">-4 (Цзюэ Мин)</h4></div><div class="modal-body"><p>-4 (Цзюэ Мин) - "Полный крах". Самая разрушительная энергия. Эта энергия способна привнести в вашу жизнь самые плачевные ситуации: банкротство, несчастье, развод. Нет стабильности. Жизнь в постоянном напряжении.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button></div></div></div></div>')
    $('#'+id).attr('data-toggle',"modal")
    $('#'+id).attr('data-target', "#"+id+"_modal")
    $('#'+id).css({'cursor':'pointer'})
  }
}
