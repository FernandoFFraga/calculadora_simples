var display = document.querySelector("#display input");

function typeExp(value){
	if (display.value == '0') { //Se o primeiro digito for 0, ele é substituido pela entrada
		display.value = value;
	} else {
		display.value += value;
	}
}

function calc() {
	display.value = eval(display.value);
}

function clearEntry(){
	display.value = display.value.slice(0, -1); //Retira último caractere da string
	display.value = (display.value == '') ? "0" : display.value;
}

function clearAll(){
	display.value = "0";
}