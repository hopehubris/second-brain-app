import React from 'react'

interface Document {
  path: string
  name: string
  category: string
  lastModified: string
}

interface SidebarProps {
  documents: Document[]
  selectedDoc: string | null
  onSelectDoc: (path: string) => void
}

export default function Sidebar({ documents, selectedDoc, onSelectDoc }: SidebarProps) {
  const groupedDocs = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = []
    acc[doc.category].push(doc)
    return acc
  }, {} as Record<string, Document[]>)

  return (
    <div className="w-64 border-r border-[var(--border)] bg-[var(--bg-secondary)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)]">
        <h1 className="text-lg font-semibold text-[var(--text-primary)]">Second Brain</h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">Living knowledge base</p>
      </div>

      {/* Document Tree */}
      <div className="flex-1 overflow-y-auto p-3">
        {Object.keys(groupedDocs).sort().map(category => (
          <div key={category} className="mb-4">
            <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2 px-2">
              {category}
            </div>
            {groupedDocs[category].map(doc => (
              <button
                key={doc.path}
                onClick={() => onSelectDoc(doc.path)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedDoc === doc.path
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <div className="font-medium">{doc.name}</div>
                <div className="text-xs opacity-60 mt-0.5">{doc.lastModified}</div>
              </button>
            ))}
          </div>
        ))}
        {documents.length === 0 && (
          <div className="text-center text-[var(--text-secondary)] text-sm mt-8 px-4">
            No documents yet.<br />Start creating as you work!
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-3 border-t border-[var(--border)] text-xs text-[var(--text-secondary)]">
        {documents.length} documents
      </div>
    </div>
  )
}
