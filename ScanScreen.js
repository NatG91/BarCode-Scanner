import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component{
constructor(){
    super();
    this.state = {
        hasCamerPermissions: null,
        scanned: false,
        scannedData:'',
        buttonState: 'normal'
    }
}
getCameraPermissions=async(Id)=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission: status==="granted",
      buttonState: Id,
      scanned: false
    })
    }
    handleBarCodeScanned = async({type,data})=>{
      const {buttonState}=this.state
      if (buttonState==='BookId'){
        this.setState({
          scanned:true,
          scannedBookId:data,
          buttonState: 'normal',
        })
      } else if (buttonState==='StudentId'){
      this.setState({
        scanned:true,
        scannedStudentId:data,
        buttonState: 'normal',
      })
      }
    }
    render(){
      const hasCameraPermission = this.state.hasCamerPermission
      const scanned = this.state.scanned
      const buttonState = this.state.buttonState
      if (buttonState==="clicked" && hasCameraPermission){
        return(
          <BarCodeScanner onBarcodeScanned={scanned?undefined:this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          />
        )

      }
      else if (buttonState==="normal"){
        return(
        <View>
          <View>
            <Image source={require('../assets/Barcode Scanner.jpg')}
            style={{width:200, height:200}}
            />
            <Text style={{textAlign: 'center', fontSize: 30}}>
              Barcode Scanner
            </Text>
          </View>
          <Text>
            {hasCameraPermission===true? this.state.scannedData:"request Camera Permission "}
          </Text>
          <TouchableOpacity
          onPress={this.getCameraPermissions}
          style= {{backgroundColor: "blue", padding: 10, margin: 10}}
          title = "Bar Code Scanner">
            <Text style = {{fontSize: 20}}> Scan QR Code </Text>
          </TouchableOpacity>
        </View>
        )
      }
    }
}
