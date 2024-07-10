import decode from 'jwt-decode';

class Authenticator{
    decodeMe(){
        return decode(this.getToken())
    }
    getToken(){
        return localStorage.getItem("id_token")
    }
    setToken(idToken){
        localStorage.setItem("id_token"),idToken
        window.location.assign("/")
    }
    removeToken(){
        localStorage.removeItem("id_token")
        window.location.assign("/")
    }
    isExpired(token){
        try{
            const decoded= decode(token)
            if(decoded.exp<Date.now()/1000){
                return true
            }
            else return false
        }catch(err){return console.log("something went wrong")}
    }
    isLoggedIn(){
        const token=this.getToken()
        return !!token && !this.isExpired(token)
    }
}
export default new Authenticator()