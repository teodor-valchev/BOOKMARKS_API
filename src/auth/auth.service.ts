import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signin() { 
        return {msg: "Success sign in"}
    }
    
    signup() {
        return {msg: "Success sign un"}
    }
}