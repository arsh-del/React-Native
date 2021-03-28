import React, {useState} from 'react';
import {Input, Text} from 'react-native-elements'
import {Button, TouchableOpacity, View} from "react-native";
import FirebaseConfig from "./FireBase";
import auth from 'firebase'

const SignInScreen = ({navigation}) =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const firebase = FirebaseConfig();

    const checkAuth = () => {
        auth.auth().onAuthStateChanged(user => {
            if(user){
                navigation.navigate('Shop')
            }
        })
    }
    const signin = async()=>{
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email, password).then(
                navigation.navigate('Shop')
            );

        }
        catch (err) {
            setError(err.message);
        }
    }
    return(
        <View>
            <Input label="Email" value={email} onChangeText={setEmail}></Input>
            <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry></Input>
            <Button title="SignIn" onPress={()=> signin()}></Button>
            {
                error?
                    <Text style={{color: 'red'}}>{error}</Text>
                    :null
            }
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                <Text>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
};

export default SignInScreen;
