$(document).ready(function(){
var taskItems = [];
	logo_size_adjust();
	load();
	$('ol').sortable();
	$('div').resizable();
	$('.task').resizable();
	function add(Task){
		$item = $('<li><div class="task"><p>' + Task + '</p><div class="done"><p>-</p></button></div></li>')
		$('ol').prepend($item);
		$("input[name='task']").val('');
	}

	function clear(){
		taskItems = [];
		$.jStorage.set("tasks",{tasks:taskItems});

	}

	function load(){
		var todo = $.jStorage.get("tasks", {tasks: []}); 
		todo.tasks.forEach(function(t){
			add(t);	
		})
		taskItems = todo.tasks;
	}

	function save(item){

		taskItems.push(item);
		$.jStorage.set("tasks", {tasks: taskItems});
		//alert(JSON.stringify($.jStorage.get("tasks", {tasks: []})));
	}

	function add_input() {
		var Task = $("input[name='task']").val();

		add(Task);
		jQuery('.entertask').focus();
		save(Task);
	};

	function logo_size_adjust(){
		//var width = parseInt($('document').css('width'));
		//var height = parseInt($('document').css('height'));
		var width = window.innerWidth;
		var height = window.innerHeight;
		var logoSize = (width<height) ? width:height;
		$('#footer').css('font-size',logoSize/8);
	}

	$('.entertask').keypress(function(e) {
        if(e.which == 13) {
            jQuery(this).blur();
            add_input();
            e.preventDefault();
        }
    });

    $('#clearButton').click(function(){
		clear();
		$('li').remove();
		jQuery('.entertask').focus();
	})
	$(document).on('click','.done',function(){

		$(this).parent().parent().remove();
		clear();
		$('li p').each(function(){
			save($(this).html());
		});

	});

});