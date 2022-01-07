var tasks;

var textBlock = $(".description");

var currentHour = moment().hour()
// console.log(currentHour)

var time = moment().format("[Today's date is] dddd, MMMM Do")

var timeDisplay = $("#currentDay");
timeDisplay.text(time);

var timeBlock = $(".hour")

var dateCheck = function () {
    for (var i = 0; i < timeBlock.length; i++) {
        var hour = parseInt($(timeBlock[i]).attr("id"));
        console.log(hour)

        if (hour < currentHour) {
            $(textBlock[i]).addClass("past");
        } else if (hour == currentHour) {
            $(textBlock[i]).addClass("present");
        } else {
            $(textBlock[i]).addClass("future");
        }
    }
}

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [
        { "9": "" },
        { "10": "" },
        { "11": "" },
        { "12": "" },
        { "13": "" },
        { "14": "" },
        { "15": "" },
        { "16": "" },
        { "17": "" }
    ]

    console.log(tasks);

    // For loop through all object properties (9-17)
    for (var i = 0; i < tasks.length; i++) {

        //store the object property name (9-17) in a variable
        var tasksPropertyName = (Object.getOwnPropertyNames(tasks[i]))
        console.log(tasksPropertyName)

        var tasksObjectValue = (Object.values(tasks[i]))
        console.log(tasksObjectValue)

        var newObject = {
            [i + 9]: tasksObjectValue[0]
        };
        console.log(newObject)

        //  if the tasks object has a value in any of the properties (9-17)
        if (tasksObjectValue[0].length > 0) {
            // create jQuery object of all span elements
            var allSpan = $("span");
            console.log(allSpan)
            // loop through all span elements and grab their Ids which corresponds to the time
            for (var j = 0; j < allSpan.length; j++) {
                var spanId = allSpan[j].id;
                console.log(spanId);
                // if the tasks.property matches to the span id, insert tasksObjectValue into sibling textarea
                if (tasksPropertyName[0] == spanId) {
                    var textField = $(allSpan[j]).siblings()[0]
                    //insert tasksObjectValue into allSpan[i].sibling 
                    textField.textContent = tasksObjectValue[0]
                    console.log(textField)
                }
            }
        }
    }
}

var saveTasks = function () {
    console.log(tasks)
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

$(".row").on("click", "textarea", function () {
    var text = $(this).text().trim();

    var textInput = $("<input>").addClass("col-9").addClass("description").val(text);

    $(this).replaceWith(textInput);

    textInput.trigger("focus");
})

$(".row").on("blur", "input", function () {
    //get the input's current value/text
    var text = $(this).val().trim();

    //recreate textarea element
    var taskArea = $("<textarea>").addClass("col-9").addClass("description").text(text);

    //replace input with textarea element
    $(this).replaceWith(taskArea);

    var timeReCheck = ($(taskArea).siblings()[0].textContent.trim());
    console.log(timeReCheck)
    // console.log(timeReCheck)
    if (timeReCheck.includes("PM")) {

        var newDateReCheck = timeReCheck.slice(0, -2)
        console.log("newDateReCheck", newDateReCheck)

        var check = parseInt(newDateReCheck)
        console.log("parseInt newDateReCheck", check)

        console.log("currentHour", currentHour)

        if (check == 12) {
            if (check < currentHour) {
                console.log(taskArea)
                $(taskArea).addClass("past");
            } else if (check === currentHour) {
                $(taskArea).addClass("present");
            } else {
                $(taskArea).addClass("future");
            }
        } else if (check < 12) {
            var timeCheck = check + 12;
            console.log("timeCheck", timeCheck)

            if (timeCheck < currentHour) {
                $(taskArea).addClass("past");
            } else if (timeCheck === currentHour) {
                $(taskArea).addClass("present");
            } else {
                $(taskArea).addClass("future");
            }
        }
    }
    var newDateReCheck = timeReCheck.slice(0, -2)

    var check = parseInt(newDateReCheck);
    // console.log(check);

    if (check < currentHour) {
        console.log(check)
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

    var idSave = ($(this).siblings()[0].id);
    console.log(idSave);

    for (var i = 0; i < tasks.length; i++) {
        var arrayKey = (Object.getOwnPropertyNames(tasks[i]))
        console.log(arrayKey)
        if (arrayKey == idSave) {
            var arrayKey = (Object.getOwnPropertyNames(tasks[i]))
            tasks[i] = { [i + 9]: taskSave }
            console.log(tasks)
        }

    }

    saveTasks();

})

loadTasks();

dateCheck();  
