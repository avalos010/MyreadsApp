import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import DisplaySearchBooks from './DisplaySearchBooks.js'
import { Route,Link } from 'react-router-dom'


class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  
    currentlyReading: [],
    wantToRead: [],
    read: []

  }
  updateStatus = (book, value) => {

    BooksAPI.update(book, value).then(res => {
      if(value === "currentlyReading") {
      this.setState(state => ({
        currentlyReading: state.currentlyReading.concat(book)
      }))
    }
      else if(value === "read") {
      this.setState(state => ({
        read: state.read.concat(book)
      }))
    }
      else if(value === "wantToRead") {
      this.setState(state => ({
        wantToRead: state.wantToRead.concat(book)
      }))
    }
    })
  }

//   updateStatus = (book,value) => {
//     book.shelf = value
     
//     BooksAPI.update(book,value).then(res =>{
//       this.setState(state => ({
//       value: state.value.concat(book)
//        }))
//     })
// }

componentWillMount() {
  BooksAPI.getAll().then(books => {
    books.map(book => {
      if(book.shelf === "currentlyReading") {
        this.setState({currentlyReading:this.state.currentlyReading.concat(book)})
      }
      else if(book.shelf === "read") {
        this.setState({read:this.state.read.concat(book)})
      }
      else if(book.shelf === "wantToRead") {
        this.setState({wantToRead:this.state.wantToRead.concat(book)})
      }
      return book
    })
  })
}


// changeShelf = (shelf,book) => {
//   console.log(shelf);
//   this.setState(state => ({
//         shelf: state.shelf.filter(b => b.id !== book.id)
//       }))
// }




  render() {

    const {currentlyReading,wantToRead,read} = this.state;
    return (
      <div className="app">
      <Route exact path="/Book-Search" render={() => (
        <DisplaySearchBooks 
        currentlyReading={this.state.currentlyReading}
        read={this.state.read}
        wantToRead={this.state.wantToRead}
        updateStatus={this.updateStatus}
        
        
        />
      )} />
      <Route exact path="/" render={() => (
        
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                     {currentlyReading.map(book => {
                      return <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue="currentlyReading" 
                              onChange={(e) => {
                          this.updateStatus(book,e.target.value)
                          this.setState({currentlyReading: this.state.currentlyReading.filter(b => b.id !== book.id)})
                             }}>
                  
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                     })}
                    </ol>
                  </div>
                </div>

            <div className="list-books-content">
              <div>
               
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                {wantToRead.map(book => {
                      return <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue="wantToRead"
                              onChange={(e) => {
                              this.updateStatus(book,e.target.value)
                              this.setState({wantToRead: this.state.wantToRead.filter(b => b.id !== book.id)})

                              }}>
                              
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                     })}
                      
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {read.map(book => {
                      return <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue="none"
                              onChange={(e) => {
                              this.updateStatus(book,e.target.value)
                              this.setState({read: this.state.read.filter(b => b.id !== book.id)})
                              }}>
                              
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                     })}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/Book-Search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}
export default BooksApp