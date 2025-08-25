import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

const readonlyPluginKey = new PluginKey('readonly')

export function createReadonlyPlugin(readonlyStrings: string[]) {
  return new Plugin({
    key: readonlyPluginKey,
    
    state: {
      init(config, state) {
        return findAndDecorateReadonlyText(state.doc, readonlyStrings)
      },
      
      apply(tr, decorationSet, oldState, newState) {
        // If document changed, recalculate decorations
        if (tr.docChanged) {
          return findAndDecorateReadonlyText(newState.doc, readonlyStrings)
        }
        // Otherwise just map the existing decorations
        return decorationSet.map(tr.mapping, tr.doc)
      }
    },

    props: {
      decorations(state) {
        return this.getState(state)
      },

      handleClick(view, pos, event) {
        const decorations = readonlyPluginKey.getState(view.state)
        const clickedDecoration = decorations.find(pos, pos + 1)
        
        if (clickedDecoration.length > 0) {
          console.log('Cannot edit readonly text!')
          return true // Prevent default click behavior
        }
        return false
      }
    },

    filterTransaction(transaction, state) {
      // Check if any step in the transaction affects readonly text
      const decorations = readonlyPluginKey.getState(state)
      let blocked = false
      
      transaction.steps.forEach(step => {
        const stepMap = step.getMap()
        stepMap.forEach((oldStart, oldEnd) => {
          // Check if the affected range overlaps with any readonly decorations
          decorations.find(oldStart, oldEnd).forEach(decoration => {
            if (decoration.spec && decoration.spec.readonly) {
              blocked = true
            }
          })
        })
      })

      return !blocked
    }
  })
}

function findAndDecorateReadonlyText(doc: any, readonlyStrings: string[]): DecorationSet {
  const decorations: Decoration[] = []
  
  doc.descendants((node: any, pos: number) => {
    if (node.isText && node.text) {
      const text = node.text
      
      readonlyStrings.forEach(readonlyStr => {
        if (!readonlyStr.trim()) return // Skip empty strings
        
        let searchIndex = 0
        while (searchIndex < text.length) {
          const found = text.toLowerCase().indexOf(readonlyStr.toLowerCase(), searchIndex)
          if (found === -1) break
          
          const from = pos + found
          const to = pos + found + readonlyStr.length
          
          // Create decoration for this readonly text
          const decoration = Decoration.inline(from, to, {
            class: 'readonly-text',
            style: 'background-color: #ffebee; border: 1px solid #e57373; border-radius: 3px; padding: 1px 3px; color: #c62828; font-weight: 500;'
          }, { readonly: true })
          
          decorations.push(decoration)
          searchIndex = found + readonlyStr.length
        }
      })
    }
  })
  
  return DecorationSet.create(doc, decorations)
}