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

var animatePicture = function() {
    console.log('animate')
    var state = $(this).attr('data-state');
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }
    else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
};

var buttonCall = function() {
    var fighter = $(this).attr('data-fighter')

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + encodeURI(fighter) + "&api_key=4toHIbGpGb6jDjciacmz1DyjNHEWynVs&limit=50";
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        var results = [];
        for (i = 0; i < 10; i++) {
            var randItem = response.data.splice(Math.floor(Math.random() * response.data.length), 1)
            results.push(randItem[0]);
        }

        for (i = 0; i < results.length; i++) {
            var imageDiv = $('<div>', {
                class: 'card image-div'
            })

            $('<img>', {
                class: 'card-image-top img-fluid gif-image',
                'data-state': 'still',
                'data-still': results[i].images.fixed_height_still.url,
                'data-animate': results[i].images.fixed_height.url,
                'src': results[i].images.fixed_height_still.url
            }).click(animatePicture).appendTo(imageDiv);

            var cardTextDiv = $('<div>', {
                class: 'card-body'
            }).appendTo(imageDiv);

            $('<p>', {
                class: 'card-text rating-text',
                text: 'Rating: ' + results[i].rating
            }).appendTo(cardTextDiv);

            $('#gifs').prepend(imageDiv);
        }
    });
    
};





$(document).ready(function() {
    displayButtons();
});