function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup(){
   canvas = createCanvas(300,400);
    canvas.center();
    background('white');
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw(){
    strokeWeight(7);
    stroke(0);
    fill("red")

    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function clearCanvas(){
    canvas.background('white');
}

function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById("model_name").innerText = "Label : " + results[0].label;
    document.getElementById("model_accuracy").innerText = "accuracy : " + Math.round(results[0].confidence * 100)+"%";

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);

}