!function(){



var btn = document.getElementById('btn');
btn.onclick = function(){
    var xhr = new XMLHttpRequest(),
    user = document.getElementById('user'),
    pwd = document.getElementById('pwd'),
    url ='data/data.json?t='+ new Date().getTime();
    xhr.open('get',url,true);
    xhr.send();
    xhr.onreadystatechange = function(){
        var response;
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(xhr.responseText)
            response = JSON.parse(xhr.responseText);
            if(response.success){
                    console.log(response)
            }
        }
    }
}
    
}();