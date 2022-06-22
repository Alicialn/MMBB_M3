//Detect if mobile or desktop
checking = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  if(check == false){
    alert("This website does not work on desktop. Please try it on your mobile phone.")
  }
  return check;
};


//Initialize graph
var dataPoints = [{y : 0}];
var dataPoints2 = [{y : 0}];
var dataPoints3 = [{y : 0}];
var chart = new CanvasJS.Chart("chartContainer", {
    title : {
      text : "Accelerometer Data"
    },
    data : [{
        type : "line",
        name: "y",
        dataPoints : dataPoints
    },{
        type: "line",
        name: "x",
        dataPoints: dataPoints2
    },{
        type: "line",
        name: "z",
        dataPoints: dataPoints3
    }
    ],
  });

//Update chart with new acceleration read
var updateChart = function (newaccelX, newaccelY, newaccelZ) {
  dataPoints.push({
    y : newaccelY
  });
  dataPoints2.push({
    y : newaccelX
  });
  dataPoints3.push({
    y : newaccelZ
  });
  chart.render();    
};

//setInterval(function(){updateChart()}, 1000);

//Download acceleration data
function downloadObjectAsJson(){
  const dataDownload = {
    thist: thist,
    xhist: xhist,
    yhist: yhist,
    zhist: zhist,
    audiohist: audiohist,
  };
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataDownload));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", "trial_data" + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

//Collect accelerometer history
var thist = []
var xhist = []
var yhist = []
var zhist = []
var audiohist = []

//Instantiate accelerometer
function handleMotionEvent(event) {

    var x = event.acceleration.x;
    var y = event.acceleration.y;
    var z = event.acceleration.z;

    document.getElementById("x").innerHTML = "x: "+x;   
    document.getElementById("y").innerHTML = "y: "+y;   
    document.getElementById("z").innerHTML = "z: "+z;   
    document.getElementById("rate").innerHTML = "rate: "+ event.interval;   

    thist.push(event.interval)
    xhist.push(x);
    yhist.push(y);
    zhist.push(z);
    console.log()
    audiohist.push(audio.currentTime);
    
    updateChart(x, y, z)

    if(window.xhist.length >= 32){
      var windowX = window.xhist.slice(-32);
      var ac = autoCorrelate(windowX)
      var freq = findFrequency(ac)
      alert(freq)
      document.getElementById("showFreq").innerHTML = freq
    }

}

//Handle audio
var audio = new Audio('./binary_ternary.mp3');

function audioStop(audioObject){
  audioObject.pause()
  audioObject.currentTime = 0;
}

function stopCollection(){
  try{
    audioStop(audio)
    window.removeEventListener("devicemotion", handleMotionEvent, true)
  } catch(e){
    //  alert("Your browser may not support accelerometer reading. Details of error: " + e)
  }
}

function startCollection(){
  try{
    //console.log(window.DeviceMotionEvent)
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission();
    }
    audio.play()
    window.addEventListener("devicemotion", handleMotionEvent, true);
  } catch(e){
    alert("Your browser may not support accelerometer reading. Details of error: " + e)
  }
}


