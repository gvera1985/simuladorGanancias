$(document).ready(function() {
	
	$('#calcular').on('click', function() {
		calcular();
	})

	$(document).keypress(function(e) {
	  if (e.keyCode == 13) {
		e.preventDefault();
		calcular();
	  }
	});

});


var topesEscalas = [10000, 20000, 30000, 60000, 90000, 120000,99999999];
var porcentajesEscalas = [0.09, 0.14, 0.19, 0.23, 0.27, 0.31, 0.35];
var fijosEscalas = [900, 1400, 1900, 6900, 8100, 9300];

var MINIMO_NO_IMPONIBLE = 42318;
var ADICIONAL_4TA_CATEGORIA = 203126;
var MINIMO_NO_IMPONIBLE_MENSUAL = 18880;
var CONYUGE = 39778;
var HIJO = 19889;
var FAMILIAR_A_CARGO = 19889;
var INTERESES_PRESTAMO_HIPOTECARIO = 20000;

/*Con cristina*/
/*var CONYUGE = 17280;
var HIJO = 8640;
var FAMILIAR_A_CARGO = 6840;
*/
function calcular() {
	
	var sueldoBruto = $('#sueldoBruto').val();
	var conyuge = $("input[name='conyuge']:checked").val();
        var prestamo = $("input[name='prestamo']:checked").val();

	var familiaresComponent = document.getElementById("familiares");
	var cantFamiliares = familiaresComponent.options[familiaresComponent.selectedIndex].value;
	
	var hijosComponent = document.getElementById("hijos");
	var cantHijos = hijosComponent.options[hijosComponent.selectedIndex].value;
	
	
	var sueldoNeto = sueldoBruto * 0.83;
	var sueldoNetoAnual = sueldoNeto * 13;
	
	//var MNI_anual = MINIMO_NO_IMPONIBLE+ADICIONAL_4TA_CATEGORIA+CONYUGE*conyuge+HIJO*cantHijos;
        var MNI_anual = MINIMO_NO_IMPONIBLE_MENSUAL*13+CONYUGE*conyuge+HIJO*cantHijos+FAMILIAR_A_CARGO*cantFamiliares+INTERESES_PRESTAMO_HIPOTECARIO*prestamo;
        
	var MNI_mensual = MNI_anual / 13;
	
	var MontoImponibleAnual =  0;
	if(MNI_anual < sueldoNetoAnual)
	{
		MontoImponibleAnual = sueldoNetoAnual - MNI_anual;
	}
	
	var MontoImponibleMensual = MontoImponibleAnual / 13;
	
	var totalEscalas = [0, 0, 0, 0, 0, 0,0];

	//Calculo Escalas
	for (var i=0; i<totalEscalas.length; i++) 
	{
	 	totalEscalas[i] = calcularValorEscala(i,MontoImponibleAnual);
	 	if(totalEscalas[i] != fijosEscalas[i])
	 	{
	 		break;
	 	}
	}
        
        var nroEscala = i;

	//Calculo Resultados
	var impuestoAnual = 0;
	for (var i=0; i<totalEscalas.length; i++) 
	{
	  impuestoAnual =  impuestoAnual + totalEscalas[i];
	}
	$("#impuestoAnual").text("$" + Math.ceil(impuestoAnual) + ".00");

	var impuestoMensual = impuestoAnual / 13;
	$("#impuestoMensual").text("$" + Math.ceil(impuestoMensual) + ".00");

	var alicuota = (impuestoMensual / sueldoNeto)*100;
	$("#alicuota").text(alicuota.toFixed(2) + "%");

	var sueldoEnMano = sueldoNeto - impuestoMensual;
	$("#sueldoEnMano").text("$" + Math.ceil(sueldoEnMano) + ".00");
        
        $("#escalaPorcentaje").text( porcentajesEscalas[nroEscala]*100 + "%" );
        $("#montoImponibleAnual").text("$" + Math.ceil(MontoImponibleAnual) + ".00" );
        
        
	
	
}


function calcularValorEscala(numeroEscala,montoImponibleAnual) 
{
	var resultado = 0;
	var montoEscala = 0;
	if(numeroEscala > 0)
	{
		montoEscala = topesEscalas[numeroEscala - 1];
	}

	if(montoImponibleAnual < topesEscalas[numeroEscala])
	{
			resultado = (montoImponibleAnual - montoEscala) * porcentajesEscalas[numeroEscala];
	}
	else
	{
			resultado = fijosEscalas[numeroEscala];
	}

	return resultado;
}

function onLoad()
{
        $("#importeAnualPorHijo").text( "$" + Math.ceil(HIJO) + ".00"  );
        $("#importeAnualPorConyuge").text( "$" + Math.ceil(CONYUGE) + ".00" );
        $("#importeAnualOtros").text( "$" + Math.ceil(FAMILIAR_A_CARGO) + ".00" );
        $("#importeAnualPrestamo").text( "$" + Math.ceil(INTERESES_PRESTAMO_HIPOTECARIO) + ".00" );
        
    
}