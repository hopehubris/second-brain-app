import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import os from 'os'

const BRAIN_DIR = path.join(os.homedir(), 'second-brain')

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const docPath = searchParams.get('path') || ''
    const fullPath = path.join(BRAIN_DIR, docPath)
    
    // Security: ensure path is within BRAIN_DIR
    const resolvedPath = path.resolve(fullPath)
    if (!resolvedPath.startsWith(BRAIN_DIR)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 403 })
    }
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }
    
    const content = fs.readFileSync(fullPath, 'utf-8')
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      }
    })
  } catch (error) {
    console.error('Error reading document:', error)
    return NextResponse.json({ error: 'Failed to read document' }, { status: 500 })
  }
}
