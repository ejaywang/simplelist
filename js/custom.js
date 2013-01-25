$(document).ready(function(){

	$('#addButton').click(function() {
		var Task = $("input[name='task']");
		$toAdd = $("<li><div class='task draggable'>
					<p>" +Task+ "<p>
					<button>Done</button>			
					</div></li>")
		$("input[name='task']").val('');
	});

	$('ol').sortable();
});
