import { Schema } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'

// Add list nodes to the basic schema nodes
const nodes = addListNodes(basicSchema.spec.nodes, "paragraph")

// Extend the basic schema with our readonly mark and list nodes
export const schema = new Schema({
  nodes,
  marks: basicSchema.spec.marks.addBefore('link', 'readonly', {
    parseDOM: [{ tag: 'span.readonly-text' }],
    toDOM() {
      return ['span', { class: 'readonly-text' }, 0]
    }
  })
})