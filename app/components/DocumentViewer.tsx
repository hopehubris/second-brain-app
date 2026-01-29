'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface DocumentViewerProps {
  docPath: string | null
}

export default function DocumentViewer({ docPath }: DocumentViewerProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!docPath) {
      setContent('')
      return
    }

    setLoading(true)
    fetch(`/api/doc?path=${encodeURIComponent(docPath)}`)
      .then(res => res.text())
      .then(data => {
        setContent(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch document:', err)
        setContent('# Error\n\nFailed to load document.')
        setLoading(false)
      })
  }, [docPath])

  if (!docPath) {
    return (
      <div className="flex-1 flex items-center justify-center text-[var(--text-secondary)]">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>Select a document to view</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {loading ? (
          <div className="text-[var(--text-secondary)]">Loading...</div>
        ) : (
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  )
}
