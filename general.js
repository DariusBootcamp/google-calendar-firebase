
// -----------process day-----------------------------------
  var currentDate;

    // Display calendar 
    $('#calendar').datepicker({
        showButtonPanel: true,
        inline: true,
        firstDay: 1,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        appendText: "hell",
        // Select date and show the add event card
        onSelect: function (selectedDate) {
            $("#event-form").show().css("left", $(this).find('.ui-datepicker-current-day').position().left).css("top", ($(this).find('.ui-datepicker-current-day').position().top + 100))
            currentDate = selectedDate;
        }
    });


    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    var mm = yesterday.getMonth() + 1; // Tháng trả về từ 0-11, cần +1 để đúng định dạng
    var dd = yesterday.getDate();
    var yyyy = yesterday.getFullYear();
    
    if (mm < 10) {
      mm = '0' + mm;
    }
    
    if (dd < 10) {
      dd = '0' + dd;
    }
    
    var formattedDate = mm + '/' + dd + '/' + yyyy;
    // console.log(formattedDate);

// -----------process day-----------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyC8YQLvswsSi_2tRsbnPIJIJ13p3hlOT_Q",
  authDomain: "logincalendar-fdccd.firebaseapp.com",
  databaseURL: "https://logincalendar-fdccd-default-rtdb.firebaseio.com",
  projectId: "logincalendar-fdccd",
  storageBucket: "logincalendar-fdccd.appspot.com",
  messagingSenderId: "963251439699",
  appId: "1:963251439699:web:7fa87a5ce6d194b069dea6"
};

firebase.initializeApp(firebaseConfig)

var database = firebase.database()


var yesterdayArray = [];

submit.addEventListener('click', (e)=>{
        var name = $('#name-field').val();
        var start = $('#start-field').val();
        var end = $('#end-field').val();
        var desc = $('#desc-field').val();
        var target =  $('#target-field').val();

        database.ref('cal/' + name).set({
          currentDate: currentDate,
          desc: desc,
          endTime: end,
          startTime: start,
          target: target,
          tittle: name,
        })

        alert("add ok")
})


// ---------------------- chart process ---------------------------------
var yesterdayArray = [];

  
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  var mm = yesterday.getMonth() + 1; 
  var dd = yesterday.getDate();
  var yyyy = yesterday.getFullYear();
  
  if (mm < 10) {
    mm = '0' + mm;
  }
  
  if (dd < 10) {
    dd = '0' + dd;
  }
  
  var formattedDate = mm + '/' + dd + '/' + yyyy;

  
  $(document).ready(function () {

    var timeInve = parseInt(0);
    var timeConsu = parseInt(0);
    var timeRest = parseInt(0);
  
     var calen_ref = database.ref('cal/')
          calen_ref.on('value', function(snapshot){
            var data = snapshot.val()
            const canlenArray = Object.values(data);
  
            for(var i=0; i<canlenArray.length; i++){
                if(canlenArray[i].currentDate == formattedDate){
                  yesterdayArray.push(canlenArray[i])
                }
            }

            console.log("Đúng")
            console.log("mảng này chứa tất cả phần tử ngày hôm qua", yesterdayArray)
            console.log("Đúng")

            for(var j=0; j<yesterdayArray.length; j++){
                if(yesterdayArray[j].target == "Investment time"){
                    timeInve += Math.abs((parseInt(yesterdayArray[j].endTime)  - parseInt(yesterdayArray[j].startTime))*60)
                  }else
                  if(yesterdayArray[j].target == "Consumption time"){
                    console.log("ra", (parseInt(yesterdayArray[j].endTime)  - parseInt(yesterdayArray[j].startTime))*60);
                    timeConsu += Math.abs((parseInt(yesterdayArray[j].endTime)  - parseInt(yesterdayArray[j].startTime))*60)
                  }else
                  if(yesterdayArray[j].target == "Rest time"){
                    timeRest += Math.abs((parseInt(yesterdayArray[j].endTime)  - parseInt(yesterdayArray[j].startTime))*60)
                  }
            } 

            var totalTimeYesterday = parseInt(timeInve + timeConsu + timeRest);
            var percenInve = parseInt((timeInve/totalTimeYesterday)*100)
            var percenConsu = parseInt((timeConsu/totalTimeYesterday)*100)
            var percenRest = parseInt((timeRest/totalTimeYesterday)*100)
          

            var xValues = ["Investment time", "Consumption time", "Rest time"];
            var yValues = [percenInve, percenConsu, percenRest];
            var barColors = [
            "#b91d47",
            "#00aba9",
            "#2b5797"
            ];
            
            new Chart("myChart", {
            type: "pie",
            data: {
                labels: xValues,
                datasets: [{
                backgroundColor: barColors,
                data: yValues
                }]
            },
            options: {
                title: {
                display: true,
                text: "Below is a chart of your activity for the past day"
                }
            }
            });

          
          })
// ---------------------- chart process ---------------------------------
})  