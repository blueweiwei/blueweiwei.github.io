AV.init({
    appId: "5z8lEqeOqKK4lewDlvIQXzW1-gzGzoHsz",
    appKey: "JDphYehcTC5QKgzqeISdxCTg",
    serverURL: "https://5z8leqeo.lc-cn-n1-shared.com"
  });

localStorage.setItem('debug', 'leancloud*');
// const { Query, User } = AV;

function submits(){
    // alert('触发');
    const avatarUpload = document.getElementById('avatar-upload');
	console.log("avatarUpload");
    console.log(avatarUpload.files);
    if (avatarUpload.files.length) {
    const localFile = avatarUpload.files[0];
	console.log(localFile);
    const file = new AV.File(avatarUpload.files[0].name, localFile);
	console.log("file");
	console.log(file);
    file.save().then((file) => {
        console.log(`文件保存完成。objectId：${file.id}`);
		console.log(file);
        var arryInfor={
            'name':file.attributes.name,
            'type':file._extName,
            'size':file.attributes.metaData.size,
            'url':file.attributes.url
        }
        ParseFile(arryInfor)
        copyTo()
      }, (error) => {
        console.log('上传失败')
      });
    }
}
// getElementById
function $id(id) {
    return document.getElementById(id);
}

// output information
function Output(msg) {
    var m = $id("messages");
    m.innerHTML = msg + m.innerHTML;
}
// output file information
function ParseFile(file) {
    Output(
        "名称: <strong>" + file.name +
        "</strong><br> 类型: <strong>" + file.type +
        "</strong> <br> 大小: <strong>" + file.size +
        "</strong> bytes <br> URL: <button type='dashed' id='copyUrl' data-clipboard-text='"+file.url+"'>点击复制</button>" 
    );

}
function copyTo(){
    var btns = document.querySelectorAll('#copyUrl');
    var clipboard = new ClipboardJS(btns);   
    clipboard.on('success', function(e) {    
        alert("复制成功");    
        e.clearSelection();    
        console.log(e.clearSelection);    
    });
    clipboard.on('error', function(e) {
            alert("当前浏览器不支持此功能，请手动复制。")
    });
}