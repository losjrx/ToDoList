//Logotipo na pagina inicial, após click, reduz tamanho e mostra as opções de inserir tarefas;
document.getElementById("logotipo").onclick = function () {
	document.querySelector(".inserir_tarefa").style.display = "block";
	document.getElementById("logo").height = "100";
	document.getElementById("logo").width = "100";
	document.querySelector(".tabelas").style.display = "flex";
};

/*#########################################################
 ################### TABELA 1 - TODO ######################
##########################################################*/

var num_botao = 0;	//controle do id de cada tarefa
var tarefas = [];	//array que guarda as tarefas (objetos)

//percorre a array "tarefas"; insere o código HTML na div "dados-TODO" preenchendo a tabela, 
//variavel x pega a classe dos botoes de excluir tarefa da tabela TODO
//depois é atribuído o evento de exclusão para cada id de cada botão

function atualizaTabelaTodo(){

	if(tarefas.length == 0){
    	document.querySelector('.tabelaTODO').style.display = "none";
    }

	var tabelaTODO = '';
	for(var i = 0; i < tarefas.length; i++){
		tabelaTODO += tarefas[i].linhaDaTabela;
	}
	document.getElementById("dados-TODO").innerHTML = tabelaTODO;

	var x = document.getElementsByClassName('btnExcluirTODO');

	for(var a = 0; a < x.length; a++){
		atribuirEventoExclusao(x[a].id,a);
	}

	adicionaEventoOnchangeNoStatusTODO();

};

//Percorre as Select Box na tabela TODO, pegando seu ID e o jogando na função addEventSelectBoxTODO;
function adicionaEventoOnchangeNoStatusTODO(){
	for(var b = 0; b < tarefas.length; b++){

		var idSelect = ".formularioEdicaoTODO select#form" + tarefas[b].id.toString();
		var p = document.querySelectorAll(idSelect);

		addEventSelectBoxTODO(p['0'].id,b);

	}
}


function addEventSelectBoxTODO(id,task){

	document.getElementById(id).addEventListener("change", function () {
			var opcao = document.getElementById(id).options[document.getElementById(id).options.selectedIndex].innerHTML;
			
			if(opcao == "Doing"){
				insereTarefaDoing(task);
			}

		});
}

//funcao que atribui o evento de exclusão a casa botao da tabela TODO
//Como o  número de tarefas é sempre o mesmo numero de botoes, essa funcao
//usa o id do botao e seu indice dentro da array, assim é possível criar uma nova
//array de objetos tarefa que não tenha a tarefa com esse indice.
//Tira visibilidade da tabela TODO caso não tenha tarefas

function atribuirEventoExclusao(id,indiceTarefa){

	document.getElementById(id).addEventListener("click", function(){

    	let updatedTarefas = tarefas.filter(task => task.id != tarefas[indiceTarefa].id);
    	tarefas = updatedTarefas;
    	atualizaTabelaTodo();

    });

}


//guarda o código HTML no parâmetro "linhaDaTabela" de uma nova tarefa criada

function insereTarefaTODO(novaTarefa){

	novaTarefa.linhaDaTabela += "<tr>";
	novaTarefa.linhaDaTabela += "<td>" + novaTarefa.tarefa + "</td>";
	novaTarefa.linhaDaTabela += "<td>" + novaTarefa.categoria + "</td>";
	novaTarefa.linhaDaTabela += "<td>" + novaTarefa.descricao + "</td>";
	novaTarefa.linhaDaTabela += "<td>" + novaTarefa.prioridade + "</td>";
	novaTarefa.linhaDaTabela += "<td>" + novaTarefa.dataLimite.toLocaleDateString() + "</td>";
	novaTarefa.linhaDaTabela += "<td>" + insereFormularioMudarStatus(num_botao) + "</td>";
	novaTarefa.linhaDaTabela += "<td>" + '<button id="deletarTarefa' + novaTarefa.id.toString() +'" class="btnExcluirTODO">' +"Excluir </button>" + "</td>";
	novaTarefa.linhaDaTabela += "</tr>"; 

	tarefas.push(novaTarefa);
	atualizaTabelaTodo();

	

};

//Pega os valores dos dados de input inseridos pelo usuário e insere no novo objeto "novaTarefa";
//A data esta saindo sempre com o dia anterior, isso foi corrigido na função setDate();
//Após inserir, soma 1 na variável que controla o id das tarefas e, caso seja a primeira tarefa,
//torna visível a tabela TODO.

document.getElementById("criar_tarefa").onclick = function(){
	var tarefa = document.getElementById("nome_tarefa").value;
	var categoria = document.getElementById("categoria_tarefa").value;
	var descricao = document.getElementById("descrição_tarefa").value;
	var dataLimite = new Date(document.getElementById("data_deadline").value);
	dataLimite.setDate(document.getElementById("data_deadline").value.substring(8,10));

		var campo_select = document.getElementById("prioridades");
		var indice_selecionado = campo_select.options.selectedIndex;

	var prioridade = campo_select.options[indice_selecionado].innerHTML;

	let novaTarefa = {
		"tarefa": tarefa,
		"categoria": categoria,
		"descricao": descricao,
		"dataLimite": dataLimite,
		"prioridade": prioridade,
		"dataInicio": "",
		"dataTermino": "",
		"id": num_botao,
		"linhaDaTabela": "",
	};

	insereTarefaTODO(novaTarefa);
	num_botao++;
	document.querySelector('.tabelaTODO').style.display = "flex";

};

//insere o texto HTML de formulario de alteração do status da tarefa,
//Utilizado na funcao insereTarefaTODO();

function insereFormularioMudarStatus(id){
	var formulario = "";
	formulario += '<div class="formularioEdicaoTODO">';
	formulario += "<form>";
	formulario += '<select id="' + "form" + id.toString() + '" >';
	formulario += '<option value="opt1">To Do</option>';
	formulario += '<option value="opt2">Doing</option>';
	formulario += '<option value="opt3">Done</option>';
	formulario += "</select>";
	formulario += "</form>";
	formulario += "</div>";

	return formulario;
};

/*####################################################################################################################
 ################################################### TABELA 2 - DOING ###############################################
#####################################################################################################################*/

var tarefasDoing = [];
var idTarefasDoing = 0;

function atribuirEventoExclusaoDOING(id,indiceTarefa){

	document.getElementById(id).addEventListener("click", function(){

    	let updatedTarefasDoing = tarefasDoing.filter(task => task.id != tarefasDoing[indiceTarefa].id);
    	tarefasDoing = updatedTarefasDoing;

    	if(tarefasDoing.length == 0){
    		document.querySelector('.tabelaDOING').style.display = "none";
    	}

    	atualizaTabelaTodo();
    	atualizaTabelaDoing();

    });

}

function atualizaTabelaDoing(){

	if(tarefasDoing.length == 0){
    	document.querySelector('.tabelaDOING').style.display = "none";
    }

	var tabelaDOING = '';

	for(var i = 0; i < tarefasDoing.length; i++){
		tabelaDOING += tarefasDoing[i].linhaDaTabela;
	}
	
	document.getElementById("dados-DOING").innerHTML = tabelaDOING;

	var x = document.getElementsByClassName('btnExcluirDOING');

	for(var a = 0; a < x.length; a++){
		atribuirEventoExclusaoDOING(x[a].id,a);
	}

	adicionaEventoOnchangeNoStatusDOING();
}

function adicionaEventoOnchangeNoStatusDOING(){
	for(var b = 0; b < tarefasDoing.length; b++){

		var idSelect = ".formularioEdicaoDOING select#form" + tarefasDoing[b].id.toString();
		var p = document.querySelectorAll(idSelect);

		console.log(p);

		addEventSelectBoxDOING(p['0'].id,b);

	}
}


function addEventSelectBoxDOING(id,task){


	document.getElementById(id).addEventListener("change", function () {
			var opcao = document.getElementById(id).options[document.getElementById(id).options.selectedIndex].innerHTML;
			
			if(opcao == "Done"){
    			insereTarefaDone(task);
			} 

			atualizaTabelaDoing();

		});
}


function insereFormularioMudarStatusDOING(id){
	var formulario = "";
	formulario += '<div class="formularioEdicaoDOING">';
	formulario += "<form>";
	formulario += '<select id="' + "form" + id.toString() + '" >';
	formulario += '<option value="opt1">Doing</option>';
	formulario += '<option value="opt2">Done</option>';
	formulario += "</select>";
	formulario += "</form>";
	formulario += "</div>";

	return formulario;
};



function insereTarefaDoing(doingTarefa){

	let updatedTarefas = tarefas.filter(task => task.id != tarefas[doingTarefa].id);

	tarefas[doingTarefa].id = idTarefasDoing;
	tarefas[doingTarefa].dataInicio = new Date();
	
	tarefas[doingTarefa].linhaDaTabela = "";

	tarefas[doingTarefa].linhaDaTabela += "<tr>";
	tarefas[doingTarefa].linhaDaTabela += "<td>" + tarefas[doingTarefa].tarefa + "</td>";
	tarefas[doingTarefa].linhaDaTabela += "<td>" + tarefas[doingTarefa].dataInicio.toLocaleDateString() + "</td>";
	tarefas[doingTarefa].linhaDaTabela += "<td>" + tarefas[doingTarefa].categoria + "</td>";
	tarefas[doingTarefa].linhaDaTabela += "<td>" + tarefas[doingTarefa].descricao + "</td>";
	tarefas[doingTarefa].linhaDaTabela += "<td>" + tarefas[doingTarefa].prioridade + "</td>";
	tarefas[doingTarefa].linhaDaTabela += "<td>" + tarefas[doingTarefa].dataLimite.toLocaleDateString() + "</td>";
	tarefas[doingTarefa].linhaDaTabela += "<td>" + insereFormularioMudarStatusDOING(idTarefasDoing) + "</td>";
	tarefas[doingTarefa].linhaDaTabela += "<td>" + '<button id="deletarTarefaDoing' + idTarefasDoing.toString() +'" class="btnExcluirDOING">' +"Excluir </button>" + "</td>";
	tarefas[doingTarefa].linhaDaTabela += "</tr>"; 

	tarefasDoing.push(tarefas[doingTarefa]);

	tarefas = updatedTarefas;

	idTarefasDoing++;

	document.querySelector('.tabelaDOING').style.display = "flex";

    atualizaTabelaTodo();
	atualizaTabelaDoing();

};

/*####################################################################################################################
 ################################################### TABELA 3 - DONE ###############################################
#####################################################################################################################*/

var tarefasDone = [];
var idTarefasDone = 0;

function atribuirEventoExclusaoDONE(id,indiceTarefa){

	document.getElementById(id).addEventListener("click", function(){

    	let updatedTarefasDone = tarefasDone.filter(task => task.id != tarefasDone[indiceTarefa].id);
    	tarefasDone = updatedTarefasDone;

    	if(tarefasDone.length == 0){
    		document.querySelector('.tabelaDONE').style.display = "none";
    	}

    	atualizaTabelaDone();
    	atualizaTabelaDoing();
    	atualizaTabelaDone();

    });

}

function atualizaTabelaDone(){

	var tabelaDONE = '';

	for(var i = 0; i < tarefasDone.length; i++){
		tabelaDONE += tarefasDone[i].linhaDaTabela;
	}
	
	document.getElementById("dados-DONE").innerHTML = tabelaDONE;

	var x = document.getElementsByClassName('btnExcluirDONE');

	for(var a = 0; a < x.length; a++){
		atribuirEventoExclusaoDONE(x[a].id,a);
	}

	adicionaEventoOnchangeNoStatusDONE();
}

function adicionaEventoOnchangeNoStatusDONE(){
	for(var b = 0; b < tarefasDone.length; b++){

		var idSelect = ".formularioEdicaoDOING select#form" + tarefasDone[b].id.toString();
		var p = document.querySelectorAll(idSelect);

		console.log(p);

		addEventSelectBoxDONE(p['0'].id);

	}
}


function addEventSelectBoxDONE(id){


	document.getElementById(id).addEventListener("change", function () {
			var opcao = document.getElementById(id).options[document.getElementById(id).options.selectedIndex].innerHTML;
			
			if(opcao == "Done"){
    			console.log("Feito");
			} else {
				console.log(id);
			}

			atualizaTabelaDone();

		});
}


function insereFormularioMudarStatusDONE(id){
	var formulario = "";
	formulario += '<div class="formularioEdicaoDONE">';
	formulario += "<form>";
	formulario += '<select id="' + "form" + id.toString() + '" >';
	formulario += '<option value="opt1">Doing</option>';
	formulario += '<option value="opt2">Done</option>';
	formulario += "</select>";
	formulario += "</form>";
	formulario += "</div>";

	return formulario;
};



function insereTarefaDone(doneTarefa){

	let updatedTarefasDoing = tarefasDoing.filter(task => task.id != tarefasDoing[doneTarefa].id);

	tarefasDoing[doneTarefa].id = idTarefasDone;
	tarefasDoing[doneTarefa].dataTermino = new Date();
	
	tarefasDoing[doneTarefa].linhaDaTabela = "";

	tarefasDoing[doneTarefa].linhaDaTabela += "<tr>";
	tarefasDoing[doneTarefa].linhaDaTabela += "<td>" + tarefasDoing[doneTarefa].tarefa + "</td>";
	tarefasDoing[doneTarefa].linhaDaTabela += "<td>" + tarefasDoing[doneTarefa].dataInicio.toLocaleDateString() + "</td>";
	tarefasDoing[doneTarefa].linhaDaTabela += "<td>" + tarefasDoing[doneTarefa].categoria + "</td>";
	tarefasDoing[doneTarefa].linhaDaTabela += "<td>" + tarefasDoing[doneTarefa].descricao + "</td>";
	tarefasDoing[doneTarefa].linhaDaTabela += "<td>" + tarefasDoing[doneTarefa].prioridade + "</td>";
	tarefasDoing[doneTarefa].linhaDaTabela += "<td>" + tarefasDoing[doneTarefa].dataLimite.toLocaleDateString() + "</td>";
	tarefasDoing[doneTarefa].linhaDaTabela += "<td>" + tarefasDoing[doneTarefa].dataTermino.toLocaleDateString() + "</td>";
	tarefasDoing[doneTarefa].linhaDaTabela += "<td>" + insereFormularioMudarStatusDOING(idTarefasDone) + "</td>";
	tarefasDoing[doneTarefa].linhaDaTabela += "<td>" + '<button id="deletarTarefaDone' + idTarefasDone.toString() +'" class="btnExcluirDONE">' +"Excluir </button>" + "</td>";
	tarefasDoing[doneTarefa].linhaDaTabela += "</tr>"; 

	tarefasDone.push(tarefasDoing[doneTarefa]);

	tarefasDoing = updatedTarefasDoing;

	idTarefasDone++;

	document.querySelector('.tabelaDONE').style.display = "flex";

    atualizaTabelaTodo();
    atualizaTabelaDoing();
	atualizaTabelaDone();

};