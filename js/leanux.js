var j = jQuery.noConflict();
var ELEMENT_POLL_SPEED = 1500; 

var start = new Date().getTime(),
time = 0,
elapsed = 0.0;

function instance(){
  time += 100;

  elapsed = Math.floor(time / 100) / 10;
  if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

  var diff = (new Date().getTime() - start) - time;
  window.setTimeout(instance, (100 - diff));
}

window.setTimeout(instance, 100); 

  // CREATE A REFERENCE TO FIREBASE
  var fb = new Firebase('https://lean-ux.firebaseio.com');
  var fbAssumptions = new Firebase('https://lean-ux.firebaseio.com/assumptions');
  var fbHypotheses = new Firebase('https://lean-ux.firebaseio.com/hypotheses');
  var fbObservations = new Firebase('https://lean-ux.firebaseio.com/observations');

  // REGISTER DOM ELEMENTS
  var noteField = $('#noteInput');
  var noteList = $('#savednotes');
  var assumptionsList = $('#savednotesAssumptions');
  var hypothesisList = $('#savednotesHypotheses');
  var observationList = $('#savednotesObservations');
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
    time = 0;
  });

  // LISTEN FOR KEYPRESS EVENT
  noteField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      var note = noteField.val();

      if (category == 'assumptions'){
        //SAVE DATA TO FIREBASE AND EMPTY FIELD
        var list = fbAssumptions.push();
        list.setWithPriority({level:level, type:category, text:note}, level);
        noteField.val('');
      }

      if (category == 'hypotheses'){
        //SAVE DATA TO FIREBASE AND EMPTY FIELD
        var list = fbHypotheses.push();
        list.setWithPriority({level:level, type:category, text:note}, level);
        noteField.val('');
      }

      if (category == 'observations'){
        //SAVE DATA TO FIREBASE AND EMPTY FIELD
        var list = fbObservations.push();
        list.setWithPriority({level:level, type:category, text:note, time:elapsed}, level);
        noteField.val('');
      }
    }
  });

  savenote.click(function () {
      //FIELD VALUES
      var note = noteField.val();

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      if (category == 'assumptions'){
        //SAVE DATA TO FIREBASE AND EMPTY FIELD
        var list = fbAssumptions.push();
        list.setWithPriority({level:level, type:category, text:note}, level);
        noteField.val('');
      }

      if (category == 'hypotheses'){
        //SAVE DATA TO FIREBASE AND EMPTY FIELD
        var list = fbHypotheses.push();
        list.setWithPriority({level:level, type:category, text:note}, level);
        noteField.val('');
      }

      if (category == 'observations'){
        //SAVE DATA TO FIREBASE AND EMPTY FIELD
        var list = fbObservations.push();
        list.setWithPriority({level:level, type:category, text:note, time:elapsed}, level);
        noteField.val('');
      }
  });

  // Add a callback that is triggered for each chat note.
  fbAssumptions.on('child_added', function (snapshot) {
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
    assumptionsList.append(noteElement);

    assumptionsList[0].scrollTop = assumptionsList[0].scrollHeight;
  });

  fbHypotheses.on('child_added', function (snapshot) {
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
    hypothesisList.append(noteElement);

    hypothesisList[0].scrollTop = hypothesisList[0].scrollHeight;
  });

  fbObservations.on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var note = data.text;
    var category = data.type || "";
    var order = data.level;
    var timing = data.time;

    //CREATE ELEMENTS note & SANITIZE TEXT
    var noteElement = $("<li>");
    var categoryElement = $("<strong></strong>")
    categoryElement.addClass("listitem").text(timing + ': ');
    noteElement.text(note).prepend(categoryElement);
    //ADD note
    observationList.append(noteElement);

    observationList[0].scrollTop = observationList[0].scrollHeight;
  });

