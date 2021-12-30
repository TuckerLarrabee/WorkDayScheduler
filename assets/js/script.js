$(".text").on("click", function() {
    var text = $(this).text().trim();

    var textInput = $("<textArea>").addClass("col-8").addClass("format").val(text);

    $(this).replaceWith(textInput);
})