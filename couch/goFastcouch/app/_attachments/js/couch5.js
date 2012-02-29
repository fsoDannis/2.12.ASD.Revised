/////////////////// COUCH WEEK 4 ///////////////////////
//___________________________________________________\\
/////////////////// VIEW RACERS ///////////////////////

$('#race_record').live("pageshow", function(){
	$.couch.db("gofast").view("newgofast/racer",{
		success: function(data){
			$('#r_names').empty();
			$.each(data.rows, function(index, value){
				var id = value.id;
				var item = (value.value || value.doc);
				var nickName = value.value.nickName;
				$('#r_names').append(
					$('<li>').append(
						$('<a>').attr("href","racerDetail.html?racer="+ id)
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
		$.couch.db("gofast").openDoc(racer, {
		     success: function(data) {
		        var fullName = data.firstName + " " + data.lastName;
		        var age = data.age;
		        var classType = data.classType;
       			var comments = data.comments;
       		 	var raceDate =  data.raceDate;
       		 	
																					//CANNOT GET A LISTVIEW LOOK OUT OF THIS THING!!!
		         $('<div>'+
		         '<h3>'+ fullName + '</h3>'+
		         '<ul>'+
		         '<li data-role="divider"></li>' +
		         '<li> Racing on: ' + raceDate +'</li>' +
		         '<li> Racing Class: '+ classType +'</li>' +
		         '<li> Age: '+ age +'</li>' +
		         '<li> Comments: '+ comments +'</li>' +
		         '<li><a href="#" id="edit-racer-link">Edit Racer</a></li>' +
		         '<li><a href="#" id="delete-racer-link">Delete Racer</a></li>'+
		         '</ul>'+
		         '</div>'
		         ).appendTo('#racerDetails');
		         $('#delete-racer-link').live('click', function(){
        		var ask = confirm("There will be no race'n for you?");
        		if(ask) {
        		$.couch.db("gofast").removeDoc(data, {
        			
        			success: function(data) {
        				console.log(data);
        				document.location.href = 'index.html';
        			},
        			error: function(status) {
        				console.log(status);
        			}
        		});
        		}else{ 
        			alert("Let's Race!");
        			document.location.href = 'index.html';
        		}
        	});
		         
		        }
	
	});
	$('#racerDetails').listview('refresh');
});


/////////////////// NEW EDIT RACING INFO FUNCTION ///////////////////////
$('#edit-racer-link').bind('click', function(){
	var racer = urlVars()["racer"];
	$.mobile.changePage("addRacer.html");
		$.couch.db("gofast").openDoc(racer, {
		     success: function(data) {
		     	nickName = data._id.substr(6);
    			firstName = data.firstName;
		    	lastName = data.lastName;
		        classType = data.classType;
				age = data.age;
		        newToTrack = data.newToTrack;
		        comments = data.comments;
		        raceDate = data.raceDate;
		     	 $('#nickName').val(nickName);
				 $('#firstName').val(firstName);
				 $('#lastName').val(lastName);
				 $('#age').val(age);
				 $('#raceClass').val(raceClass).selectmenu('refresh', true);
				 $('#new2Track:checked').val(new2Track);
				 $('#raceDate').val(raceDate);
				 $('#anyComments').val(anyComments);
				 				
				var editButton = $('#edit-item-button').css('display', 'block');
				var subresButtons = $('#submit-reset-buttons').css('display', 'none');
				var itemList = $('#list').css('display', 'none');
				
				
				$('#edit-item').bind('click', function(){
				console.log("edit-item button was pressed");
	    			var firstName = $('#firstName').val();
			    	var lastName = $('#lastName').val();
			        var raceClass = $('#raceClass').val();
					var age = $('#age').val();
			        var newToTrack = $('#newToTrack').val();
			        var comments = $('#anyComments').val();
			        var raceDate = $('#raceDate').val();
					var item = {
					
					"_id": data._id,
					"_rev": data._rev,
					"firstName": firstName,
					"lastName": lastName,
					"age": age,
					"raceClass": raceClass,
			    	"newToTrack": newToTrack,
			    	"raceDate": raceDate,
			        "comments": comments
					};
					console.log(item);
		
				$.couch.db("gofast").saveDoc(item, {
					success: function(data) {
						console.log(data);
						alert("Design was updated!");
						document.location.href = 'index.html';
						},
					error: function(status) {
				         console.log(status);
				         alert("Design was not updated.");
				     }
				});
				return false;
			});
			}
		});
});




/////////////////// NEW SAVE ITEMS FUNCTION ///////////////////////

$('#submit').bind('click', function(){
	var d = new Date();
    var myid = (d.getTime());
	var nickName = $('#nickName').val();
	var firstName = $('#firstName').val();
	var lastName = $('#lastName').val();
	var age = $('#age').val();
	var raceClass = $('#raceClass').val();
	var newToTrack = $('#new2Track:checked').val();
		if(newToTrack == "on"){ 
		newToTrack = "Yes" ;
	}else{
		newToTrack = "No" ;
		}
	var raceDate = $('#raceDate').val();
	var comments = $('#anyComments').val();
	var item = {
		"_id": "racer:" + raceClass + ":" + myid,
		"firstName": firstName,
		"lastName": lastName,
		"age": age,
		"raceClass": raceClass,
    	"newToTrack": newToTrack,
    	"raceDate": raceDate,
        "comments": comments
        };
	console.log(item);
	$.couch.db("gofast").saveDoc(item, {
		success: function(data) {
		console.log(data);
		alert("Welcome to the Track!");
		document.location.href = 'index.html#race_record';
		},
	error: function(status) {
		console.log(status);
		alert("Whoops!!! We must of missed something!");
		}
	});
	return false;
});
