$(document).ready(function () {
   // client id of the project
   let clientId = "1038056986277-vut3p867fr1r339rvsphn0jfh3qe009a.apps.googleusercontent.com";
   // redirect_uri of the project
   let redirect_uri = "http://127.0.0.1:8080/uploadDrive/upload.html";
   // scope of the project
   let scope = "https://www.googleapis.com/auth/drive";
   // the url to which the user is redirected to
   let url = "";
   // the actual url to which the user is redirected to
   url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + redirect_uri + "&prompt=consent&response_type=code&client_id=" + clientId + "&scope=" + scope + "&access_type=offline";
   // this line makes the user redirected to the url
   window.location = url;
});