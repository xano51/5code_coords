$(document).ready(function() {
    function ToggleCoordsBox(action) {
        if (action === "opencoordsbox") {
            $("#menu").fadeIn(500);
            $("body").css('cursor', 'default'); // Ustaw kursor domyślny
        } else if (action === "closecoordsbox") {
            $("#menu").fadeOut(500);
            $("body").css('cursor', 'none'); // Ukryj kursor, gdy UI jest niewidoczne
        }
    }

    function UpdateCoordsBox(coords) {
        $("#coord1").text(`${coords.x.toFixed(2)}, ${coords.y.toFixed(2)}, ${coords.z.toFixed(2)}`);
        $("#coord2").text(`x = ${coords.x.toFixed(2)}, y = ${coords.y.toFixed(2)}, z = ${coords.z.toFixed(2)}`);
        $("#coord3").text(`x = ${coords.x.toFixed(2)}, y = ${coords.y.toFixed(2)}, z = ${coords.z.toFixed(2)}, h = ${coords.h.toFixed(2)}`);
        $("#coord4").text(`vector3(${coords.x.toFixed(2)}, ${coords.y.toFixed(2)}, ${coords.z.toFixed(2)}), h = ${coords.h.toFixed(2)}`);
        $("#coord5").text(`vector4(${coords.x.toFixed(2)}, ${coords.y.toFixed(2)}, ${coords.z.toFixed(2)}, ${coords.h.toFixed(2)})`);
    }

    $(document).on('click', '.copyButton', function() {
        var id = $(this).data('id');
        var coordText = $(`#${id}`).text();

        console.log(`Copying text from ${id}: ${coordText}`);

        navigator.clipboard.writeText(coordText).then(function() {
            console.log('Text copied to clipboard');
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
        });
    });

    window.addEventListener('message', function(event) {
        if (event.data.type === 'updateCoords') {
            UpdateCoordsBox(event.data.coords);
        } else if (event.data.type === 'ui') {
            ToggleCoordsBox(event.data.display ? 'opencoordsbox' : 'closecoordsbox');
        }
    });
});

function copyToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
}

$(document).on('click', '.copyButton', function() {
    var id = $(this).data('id');
    var coordText = $(`#${id}`).text();
    console.log(`Copying text from ${id}: ${coordText}`);
    copyToClipboard(coordText);
});
