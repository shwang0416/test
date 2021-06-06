import React, {useState, useEffect} from 'react';
import IssueList from './IssueList.js';
import './App.css';


let oneTime = false;
function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const fetchMore = (async () => {
    setPageNumber((pageNumber) => pageNumber+1);
    oneTime = false;
  });

  const onScroll = e => {
    const {
      clientHeight,
      scrollHeight,
      scrollTop,
    } = e.target.scrollingElement;
    if (scrollTop + clientHeight >= scrollHeight && !oneTime) {
      oneTime = true;
      fetchMore();
    }
  }

  useEffect(()=>{
    document.addEventListener("scroll",onScroll);
    const fetchMore = (async () => {
      setPageNumber((pageNumber) => pageNumber+1);
      oneTime = false;
    });
    fetchMore();
  }, []);

  return (
    <div className="App">
    
    {
      pageNumber ? <IssueList pageNumber={pageNumber}/> : 'Loading'
    }
    
    </div>
  );
}

export default App;
