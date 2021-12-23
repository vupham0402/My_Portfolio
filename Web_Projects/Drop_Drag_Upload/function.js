<script type="text/javascript" src="https://sdk.amazonaws.com/js/aws-sdk-2.1024.0.js">
</script><script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js">
</script><script type="text/javascript">
//Bucket Configurations

 var bucketName = "epgmarketbasket";
 var bucketRegion = "us-east-1";
 var IdentityPoolId = "IdentityPoolId";

 AWS.config.update({
                region: bucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: IdentityPoolId
                })
            });

            var s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: {Bucket: bucketName}
        });
</script>

<p style="background-color: rgba(0, 0, 0, 0); line-height: 36px;"><font style="font-size: 14px;">First, click the link below to download our&nbsp;data collection template.</font></p>

<p style=""><a href="/resources/Documents/EPG%20Data%20Collection%20TEMPLATE%208.30.2021.xlsx" target="_blank" class="stylizedButton buttonStyle001"><font style="font-size: 14px;">Download Template</font></a><br></p>

<p style="background-color: rgba(0, 0, 0, 0); margin-bottom: 0px !important;"><font style="font-size: 14px;">Fill in the template with your purchase data (recent 12-month period) and save&nbsp;it as .xls, .xlsx or .csv.&nbsp;&nbsp;</font></p>

<p style="background-color: rgba(0, 0, 0, 0);"><font style="font-size: 14px;"><br></font></p>

<p class="contStyleExcInlineSmaller" style="line-height: 22px; margin-top: 1em !important;"><font style="font-size: 14px;">Second, please enter your organization and email. Upload your data using the <font color="#008093" style=""><strong><font>Secure Uploa</font>d</strong></font> option below. Click Upload.</font></p><!-- A functional html code-->

<div id="container">
  <div style="text-align: center;">
    <label for="organization">Enter your organization:</label><br>
    <input type="text" id="organization" spellcheck="false" data-ms-editor="true"><br>
    <br>
    <label for="email">Enter your email:</label><br>
    <input type="email" id="email"><br>
  </div>

  <div id="drop-zone" class="drag-area" style="width: 100%; margin-top: 20px;">
    <header style="font-size: 18px;">Drag &amp; Drop</header><span id="span" style="font-size: 16px;">OR</span> <button id="button" style="font-size: 16px;">Browse File</button> <input id="fileUpload" type="file" name="file" hidden=""><br>

    <div id="content" style="font-size: 16px; color: white;">
      Your File
    </div><br>
    <button id="button" onclick="s3upload();" style="font-size: 16px;">Upload</button>
  </div>
</div>

<p style="background-color: rgba(0, 0, 0, 0); line-height: 27px; margin-bottom: 0px !important; margin-top: -1em !important;"><br></p>

<p style="background-color: rgba(0, 0, 0, 0); line-height: 18px; margin-bottom: 0px !important;"><font style="font-size: 18px;"><br></font></p>

<p style="background-color: rgba(0, 0, 0, 0); line-height: 18px;"><font style="font-size: 14px;">Third, give us a little time to prepare your market basket analysis and we will provide it to you shortly!</font></p>

<p style="background-color: rgba(0, 0, 0, 0); line-height: 18px;"><font style="font-size: 14px;">For support or questions, please contact us at (833) 439-3776 or <a href="mailto:sdupree@eyeprogpo.com" target="_blank" style="">memberservices@EyeProGPO.com</a>.</font></p><script type="text/javascript">
    const dropZone = document.getElementById('drop-zone');
    const content = document.getElementById('content');
    var org = document.getElementById('organization');
    var email = document.getElementById('email');
    const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
    flag = 0;
    let file;
    let files;
    const reader = new FileReader();

    button.onclick = ()=>{
        input.click(); 
    }

    input.addEventListener("change", function(){
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file = this.files[0];
        files = this.files;
        dropArea.classList.add("active");
        content.innerHTML = file.name;
        dragText.textContent = "Ready to Upload File";
        flag = 1;
    });

    if (window.FileList && window.File) {
        dropZone.addEventListener('dragover', event => {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
        });
    
        dropZone.addEventListener('drop', event => {
            content.innerHTML = '';
            event.stopPropagation();
            event.preventDefault();
            files = event.dataTransfer.files;
            console.log(files);
            
            reader.readAsDataURL(files[0]);
            file = files[0];
            content.innerHTML = file.name;
            dragText.textContent = "Ready to Upload File";
            flag = 1;
        }); 
        
        function s3upload() {
            if (flag === 0) {
                return alert("Please choose a file to upload first.");
            }    
            else if (org.value === '') {
                return alert("Please enter your organization.");
            } 
            else if (email.value === '') {
                return alert("Please enter your email address.");
            }    
            else {
                var fileName = file.name;
                var fileUploadName = document.getElementById('organization').value + '_' + document.getElementById('email').value + '_' + fileName;
                // Use S3 ManagedUpload class as it supports multipart uploads
                var upload = new AWS.S3.ManagedUpload({
                    params: {
                    Bucket: bucketName,
                    Key: fileUploadName,
                    Body: file,
                    }
                });
                var promise = upload.promise();
                promise.then(
                    function(data) {
                        alert("Successfully uploaded your file. Data submitted here is secured for privacy through Amazon Web Services Encryption and WildApricot.");
                        content.innerHTML = "Your File";
                        dragText.textContent = "Drag & Drop";
                        org.value = '';
                        email.value = '';
                    },
                    function(err) {
                        return alert("There was an error uploading your file: ", err.message);
                    }
                );
            }
        }
    }
</script>
