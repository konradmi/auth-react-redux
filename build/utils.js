const fs = require('fs')
const path = require('path')

const listDependencies = () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'))
  return Object.keys(packageJson.dependencies)
}

module.exports = {
  listDependencies,
}