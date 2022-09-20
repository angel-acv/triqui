var turno = "o";
var cantidadOpciones = 3;
var TamañoMatriz = cantidadOpciones * cantidadOpciones;
var Juego = "tictactoe";
$("#ganador").hide();

CrearComponentesJuego();
$(".pieza").click(function() {
    $(this).val(turno);
    cotejar();
    turno = (turno == "o") ? "x" : "o";
    $('#turnoDisplay').val(turno);
});

function cotejar() {
    for (i = 1; i <= cantidadOpciones; i++) {
        for (j = 1; j <= cantidadOpciones; j++) {
            fila = i;
            columna = j;
            contadorTotalFilas = 1;
            contadorTotalcolumnas = 1;
            contadorDiagonal = 1;
            contadorDiagonalInversa = 1;
            contadorTurnos = 0;
            $(".pieza").each(function(index) {
                elid = $(this).attr('id');
                if ((elid.charAt(0) == fila) && ($(this).val() == turno)) {
                    contadorTotalFilas++;
                    if (contadorTotalFilas == (cantidadOpciones + 1)) {
                        campeon();
                    }
                }

                if ((elid.charAt(1) == columna) && ($(this).val() == turno)) {
                    contadorTotalcolumnas++;
                    if (contadorTotalcolumnas == (cantidadOpciones + 1)) {
                        campeon();
                    }
                }
                if ((elid.charAt(1) == elid.charAt(0)) && ($(this).val() == turno)) {
                    contadorDiagonal++;
                    if (contadorDiagonal == (cantidadOpciones + 1)) {
                        campeon();
                    }
                }
                valorTotaldiagonal = parseInt(elid.charAt(1)) + parseInt(elid.charAt(0));
                if (((valorTotaldiagonal) == (cantidadOpciones + 1)) && ($(this).val() == turno)) {
                    contadorDiagonalInversa++;
                    if (contadorDiagonalInversa == (cantidadOpciones + 1)) {
                        campeon();
                    }
                }
                if ($(this).val() != "void") {
                    contadorTurnos++;
                    if (contadorTurnos == (cantidadOpciones * cantidadOpciones)) {
                        TerminarJuego();
                    }
                }
                if (contadorTurnos == TamañoMatriz){
                    TerminarJuego();
                    
                }
            });
        }
    }
}

function TerminarJuego() {
    $("#alertMensaje").html("Juego terminado");
    $(".alert").show('slow');
    $("#iniciar").removeClass("disabled");
    $(".pieza").each(function(index) {
        $(this).attr('disabled', true);
    }); //
}

function Reiniciar() {
    $("#ganador").hide();
    $(".alert").hide('slow');
    contadorTotalFilas = 1;
    contadorTotalcolumnas = 1;
    contadorDiagonal = 1;
    contadorDiagonalInversa = 1;
    contadorTurnos = 0;
    $(".pieza").each(function(index) {
        $(this).val('void');
        $(this).attr('disabled', false)
    }); //
    $("#iniciar").addClass("disabled");
}

function campeon() {
    $("#ganador").show();
    $("#alertMensaje").html('Ganador <strong><input class="ganador btn btn-primary btn-lg" type="button" value="' + turno + '"></strong>');
    $(".alert").show('slow');
    $("#iniciar").removeClass("disabled");
    $(".pieza").each(function(index) {
        $(this).attr('disabled', true);
    });
}

function cerrarAlert() {
    $(".alert").hide('slow');
    $("#iniciar").removeClass("disabled");
    Reiniciar();
}

function CrearComponentesJuego() {
    $("#" + Juego).append('<div class="alert alert-dismissible alert-warning collapse"><button type="button" class="close" onclick="cerrarAlert()">×</button><div id="alertMensaje"></div></div>');

    for (i = 1; i <= cantidadOpciones; i++) {
        for (j = 1; j <= cantidadOpciones; j++) {
            $("#" + Juego).append("<input class='pieza btn btn-success btn-lg' type='button' value='void' id='" + i + j + "'/>");
        }
        $("#" + Juego).append("<hr style='  margin: 7px; border: none;'/>");
    }
    $("#" + Juego).append('<br/>');
    $("#" + Juego).append('<span class=" well"><strong>Turno:</strong> <input class="btn btn-info" id="turnoDisplay" type="button" value="o"></span>');
    $("#" + Juego).append('<br/>');
    $("#" + Juego).append('<br/>');
    $("#" + Juego).append('<input type="button" id="iniciar" onclick="Reiniciar()" value="Reiniciar" class="btn btn-danger btn-lg    disabled"/>');
}