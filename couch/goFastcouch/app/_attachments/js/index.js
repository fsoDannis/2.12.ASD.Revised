//Dan Annis
// XML Data   --- LOADS UNDER RACING INFO >> CLASSES
$('#xmlbutton').bind('click', function(){
    $.mobile.changePage('#Classes', {});
	$('#race_classes').empty();
	$.ajax({
		url: 'xhr/data.xml',
		type: 'GET',
		dataType: 'xml',
		success: function(xml){
			$(xml).find("typeOfClass").each(function(){
   				var type = $(this).find('type').text();
   				var description = $(this).find('description').text();
    			$('<li class="classtypes">'+
						'<h3>'+ type +'</h3>'+
						'<p align="left" style="color:#667C26">'+ description +'</p>'+
					'</li></ul>'
				).appendTo('#race_classes');
			//	console.log(xml);
			});			
	},
	complete: function(){
	$("#race_classes").listview("refresh");	
	}
	});

	return false;
});


//CSV Data  --- LOADS UNDER ANNOUNCEMENTS
$('#csvbutton').bind('click', function(){
    $.mobile.changePage('#Announcements', {});
	$('#an_list').empty();
	 $.ajax({
        type: "GET",
        url: "xhr/data.csv",
        dataType: "text",
        success: function(data) {
        	var allTextLines = data.split(/\r\n|\n/);
    		var headers = allTextLines[0].split(',');
    		var lines = []; // main array that hold each racer array

			for (var i=1; i<allTextLines.length; i++) {
				var data = allTextLines[i].split(',');
				if (data.length == headers.length) {
					var headLines = []; // blank array for each racer
					
					for (var j=0; j<headers.length; j++) {
						headLines.push(data[j]); //puts each racer into the array
					}
					lines.push(headLines); // puts the racer array into the main array
				}
				
			}
			
			for (var m=0; m<lines.length; m++){
				var headLines = lines[m];
			$('<li class="headLines">'+
						'<h3>'+ headLines[2] +'</h3>'+
						'<p>'+ headLines[1] +'</p>'+
						'<p align="right">'+ 'Source: ' + headLines[0] +'</p>'+
					'</li></ul>'
				).appendTo('#an_list');
		//	console.log(lines);	
		
			}
        },
        complete: function(){
            $("#an_list").listview("refresh");
        }

	});


	return false;
});


// JSON Data --- LOADS UNDER RACING INFO > PERSONAL RACE RECORDS
$('#jsonbutton').bind('click', function(){
    $.mobile.changePage('#race_record', {});
	$('#r_names').empty();
	$.ajax({
		url: 'xhr/data.json',
		type: 'GET',
		dataType: 'json',
		success: function(response){
        	for (var i=0, j=response.raceRecords.length; i<j; i++){
				var jdata = response.raceRecords[i];
				$(''+
					'<li><a href="#racer_info">'+ jdata.nickName + '</a><p style="color:#82CAFF;margin-left:20px;">' + 
					'( '+ jdata.fullName + ' )' +
					'</li>'
				).appendTo('#r_names');
			}
		},
		complete: function(){
         $("#r_names").listview("refresh");
		} 
	});
	return false;
});

