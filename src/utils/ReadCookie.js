export function ReadCookie(name){
    // console.log("name== ", name)
    var nameC = name + "=";
        var cook = document.cookie.split(";");
        // console.log('cook', cook)
        for(var i =0; i<cook.length;i++){
            var c = cook[i];
            // console.log(c)
            while(c.charAt(0) === " "){
                c = c.substring(1, c.length)
                // console.log("Atfer while: ",c)
            }if(c.indexOf(nameC) === 0){
                c = decodeURIComponent(c.substring(nameC.length, c.length));
                // console.log("valueater If",c)
                return c
            }
        }
}