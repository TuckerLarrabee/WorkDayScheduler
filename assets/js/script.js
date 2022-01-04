var tasks = {
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
}

// for (var i = 0; i < 10; i++) {

// var mapOne = new Map();



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

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"))
    console.log(tasks);

    if (!tasks) {
        tasks = {
            9: [],
            10: [],
            11: [],
            12: [],
            13: [],
            14: [],
            15: [],
            16: [],
            17: [],
        }
        localStorage.setItem("tasks", (tasks));
    } 

    //For loop through all object properties (9-17)
    for (var i = 0; i < tasks.length; i ++) {
         // if the tasks object has a value in any of the properties (9-17)
        if (tasks.key) {
            //grab the property value from tasks object

            //find all span elements by their id (9-17)
                var testing = $("span");
                console.log(testing)
                for(var i = 0; i<testing.length; i++) {

                var testingTwo = testing[i].id;
                console.log(testingTwo);
                //if the tasks.property matches to the span id, insert tasks.property into sibling textarea 
        }
}

    }
}


    // var taskArea = $("<textarea>").addClass("col-9").addClass("description").text();
    // console.log(taskArea)





// $.each(tasks, function (list, arr) {
//     // console.log(list, arr);
//     // then loop over sub-array
//     arr.forEach(function (task) {
//         createTask(task.text, task.date, list);
//     });
//     });
// };


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
    console.log(taskArea);
    console.log(text);

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
    console.log($(this).siblings())
    console.log(taskSave);

    var idSave = ($(this).siblings()[0].id);
    // console.log(idSave);

    $.each(tasks, function (key, array) {
        console.log(key);
        if (key == idSave) {
            array.splice(0, 99, taskSave)
            console.log(tasks);
        }        
});
    saveTasks();

})

loadTasks();

dateCheck();  