import React from 'react';
import  {Card,CardMedia, CardTitle, CardText} from 'material-ui/Card';
import './App.css';

function InnerHTML(props){
return <p dangerouslySetInnerHTML={{__html:props.content}}></p>;


}

class Story extends React.Component{

render() {
  return (
    <div>
    <Card onClick={()=>this.props.onClick()} className="list-item">
<CardMedia ><img src={this.props.feat_image}/></CardMedia>
<CardTitle title={<InnerHTML content={this.props.title}/>}></CardTitle>
<CardText><InnerHTML content={this.props.excerpt}/></CardText>

    </Card>
    </div>
  );
}
}

class StoryList extends React.Component{



render() {
  var stories = this.props.result;
  const storyList  = Object.keys(stories).map((key)=>

  //<p>{stories[key].title.rendered}</p>
  <Story key={key} onClick={()=>this.props.handleClick(key)} feat_image={stories[key]._embedded["wp:featuredmedia"][0].source_url} title={stories[key].title.rendered} excerpt={stories[key].excerpt.rendered} />


  );

  return <div className="story-list">{storyList}</div>;

}

}


class FullStory extends React.Component{
render() {
  var story  = this.props.story;

  var fullStory  =
  <div className="full-story-container">
   <div className="story-content"><InnerHTML content={story.content.rendered}/></div>
</div>
    return fullStory;
}

}

export {Story,StoryList,FullStory};
