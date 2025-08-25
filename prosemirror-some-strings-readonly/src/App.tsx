import React from 'react'
import './App.css'
import ProseMirrorEditor from './components/ProseMirrorEditor'

const sampleMarkdown = `# Sample Document

This is a sample document with some **readonly strings** that cannot be edited.

## Features

- The word "readonly" should be protected
- The phrase "sample document" should also be readonly
- Normal text can be edited freely
- Try to edit the readonly parts - they won't change!

## Testing

You can try to:
1. Select and delete readonly text
2. Type over readonly text
3. Cut/copy readonly text

The readonly strings are: "readonly", "sample document", "protected content"

This is some protected content that you cannot modify.

## Conclusion

This demonstrates how ProseMirror can handle readonly text segments while keeping the rest editable.
`

const readonlyStrings = [
  'readonly',
  'sample document', 
  'protected content',
  'ProseMirror'
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ProseMirror Readonly Strings Test</h1>
        <p>
          This editor contains readonly text segments highlighted in red.
          Try editing them - they're protected!
        </p>
      </header>
      
      <main>
        <ProseMirrorEditor 
          initialMarkdown={sampleMarkdown}
          readonlyStrings={readonlyStrings}
        />
        
        <div className="info-panel">
          <h3>Readonly Strings:</h3>
          <ul>
            {readonlyStrings.map((str, index) => (
              <li key={index}>"{str}"</li>
            ))}
          </ul>
          <p><strong>Instructions:</strong> Try editing the document above. Notice that the highlighted readonly strings cannot be modified!</p>
        </div>
      </main>
    </div>
  )
}

export default App