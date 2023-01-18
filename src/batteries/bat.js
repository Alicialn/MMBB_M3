var frontPage = {
    type: jsPsychInstructions,
    pages: beatProduction[3].map(i=>i[lang]),
    button_label_next: buttons[0][lang],
    button_label_previous: buttons[1][lang],
    show_clickable_nav: true,
    on_start: function(){
      //disalowRefresh.addEventListener("onbeforeunload", preventRefresh, false);
      //window.removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
    }
}
  
var instruction2 = {
    type: jsPsychInstructions,
    pages: beatProduction[0].map(i=>i[lang]),
    button_label_next: buttons[0][lang],
    button_label_previous: buttons[1][lang],
    show_clickable_nav: true,
}

var instruction3 = {
    type: jsPsychInstructions,
    pages: beatProduction[1].map(i=>i[lang]),
    button_label_next: buttons[0][lang],
    button_label_previous: buttons[1][lang],
    show_clickable_nav: true,
}

//Load songs and beats for given trial 
var songBaseURL0 = '../../songs/beatProductionAudio/beatModified/baseSongs/training/trainingBaseModified.mp3'
var beatsURL0 = '../../songs/beatProductionAudio/beatModified/training'
var loadTrial0 = generateContextTrial(songBaseURL0, beatsURL0, lang)

//Load songs and beats for given trial 
var songBaseURL1 = '../../songs/beatProductionAudio/beatModified/baseSongs/habstrack_clowns/habstrack_clownsModifiedLow.mp3'
var beatsURL1 = '../../songs/beatProductionAudio/beatModified/habstrackBeats'
var loadTrial1 = generateContextTrial(songBaseURL1, beatsURL1, lang)

//Load songs and beats for given trial 
var songBaseURL2 = '../../songs/beatProductionAudio/beatModified/baseSongs/honeySuckle/honeysuckleRoseModifiedLow.mp3'
var beatsURL2 = '../../songs/beatProductionAudio/beatModified/honeysuckleBeats'
var loadTrial2 = generateContextTrial(songBaseURL2, beatsURL2, lang)

//Load songs and beats for given trial 
var songBaseURL3 = '../../songs/beatProductionAudio/beatModified/baseSongs/lettuce/lettuceModifiedLow.mp3'
var beatsURL3 = '../../songs/beatProductionAudio/beatModified/lettuceBeats'
var loadTrial3 = generateContextTrial(songBaseURL3, beatsURL3, lang)

//Load songs and beats for given trial 
var songBaseURL4 = '../../songs/beatProductionAudio/beatModified/baseSongs/floorplanNoLie/floorplanNoLieModifiedLow.mp3'
var beatsURL4 = '../../songs/beatProductionAudio/beatModified/floorplanBeats'
var loadTrial4 = generateContextTrial(songBaseURL4, beatsURL4, lang)

//Load songs and beats for given trial 
var songBaseURL5 = '../../songs/beatProductionAudio/beatModified/baseSongs/softSand/softSandModifiedLow.mp3'
var beatsURL5 = '../../songs/beatProductionAudio/beatModified/softSandBeats'
var loadTrial5 = generateContextTrial(songBaseURL5, beatsURL5, lang)

//Load songs and beats for given trial 
var songBaseURL6 = '../../songs/beatProductionAudio/beatModified/baseSongs/dirtyDishes/dirty_dishesModifiedLow.mp3'
var beatsURL6 = '../../songs/beatProductionAudio/beatModified/dirtyDishesBeats'
var loadTrial6 = generateContextTrial(songBaseURL6, beatsURL6, lang)

//Load songs and beats for given trial 
var songBaseURL7 = '../../songs/beatProductionAudio/beatModified/baseSongs/eclecticElectric/eclecticElectricModifiedLow.mp3'
var beatsURL7 = '../../songs/beatProductionAudio/beatModified/eclecticBeats'
var loadTrial7 = generateContextTrial(songBaseURL7, beatsURL7, lang)

var trialBeat = {
  type: jsPsychHtmlButtonResponse,
      stimulus: '<div id="arrowsContainer"><p style="margin: 0px; height: 30px; margin-bottom: 10px">' + beatProduction[2][0][lang] + '</p>'+
              '<button id="subtract">'+
                '<i class="fa fa-arrow-left" aria-hidden="true"></i>'+
              '</button>'+
              '<button type="button" id="add">'+
                '<i class="fa fa-arrow-right" aria-hidden="true"></i>'+
              '</button>'+
            '</div>',
  choices: ['Continue'],
  prompt: "",
  on_start: function(data){
    data.initialOffset = window.count;
  },
  on_load: function(data){
    document.querySelector('#add').onclick = () => fluidBeat(plus = true, offset = window.count)
    document.querySelector('#subtract').onclick = () => fluidBeat(plus = false, offset = window.count)
    
    document.querySelector(".jspsych-btn").style.display = "none"
    document.getElementById("jspsych-html-button-response-stimulus").style.display = "none"

    var startButton = document.createElement("button");
    startButton.textContent = "Start"
    startButton.setAttribute('id', 'startButton');  
    document.getElementById("jspsych-content").appendChild(startButton);
    document.getElementById("startButton").addEventListener("click", startSounds)

    //Start beats
    function startSounds(){
      var allSources = [window.source1, window.source2, window.source3, window.source4, window.source5, window.source6, window.source7, window.source8, window.sourceBase]
      for(i in allSources) {
        console.log(allSources[i] == null)
        allSources[i].start(3)
      }
      document.querySelector(".jspsych-btn").style.display = "block"
      document.getElementById("jspsych-html-button-response-stimulus").style.display = "block"
      startButton.remove()

      //Disable button for a 5 seconds
      document.querySelector(".jspsych-btn").disabled = true;
      sleep(6000).then(r => {
        document.querySelector(".jspsych-btn").disabled = false;
      })

    }
  },
  on_finish: function(data){
    var currentSong = jsPsych.data.getLastTimelineData()['trials'][0]["batSong"]
    data.batSong = currentSong;
    data.offset = window.count; //Final offset
    data.nChanges = window.nChanges; //How many times user changed
    data.initialOffset = window.initialOffset; //Initial offset
    var allSources = [window.source1, window.source2, window.source3, window.source4, window.source5, window.source6, window.source7, window.source8, window.sourceBase]
    for(i in allSources) {
      allSources[i].stop()
    }
  }
};

var frontPageInstructions = [frontPage, instruction2]
var zero = [loadTrial0, trialBeat]
var one = [loadTrial1, trialBeat]
var two = [loadTrial2, trialBeat]
var three = [loadTrial3, trialBeat]
var four = [loadTrial4, trialBeat]
var five = [loadTrial5, trialBeat]
var six = [loadTrial6, trialBeat]
var seven = [loadTrial7, trialBeat]

//Step by step
var batTimeline = [frontPageInstructions, zero, one, two, three, four, five, six, seven]

//Original
//var batTimeline = [frontPage, instruction2, loadTrial0, trialBeat, instruction3, loadTrial1, trialBeat, betweenTrial, loadTrial2, trialBeat, betweenTrial, loadTrial3, trialBeat, betweenTrial, loadTrial4, trialBeat, betweenTrial, loadTrial5, trialBeat, betweenTrial, loadTrial6, trialBeat];
