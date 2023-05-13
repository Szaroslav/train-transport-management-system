import { ChangeEvent, FormEvent, useState } from 'react';
import './form.scss';
import {Adress, Street, Message, UserData} from './types';
import {URLPath} from "../global_values"

type UserDataKey = keyof UserData;
type AdressDataKey = keyof Adress;
type StreetDataKey = keyof Street;

export default function Register(){
    const [messages, setMessages] = useState<Message>({value:undefined,text:undefined});
    const [rData, setRData] = useState<UserData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeat: '',
        address:{
            street:{
                name:'',
                houseNumber:0,
                apartamentNumber:0,
            },
            city: '',
            zipCode: ''
        }
    })

    function changeVal(e:ChangeEvent<HTMLInputElement>){
        const tmpData:UserData = structuredClone(rData);
        const key = e.target.name as UserDataKey;
        tmpData[key] = (e.target.value as string & Adress);
        setRData(tmpData);
    }
    function changeValAddres(e:ChangeEvent<HTMLInputElement>){
        const tmpData:UserData = structuredClone(rData);
        const key = e.target.name as AdressDataKey;
        tmpData.address[key] = (e.target.value as string & Street);
        setRData(tmpData)
    }
    function changeValStreet(e:ChangeEvent<HTMLInputElement>){
        const tmpData:UserData = structuredClone(rData);
        const key = e.target.name as StreetDataKey;
        tmpData.address.street[key] = e.target.value as string & number;
        setRData(tmpData)
    }

    
    async function submit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        //database
        const response = await fetch(URLPath.loginPath,
            {
                method: 'POST',
                body: JSON.stringify(rData),
                headers:{"Access-Control-Allow-Origin": "http://localhost:5173/register"}
                
            })
        console.log(response.status);
        const accepted:Boolean = true;
        if(accepted){
            setMessages({value: true, text:"Udało się zalogować"});
        }
        else{
            setMessages({value: false, text:"Niepoprawne hasło bądź nazwa użytkownika"});
        }

    }
    return (
    <div className='main'>
        <form className='form' onSubmit={submit}>
            <p>Zarejestruj się</p>
            <div className='fields'>
                <div className='left'>
                    <p>Dane osobowe</p>
                    <input type="text" name="firstName" onChange={changeVal} placeholder="Imię" required/><br/>
                    <input type="text" name="lastName" onChange={changeVal} placeholder="Nazwisko" required/><br/>
                    <input type="text" name="email" onChange={changeVal} placeholder="Adres E-mail" required/><br/>
                    <input type="password" name="password" onChange={changeVal} placeholder="Hasło" required/><br/>
                    <input type="password" name="repeat" onChange={changeVal} placeholder="Powtórz Hasło" required/><br/>
                    <input className='submit' type="submit" value="Zarejestuj"/>
                </div>
                <div className='right'>
                    <p>Adres</p>
                    <input type="text" name="city" onChange={changeValAddres} placeholder="Miasto" required/><br/>
                    <input type="text" name="name" onChange={changeValStreet} placeholder="Ulica" required/><br/>
                    <input type="text" name="houseNumber" onChange={changeValStreet} placeholder="Numer budynku" required/><br/>
                    <input type="text" name="apartamentNumber" onChange={changeValStreet} placeholder="Numer budynku" required/><br/>
                    <input type="text" name="zipCode" onChange={changeValAddres} placeholder="Kod pocztowy" required/><br/>
                </div>
            </div>
            <p>{messages.text}</p> 
        </form>
    </div>
    )
}