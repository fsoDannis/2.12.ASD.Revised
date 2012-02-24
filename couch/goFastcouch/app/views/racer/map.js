function(doc) {
  if (doc._id.substr(0,6) === "racer:"){
    emit(doc._id.substr(6),{
    	"nickName":doc._id.substr(6),
    	"firstName":doc.firstName,
    	"lastName":doc.lastName,
        "classType": doc.classType,
		"age": doc.age,
        "newToTrack": doc.newToTrack,
        "comments": doc.comments,
        "raceDate": doc.raceDate
    });
  }
};