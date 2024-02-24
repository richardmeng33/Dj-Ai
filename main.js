song1 = ""
song2 = ""
leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0
leftWristScore = 0
rightWristScore = 0

function preload()
{
    song1 = loadSound("music1.mp3")
    song2 = loadSound("music2.mp3")
}

function setup()
{
    canvas = createCanvas(800, 600);
    canvas.position(900, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseSet = ml5.poseNet(video, modelLoaded);
    poseSet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized')
}

function gotPoses(results)
{
 if(results.length > 0)
 {
    console.log(results)
    leftWristScore = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + leftWristScore)

    rightWristScore = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + rightWristScore)

    leftWristX = results[0].pose.leftWrist.x
    leftWristY = results[0].pose.leftWrist.y
    console.log("leftWristX = " + leftWristX + "leftWirstY = "+ leftWristY)

    rightWristX = results[0].pose.rightWrist.x
    rightWristY = results[0].pose.rightWrist.y
    console.log("rightWristX = " + rightWristX + "rightWristY = "+ rightWristY)

 }

}

function draw()
{
    image(video, 0, 0, 800, 600);
    fill(255,0,0);
    stroke(255);

song1Status = song1.isPlaying()
song2Status = song2.isPlaying()

 if(leftWristScore > 0.2)
    {
        circle(leftWristX, leftWristY, 20)
        song2.stop()

        if(song1Status == false)
        {
            song1.play()
            document.getElementById("english").innerHTML = "Song 1"
        }
    
    }

if(rightWristScore > 0.2)
    {
        circle(rightWristX, rightWristY, 20)
        song1.stop()
    }


}