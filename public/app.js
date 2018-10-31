// Grab the articles as a json
$.getJSON("/articles", function(data) {
  for (j = 1; j < 13; j++) {
    if (data.length >= 3) {
      for (var i = (j - 1) * 3; i < j * 3; i++) {
        // Display the apropos information on the page
        $(".row" + j).append(
          "<div class='col-lg-4 col-md-12 mb-3'><div class='view overlay z-depth-1-half'><img src='" +
            data[i].img +
            "' height='220' width='350'><p data-id='" +
            data[i]._id +
            "'><a target='_blank' href='" +
            data[i].link +
            "' <h4><strong>" +
            data[i].title +
            "</strong></h4></a><br /><br>" +
            data[i].summary +
            "</p></div></div>"
        );
      }
    } else {
      break;
    }
  }
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $(".notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $(".modal-title").text(data.title);
      // A button to submit a new note, with the id of the article saved to it
      $(".save").attr("id", data._id);

      // If there's a note in the article
      if (data.note) {
        for (i = 0; i < data.note.length; i++) {
          $(".notes").append("<h4>" + data.note[i].body + "</h4>");
        }
      }
      $(".modal").modal("show");
    });
});

// When you click the savenote button
$(document).on("click", ".save", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      body: $("#message-text").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
    });
  $(".notes").append("<h4>" + $("#message-text").val() + "</h4>");
  // Also, remove the values entered in the input and textarea for note entry
  $("#message-text").val("");
});
