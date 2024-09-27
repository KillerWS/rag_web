import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const PdfViewer = ({ pdfSrc }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => Math.max(1, Math.min(prevPageNumber + offset, numPages)));
  }

  return (
    <div>
      <Document file={pdfSrc} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button type="button" disabled={pageNumber <= 1} onClick={() => changePage(-1)}>
        Previous
      </button>
      <button type="button" disabled={pageNumber >= numPages} onClick={() => changePage(1)}>
        Next
      </button>
    </div>
  );
};

export default PdfViewer;