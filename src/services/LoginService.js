
const API_URL_LOGIN = 'http://localhost:8081/api/v1'
const API_URL_VACACIONES = 'http://localhost:8083/api/v1'


export const LoginService = async (form) => {
 
 try {
    const url = `${API_URL_LOGIN}/login` 

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error('ERROR:', response.status)
    }

    const data = response.json()

    return data
  } catch(error) {
    console.log(error)
  }    

}

export const VacacionesListaService = async (sesion) => {
 
    try {
       const url = `${API_URL_VACACIONES}/vacaciones/buscatodos` 
   
       const options = {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${sesion.token}` 
         }
       }
   
       const response = await fetch(url, options)
   
       if (!response.ok) {
         throw new Error('ERROR:', response.status)
       }
   
       const data = response.json()
   
       return data
     } catch(error) {
       console.log(error)
     }    
   
   }
   

   export const VacacionesCreaService = async (enviarData) => {
 
    function convertirFormatoFecha(fechaYYMMDD) {
      const partes = fechaYYMMDD.split('-');
        if (partes.length !== 3) {
          return fechaYYMMDD;
        }
      
        const año = partes[0];
        const mes = partes[1];
        const dia = partes[2];
        const fechaDDMMYYYY = `${dia}/${mes}/${año}`;
    
      return fechaDDMMYYYY;
    }

    const fechaInicialformatted = convertirFormatoFecha(enviarData[1].fechaInicial)
    const fechaFinalformatted = convertirFormatoFecha(enviarData[1].fechaFinal)
    enviarData[1].fechaInicial = fechaInicialformatted
    enviarData[1].fechaFinal = fechaFinalformatted

    console.log("llego al service")

    try {
       const url = `${API_URL_VACACIONES}/vacaciones/crea` 
   
       const options = {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${enviarData[0].token}` 
         },
         body: JSON.stringify(enviarData[1])
        }
   
       const response = await fetch(url, options)
   
       if (!response.ok) {
         throw new Error('ERROR:', response.status)
       }
   
       const data = response.json()
   
       return data
     } catch(error) {
       console.log(error)
     }    
   
   }

   export const VacacionesEliminaService = async (enviarData) => {
 
    try {
      const codigo = enviarData[1].codigo
      const motivo = enviarData[1].motivo

      const url = `${API_URL_VACACIONES}/vacaciones/elimina?codigo=${codigo}&motivo=${motivo}` 
      
       const options = {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${enviarData[0].token}` 
         }
       }
   
       const response = await fetch(url, options)
   
       if (!response.ok) {
         throw new Error('ERROR:', response.status)
       }
   
       const data = response.json()
   
       return data
     } catch(error) {
       console.log(error)
     }    
   
   }



