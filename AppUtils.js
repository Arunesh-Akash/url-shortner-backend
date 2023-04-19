module.exports=class AppUtils{
    static generateFieldError(fieldName){
        return {
            error:'Field Missing',
            message:`${fieldName} is missing`
        };
    }

    static generateSuccess(type,message){
        return {
            status:type,
            message:message
        };
    }

    static generateError(type,message){
        return {
            status:type,
            message:message
        };
    }
}