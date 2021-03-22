import {useState,useRef,useCallback} from "react";
import useBookSearch from "./useBookSearch";

export default function App() {
  const [page,setPage] = useState(1);
  const [q,setQuery] = useState('');
  const searchText = useRef()
  
  const {loading,error,bookList,hasMore} = useBookSearch(q,page);
  
  const observer = useRef();
  const lastBookElementRef = useCallback(node => {
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setPage(prevPage => prevPage +1);
      }
    })
    if(node){
      observer.current.observe(node);
    }
  },[loading,hasMore]);

  const handleSearch = () => {
    const {value} = searchText.current;
    setQuery(value)
    setPage(1);
  }

  return (
    <>
      <input type="text" ref={searchText} onChange={handleSearch}></input>
      {bookList.map((book,index) => {
        if(bookList.length === index +1){
          return <div ref={lastBookElementRef} key={book}>{book}</div> 
        }else{
          return <div key={book}>{book}</div> 
        }
      })}
      {loading && "Loading"}
      {error && "Error"}
    
    </>
  )
}
