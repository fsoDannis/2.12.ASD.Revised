function(doc) {
  if (doc._id.substr(0,7) === "racer: "){
    emit(doc._id.substr(7),{
    	"nickName":doc._id.substr(7),
    	"firstName":doc.firstName,
    	"lastName":doc.lastName,
        "classType": doc.classType,
		"age": doc.age,
        "newToTrack": doc.newToTrack,
        "comments": doc.comments,
        "raceDate": doc.raceDate,
        "header": data.fullName + ", will be racing on: " + data.raceDate
    });
  }
};