song = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() 
{
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on(pose, gotPoses)
}

function modeLoaded() {
    console.log("poseNet is Initialized");
}

function gotPoses() {
    if(results.length > 0) {

        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist );

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist = " + rightWristX + "rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWrist = " + leftWristX + "leftWristY = " + leftWristY);
    }
}

function draw() {       
    image(video, 0, 0, 600, 500);
    fill("#FF0000")
    stroke("#FF0000")

    if(scoreRightWrist > 0.2) {

    circle(rightWristX, rightWristY, 20);

    if (rightWrist > 0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5×"
        song.rate(0.5);
    }
    
    else if(rightWristY > 100 && rightWrist<=200) {
        document.getElementById("Speed").innerHTML = "Speed = 1×"
        song.rate(1);
    }

    else if(rightWristY > 200 && rightWrist <= 300) {
        document.getElementById("Speed").innerHTML = "Speed = 1.5×"
        song.rate(1.5);
    }

    else if(rightWristY > 300 && rightWrist<=400) {
        document.getElementById("Speed").innerHTML = "Speed = 2×"
        song.rate(2);
    }

    else if(rightWristY > 400 && rightWrist<=500) {
        document.getElementById("Speed").innerHTML = "Speed = 2.5×"
        song.rate(2.5);
    }
}

    if(scoreleftWrist > 0.2) {

    circle(leftWristX, leftWristY, 20)
    InNumberleft = Number(leftWristY);
    remove_decimals = floor(InNumberleft);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);

    }
}

function play() {
    song.play();
}