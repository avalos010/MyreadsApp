import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom';
import './App.css'
class DisplaySearchBooks extends Component {
  

	state = {
		query: '',
		books: [],
}



 inputChange(e) {
  this.setState({query: e.target.value}) 
    BooksAPI.search(this.state.query).then(books => {
       this.setState({books})
     })
  }


 
 results() {
  if(this.state.books !== undefined & this.state.query.length !== 0) {
    return this.state.books.map(result => <li key={result.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{backgroundImage: `url(${result.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                  <select defaultValue="none" 
                  onChange={
                    (e) => {
                    if(e.target.value === "currentlyReading") {
                      this.props.updateStatus(result,"currentlyReading");
                      
                    }
                   else if(e.target.value === "read") {
                       this.props.updateStatus(result,"read");
                      
                    }
                     else if(e.target.value === "wantToRead") {
                       this.props.updateStatus(result,"wantToRead")
                      
                    }
                  }
                  }>
                                <option value="none" disabled >Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead" onSelect={() => console.log(this)}>Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                  </select>
                            </div>
                          </div>
                          <div className="book-title">{result.title}</div>
                          <div className="book-authors">{result.authors}</div>
                        </div>
                      </li>
             )}
  }
 
 
    
 



	render() {

	const { query } = this.state;
	

	return (

		
          <div className="search-books">
          
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" 
                value={query}
                onChange={(e) => this.inputChange(e)}
                placeholder="Search by title or author"
                />
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {this.results()}
              </ol>
            </div>
            
          </div>
        
	);

	}
	


}

export default DisplaySearchBooks
		

	
