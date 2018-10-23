    var mater;
    var prof;
    var status;

        //submit
        function sub(){
            
        };


        document.body.onload = addElement;

function addElement () { 
  mater = document.getElementById("mater").value;
  prof = document.getElementById("prof").value;
  alert(mater+" "+prof);
  // crea un nuevo div 
  // y añade contenido 
  var newa = document.createElement("a"); 
  var adentro = document.createTextNode(mater); 
  newa.appendChild(adentro); //añade texto al div creado. 

  var newa2 = document.createElement("a"); 
  var adentro2 = document.createTextNode(prof); 
  newa2.appendChild(adentro2); //añade texto al div creado. 

  // añade el elemento creado y su contenido al DOM 
  var actual = document.getElementById("submit"); 
  actual.parentNode.insertBefore(newa, actual); 

  // añade el elemento creado y su contenido al DOM 
  var actual2 = document.getElementById("submit"); 
  actual2.parentNode.insertBefore(newa2, actual);   
}