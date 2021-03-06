var sBtn = $('#searchBtn');
var search = $('#search');
var rsltDiv = $('#rsltDiv');
var input;
var url;

$(search).keyup(function(){
    var val = $(this).val();
    input = val;
});

//https://itunes.apple.com/search?parameterkeyvalue
//key1=value1&amp;key2=value2&amp;key3=value3
// var url2 = 'https://itunes.apple.com/search?term=jack+johnson&entity=musicVideo&country=us';

$(sBtn).on('click', function () {
    input = input.replace(/\s+/g, '+');
    url = 'https://itunes.apple.com/search?term=' + input + '&media=podcast&attribute=descriptionTerm&country=us&entity=podcast&limit=10';
    console.log('searching for: ' + input);
    console.log(url);
    $.ajax({
        url: url,
        method: 'GET'
    }).then(function (response) {
        var rslt = JSON.parse(response);

        console.log(rslt);
        console.log('you found ' + rslt.resultCount + ' results!');
        
        $(rsltDiv).empty();
        for (var i = 0; i < rslt.resultCount; i++){
            console.log(rslt.results[i]);
            renderer(rslt.results[i], i);
        };
    });
});

function renderer(res, num){
    var div = $('<div id = \'result' + num + '\' class = \'text-left\'></div>');
    var pic = $('<img src = \'' + res.artworkUrl100 + '\' class = \'rounded float-left\'>')
    var title = res.trackName;
    var author = res.artistName;
    var genre = res.genres;
    var genreP = '<p>Genre: <strong>' + genre.join(', ') + '</strong></p>';
    var link = '<a href = \'' + res.trackViewUrl + '\'><button class = \'btn btn-sm btn-secondary mx-2\'>iTunes Page</button></a>';
    var feedLink = '<a href = ' + res.feedUrl + '><button class = \'btn btn-sm btn-secondary mx-2\'>RSS</button></a>';
    var template = $('<p>Podcast Title: <strong>' + title + '</strong></p> ' + genreP + ' <p>Author: <strong>' + author + '</strong></p> <div class = \'buttonsDiv\'>' + feedLink + link + '</div><hr>');
    // template += '<p>' + feedLink + '</p>'
    // template += '<p>Link: <a href = \'' + link + '\'<em>' + link + '</em></a></p> <hr></hr>'
    
    $(pic).appendTo(div);
    $(template).appendTo(div);
    $(rsltDiv).append(div);
};