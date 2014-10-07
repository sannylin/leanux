var j = jQuery.noConflict();

  // CREATE A REFERENCE TO FIREBASE
  var fb = new Firebase('https://lean-ux.firebaseio.com');

  // REGISTER DOM ELEMENTS
  var noteField = $('#noteInput');
  var noteList = $('#savednotes');
  var savenote = $('#savebutton');

  var category = 'assumptions';
  var level = 1;

  $('#assumption').click(function(){
    category = 'assumptions';
    level = 1;
  });

  $('#hypothesis').click(function(){
    category = 'hypotheses';
    level = 2;
  });

  $('#observation').click(function(){
    category = 'observations';
    level = 3;
  });

  // LISTEN FOR KEYPRESS EVENT
  noteField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      var note = noteField.val();

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      var list = fb.push();
      list.setWithPriority({level:level, type:category, text:note}, level);
      noteField.val('');
    }
  });

  savenote.click(function () {
      //FIELD VALUES
      var note = noteField.val();

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      var list = fb.push();
      list.setWithPriority({level:level, type:category, text:note}, level);
      noteField.val('');
  });

  // Add a callback that is triggered for each chat note.
  fb.on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var note = data.text;
    var category = data.type || "";
    var order = data.level;

    //CREATE ELEMENTS note & SANITIZE TEXT
    var noteElement = $("<li>");
    var categoryElement = $("<strong></strong>")
    categoryElement.text(category + ': ');
    noteElement.text(note).prepend(categoryElement);
    //ADD note
    noteList.append(noteElement);
  });