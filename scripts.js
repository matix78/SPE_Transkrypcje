$(document).ready(function () {
    var owner = 'matix78';
    var repo = 'Transkrypcje_bilet-w_SPE';
    var path = 'transkrypcje/';

    function showFileContent(downloadUrl) {
        $.ajax({
            url: downloadUrl,
            dataType: 'text',
            success: function (content) {
                $('#messagesContainer').html(content);
            }
        });
    }

    $.ajax({
        url: 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path,
        dataType: 'json',
        success: function (files) {
            files.forEach(function (file) {
                if (file.name.endsWith('.html')) {
                    var fileName = file.name.replace('.html', '');

                    var parts = fileName.split('.');
                    var numberPart = parts[0];

                    var downloadLink = $('<a>').attr('href', '#').text('Pokaż').click(function () {
                        showFileContent(file.download_url);
                    }).css('float', 'right');

                    var listItem = $('<div>').addClass('file-item')
                        .append($('<span>').addClass('file-name').text('Numer transkrypcji: ')
                        .append($('<span>').text(numberPart).css('color', 'blue')))
                        .append(' ')
                        .append(downloadLink); 

                    $('#messagesContainer').append(listItem);
                }
            });
        }
    });
});
