$('#directions_map').live("pageshow", function(){
	$.couch.db("gofast").view("newgofast/racer",{
		success: function(data){
			$('#couch4Data').empty();
			$.each(data.rows, function(index, racer){
				var nickName = racer.value.nickName;
				$('#couch4Data').append(
					$('<li>').append(
						$('<a>').attr("href","racerDetail.html?racer="+ nickName)
							.text(nickName)
					)
				);
			});
			$('#couch4Data').listview('refresh');
		}
	});				
});

