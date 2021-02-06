import React, { Component } from 'react';
import { 
  Text, 
  View, 
  TVEventHandler,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid, 
} from 'react-native';


export default class App extends Component {
    constructor(props){
      super(props);
      this.state = {
         box: 'left top'   
      }
    }

    setcomand(box) {
      this.setState( () => { return { box }; });
    }


_enableTVEventHandler() {
      var self = this;
      this._tvEventHandler = new TVEventHandler();
      this._tvEventHandler.enable(this, function (cmp, evt) {
        if (evt && evt.eventType === 'right') {
              if ((self.state.box == 'left top') || (self.state.box == 'left bottom')) {
                 if (self.state.box == 'left top')
                    self.setcomand('right top');
                 else
                    self.setcomand('right bottom')
              }
          } else if (evt && evt.eventType === 'up') {
              if ((self.state.box == 'left bottom') || (self.state.box == 'right bottom')) {
                if (self.state.box == 'left bottom')
                   self.setcomand('left top');
                else
                   self.setcomand('right top')
              }
          } else if (evt && evt.eventType === 'left') {
              if ((self.state.box == 'right top') || (self.state.box == 'right bottom')) {
                if (self.state.box == 'right top')
                   self.setcomand('left top');
                else
                   self.setcomand('left bottom')
              }
          } else if (evt && evt.eventType === 'down') {
              if ((self.state.box == 'right top') || (self.state.box == 'left top')) {
                if (self.state.box == 'right top')
                   self.setcomand('right bottom');
                else
                   self.setcomand('left bottom')
              }
          } else if (evt && evt.eventType === 'select') {
              //self.press();
          }
      });
}

_disableTVEventHandler() {
      if (this._tvEventHandler) {
          this._tvEventHandler.disable();
          delete this._tvEventHandler;
      }
  }

componentDidMount() {
      this._enableTVEventHandler();
  }

componentWillUnmount() {
      this._disableTVEventHandler();
  }

onButtonPressed(boxName)  {
    ToastAndroid.show(`You clicked the ${boxName} button`, ToastAndroid.SHORT)
 }

    render() {
        return (
          <SafeAreaView>
          <View style={styles.container}>
                <Image source={require('./logo.png')} style={styles.logo} />
                <View style={styles.section}>
                     <View style={styles.boxWrapper}>
                         <TouchableOpacity 
                           onPress={() => this.onButtonPressed('left top')}
                           style={[styles.box, {backgroundColor: this.state.box == 'left top' ? '#ef4323' : '#194e9a'}]}>
                             <Text>&nbsp;</Text>
                         </TouchableOpacity>
                         <Text 
                           style={[styles.text, {color: this.state.box == 'left top' ? '#ef4323' : 'black'}]}>
                             LEFT TOP
                         </Text>
                     </View>
                     <View style={styles.boxWrapper}>
                         <TouchableOpacity 
                           onPress={() => this.onButtonPressed('right top')}
                           style={[styles.box, {backgroundColor: this.state.box == 'right top' ? '#ef4323' : '#194e9a'}]}>
                             <Text>&nbsp;</Text>
                         </TouchableOpacity>
                         <Text 
                           style={[styles.text, {color: this.state.box == 'right top' ? '#ef4323' : 'black'}]}>
                             RIGHT TOP
                         </Text>
                     </View>
                </View>
                <View style={styles.section}>
                     <View style={styles.boxWrapper}>
                         <TouchableOpacity 
                           onPress={() => this.onButtonPressed('left bottom')}
                           style={[styles.box, {backgroundColor: this.state.box == 'left bottom' ? '#ef4323' : '#194e9a'}]}>
                             <Text>&nbsp;</Text>
                         </TouchableOpacity>
                         <Text 
                           style={[styles.text, {color: this.state.box == 'left bottom' ? '#ef4323' : 'black'}]}>
                             LEFT BOTTOM
                         </Text>
                     </View>
                     <View style={styles.boxWrapper}>
                         <TouchableOpacity 
                           onPress={() => this.onButtonPressed('right bottom')}
                           style={[styles.box, {backgroundColor: this.state.box == 'right bottom' ? '#ef4323' : '#194e9a'}]}>
                             <Text>&nbsp;</Text>
                         </TouchableOpacity>
                         <Text 
                            style={[styles.text, {color: this.state.box == 'right bottom' ? '#ef4323' : 'black'}]}>
                              RIGHT BOTTOM
                         </Text>
                     </View>
                </View>
          </View>
       </SafeAreaView>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },

  logo: {
    width: 120,
    height: 30,
    alignSelf: 'flex-end',
    marginBottom: 30
  },

  box: {
    width: 130,
    height: 100,
  },

  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxWrapper: {
    marginVertical: 15,
    marginHorizontal: 25
  },

  text: {
    alignSelf: 'center',
  }
});



