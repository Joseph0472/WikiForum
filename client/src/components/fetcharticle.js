import React , {Component} from 'react'
import $ from 'jquery'

export default class FetchArticle extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    
    //TODO: Optimize the fetching process. Ideally, users can choose specific graph and the content. users should not edit the content.
    render(){
        function fetchArticle(){
            var searchTerm = document.getElementById('inputSearchTerm').value
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
                var dataNum = Object.keys(data.query.pages)[0]
                if(dataNum == -1){
                    $('#articleData').empty()
                    $('#articleData').append(`<h1>Sorry, no such article titiled by: ${data.query.pages[dataNum].title}, please try to search in Wikipedia and paste the article titile here.</h1>`)
                }
                else {
                    $('#articleData').empty()
                    $('#articleData').append(`<h1>${data.query.pages[dataNum].title}</h1>`)
                    $('#articleData').append(data.query.pages[dataNum].extract)
                }
            },
            error: function(xhr, status, err) {
                console.error('article not found');
            }
        });
    }
        return(
            <div>
                <input className="input-field" type="text" placeholder="Enter a search term" id="inputSearchTerm"></input>
                <button className="btn pink lighten-1 z-depth-0" id="fetch" onClick = {() => fetchArticle()}>Fectch from Wikipedia</button>
                <div id="articleData"></div>
            </div>
        )
    }

}