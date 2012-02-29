function(doc) {
  if (doc._id.substr(0,6) === "racer:"){
    emit(doc._id.substr(6),{
    	"urlkeyname": doc._id,
    	"nickName":doc.nickName,
    	"firstName":doc.firstName,
    	"lastName":doc.lastName,
        "classType": doc.classType,
		"age": doc.age,
        "comments": doc.comments,
        "raceDate": doc.raceDate
    });
  }
};