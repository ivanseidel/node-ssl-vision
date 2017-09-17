const fs = require('fs')
const path = require('path')

/*
 * This method will import files from protobuf files recursivelly and include
 * in the output, removing the import statements.
 */
module.exports = function mergeProtoFiles(mainFile, {loaded} = {}) {
  if (!mainFile.startsWith('/'))
    throw new Error('File must be absolute and start with `/`')

  // Parse directory and file name
  let dir = path.dirname(mainFile)
  let name = path.dirname(mainFile)

  // Keep track of imports
  loaded = loaded || {}

  // Keep track of outputLines
  let outputLines = []

  // Check if it's already imported
  if (loaded[mainFile]){
    return ''
  }

  // Save file as imported
  loaded[mainFile] = true

  // Check if file exists
  if (!fs.existsSync(mainFile))
    throw new Error(`Import file does not exists: ${mainFile}`)

  // Read contents of the file and split lines
  let contents = String(fs.readFileSync(mainFile))
  let lines = contents.split('\n')

  // Iterate lines
  for (let line of lines) {
    // Check for `syntax` statement
    if (line.startsWith('syntax'))
      continue

    // Check if it's an import statement
    let importStatement = line.match(/^import "(.*)";$/)
    if (importStatement) {
      let importName = importStatement[1]
      let importPath = path.join(dir, importName)
      outputLines.push(mergeProtoFiles(importPath, {loaded}))
      continue
    }

    outputLines.push(line)
  }
  
  return outputLines.join('\n')
}