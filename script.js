$(document).ready(function() {

  // the book opens only one time when you click on a button-search
$("#getResult").one( "click", function() {
    document.getElementById('book').classList.toggle('open'); 
})
  
$(document).ready(function() {
  $("#getResult").click(function() {
    // clearing the content 
    $("ul").empty();
    var search = $("#search").val();
    $.ajax({
      type: 'GET',
      url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + search,
      dataType: 'jsonp',
      success: function(result) {
        console.log(result);
        var obj = result.query.pages;
        var count = 0;
        for (var prop in obj) {
          if(count< 5) {
          $("ul.page1").append('<a target="_blank" href="https://en.wikipedia.org/wiki?curid=' + obj[prop].pageid + '">' + '<li><h4 class="title ">' + obj[prop].title + '</h4><p class="text">' + obj[prop].extract.slice(0, 120) + "..." + '</p></li></a>');
          } else {
             $("ul.page2").append('<a target="_blank" href="https://en.wikipedia.org/wiki?curid=' + obj[prop].pageid + '">' + '<li><h4 class="title ">' + obj[prop].title + '</h4><p class="text">' + obj[prop].extract.slice(0, 120) + "..." + '</p></li></a>');      
          }
          count++;
        }
      }
    });
  });

  // starting a search after enter is pressed       
  $("#search").keypress(function(e) {
    if (e.which == 13) {
      $("#getResult").click();
    }
  });

  // removing the outline of the buttons when clicked
  $('#getResult, #randomResult').click(function() {
    $(this).blur();
  });
});
});

