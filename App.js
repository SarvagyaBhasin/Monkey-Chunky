import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import {Header} from 'react-native-elements';
import db from './Sampledb.json';
import PhonicSoundButton from './Components/PhonicButton'
import { Alert } from 'react-native';
export default class App extends React.Component {
  constructor(){
    super();
    this.state={text:'', chunk: [], phonicSound: []}
  }
  render() {
    return (
      <View style={styles.container}>
      <Header
      backgroundColor={'blue'}
      centerComponent={{text:'Monkey chunky', style:{color:'#fff', fontSize:20}}}
      />
      <Image style={styles.imageIcon} source={{uri:'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png'}}>

      </Image>
      <TextInput
      style={styles.inputstyle}
      onChangeText={text1=>{
        this.setState({text:text1})
      }}
      value={this.state.text}
      />
      <TouchableOpacity style={styles.goButton}
      onPress={()=>{
        var word=this.state.text.toLowerCase().trim();
        db[word]?(
          this.setState({chunk:db[word].chunks}),
          this.setState({phonicSound:db[word].phones})
        ):Alert.alert("word does not exist in the database")
        
      }}>
      <Text style={styles.gotext}>Go</Text>
      </TouchableOpacity>
      <View>
        {this.state.chunk.map((item, index)=>{
          return(<PhonicSoundButton wordChunk={this.state.chunk[index]}
          soundChunk={this.state.phonicSound[index]}
          buttonIndex={index}></PhonicSoundButton>)
        })}
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputstyle:{
    marginTop:100,
    width:'80%',
    alignSelf:"center",
    borderWidth:4
  },
  chunkButton:{
    width:'60%',
    height:50,
    justifyContent:"center",
    alignItems:'center',
    borderRadius:10,
    margin:5,
    backgroundColor:'red'
  },
  goButton:{
    width:'50%',
    height:55,
    alignSelf:"center",
    padding:10,
    margin:10
  },
  gotext:{
    textAlign:"center",
    fontSize:30,
    fontWeight:'bold',
    color:'white'
  },
  displayText:{
    textAlign:"center",
    fontSize:30,
    color:'red'
  },
  imageIcon:{
    width:150,
    height:150,
    marginLeft:95
  }
});
