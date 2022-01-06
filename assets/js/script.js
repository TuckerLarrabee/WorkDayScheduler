var tasks = [
    {"9": ""},
    {"10": ""},
    {"11": ""},
    {"12": ""},
    {"13": ""},
    {"14": ""},
    {"15": ""},
    {"16": ""},
    {"17": ""},
]

// var allSpan = $("span");
// console.log(allSpan)
// // loop through all span elements and grab their Ids which corresponds to the time
// for(var i = 0; i<allSpan.length; i++) {
//     var testingTwo = allSpan[i].siblings();
//             console.log(testingTwo);
// }

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

    // taskValue = (Object.values(tasks))
    //     console.log(taskValue)

   

    if (!tasks) {
        var tasks = [
            {"9": ""},
            {"10": ""},
            {"11": ""},
            {"12": ""},
            {"13": ""},
            {"14": ""},
            {"15": ""},
            {"16": ""},
            {"17": ""},
        ]
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.log(tasks)
    } 
}

    // For loop through all object properties (9-17)
    // $.each ???
    for (var i = 0; i < tasks.length; i++) {

        //store the object property name (9-17) in a variable
        var tasksPropertyName = (Object.getOwnPropertyNames(tasks[i]))
        console.log(tasksPropertyName)

        //  store the object properties value in a variable
        tasksObjectArray = JSON.parse(localStorage["tasks"])
        console.log(tasksObjectArray)
        tasksObjectValue = (Object.values(tasksObjectArray[i]))
        console.log(tasksObjectValue)

        var newObject = {
            [i+9]: tasksObjectValue[i]
        };
        console.log(newObject)

        // if (tasksObjectArray[i]) {
        //     console.log(tasksObjectArray[i])
        //     console.log(Object.values(tasksObjectArray[i]))
        // }
        

        //  if the tasks object has a value in any of the properties (9-17)
        if (tasksObjectValue) {
            // create jQuery object of all span elements
            var allSpan = $("span");
            console.log(allSpan)
            // loop through all span elements and grab their Ids which corresponds to the time
            for(var i = 0; i<allSpan.length; i++) {
                var spanId = allSpan[i].id;
                console.log(spanId);
                    // if the tasks.property matches to the span id, insert tasksObjectValue into sibling textarea
                    if (tasksPropertyName == spanId) {
                        var textTest = ($(allSpan[i]).siblings()[0])
                        //insert tasksObjectValue into allSpan[i].sibling 
                        textTest.textContent = tasksObjectValue
                        console.log(textTest)
                }
        }
}
}



// $.each(tasks, function (list, arr) {
//     // console.log(list, arr);
//     // then loop over sub-array
//     arr.forEach(function (task) {
//         createTask(task.text, task.date, list);
//     });
//     });
// };
    
    // var taskArea = $("<textarea>").addClass("col-9").addClass("description").text();
    // console.log(taskArea)


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
    // console.log(timeReCheck)
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
    // console.log(check);
    
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
    // console.log($(this).siblings())
    // console.log(taskSave);

    var idSave = ($(this).siblings()[0].id);
    // console.log(idSave);

    for (var i = 0; i < tasks.length; i++) {
        var arrayKey = (Object.getOwnPropertyNames(tasks[i]))
        // console.log(arrayKey)
        if (arrayKey == idSave) {
            var arrayKey = (Object.getOwnPropertyNames(tasks[i]))
            tasks[i] = {[i+9]: taskSave}
        //     var test = Object.assign(+((tasks[i]+"9")), taskSave)
        //     console.log(test)
            // tasks[i].push(taskSave)
        }

    }
//     $.each(tasks, function (key, array) {
//         console.log(key);
//         if (key == idSave) {
//             array.splice(0, 99, taskSave)
//             console.log(tasks);
//         }        
// });
    saveTasks();

})

loadTasks();

dateCheck();  
