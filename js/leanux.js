var j = jQuery.noConflict();

  // CREATE A REFERENCE TO FIREBASE
  var fb = new Firebase('https://lean-ux.firebaseio.com');

  // REGISTER DOM ELEMENTS
  var noteField = $('#noteInput');
  var noteList = $('#savednotes');
  var savenote = $('#savebutton');

  // LISTEN FOR KEYPRESS EVENT
  noteField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      var note = noteField.val();

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      fb.push({text:note});
      noteField.val('');
    }
  });

  savenote.click(function () {
      //FIELD VALUES
      var note = noteField.val();

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      fb.push({text:note});
      noteField.val('');
  });

  // Add a callback that is triggered for each chat note.
  fb.on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var note = data.text;

    //CREATE ELEMENTS note & SANITIZE TEXT
    var noteElement = $("<li>");
    noteElement.text(note);

    //ADD note
    noteList.append(noteElement)
  });
