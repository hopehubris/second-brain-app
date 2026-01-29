'use client'

import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import DocumentViewer from './components/DocumentViewer'

export default function Home() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [documents, setDocuments] = useState<any[]>([])

  useEffect(() => {
    // Fetch documents list
    fetch('/api/documents')
      .then(res => res.json())
      .then(data => setDocuments(data))
      .catch(err => console.error('Failed to fetch documents:', err))
  }, [])

  return (
    <div className="flex h-screen">
      <Sidebar 
        documents={documents} 
        selectedDoc={selectedDoc}
        onSelectDoc={setSelectedDoc}
      />
      <DocumentViewer docPath={selectedDoc} />
    </div>
  )
}
