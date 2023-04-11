$(document).ready(function () {

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

    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    // we will display the date as DD-MM-YYYY 
    let day = `${currentDay}-${currentMonth}-${currentYear}`;

    // Take response from the user
    $("#submit").click(function (e) {
        e.preventDefault();
        var name = $('#name-field').val();
        var start = $('#start-field').val();
        var end = $('#end-field').val();
        var desc = $('#desc-field').val();
        var target =  $('#target-field').val();
   
        $('#events-list').find('tbody').append(
            "<tr><td>" 
            + day 
            + "</td><td>" 
            + name 
            + "</td><td>" 
            + start 
            + "</td><td>" 
            + end 
            + "</td><td>" 
            + target 
            + "</td><td>" 
            + desc + "</td></tr>"
        );
        $('#name-field').val("");
        $('#start-field').val("");
        $('#end-field').val("");
        $('#end-field').val("");
        $('#target-field').val("");
        $('#desc-field').val("");
        $('.card').hide();

    });

});

