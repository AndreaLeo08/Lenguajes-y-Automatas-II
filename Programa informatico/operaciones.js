function EcuArit() {

    var ecuacion = document.getElementById('ecu').value;//Valor introducido
    if (ecuacion != null) {//Se verifica que no sea nulo
        var expres = /\d{1,}]\s{0,}['+'|'/'|'-'|'*']\s{0,1}\d{1,}]/gi;//Se crean buscardor de operaciones 
        var opera = ecuacion.match(expres);
        var a = 0;//Iniciamos un contador
        var b = 'b';
        var resul = b + a + '=' + opera;
        var x = ecuacion.replace(opera, b + a);//Reemplazamos el valor de la operacion en la ecuación por la contador
        i++;//Se incrementa el contador
        var resul2 = b + a + '=' + x;
        document.getElementById('para').value = resul + "\n" + resul2;
    } else {
        document.getElementById('para').value = "No se introdujo ninguna ecuación";//Si es nulo se imprime el mensaje
    };
};

function EcuAritAvanzado() {

    let saltoDeLinea = "\n";//Operador global para los saltos de linea en la impresión de datos

    function Infijo_Postfijo(infijo) {
         //Funcion que convertira de infijo a postfijo por medio de un arbol
        let converinfi = new Array();
        converinfi = infijo;
        let postfi = "";//Se almacena el resutltado 
        let pila = new Array();
        pila.push("-1");
        let retornar;//Se almacenara los valores de retorno de las prioridades de operación

        for (let i = 0; i < converinfi.length; i++) {//En el for se realizara una busqueda completa con las prioridaes
            retornar = pila[pila.length - 1];//Retonar simpre tendra el valor de -1
            if (BuscaOperador(converinfi.charAt(i)) || converinfi.charAt(i) == ")") {//Se hace una busqueda 
                if (retornar == "-1") {
                    pila.push(converinfi.charAt(i));//El valor encontrado ira a la pila
                } else {//En caso contrario se hara esto
                    if (PrioridadOperador(converinfi.charAt(i)) == PrioridadOperador(retornar)) {//Localizamos que tipo de operador con prioridad
                        if (converinfi.charAt(i) == "(") {//Si es igual al dato
                            pila.push(converinfi.charAt(i));//En caso de que lo sea ira a la pila
                        } else {
                            postfi += pila.pop();//Se saca lo que tiene pila y se concatena a postfi
                            pila.push(converinfi.charAt(i));//Se introduce un nuevo valor
                        };
                    } else if (PrioridadOperador(converinfi.charAt(i)) > PrioridadOperador(retornar)) {//La prioridad de caracter es mayor al que se retorna
                        pila.push(converinfi.charAt(i));//Si lo es se introduce a la pila
                    } else if (PrioridadOperador(converinfi.charAt(i)) < PrioridadOperador(retornar)) {//En caso de que no lo sea
                        while (retornar != "-1" && retornar != "(") {//Se hace lo siguiente el retorno es diferente a -1 y no es el valor de operador
                            postfi += pila.pop();//Se saca de la pila el caracter y se concatena a postfi
                            retornar = pila[pila.length - 1];//El retorno se convierte en -1
                        };
                        pila.push(converinfi.charAt(i));//Se introduce el nuevo caracter a la pila
                    } else if (converinfi.charAt(i) == ")") {//Si el caracter es igual
                        while (retornar != "(") {//Mientras retornar no sea igual
                            postfi += pila.pop();//Saca el valor de pila y se concatena
                            retornar = pila[pila.length - 1];//El retorno se regresa a -1
                        };
                        pila.pop(converinfi.charAt(i));//Localiza el caracter y lo sacalo
                    };
                };

            } else {//Principal pasa lo siguiente
                postfi += converinfi.charAt(i);//Se concatena el caracter
            };//Fin
            if (i == converinfi.length - 1) {//Si es menor a length pero igual a el tamaño 
                while (retornar != "-1") {//Mientras retornar no sea -1
                    postfi += pila.pop();//Cada ciclo de la pila concatenalo a postfi
                    retornar = pila[pila.length - 1];//Retornar se  reduce  1 a 1
                };
            };//Fin
        };//Fin for
        return postfi;//Retorna el resultado de la conversion
    };//Fin de la funcion

    function BuscaOperador(caracter) {
        if (caracter == "(" || caracter == "*" || caracter == "/" || caracter == "+" || caracter == "-") {
            return true;
        };
        return false;
    };

    function PrioridadOperador(operador) {//Prioridad de ordenacion con verificacion

        if (operador == "(") {
            return 3;
        } else {
            if (operador == "*" || operador == "/") {
                return 2;
            } else {
                if (operador == "+" || operador == "-") {
                    return 1;
                };
            };
        };
    }

    let op_original = document.getElementById('ecu').value;
    if (op_original == "") {
        document.getElementById('para').value = "No se ha introducido ninguna operacion";
    } else {
        let op_modificado = "";

        for (let j = 0; j < op_original.length; j++) {
            if (op_original.charAt(j) != " ") {
                op_modificado += op_original.charAt(j);
            };//Fin if
        };//Fin for

        let resulPostfijo = "";//Se recibe el resultado de conversion
        resulPostfijo = Infijo_Postfijo(op_modificado);//Se envia a la función la ecuación infija

        let pilaTemporal = new Array();//Se almacenan los contadores
        let impTriplos = new Array();//Se almacenan los pop de la pila para su impresion
        let operando1 = "";
        let operando2 = "";
        let signo = "";
        let n = 1;


        for (let k = 0; k <= resulPostfijo.length; k++) {
            if (BuscaOperador(resulPostfijo.charAt(k))) {//Si es un operador haz lo siguiente de lo contrario es un numero o letra se va a else
                operando1 = pilaTemporal.pop();

                operando2 = pilaTemporal.pop();

                signo = resulPostfijo.charAt(k);

                impTriplos.push(GeneradorTriplo(n, operando1, signo, operando2));
                pilaTemporal.push(`t${n}`);
                n++;

            } else {//Los primeros dos caracteres son numero o letra en una interprestación postfija.
                pilaTemporal.push(resulPostfijo.charAt(k));//Se introduce a la pila numero o letra
            };
        };//Fin for

        impTriplos.push(` ${pilaTemporal.pop()}`);

        let imprime = new Array(impTriplos);
        var x = "X=";
        for (var i = 0; i < imprime.length; i++) {
            document.getElementById('para').value = imprime[i] + "X=" + `t${n - 1}`;
        };
        return true;
    }
    //Termina el contador
    //----------------------------------------------------------------------------
    function GeneradorTriplo(cont, caract1, operacion, caract2) {

        if (operacion == "*") {
            return `t${cont} = ${caract2} ${"*"} ${caract1}` + saltoDeLinea;
        }
        if (operacion == "/") {
            return `t${cont} = ${caract2} ${"/"} ${caract1}` + saltoDeLinea;
        }
        if (operacion == "+") {
            return `t${cont} = ${caract2} ${"+"} ${caract1}` + saltoDeLinea
        }
        if (operacion == "-") {
            return `t${cont} = ${caract2} ${"-"} ${caract1}` + saltoDeLinea
        }

        return "";
    }//Fin del  generadorTriplos
}//Fin de EcuAritAvanzado