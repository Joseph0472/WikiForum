import React , {Component} from 'react'
import $ from 'jquery'

export default class FetchArticle extends Component{
    state = {
        ifSelected : false
    }
    constructor(props){
        super(props)
        this.selectionHandler = this.selectionHandler.bind(this);
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
                url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles="+ searchTerm +"&redirects=true&ex",
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
    
    selectionHandler(selection) {
        if (window.getSelection) {  // all browsers, except IE before version 9
            var range = window.getSelection();  
            console.log(range.toString());
            this.highlightSelection(range.getRangeAt(0));

        } 
        else {
            if (document.selection.createRange) { // Internet Explorer
                var range = document.selection.createRange();
                alert(range.text);
            }
        }
    }
    

    highlightRange(range) {
            var newNode = document.createElement("div");
            newNode.setAttribute(
               "style",
               "background-color: yellow; display: inline;"
            );
            range.surroundContents(newNode);
            this.setState({
                ifSelected : true
            })
    }

    highlightSelection() {
        var userSelection = window.getSelection().getRangeAt(0);
        var safeRanges = this.getSafeRanges(userSelection);
        for (var i = 0; i < safeRanges.length; i++) {
            this.highlightRange(safeRanges[i]);
        }
    }

    getSafeRanges(dangerous) {
        var a = dangerous.commonAncestorContainer;
        // Starts -- Work inward from the start, selecting the largest safe range
        var s = new Array(0), rs = new Array(0);
        if (dangerous.startContainer != a)
            for(var i = dangerous.startContainer; i != a; i = i.parentNode)
                s.push(i)
        ;
        if (0 < s.length) for(var i = 0; i < s.length; i++) {
            var xs = document.createRange();
            if (i) {
                xs.setStartAfter(s[i-1]);
                xs.setEndAfter(s[i].lastChild);
            }
            else {
                xs.setStart(s[i], dangerous.startOffset);
                xs.setEndAfter(
                    (s[i].nodeType == Node.TEXT_NODE)
                    ? s[i] : s[i].lastChild
                );
            }
            rs.push(xs);
        }
    
        // Ends -- basically the same code reversed
        var e = new Array(0), re = new Array(0);
        if (dangerous.endContainer != a)
            for(var i = dangerous.endContainer; i != a; i = i.parentNode)
                e.push(i)
        ;
        if (0 < e.length) for(var i = 0; i < e.length; i++) {
            var xe = document.createRange();
            if (i) {
                xe.setStartBefore(e[i].firstChild);
                xe.setEndBefore(e[i-1]);
            }
            else {
                xe.setStartBefore(
                    (e[i].nodeType == Node.TEXT_NODE)
                    ? e[i] : e[i].firstChild
                );
                xe.setEnd(e[i], dangerous.endOffset);
            }
            re.unshift(xe);
        }
    
        // Middle -- the uncaptured middle
        if ((0 < s.length) && (0 < e.length)) {
            var xm = document.createRange();
            xm.setStartAfter(s[s.length - 1]);
            xm.setEndBefore(e[e.length - 1]);
        }
        else {
            return [dangerous];
        }
    
        // Concat
        rs.push(xm);
        var response = rs.concat(re);    
    
        // Send to Console
        return response;
    }
    
    //TODO: Optimize the fetching process. Ideally, users can choose specific graph and the content. users should not edit the content.
    render(){
        return(
            <div onMouseUp={this.selectionHandler}>
                <input className="input-field" type="text" placeholder="Enter a search term and annotate!" id="inputSearchTerm" required></input>
                <button className="btn pink lighten-1 z-depth-0" id="fetch" onClick = {() => this.fetchArticle()}>Fectch from Wikipedia</button>
                <div id="articleData"></div>
            </div>
        )
    }

}