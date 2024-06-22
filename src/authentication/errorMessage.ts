export function errorMessage (error: any, type?: string){
 
    console.log(error);
    let response = error.response.data
    let errorTxt = ''

    for(let key in response) {
        if(key){
            if(type == 'login'){
                errorTxt += response[key]
            }
            else {
                errorTxt += response[key][0]
            }
        }
    }

    return errorTxt
}