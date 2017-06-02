# elite

A <Video> component for react-native, as seen in
[react-native-login](https://github.com/katochsonu/elite.git)!

Requires react-native >= 0.4.4

### Add it to your project

Run `npm install elite --save`

## Usage

```javascript
// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.
<Video source={{uri: "background"}} // Can be a URL or a local file.
       rate={1.0}                   // 0 is paused, 1 is normal.
       volume={1.0}                 // 0 is muted, 1 is normal.
       muted={false}                // Mutes the audio entirely.
       paused={false}               // Pauses playback entirely.
       resizeMode="cover"           // Fill the whole screen at aspect ratio.
       repeat={true}                // Repeat forever.
       onLoadStart={this.loadStart} // Callback when video starts to load
       onLoad={this.setDuration}    // Callback when video loads
       onProgress={this.setTime}    // Callback every ~250ms with currentTime
       onEnd={this.onEnd}           // Callback when playback finishes
       onError={this.videoError}    // Callback when video cannot be loaded
       style={styles.backgroundVideo} />



## Examples

- Try the included [VideoPlayer example][2] yourself:

   ```sh
   git clone https://github.com/katochsonu/elite.git
   cd elite
   npm install
   open VideoPlayer.xcodeproj

   ```

   Then `Cmd+R` to start the React Packager, build and run the project in the simulator.


## TODOS

- [ ] Add some way to interface with `seekToTime`
- [ ] Add support for captions
- [ ] Support `require('video!...')`
- [ ] Add support for playing multiple videos in a sequence (will interfere with current `repeat` implementation)
- [ ] Callback to get buffering progress for remote videos

---


