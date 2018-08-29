var fighterArray = ['Daniel Cormier', 'Conor McGregor', 'TJ Dillashaw', 'Max Holloway', 'Georges St-Pierre', 'Demetrious Johnson', 'Tyron Woodley', 'Khabib Nurmagomedov', 'Stipe Miocic', 'Robert Whittaker', 'Cris Cyborg', 'Henry Cejudo', 'Tony Ferguson', 'Amanda Nunes', 'Rose Namajunas'];

var displayButtons = function() {
    for (i = 0; i < fighterArray.length; i++) {
        $('<button>', {
            text: fighterArray[i],
            type: 'button',
            class: 'fighter-buttons btn btn-primary',
            'data-fighter': fighterArray[i]
        }).click(buttonCall).appendTo('#buttons');

    }
};

var buttonCall = function() {
    console.log("this works");
    var fighter = $(this).attr('data-fighter')

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + encodeURI(fighter) + "&api_key=4toHIbGpGb6jDjciacmz1DyjNHEWynVs&limit=10";
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response.data);
        var results = response.data;

        for (i = 0; i < results.length; i++) {
            var imageDiv = $('<div>');

            var ratingText = $('<p>', {
                class: 'rating-text',
                text: 'Rating: ' + results[i].rating
            }).appendTo(imageDiv);

            var gifImage$ = ('<img>', {
                class: 'img-fluid img-thumbnail',
                
            })
        }
    });
    
};




$(document).ready(function() {
    displayButtons();
});