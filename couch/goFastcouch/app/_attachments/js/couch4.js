/////////////////// COUCH WEEK 4 ///////////////////////
//___________________________________________________\\
/////////////////// VIEW RACERS ///////////////////////

$('#race_record').live("pageshow", function(){
	$.couch.db("gofast").view("newgofast/racer",{
		success: function(data){
			$('#r_names').empty();
			$.each(data.rows, function(index, racer){
				var nickName = racer.value.nickName;
				$('#r_names').append(
					$('<li>').append(
						$('<a>').attr("href","racerDetail.html?racer="+ nickName)
							.text(nickName)
					)
				);
			});
			$('#r_names').listview('refresh');
		}
	});				
});

/////////////////// GET URL or KEY ///////////////////////

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

/////////////////// RACER DETAILS ///////////////////////

$('#racerDetail').live("pageshow", function(){
	var racer = urlVars()["racer"];
	var key = "racer:" + racer;
		$.couch.db("gofast").openDoc(key, {
		     success: function(data) {
		        fullName = data.firstName + " " + data.lastName;
		        age = "Age: " + data.age;
		        classType= "Racing Class: " + data.classType;
       			comments= "Comments: " + data.comments;
       		 	raceDate=  data.raceDate;
       		 	
																					//CANNOT GET A LISTVIEW LOOK OUT OF THIS THING!!!
		         $('<li data-role="divider"><h3>'+ fullName + '</h3></li>' +
		         '<li>'+ "Racing on: " + raceDate +'</li>' +
		         '<li>'+ classType +'</li>' +
		         '<li>'+ age +'</li>' +
		         '<li>'+ comments +'</li>' +
		         '<p><a href="#" id="edit-racer-link">Edit Racer</a>' +
		         ' | <a href="#" id="delete-racer-link" onclick="deleteItem()">Delete Racer</a></p>'
		         ).appendTo('#racerDetails');
		        },
	
	});
	$('#racerDetails').listview('refresh');
});


/////////////////// NEW EDIT RACING INFO FUNCTION ///////////////////////
$('#edit-racer-link').bind('click', function(){
	var racer = urlVars()["racer"];
	var key = "racer:" + racer;
	console.log("key" + key);
	$.mobile.changePage("addRacer.html");
		$.couch.db("gofast").openDoc(key, {
		     success: function(data) {
		     	nickName:data._id.substr(6);
    			firstName:data.firstName;
		    	lastName:data.lastName;
		        classType: data.classType;
				age: data.age;
		        newToTrack: data.newToTrack;
		        comments: data.comments;
		        raceDate: data.raceDate;
		     	 $('#nickName').val();
				 $('#firstName').val();
				 $('#lastName').val();
				 $('#age').val();
				 $('#raceClass').val();
				 $('#new2Track:checked').val();
				 $('#raceDate').val();
				 $('#anyComments').val();
				 				
				var editButton = $('#edit-item-button').css('display', 'block');
				var subresButtons = $('#submit-reset-buttons').css('display', 'none');
				var itemList = $('#list').css('display', 'none');
				
				
				$('#edit-item').bind('click', function(){
				console.log("edit-item button was pressed");
					data._id.substr(6)=$('#nickName').val(nickName);
	    			data.firstName=$('#firstName').val(firstName);
			    	data.lastName=$('#lastName').val(lastName);
			        data.classType=$('#raceClass').val(classType);
					data.age=$('#age').val(age);
			        data.newToTrack=$('#raceClass').val(newToTrack);
			        data.comments=$('#anyComments').val(comments);
			        data.raceDate=$('#raceDate').val(raceDate);
					var item = {
					
					"_id": "racer:" + nickName,
					"_rev": data._rev,
					"firstName": firstName,
					"lastName": lastName,
					"age": age,
					"classType": classType,
			    	"newToTrack": newToTrack,
			    	"raceDate": raceDate,
			        "comments": comments
					};
					console.log(item);
		
				$.couch.db("gofast").saveDoc(key, {
					success: function(data) {
						console.log(data);
						},
					error: function(status) {
				         console.log(status);
				     }
				});
			});
			}
		});
});

/////////////////// NEW DELETE ITEMS FUNCTION ///////////////////////
function deleteItem(id){
	var racer = urlVars()["racer"];
	var key = "racer:" + racer;
	$.couch.db("gofast").openDoc(key, {
	     success: function(data) {
	     	console.log(key);
			var ask = confirm("There will be no race'n for you?");
			if(ask){
				$.couch.db("gofast").removeDoc(key, {
					success: function(data) {
					console.log(data);
					},
				error: function(status) {
				console.log(status);
				}
			});
		}else{
			alert("Let's Race!");
			}
		}
	});
	window.location = 'index.html';
}



/////////////////// NEW SAVE ITEMS FUNCTION ///////////////////////

$('#submit').bind('click', function(){
	var nickName = $('#nickName').val();
	var firstName = $('#firstName').val();
	var lastName = $('#lastName').val();
	var age = $('#age').val();
	var classType = $('#raceClass').val();
	var newToTrack = $('#new2Track:checked').val();
		if(newToTrack == "on"){ 
		var newToTrack = "Yes" 
	}else{
		var newToTrack = "No" 
		}
	var raceDate = $('#raceDate').val();
	var comments = $('#anyComments').val();
	var doc = {
		"_id": "racer:" + nickName,
		"firstName": firstName,
		"lastName": lastName,
		"age": age,
		"classType": classType,
    	"newToTrack": newToTrack,
    	"raceDate": raceDate,
        "comments": comments
        };
	console.log(doc);
	$.couch.db("gofast").saveDoc(doc, {
		success: function(data) {
		console.log(data);
		alert("Welcome to the Track!");
		document.location.href = 'index.html#race_record'
		},
	error: function(status) {
		console.log(status);
		alert("Whoops!!! We must of missed something!");
		}
	});
	return false;
});
