function preload(){
song=loadSound('bts.mp3')
}

function draw(){
image( video,0,0,600,500)

fill("#ff0000")
stroke("#ff0000")

if(scorerightWrist>0.2){
    circle(rightWristX,rightWristY,20);
    if(scorerightWrist>0 && scorerightWrist<=100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(scorerightWrist>100 && scorerightWrist<=200){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(scorerightWrist>200 && scorerightWrist<=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(scorerightWrist>300 && scorerightWrist<=400){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else if(scorerightWrist>400 && scorerightWrist<=500){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
}

if(scoreleftWrist>0.2){
    
    circle(leftWristX,leftWristY,20)
    InNumber=Number(leftWristY);
    remove_decimals=floor(InNumber)
    volume=remove_decimals/500
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume)
}
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelloaded)
poseNet.on('pose',gotposes)
}
song="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist=0;
scorerightWrist=0;
function play(){
    song.play()
    
    
}

function modelloaded(){
    console.log("Pose Net is loaded")
}
function gotposes(result)
{
if(result.length>0){
    console.log(result)
    scorerightWrist=result[0].pose.keypoints[10].score;
    scoreleftWrist=result[0].pose.keypoints[9].score;
    console.log("scorerightWrist="+scorerightWrist+"scorleftWrist="+scoreleftWrist)
    leftWristX=result[0].pose.leftWrist.x;
    leftWristY=result[0].pose.leftWrist.y;
    console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY)

    rightWristX=result[0].pose.rightWrist.x;
   rightWristY=result[0].pose.rightWrist.y;
    console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY)
}
}