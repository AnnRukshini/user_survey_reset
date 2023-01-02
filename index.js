let env = "dev";
let tripId = null;

window.onload = function() {
    try {
      var url_string = (window.location.href);
      var url = new URL(url_string);
      userId = url.searchParams.get("user_id");
      env = url.searchParams.get("env");
      if (env == "dev" || env == "prod") {
        resetSurveyData(userId, env);
      }
      else{
        document.getElementById('message').innerHTML =  "The user_id should be valid and env should be dev or prod";
      }
    }catch (err) {
        console.log("Issues with Parsing URL Parameters. The user_id should be valid and env should be dev or prod - " + err);
    }
}

function resetSurveyData(userId, env){
  if(userId != undefined & env != undefined){
    const url = 'https://y3kjjhpgu3.execute-api.us-east-1.amazonaws.com/prod/dashboard/users/reset_user_survey';
    var bodyString = JSON.stringify({ "env": env, "user_id": userId })
    console.log(`Body String: ${bodyString}`);
    var h = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: bodyString,
    method: "POST"
    }
    fetch(url, h).then(response => response.json()).then(data => {
        console.log(`${JSON.stringify(data.Payload)}`);
        document.getElementById('message').innerHTML =  data.Message;
    });
 }
}

