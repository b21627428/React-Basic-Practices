import {useEffect,useState} from 'react'
import axios from "axios";

export default function useBookSearch(q,page) {
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [bookList,setBookList] = useState([]);
    const [hasMore,setHasMore] = useState(false);

    useEffect(()=>{
        setBookList([]);
    },[q]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method:'GET',
            url:'http://openlibrary.org/search.json',
            params: {q,page},
            cancelToken : axios.CancelToken(c => cancel = c)
        }).then(response => {
            const {docs} = response.data;
            setBookList(prevBookList => {
                return [...new Set([...prevBookList,...docs.map(book => book.title)])];
            })
            setHasMore(docs.length > 0)
            setLoading(false);
        }).catch(error => {
            if(axios.isCancel(error)) return;
            setError(true);
        })
        return () => cancel();
    },[q,page]);

    return {loading,error,bookList,hasMore};
}
