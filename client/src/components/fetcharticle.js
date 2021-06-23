import React , {Component} from 'react'
import $ from 'jquery'

export default class FetchArticle extends Component{
    constructor(props){
        super(props)
    }

    handleClick = () => {
        console.log(this.state)
    }

    handleSucess = (fetchedData) => {
        this.props.updateContent(fetchedData)
    }



    fetchArticle(){
        var searchTerm = document.getElementById('inputSearchTerm').value;
        if(searchTerm) {
            var handleSucess = this.handleSucess
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles="+ searchTerm +"&redirects=true",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Content-Type' : 'application/json'
                },
                method: 'GET',
                dataType: 'jsonp',
                data: '',
                success: function(data) {
                    console.log(data);
                    var dataNum = Object.keys(data.query.pages)[0]
                    if(dataNum == -1){
                        alert("Wikipedia page not found, please confirm the key word. Please try to copy and paste the original title.");
                    }
                    else {
                        handleSucess(data.query.pages[dataNum].extract);
                        $('#articleData').empty()
                        // $('#articleData').append(data.query.pages[dataNum].title)
                        $('#articleData').append(data.query.pages[dataNum].extract)
                    }
                },
                error: function(xhr, status, err) {
                    console.error('article not found');
                }
            });
        }

}
    
    //TODO: Optimize the fetching process. Ideally, users can choose specific graph and the content. users should not edit the content.
    render(){
        return(
            <div>
                <input className="input-field" type="text" placeholder="Enter a search term" id="inputSearchTerm" required></input>
                <button className="btn pink lighten-1 z-depth-0" id="fetch" onClick = {() => this.fetchArticle()}>Fectch from Wikipedia</button>
                <div id="articleData"></div>
                <button onClick = {this.handleClick}>state</button>
            </div>
        )
    }

}