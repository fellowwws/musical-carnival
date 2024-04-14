import { useEffect, useState } from 'react';
import { QRCode } from './components/QRCode';
import Template from './components/Template';
import A from './data/OVER-A.json';
import B from './data/OVER-B.json';

function offset(n = 1, offset = 2) {
  const from = offset * (n - 1);
  const to = from + offset;
  return [from, to]
}

function App() {
  const [state, setState] = useState(A);
  const [lastPage] = useState(state.length / 2);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentTitle, setDocumentTitle]  = useState(''); 

  useEffect(() => {
    const [objectA, objectB] = state.slice(...offset(currentPage));
    setDocumentTitle(`${objectA.label}${objectB.label.slice(-1)}`); // 'OVER-1A-AB'
  }, [currentPage]);

  useEffect(() => {document.title = documentTitle}, [documentTitle]); // <title>{documentTitle}</title>

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleKeyDown(event) {
    switch (event.keyCode) {
      case 37: // keyCode 37 = Left arrow key
          setCurrentPage((prevPage) => {
            if (prevPage === 1) return prevPage;
            return prevPage - 1;
          });
          break;
      case 39: // keyCode 39 = Right arrow key
          setCurrentPage((prevPage) => {
            if (prevPage === lastPage) return prevPage;
            return prevPage + 1;
          });
          break;
    }
  }

  function handleSelectOption(event) {
    if (event.target.value === 'A') {
      setState(A);
    } else {
      setState(B);
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      {state.slice(...offset(currentPage)).map((location, index) => (
      <div key={index} className="p-2 border border-2 rounded mt-5">
        <Template label={location.label}>
          <QRCode data={location.data} />
        </Template>
      </div>
      ))}

      <div className="d-print-none position-fixed top-0 start-0 p-1 my-3 mx-2 w-25">
        <select className="form-select form-select-lg border border-2 shadow-sm" onChange={handleSelectOption}>
          <option disabled>Select cluster...</option>
          <option defaultValue value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>

      <span className="d-print-none font-monospace small position-fixed bottom-0 end-0 bg-white py-2 px-3">
        Page {currentPage} of {state.length / 2}
      </span>
    </div>
  )
}

export default App