document.getElementById("logotipo").onclick = function () {
	document.querySelector(".inserir_tarefa").style.display = "block";
	document.getElementById("logo").height = "100";
	document.getElementById("logo").width = "100";
	document.querySelector(".tabelas").style.display = "flex";
};


var num_botao = 0;
var tarefas = [];

function atualizaTabelaTodo(){
	var tabelaTODO = '';
	for(var i = 0; i < tarefas.length; i++){
		tabelaTODO += tarefas[i].linhaDaTabela;
	}
	document.getElementById("dados-TODO").innerHTML = tabelaTODO;

	var x = document.getElementsByClassName('btnExcluirTODO');

	for(var a = 0; a < x.length; a++){
		atribuirEventoExclusao(x[a].id,a);
	}
};

function atribuirEventoExclusao(id,indiceTarefa){

	document.getElementById(id).addEventListener("click", function(){

    	let updatedTarefas = tarefas.filter(task => task.id != tarefas[indiceTarefa].id);
    	tarefas = updatedTarefas;
    	atualizaTabelaTodo();

    });

}

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
		"dataTermino": "",
		"id": num_botao,
		"linhaDaTabela": "",
	};

	insereTarefaTODO(novaTarefa);
	num_botao++;
	document.querySelector('.tabelaTODO').style.display = "flex";

};

function insereFormularioMudarStatus(id){
	var formulario = "";
	formulario += '<div class="formularioEdicao">';
	formulario += "<form>";
	formulario += '<select id="' + id.toString() + '" >';
	formulario += '<option value="opt1">To Do</option>';
	formulario += '<option value="opt2">Doing</option>';
	formulario += '<option value="opt3">Done</option>';
	formulario += "</select>";
	formulario += "</form>";
	formulario += "</div>";

	return formulario;
};