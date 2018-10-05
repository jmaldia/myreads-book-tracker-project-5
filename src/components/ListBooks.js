import React from 'react'
import Book from './Book'

const ListBooks = props =>  {
    // This Component loops through the book collection provided by the Search or Display page
    // The data is provided as props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.category}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        props.books.map((book) => {
                            return (
                                <li key={book.id}>
                                    <Book book={book} handleChange={props.handleChange} />
                                </li>
                            )
                        })
                    }
                </ol> 
            </div>   
        </div>            
    )
}
export default ListBooks;