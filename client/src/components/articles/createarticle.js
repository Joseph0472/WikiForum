import React from 'react'
import {connect} from 'react-redux'
import {createArticle} from '../../redux/actions/articleactions'
import FetchArticle from '../fetcharticle'
import SelectionHighlighter from 'react-highlight-selection';
// import {TokenAnnotator, TextAnnotator} from 'react-text-annotate'
// import SelectionHighlighter from "react-highlight-selection";


class CreateArticle extends React.Component {
    state = {
        title : '',
        content : '',
        wikiContent: '',
        firstName : localStorage.getItem('firstName'),
        lastName : localStorage.getItem('lastName'),
        htmlContent:''
    }
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.selectionHandler = this.selectionHandler.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    
    handleSubmit = (e) => {
        // e.preventDefault();
        //console.log('the article is(from createarti com): ',this.state)
        //this.props.createArticle(this.state)
        if(e.nativeEvent.submitter.name === "createArticle") {
            alert('A name was submitted: ' + this.state.value);
      } else {
        console.log('another btn clicked.')
      }
      e.preventDefault();
    }

    getWikiContent = (fetchedContent) => {
        this.setState({
            wikiContent: fetchedContent
        })
    }

    handleClick = () => {
        console.log(this.state.wikiContent)
    }

    render() {
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white" id="createarticleform">
                <h5>New Post</h5>
                <div id="wikiContent">
                    <FetchArticle updateContent={(content)=>this.getWikiContent(content)} />
                </div>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={this.handleChange} required/>
                </div>
                <div className="input-field">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" className="materialize-textarea" style={{height: 300}} onChange={this.handleChange} required></textarea>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0" name = 'createArticle' type="submit">Create</button>
                </div>
                </form>
                <button onClick = {this.handleClick}>state</button>
                <button onClick = {this.selectionHandler}>Get the selected text!</button>
            </div>
        );
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        createArticle: (article) => dispatch(createArticle(article))
    }
}

export default connect(null, mapDispatchToProps)(CreateArticle)