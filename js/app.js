var app = []; 			//Variaveis de controle
app.display   = '0';
app.keyDown   = true;
app.acc       = 0;		//Variável acumulador
app.operation = '';

//Controladora de Eventos
$("#keyboard td").click(function(){ //Captura eventos de cliques nas tags <td>
	var value = $(this).text(); //Armazena valor de dentro do td em uma variavel

	if ($.isNumeric(value)) { // Filtra os botões núméricos dos botões de ação
		keyNumeric(value);

	} else if (value == '.'){
		keyDecimal();

	} else {
		switch(value) {
			case 'CE':
				clear();
				break;
			case 'C':
				allClear();
				break;
			case '=':
				calculate();
				break;
			default:
				keyOperation(value);
				break;
		}
	}

	print();
});

function keyNumeric(value){
	if (app.keyDown == false) {
		app.keyDown = true;
		app.display = "0";
	}

	if (app.display == '0') { //Impede que sejam adicionados zeros a esquerda
		app.display = String(value);
	} else {
		app.display += String(value);
	}
}

function keyDecimal(){
	if (app.keyDown) {
		if (app.display.indexOf('.') == -1) { //Checa se a string já tem um .
			app.display += '.';
		}
	}
}

function keyOperation(value) {
	if (app.operation == '') {
		app.acc       = parseFloat(app.display); 
	} else {
		switch(app.operation) { //switch para realizar as operações
			case '+':
				app.acc = parseFloat(app.acc) + parseFloat(app.display);
				app.display = app.acc;
				break;
			case '-':
				app.acc = parseFloat(app.acc) - parseFloat(app.display);
				app.display = app.acc;
				break;
			case '*':
				app.acc = parseFloat(app.acc) * parseFloat(app.display);
				app.display = app.acc;
				break;
			case '/':
				app.acc = parseFloat(app.acc) / parseFloat(app.display);
				app.display = app.acc;
				break;
		}
	}
	app.operation = value;
	app.keyDown   = false;
}

function calculate(){
	if (app.operation != '') {
		switch(app.operation) {
			case '+':
				app.acc = parseFloat(app.acc) + parseFloat(app.display);
				app.display = app.acc;
				break;
			case '-':
				app.acc = parseFloat(app.acc) - parseFloat(app.display);
				app.display = app.acc;
				break;
			case '*':
				app.acc = parseFloat(app.acc) * parseFloat(app.display);
				app.display = app.acc;
				break;
			case '/':
				app.acc = parseFloat(app.acc) / parseFloat(app.display);
				app.display = app.acc;
				break;
		}
		app.operation = '';
		app.keyDown   = false;
	}
}

function print(){ //Responsável por atualizar o display
	$("#display input").val(app.display); //Injeta o valor da váriavel de controle no display
	$("#display span").text(app.operation); //Injeta o valor de operação no display
}

function clear(){ //Limpa o último digito
	if (app.keyDown) {
		app.display = app.display.slice(0, -1); //Retira último caractere da string
		if (app.display.charAt(app.display.length - 1) == '.') { //Testa pra ver se o último caractere é um .
			app.display = app.display.slice(0, -1); //Retira o ponto caso TRUE
		}

		app.display = (app.display == '') ? "0" : app.display; // Operador ternário para limitar o delete no último digito
	}
}

function allClear(){ //Limpa tudo
	app.display   = '0';
	app.operation = '';
	app.acc       = 0;
}