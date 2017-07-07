'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from 'react-native-video';
var screen    = require('Dimensions').get('window');
var Recorder  = require('react-native-screcorder');
var Video     = require('react-native-video');
import AudioRecorder from '../AudioRecorder';
import React from 'react';
import { Dimensions, View,
         Text, StyleSheet } from 'react-native';
import { takeSnapshotAsync } from 'exponent';
import Colors from '../constants';
import SignatureView from '../components';
import Header from '../components/Header';
import ColorSelector from '../components';
import ResultImages from '../components';

const testBlobA = new Blob();
const testBlobB = new Blob()

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
  };

  onLoad(data) {
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode == resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Video source={{uri: "broadchurch"}}
                 style={styles.fullScreen}
                 rate={this.state.rate}
                 paused={this.state.paused}
                 volume={this.state.volume}
                 muted={this.state.muted}
                 resizeMode={this.state.resizeMode}
                 onLoad={this.onLoad}
                 onProgress={this.onProgress}
                 onEnd={() => { console.log('Done!') }}
                 repeat={true} />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(0.25)}
              {this.renderRateControl(1.5)}
              {this.renderRateControl(2.0)}
              {this.renderRateControl(2.5)}
              {this.renderRateControl(3.0)}
            </View>

            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(2)}
              {this.renderVolumeControl(1.)}
            </View>

            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>

          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
              <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
            </View>
          </View>
        </View>
      </View>
    );
  

var Record = React.createClass({

  getInitialState: function() {
    return {
      device: "front",
      recording: false,
      nbSegments: 0,
      barPosition: new Animated.Value(0),
      currentDuration: 0,
      maxDuration: 3000,
      limitReached: false,
      config: {
        flashMode: Recorder.constants.SCFlashModeOff,
        video: {
          enabled: true,
          format: 'MPEG4',
        },
      }
    }
  },

  componentDidMount: function() {
    StatusBarIOS.setHidden(true, "slide");
  },

  /*
   *  PRIVATE METHODS
   */
describe('AudioRecoder', () => {

  it('should not throw an error when unmounting', () => {

  });

  it('should not throw an error when remounting', () => {

  });

  it('should delete recording buffer when clicking remove', () => {

  });

  it('should not pad the blob with empty data', () => {

  });

  it('should not allow for overlapping playback', () => {

  });

});


  startBarAnimation: function() {
    this.animRunning = true;
    this.animBar = Animated.timing(
      this.state.barPosition,
      {
        toValue: screen.width,
        duration: this.state.maxDuration - this.state.currentDuration
      }
    );
    this.animBar.start(() => {
      // The video duration limit has been reached
      if (this.animRunning) {
        this.finish();
      }
    });
  },

  resetBarAnimation: function() {
    Animated.spring(this.state.barPosition, {toValue: 0}).start();
  },

  stopBarAnimation: function() {
    this.animRunning = false;
    if (this.animBar)
      this.animBar.stop();
  },

  /*
   *  PUBLIC METHODS
   */

  record: function() {
    if (this.state.limitReached) return;
    this.refs.recorder.record();
    this.startBarAnimation();
    this.setState({recording: true});
  },

  pause: function(limitReached) {
    if (!this.state.recording) return;
    this.refs.recorder.pause();
    this.stopBarAnimation();
    this.setState({recording: false, nbSegments: ++this.state.nbSegments});
  },

  finish: function() {
    this.stopBarAnimation();
    this.refs.recorder.pause();
    this.setState({recording: false, limitReached: true, nbSegments: ++this.state.nbSegments});
  },

  reset: function() {
    this.resetBarAnimation();
    this.refs.recorder.removeAllSegments();
    this.setState({
      recording: false,
      nbSegments: 0,
      currentDuration: 0,
      limitReached: false
    });
  },

  preview: function() {
    this.refs.recorder.save((err, url) => {
      console.log('url = ', url);
      this.props.navigator.push({component: Preview, passProps: {video: url}});
    });
  },

  setDevice: function() {
    var device = (this.state.device == "front") ? "back" : "front";
    this.setState({device: device});
  },

  toggleFlash: function() {
    if (this.state.config.flashMode == Recorder.constants.SCFlashModeOff) {
      this.state.config.flashMode = Recorder.constants.SCFlashModeLight;
    } else {
      this.state.config.flashMode = Recorder.constants.SCFlashModeOff;
    }
    this.setState({config: this.state.config});
  },

  /*
   *  EVENTS
   */

  onRecordDone: function() {
    this.setState({nbSegments: 0});
  },

  onNewSegment: function(segment) {
    console.log('segment = ', segment);
    this.state.currentDuration += segment.duration * 1000;
  },

  /*
   *  RENDER METHODS
   */

  renderBar: function() {
    return (
      <View style={styles.barWrapper}>
        <Animated.View style={[styles.barGauge, {width: this.state.barPosition}]}/>
      

  render: function() {
    var bar     = this.renderBar();
    var control = null;

    if (!this.state.limitReached) {
      control = (
        
        <TouchableOpacity onPressIn={this.record} onPressOut={this.pause} style={styles.controlBtn}>
          <Text>Record</Text>
        
        </TouchableOpacity>
      );
    }

    return (
      <Recorder
        ref="recorder"/
        config={this.state.config}
        device={this.state.device}
        onNewSegment={this.onNewSegment}
        style={styles.wrapper}>
        {bar}
        <View style={styles.infoBtn}>
          <Text style={styles.infoBtnText}>{this.state.nbSegments}</Text>
        </View>
        <View style={styles.controls}>
          {control}
          <TouchableOpacity onPressIn={this.reset} style={styles.controlBtn}>
            <Text>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.preview} style={styles.controlBtn}>
            <Text>Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleFlash} style={styles.controlBtn}>
            <Text>Flash</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.setDevice} style={styles.controlBtn}>
            <Text>Switch</Text>
          </TouchableOpacity>
        </View>
      </Recorder>
    );
  }

});

/*********** PREVIEW COMPONENT ***********/

var Preview = React.createClass({

  getInitialState: function() {
    return {
      paused: false
    };
  },

  goBack: function() {
    this.setState({paused: true});
    this.props.navigator.pop();
  },

  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this.goBack}>
        <Video 
          source={{uri: this.props.video}}
          style={styles.wrapper}
          muted={false} 
          resizeMode="cover"
          paused={this.state.paused}
          repeat={true}/>
      </TouchableWithoutFeedback>
    );
  }

});

export default class SignatureScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { 
      results: [],
      color: Colors.color67, 
      strokeWidth: 5, 
      donePaths: []
    };

    this._undo = this._undo.bind(this);
    this._setDonePaths = this._setDonePaths.bind(this);
  }

  _cancel = () => {
    this.setState({ donePaths: [] });
  }

  _undo = () => {
    this.setState({ donePaths: this.state.donePaths.slice(0, -2) });
  }

  _save = async () => {
    const result = await takeSnapshotAsync(
      this._signatureView,
      { format: 'png', result: 'base64', quality: 2.0 }
    );

    const results = this.state.results;
    results.push(result);

    this.setState({ results });
  }

  _setDonePaths = (donePaths) => {
    this.setState({ donePaths });
  }

  _changeColor = (color) => {
    this.setState({ color });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          save={this._save}
          undo={this._undo}
          cancel={this._cancel}
        />

        <ColorSelector onPress={this._changeColor} />

        <View style={{ alignItems: 'center' }}>
          <SignatureView
            ref={(view) => { this._signatureView = view; }}
            donePaths={this.state.donePaths}
            setDonePaths={this._setDonePaths}
            containerStyle={{ backgroundColor: '#FFF', marginTop: 20 }}
            width={Dimensions.get('window').width - 20}
            height={Dimensions.get('window').width - 20}
            color={this.state.color}
            strokeWidth={this.state.strokeWidth}
          />
        </View>

        <ResultImages images={this.state.results} />

        <Text style={styles.footer}>
          Powered by Rmotr. Made by @brentvatne.
        </Text>
      </View>
    );
  }
}

SignatureView.route = {
  navigationBar: {
    visible: false
  }
};

/*********** APP COMPONENT ***********/

var App = React.createClass({

  render: function() {
    return (
      <NavigatorIOS initialRoute={{component: Record}} style={{flex: 1}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});

AppRegistry.registerComponent('VideoPlayer', () => VideoPlayer);
