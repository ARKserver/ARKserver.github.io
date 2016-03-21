var API = 'http://apiquery.xyz/ark/';
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

    $('#server_name').val(SERVER.server.HostName);
    $('#server_map').html(SERVER.server.Map);
    $('#server_time').html(SERVER.rules.DayTime_s + ' Uhr');
    $('#server_player').html(SERVER.server.Players );

    var pl = SERVER.server.Players / SERVER.server.MaxPlayers * 100.0;
    $('#server_playerstat').css('width', pl + '%').attr('aria-valuenow', pl);
    $('#server_playerstat').css('min-width','2em');
    $('#server_player_max').html('maximal '+SERVER.server.MaxPlayers+' Spieler');


    var pos = 1;
    $("#server_players > tbody").html("");
    $.each(SERVER.players, function (index, value) {

        $("#server_players").find('tbody')
            .append($('<tr>')
                .append($('<td>').text(pos))
                .append($('<td>').text(value.Name))
                .append($('<td>').text(value.TimeF))
            );

        pos++;
    });

}