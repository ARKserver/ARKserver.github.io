var API = 'https://api.ark.bar/server/134.255.235.59/20046';
var SERVER = [];

$(document).ready(function () {

    refresh();

});

function refresh() {
    $.getJSON(API, function (data) {
        SERVER = data;
        showData();
    });

}

function showData() {
    if (SERVER.status) {
        $('#server_status').html('online');
        $('#server_status').removeClass("label-danger");
        $('#server_status').addClass("label-success");
    } else {
        $('#server_status').html('offline');
        $('#server_status').removeClass("label-success");
        $('#server_status').addClass("label-danger");
    }

    $('#server_name').val(SERVER.server.name);
    $('#server_map').html(SERVER.server.map);
    $('#server_time').html(SERVER.server.time + ' Uhr');
    $('#server_player').html(SERVER.server.playerCount );

    var pl = SERVER.server.playerCount / SERVER.server.playerMax * 100.0;
    $('#server_playerstat').css('width', pl + '%').attr('aria-valuenow', pl);
    $('#server_playerstat').css('min-width','2em');
    $('#server_player_max').html('maximal '+SERVER.server.playerMax+' Spieler');


    var pos = 1;
    $("#server_players > tbody").html("");
    $.each(SERVER.server.players, function (index, value) {

        $("#server_players").find('tbody')
            .append($('<tr>')
                .append($('<td>').text(pos))
                .append($('<td>').text(value.name))
                .append($('<td>').text(value.humanTime))
            );

        pos++;
    });

}