const builder = require('electron-builder')
const fs = require('fs')

// Clean previous builds
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true })
}

console.log('Building installer and portable versions...')

builder.build({
  targets: builder.Platform.WINDOWS.createTarget('nsis', 'portable'),
  config: {
    win: {
      target: [
        {
          target: 'nsis',
          arch: ['x64']
        },
        {
          target: 'portable',
          arch: ['x64']
        }
      ]
    }
  }
}).then(() => {
  console.log('\n Build complete!')
}).catch(err => {
  console.error('Build failed:', err)
})
