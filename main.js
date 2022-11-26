video = "";
objects = [];
status = "";

function preload(){

}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = " status:object is detecting";

    object_name = document.getElementById("objects_name").value;

    if(value = video){
        video.stop();
        objectDetector.detect(gotResult);
    }
    
}

function modelLoaded(){
    console.log("modelLoaded");
    status =  true;
}


function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        objectDetector.detect(video,gotResult);

        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "status: object is detected";
            document.getElementById("number_of_objects").innerHTML =  " number of objects detected are"+objects.length;

            fill("#FF0000");
            percent= floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
               

            if(object_name  == objects[i].label){
                
            }else{
                document.getElementById("status").innerHTML= object_name+"not found";
            }
        }
    }

}