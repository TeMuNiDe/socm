import React, { Component } from 'react';
import './App.css';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import  Request from 'react-http-request';
import {StoryList,FullStory} from './Story'
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
injectTapEventPlugin();



class DashBoard extends React.Component{
constructor(){
super();
this.state = {
  current:0,
  drawer:false};
  this.handleToggle = this.handleToggle.bind(this);
}

handleClick(i){
  console.log("clicked");
  this.handleToggle();
  this.setState({
  current:i
});
}
handleToggle(){
  this.setState({drawer:!this.state.drawer});
}

  render() {
    var stories = this.props.result;
  return ( <div>
    <Drawer open={this.state.drawer} width="38%" docked={false}>
      <AppBar onTitleTouchTap={this.handleToggle} title="Close" onLeftIconButtonTouchTap={this.handleToggle} iconElementLeft={<IconButton><NavigationClose /></IconButton>}
/>
        <StoryList result={this.props.result} handleClick={(key)=>this.handleClick(key)}></StoryList></Drawer>
    <AppBar title={stories[this.state.current].title.rendered }
 onLeftIconButtonTouchTap={this.handleToggle}/>

    <FullStory story={stories[this.state.current]} ></FullStory>
  </div>);
  }
}

const content = <Request url="http://storiesofcommonman.in/wp-json/wp/v2/posts?_embed"
  method="get"
  accept="application/json"
  verbose="true">
{
  ({error,result,loading})=>{
    if(loading){
      return <CircularProgress className="prime-loader" size={48} thickness={4} color="#64DD17"/>;
    }else {
      return <DashBoard result={JSON.parse(result.text)}/>;
    }
  }
}

</Request>;



class App extends Component {
  render() {
    return <MuiThemeProvider>{content}</MuiThemeProvider> ;


  }
}

export default App;
