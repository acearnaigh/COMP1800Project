db.collection('testSchedule')
    .doc('Monday')
    .listCollections()
    .then((subCollections) => {
        subCollections.forEach((subCollection) => {
            subCollection.get().then((array) => {
                array.docs.forEach((doc) => {
                    console.log(doc.data())
                })
            })
        })
    })
