const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = 'all.txt';
const TARGET_EXTENSIONS = ['.js', '.css', '.html', '.md', '.txt'];
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build'];

function shouldProcessFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return TARGET_EXTENSIONS.includes(ext);
}

function shouldExcludeDir(dirName) {
    return EXCLUDE_DIRS.includes(dirName);
}

function minifyContent(content) {
    return content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join(' ');
}

function collectFiles(dirPath, allFiles = []) {
    try {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                if (!shouldExcludeDir(item)) {
                    collectFiles(fullPath, allFiles);
                }
            } else if (shouldProcessFile(fullPath)) {
                allFiles.push(fullPath);
            }
        }
    } catch (error) {
        console.error(`Error reading ${dirPath}: ${error.message}`);
    }
    
    return allFiles;
}

function writeToOutputFile(files) {
    const outputStream = fs.createWriteStream(OUTPUT_FILE, { encoding: 'utf8' });
    
    files.forEach((filePath) => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const minified = minifyContent(content);
            
            if (minified.length > 0) {
                outputStream.write(`${filePath}\n${minified}\n\n`);
            }
        } catch (error) {
            console.error(`Error reading ${filePath}: ${error.message}`);
        }
    });
    
    outputStream.end();
    console.log(`Done! Created ${OUTPUT_FILE} with ${files.length} files`);
}

function main() {
    const projectRoot = process.cwd();
    const allFiles = collectFiles(projectRoot);
    
    if (allFiles.length === 0) {
        console.log('No files found');
        return;
    }
    
    writeToOutputFile(allFiles);
}

if (require.main === module) {
    main();
}