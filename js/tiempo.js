const $id = (el) => document.getElementById(el);

const dia = $id('dia');
const hora = $id('hora');
const minuto = $id('minuto');
const segundo = $id('segundo');

const guardarEstado = (segundos, minutos, horas, dias) => {
    localStorage.setItem('contador', JSON.stringify({segundos,minutos,horas,dias}));
}

const obtenerEstado = () =>{
    const estadoGuardado = localStorage.getItem('contador');

    if(estadoGuardado){
        return JSON.parse(estadoGuardado);
    }else{
        return {
            segundos: parseInt(segundo.textContent),
            minutos: parseInt(minuto.textContent),
            horas: parseInt(hora.textContent),
            dias: parseInt(dia.textContent)
        };
    }
}

const cuentaRegresiva = (segundos, minutos, horas, dias) => {
    const interval = setInterval(() => {
        if (segundos > 0) {
            segundos--;
        } else {
            segundos = 59;
            
            if (minutos > 0) {
                if (horas === 0) {
                    minutos--;
                } else if (minutos > 1) {
                    minutos--;
                } else {
                    minutos = 59;
                    if (horas > 0) {
                        horas--;
                    } else {
                        horas = 23;
                        if (dias > 0) {
                            dias--;
                        } else {
                            clearInterval(interval);
                            guardarEstado(0,0,0,0)
                            return;
                        }
                    }
                }
            } else if (horas > 0) {
                horas--;
                minutos = 59;
            } else if (dias > 0) {
                dias--;
                horas = 23;
                minutos = 59;
            } else {
                clearInterval(interval);
            }
        }

        segundo.textContent = segundos.toString().padStart(2, '0');
        minuto.textContent = minutos.toString().padStart(2, '0');
        hora.textContent = horas.toString().padStart(2, '0');
        dia.textContent = dias.toString().padStart(2, '0');

        guardarEstado(segundos, minutos, horas, dias);
    }, 1000);
}

const estadoInicial = obtenerEstado();


cuentaRegresiva(
    estadoInicial.segundos,
    estadoInicial.minutos,
    estadoInicial.horas,
    estadoInicial.dias
);
