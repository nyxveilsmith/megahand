import { Request, Response } from 'express';
import JSZip from 'jszip';
import * as fs from 'fs';
import * as path from 'path';

export async function downloadAllFiles(req: Request, res: Response) {
  try {
    const zip = new JSZip();
    
    // Function to recursively add files to zip
    const addFilesToZip = (dirPath: string, zipFolder: JSZip) => {
      const files = fs.readdirSync(dirPath);
      
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        
        // Skip unwanted directories and files
        if (file === 'node_modules' || file === '.git' || file === 'megahand-website.zip') continue;
        
        if (stat.isDirectory()) {
          // Create folder in zip
          const newZipFolder = zipFolder.folder(file);
          if (newZipFolder) {
            addFilesToZip(filePath, newZipFolder);
          }
        } else {
          try {
            // Add file to zip with relative path
            const fileData = fs.readFileSync(filePath);
            const relativePath = path.relative('./', filePath);
            zipFolder.file(relativePath, fileData);
          } catch (err) {
            console.error(`Error adding file ${filePath}:`, err);
          }
        }
      }
    };
    
    // Add all files to zip starting from root directory
    addFilesToZip('./', zip);
    
    // Generate the zip file
    const zipData = await zip.generateAsync({ type: 'nodebuffer' });
    
    // Set headers for file download
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', 'attachment; filename=megahand-website.zip');
    res.set('Content-Length', zipData.length.toString());
    
    // Send the zip file
    res.send(zipData);
  } catch (error) {
    console.error('Error generating zip file:', error);
    res.status(500).send('Error generating download');
  }
}