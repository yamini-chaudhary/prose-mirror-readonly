import { schema } from './schema'
import { DOMParser } from 'prosemirror-model'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export function parseMarkdown(markdown: string, _readonlyStrings: string[]) {
  // Convert markdown to HTML first
  const html = md.render(markdown)
  
  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  
  // Use ProseMirror's DOMParser to convert HTML to document
  const domParser = DOMParser.fromSchema(schema)
  
  // Parse the content properly
  let doc = domParser.parse(tempDiv, {
    // Tell the parser to preserve whitespace
    preserveWhitespace: true
  })
  
  // The readonly marks will be applied by the plugin
  // We just need to return the parsed document
  
  return doc
}