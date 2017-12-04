var calculadora={

	operacion: "",
	cad: "",
	esRes: false,

	agregarNumero: function(num){
		var pantalla=$("#display").html();
		if(pantalla.length<8){
			if (this.ecuacion=="" || pantalla=="0" || this.esRes) {
				$("#display").html(num); this.esRes=false;
			}else{
				$("#display").html(pantalla+num);
			}
		}
	},

	colocarPunto: function(){
		var pantalla=$("#display").html();
		if (pantalla.indexOf(".")==-1) {
			$("#display").html(pantalla+".")
		}
	},

	agregarOperador: function(sig){
		var pantalla=$("#display").html();
		if(this.operacion=="")
			this.operacion += pantalla+sig;
		else{			
			this.operacion+="("+pantalla+")";
			this.operacion = eval(this.operacion)+sig;
		} 
		
		$("#display").html("0");		
	},

	cambiarSigno: function(){
		var pantalla=$("#display").html();
	    if(pantalla.charAt(0) == "-")
	    	$("#display").html(pantalla.substring(1, pantalla.length));
	    else{
	        if(pantalla!="0") {
	        	$("#display").html("-" + pantalla);	        	       
	        }
	    }
	},

	calcularRaiz: function(sig){
		var pantalla=$("#display").html();
		$("#display").html(Math.sqrt(pantalla).toString().substr(0, 8));
		this.esRes=true;
	},	

	calcular: function(){
		if(this.operacion=="" && !this.esRes) { return;}
		var pantalla = $("#display").html();

		if(this.esRes){
			$("#display").html(eval(pantalla+this.cad).toString().substr(0,8));
		}else{			
			this.cad = this.operacion.charAt(this.operacion.length-1)+"("+pantalla+")";	
			this.operacion += "("+pantalla+")";
			$("#display").html(eval(this.operacion).toString().substr(0,8));		
			this.esRes = true;
			this.operacion = "";
		}
	},

	limpiar: function(){
		$("#display").html("0");
		this.operacion="";
		this.cad="";
		this.esRes = false;
	},

	INIT: function(){

		$(".tecla").mousedown(function(){
			return false;
		});

		$(".tecla").click(function(){
			var alt=$(this).attr('alt');
			switch(alt){
				case "suma": calculadora.agregarOperador("+"); break;
				case "resta": calculadora.agregarOperador("-"); break;
				case "mult": calculadora.agregarOperador("*"); break;
				case "div": calculadora.agregarOperador("/"); break;
				case "punto": calculadora.colocarPunto(); break;
				case "raiz": calculadora.calcularRaiz();break;
				case "signo": calculadora.cambiarSigno(); break;
				case "on": calculadora.limpiar(); break;
				case "igual": calculadora.calcular(); break;
				default: calculadora.agregarNumero(alt); break;
			}
		});
	}
	
}

calculadora.INIT();



