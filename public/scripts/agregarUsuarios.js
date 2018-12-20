document.getElementById('Name').innerHTML = getCookie("name"); 
var DNi = getCookie("DNI");



if(DNi){
$.post('/permisos',{
	DNI:DNi
	},function(response){ 
		console.log(response);
		if(response!=2){
			if(response == 1){
				window.location.href = "/login";
			}else if(reponse == 3){ 

			}
		}
	})
}else{
window.location.href = "/login";
}
function getCookie(name){
    var cname = name + "=";               
    var dc = document.cookie;             
    if (dc.length > 0) {              
        begin = dc.indexOf(cname);       
        if (begin != -1) {           
        begin += cname.length;       
        end = dc.indexOf(";", begin);
        if (end == -1) end = dc.length;
            return unescape(dc.substring(begin, end));
        } 
    }
    return null;
    } 