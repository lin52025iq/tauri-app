import fs from 'fs/promises'
import path from 'path'

/**
 * 更新版本号
 */
async function updateVersion() {
    const newVersion = process.argv[2]
    if (!newVersion) {
        console.error('Please provide a version number as argument')
        console.error('Usage: node bump-version.js VERSION')
        process.exit(1)
    }

    const OLD_VERSION = (await import('../package.json', { assert: { type: 'json' } })).default.version

    async function updateFile(filename, searchPattern, replacement) {
        try {
            const filePath = path.join(process.cwd(), filename)
            const fileContent = await fs.readFile(filePath, 'utf8')

            const updatedContent = fileContent.replace(searchPattern(OLD_VERSION), replacement(newVersion))

            await fs.writeFile(filePath, updatedContent)
            console.log(`Updated ${filename} version to ${newVersion}`)
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`Warning: ${filename} not found`)
            } else {
                console.error(`Error updating ${filename}:`, error.message)
            }
        }
    }

    await updateFile(
        'package.json',
        oldVer => `"version": "${oldVer}"`,
        newVer => `"version": "${newVer}"`
    )

    await updateFile(
        'src-tauri/tauri.conf.json',
        oldVer => `"version": "${oldVer}"`,
        newVer => `"version": "${newVer}"`
    )

    await updateFile(
        'src-tauri/Cargo.toml',
        oldVer => `version = "${oldVer}"`,
        newVer => `version = "${newVer}"`
    )
}

updateVersion().catch(console.error)
