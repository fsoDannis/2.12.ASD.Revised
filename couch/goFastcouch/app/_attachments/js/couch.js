$(document).ready(function(){
	$.ajax({
		"url":"_view/racer",
		"dataType":"json",
		"success": function(data){
			$.each(data.rows, function(index, racer){
				var firstName = racer.value.firstName;
				var lastName = racer.value.lastName;
				var nickName = racer.value.nickName;
				$('#couchData').append(
					$('<li>').append(
						$('<a>').attr("href","#")
							.text(nickName)
					)
				);
			});
			$('#couchData').listview('refresh');
		}
	});				
});