//Function to add same list to Maps -- just needed a spot

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

//function -- STRING MANIPULATION FOR INFO NAME
var urlVars = function() {
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
		for(var pair in urlPairs){
			var keyValue = urlPairs[pair].split('=');
			var key = decodeURIComponent(keyValue[0]);
			var value = decodeURIComponent(keyValue[1]);
			urlValues[key] = value;
		}
	return urlValues;
};  

$('#racerDetail').live("pageshow", function(){
	var racer = urlVars()["racer"];
	var key = "racer: " + racer;
		$.couch.db("gofast").openDoc(key, {
		     success: function(data) {
		        fullName = data.firstName + " " + data.lastName;
		        age = "Age: " + data.age;
		        classType= "Racing Class: " + data.classType;
       			comments= "Comments: " + data.comments;
       		 	raceDate=  data.raceDate;
       		 	

		         $('<li data-role="divider"><h3>'+ fullName + '</h3></li>' +
		         '<li>'+ "Racing on: " + raceDate +'</li>' +
		         '<li>'+ classType +'</li>' +
		         '<li>'+ age +'</li>' +
		         '<li>'+ comments +'</li>' +
		         '<p><a href="#" id="edit-racer-link">Edit Racer</a>' +
		         ' | <a href="#" id="delete-racer-link" onclick="deleteItem()">Delete Racer</a></p>'
		         ).appendTo('#racerDetails');
		        },
		     error: function(status) {
		        console.log(status);
		     }
	});
	$('#racerDetails').listview('refresh');
});
