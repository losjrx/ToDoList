document.getElementById("logotipo").onclick = function () {
	document.querySelector(".inserir_tarefa").style.display = "block";
	document.getElementById("logo").height = "100";
	document.getElementById("logo").width = "100";
	document.querySelector(".tabelas").style.display = "flex";
};


var num_botao = 0;
var tarefas = {};

class Tarefa {
	constructor(tarefa,categoria,descricao,prioridade,dataLimite){
		this.tarefa = tarefa;
		this.categoria = categoria;
		this.descricao = descricao;
		this.prioridade = prioridade;
		this.dataLimite = new Date(dataLimite);
		this.dataTermino = "";
		this.id = num_botao++;
		this.linhaDaTabela = "";
	}
}


function insereTarefaTODO(tarefa){
	
	if(tarefa){
		tarefa.linhaDaTabela += "<tr>";
		tarefa.linhaDaTabela += "<td>" + tarefa.tarefa + "</td>";
		tarefa.linhaDaTabela += "<td>" + tarefa.categoria + "</td>";
		tarefa.linhaDaTabela += "<td>" + tarefa.descricao + "</td>";
		tarefa.linhaDaTabela += "<td>" + tarefa.prioridade + "</td>";
		tarefa.linhaDaTabela += "<td>" + tarefa.dataLimite.toLocaleDateString() + "</td>";
		tarefa.linhaDaTabela += "<td>" + insereFormularioMudarStatus(num_botao) + "</td>";
		tarefa.linhaDaTabela += "<td>" + '<button id="deletarTarefa' + tarefa.id.toString() +'">' +"Excluir </button>" + "</td>";
		tarefa.linhaDaTabela += "</tr>"; 
	}

	tarefas.push(tarefa);
	var botao = "deletarTarefa" + tarefa.id;
	document.getElementById("dados-TODO").innerHTML += tarefa.linhaDaTabela;
	console.log(document.getElementById(botao));
};

document.getElementById("criar_tarefa").onclick = function(){
	var tarefa = document.getElementById("nome_tarefa").value;
	var categoria = document.getElementById("categoria_tarefa").value;
	var descricao = document.getElementById("descrição_tarefa").value;
	var dataLimite = document.getElementById("data_deadline").value;

		var campo_select = document.getElementById("prioridades");
		var indice_selecionado = campo_select.options.selectedIndex;

	var prioridade = campo_select.options[indice_selecionado].innerHTML;

	var tarefinha = new Tarefa(tarefa, categoria, descricao, prioridade, dataLimite);

	insereTarefaTODO(tarefinha);

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
}

for(var i = 0; i<= tarefas.length ; i++){

		var task = tarefas[i];
		console.log(task.tarefa)

		for(var botaoSelecionado = 0; botaoSelecionado <= num_botao; botaoSelecionado++){
			if(task.id == botaoSelecionado){
				var botaoClick = "deletarTarefa" + botaoSelecionado;
				var table = document.getElementById("dados-TODO").innerHTML;
				console.log(indexOf(task.linhaDaTabela));

			try{
				document.getElementById(botaoClick).onclick = {
					//table -= task.linhaDaTabela;	

				}
			} catch (err){

			}
		}
	
		

		}
	

	
	
}