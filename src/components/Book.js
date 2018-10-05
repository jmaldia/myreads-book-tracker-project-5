import React from 'react'

const Book = props =>  {
    // This Component loops through the book collection provided by the Search or Display page
    // The data is provided as props
    return (
        <div className="book">
            <div className="book-top">
                <div 
                    className="book-cover" 
                    style={{ 
                        width: 128, 
                        height: 193, 
                        backgroundImage: `url(${props.book.imageLinks ? props.book.imageLinks.thumbnail : ''})` 
                    }}
                >
                </div>
                <div className="book-shelf-changer">
                    <select 
                        value={props.book.shelf} 
                        onChange={(event) => props.handleChange(props.book, event.target.value)}
                    >
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors}</div>
        </div>
    )
}
export default Book;