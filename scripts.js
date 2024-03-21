$(document).ready(function () {
    // Nazwa właściciela repozytorium
    var owner = 'matix78';

    // Nazwa repozytorium
    var repo = 'Transkrypcje_bilet-w_SPE';

    // Ścieżka do folderu z plikami
    var path = 'transkrypcje/';

    // Funkcja pobierająca i wyświetlająca zawartość pliku
    function showFileContent(downloadUrl) {
        $.ajax({
            url: downloadUrl,
            headers: {
                Authorization: 'token ' + accessToken
            },
            dataType: 'text',
            success: function (content) {
                $('#messagesContainer').html('<span>' + content + '</span>');
            }
        });
    }

    // Pobierz zawartość repozytorium za pomocą GitHub API z autoryzacją tokenem dostępowym
    $.ajax({
        url: 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path,
        dataType: 'json',
        success: function (files) {
            // Iteruj przez każdy plik
            files.forEach(function (file) {
                // Sprawdź, czy plik ma rozszerzenie .html
                if (file.name.endsWith('.html')) {
                    // Usuń końcówkę .html z nazwy pliku
                    var fileName = file.name.replace('.html', '');

                    // Utwórz link do pobierania i wyświetlania zawartości pliku
                    var downloadLink = $('<a>').attr('href', '#').text('Pokaż').click(function () {
                        showFileContent(file.download_url);
                    });

                    // Utwórz element listy z nazwą pliku i linkiem do pobierania/wyświetlania
                    // Utwórz element listy z nazwą pliku, odstępem i linkiem do pobierania/wyświetlania
                    var listItem = $('<div>').addClass('file-item')
                        .append($('<span>').addClass('file-name').text('Nazwa transkrypcji: ' + fileName))
                        .append(' ')
                        .append($('<span>').addClass('show-link').append(downloadLink));

                    // Dodaj element do kontenera na wiadomości
                    $('#messagesContainer').append(listItem);
                }
            });
        }
    });
});
