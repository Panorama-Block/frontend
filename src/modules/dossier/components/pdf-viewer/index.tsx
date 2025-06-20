'use client'

import { useState, useEffect } from 'react'

import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFViewerProps {
  file: string
}

const PDFViewer = ({ file }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>()
  const [error, setError] = useState<string>()
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector('.pdf-container')
      if (container) {
        setWidth(container.clientWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setError(undefined)
    setNumPages(numPages)
  }

  function onDocumentLoadError(error: Error): void {
    console.error('Error loading PDF:', error)
    setError('Failed to load PDF. Please try again later.')
  }

  return (
    <div className="w-full">
      {error ? (
        <div className="text-red-500 p-4 bg-red-100 rounded-lg">{error}</div>
      ) : (
        <div className="pdf-container w-full">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading="Carregando..."
            className="flex flex-col items-center"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={index + 1}
                pageNumber={index + 1}
                width={width}
                className="mb-4"
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            ))}
          </Document>
        </div>
      )}
    </div>
  )
}

export default PDFViewer
