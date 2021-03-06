$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const redirect_uri = "http://127.0.0.1:8080/uploadDrive/upload.html" // replace with your redirect_uri;
    const client_secret = "07qmmLIS0QBwNC6f0CWlG7Ga"; // replace with your client secret
    const scope = "https://www.googleapis.com/auth/drive";
    let access_token = "";
    let client_id = "841441706255-6rei3amskonf6g98gmj2k21u95q30o17.apps.googleusercontent.com" // replace it with your client id;

    $("#upload").on("click", function (e) {
        let file = $("#files")[0].files[0];
        let upload = new Upload(file);
        upload.doUpload();
        window.close();
    });

    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v3/token",
        data: {
            code: code,
            redirect_uri: redirect_uri,
            client_secret: client_secret,
            client_id: client_id,
            scope: scope,
            grant_type: "authorization_code"
        },
        dataType: "json",
        success: function (resultData) {
            localStorage.setItem("accessToken", resultData.access_token);
            localStorage.setItem("refreshToken", resultData.refreshToken);
            localStorage.setItem("expires_in", resultData.expires_in);
            window.history.pushState({}, document.title, "/uploadDrive/" + "upload.html");
        }
    });

    function stripQueryStringAndHashFromPath(url) {
        return url.split("?")[0].split("#")[0];
    }

    let Upload = function (file) {
        this.file = file;
    };

    Upload.prototype.getType = function () {
        localStorage.setItem("type", this.file.type);
        return this.file.type;
    };

    Upload.prototype.getSize = function () {
        localStorage.setItem("size", this.file.size);
        return this.file.size;
    };

    Upload.prototype.getName = function () {
        return this.file.name;
    };

    Upload.prototype.doUpload = function () {
        var that = this;
        var formData = new FormData();
        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);
        $.ajax({
            type: "POST",
            beforeSend: function (request) {request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));},
            url: "https://www.googleapis.com/upload/drive/v2/files",
            data: {uploadType: "media"},
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload)
                {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            success: function (data) {console.log(data);},
            error: function (error) {console.log(error);},
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };

    Upload.prototype.progressHandling = function (event) {
        let percent = 0;
        let position = event.loaded || event.position;
        let total = event.total;
        let progress_bar_id = "#progress-wrp";
        if (event.lengthComputable)
        {
            percent = Math.ceil(position / total * 100);
        }
    };
});