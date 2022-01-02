var tasks = {};

var textBlock = $(".description");

var currentHour = moment().hour()

var time = moment().format("[Today's date is] dddd, MMMM Do")

var timeDisplay = $("#currentDay");
timeDisplay.text(time);

var dateCheck = function () {
    //get date from each row
    var timeBlock = $(".hour");
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

$(".saveBtn").on("click", function () {
    //if we click the save button, grab the text from the same row
    var taskSave = ($(this).siblings()[1].textContent.trim());
    console.log(taskSave);

    //after we grab the text from the same row, push that into an array
    tasks.push(taskSave)
    console.log(tasks)

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