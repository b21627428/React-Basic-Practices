import {useState,useMemo,useEffect} from "react";


function App() {
  const [number,setNumber] = useState(1);
  const [dark,setDark] = useState(false);
  const doubleNumber = useMemo(() => slowFunction(number),[number]);
  const theme = useMemo(() => ({ 
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black"
  }),[dark]);
  useEffect(() => {
    console.log("Theme changed");
  },[theme])


  return (
    <>
      <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))}/>
      <button onClick={e => setDark(prevDark => !prevDark)}>Change Theme</button>
      <div style={theme}>{doubleNumber}</div>
    </>
  );
}

const slowFunction = num => {
  for(let i=0 ; i< 100000000 ; i++);
  return num * 2;
}

export default App;
