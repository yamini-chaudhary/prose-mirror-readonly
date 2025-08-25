import React, { useEffect, useRef } from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { createReadonlyPlugin } from './prosemirror/plugin'
import { parseMarkdown } from './prosemirror/markdown'
import { baseKeymap } from 'prosemirror-commands'
import { keymap } from 'prosemirror-keymap'
import { history, undo, redo } from 'prosemirror-history'

interface ProseMirrorEditorProps {
  initialMarkdown: string
  readonlyStrings: string[]
}

const ProseMirrorEditor: React.FC<ProseMirrorEditorProps> = ({
  initialMarkdown,
  readonlyStrings
}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)

  useEffect(() => {
    if (!editorRef.current) return

    console.log('Parsing markdown:', initialMarkdown)

    // Parse markdown and create initial document
    const doc = parseMarkdown(initialMarkdown, readonlyStrings)
    console.log('Parsed document:', doc)

    // Create editor state
    const state = EditorState.create({
      doc,
      plugins: [
        history(),
        keymap({
          'Mod-z': undo,
          'Mod-y': redo,
          'Mod-Shift-z': redo,
        }),
        keymap(baseKeymap),
        createReadonlyPlugin(readonlyStrings),
      ]
    })

    // Create editor view
    const view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction(transaction) {
        const newState = view.state.apply(transaction)
        view.updateState(newState)
      }
    })

    viewRef.current = view

    return () => {
      view.destroy()
    }
  }, [initialMarkdown, readonlyStrings])

  return <div ref={editorRef} />
}

export default ProseMirrorEditor