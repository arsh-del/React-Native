import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, ScrollView} from 'react-native';
import {View,Text,Image,Button} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import cartFirebase from './CartFirebase';
import FirebaseConfig from './FireBase';
import auth from 'firebase'


const ProductScreen = ({navigation}) =>{
    const [product, setProduct] = useState('');
    const firebase = FirebaseConfig();

    const checkAuth = () => {
      auth.auth().onAuthStateChanged(user => {
          if(user){
            console.log(user)
          }
      })
    }

    const addtoCart = async (id, name,url,price,quantity)=>{
        firebase.database().ref('/cart').push({name:name, id: id,url: url,price:price,quantity:quantity});
    }

    useEffect(() => {
      checkAuth();
      let tmpData = []
        firebase.database().ref('/products').once('value').then((snapshot)=> {
          console.log(snapshot);
          snapshot.forEach(childSnapshot => {
            tmpData.push(childSnapshot.val())
          });
            setProduct(tmpData);
            console.log(product);
          });
    }, [])

    const renderProduct =({item})=>{
        return(
      <View style={{padding:20,flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
            <Image style={{height: 50, width: 50}} source={{uri: item.url}}></Image>
            <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:18}}>{item.name}</Text>
                <Text style={{paddingLeft:5}}>{item.price}</Text>
            </View>

        </View>
        <TouchableOpacity onPress={()=> addtoCart(item.id, item.name,item.url,item.price,item.quantity)} style={{backgroundColor:'black',borderRadius:5,paddingHorizontal:20,paddingVertical:5}}>
          <Text style={{color:'white'}}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    )}

    return(


            <ScrollView style={{flex:1,backgroundColor:'white'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Cart')} style={{marginBottom:5,borderRadius:5,paddingHorizontal:30,paddingVertical:8,marginLeft:290}}>
                    <Image style={{height:30,width:30}} source={require('./assets/cart.png')} />
                </TouchableOpacity>
                <FlatList
                    data={product}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id}
                />
            </ScrollView>


      );

}
export default ProductScreen;
