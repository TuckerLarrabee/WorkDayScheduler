var tasks = {
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: []
};

var textBlock = $(".description");

var currentHour = moment().hour()
// console.log(currentHour)

var time = moment().format("[Today's date is] dddd, MMMM Do")

var timeDisplay = $("#currentDay");
timeDisplay.text(time);

var timeBlock = $(".hour")


var dateCheck = function () {
    // console.log(timeBlock)

    for(var i = 0; i < timeBlock.length; i++) {
        var hour = parseInt($(timeBlock[i]).attr("id"));
       
        if (hour < currentHour) {
            $(textBlock[i]).addClass("past");
        } else if (hour == currentHour) {
            $(textBlock[i]).addClass("present");
        } else {
            $(textBlock[i]).addClass("future");
        }
    }
}



var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

$(".row").on("click", "textarea", function(){
    var text = $(this).text().trim();
  
    var textInput = $("<input>").addClass("col-9").addClass("description").val(text);
  
    $(this).replaceWith(textInput);

    textInput.trigger("focus");
})

$(".row").on("blur", "input", function() {
    //get the input's current value/text
    var text =$(this).val().trim();
    
    //recreate textarea element
    var taskArea = $("<textarea>").addClass("col-9").addClass("description").text(text);
    // console.log(taskArea);
    // console.log(text);

    //replace input with textarea element
    $(this).replaceWith(taskArea);

    var timeReCheck = ($(taskArea).siblings()[0].textContent.trim());
    console.log(timeReCheck)
    if (timeReCheck.includes("PM")) {

        var newDateReCheck = timeReCheck.slice(0, -2)
        var check = parseInt(newDateReCheck)
        var timeCheck = check + 12;

        if (timeCheck < currentHour) {
            $(taskArea).addClass("past");
        } else if (timeCheck == currentHour) {
            $(taskArea).addClass("present");
        } else {
            $(taskArea).addClass("future");
        }  
    }
    var newDateReCheck = timeReCheck.slice(0, -2)
    
    var check = parseInt(newDateReCheck);
    console.log(check);
    
    if (check < currentHour) {
        $(taskArea).addClass("past");
    } else if (check == currentHour) {
        $(taskArea).addClass("present");
    } else {
        $(taskArea).addClass("future");
    }  
})



$(".saveBtn").on("click", function () {
    //if we click the save button, grab the text from the same row
    var taskSave = ($(this).siblings()[1].textContent.trim());
    console.log(taskSave);

    //after we grab the text from the same row, push that into an array


    localStorage.setItem("tasks", JSON.stringify(tasks))


    // for (var i = 0; i < textBlock.length; i++) {
    //     var test = $(textBlock[i]).val().trim();
    //     console.log(test)
    // }

    // localStorage.setItem("tasks", JSON.stringify(tasks))



    // for(var i = 0; i < textBlock.length; i++) {
    //     var data = ($(textBlock[i]).val());
    //     console.log(data);
    // }
})



dateCheck();  