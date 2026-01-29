import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import os from 'os'

const BRAIN_DIR = path.join(os.homedir(), 'second-brain')

function scanDocuments(dir: string, category: string = ''): any[] {
  const docs: any[] = []
  
  try {
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        docs.push(...scanDocuments(fullPath, item))
      } else if (item.endsWith('.md')) {
        const relativePath = path.relative(BRAIN_DIR, fullPath)
        docs.push({
          path: relativePath,
          name: item.replace('.md', ''),
          category: category || 'root',
          lastModified: stat.mtime.toISOString().split('T')[0]
        })
      }
    }
  } catch (err) {
    console.error('Error scanning documents:', err)
  }
  
  return docs
}

export async function GET() {
  try {
    const documents = scanDocuments(BRAIN_DIR)
    return NextResponse.json(documents)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to scan documents' }, { status: 500 })
  }
}
