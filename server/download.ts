import { Request, Response } from 'express';
import JSZip from 'jszip';
import * as fs from 'fs';
import * as path from 'path';

export async function downloadAllFiles(req: Request, res: Response) {
  try {
    const zip = new JSZip();
    
    // Define all files to include in flat structure
    const filesToInclude = [
      // Main application files
      'client/src/App.tsx',
      'client/src/main.tsx',
      'client/src/index.css',
      'client/index.html',
      
      // Server files
      'server/index.ts',
      'server/routes.ts',
      'server/storage.ts',
      'server/db.ts',
      'server/seed.ts',
      'server/sendgrid.ts',
      'server/download.ts',
      'server/vite.ts',
      
      // Shared files
      'shared/schema.ts',
      
      // Component files
      'client/src/components/AdminArticleForm.tsx',
      'client/src/components/AdminLocationForm.tsx',
      'client/src/components/ArticleCard.tsx',
      'client/src/components/DayProgressCard.tsx',
      'client/src/components/DownloadButton.tsx',
      'client/src/components/Footer.tsx',
      'client/src/components/LocationCard.tsx',
      'client/src/components/MainCarousel.tsx',
      'client/src/components/Navbar.tsx',
      
      // Page files
      'client/src/pages/About.tsx',
      'client/src/pages/Admin.tsx',
      'client/src/pages/AdminDashboard.tsx',
      'client/src/pages/Alternatives.tsx',
      'client/src/pages/Contact.tsx',
      'client/src/pages/Home.tsx',
      'client/src/pages/Interesting.tsx',
      'client/src/pages/InterestingDetail.tsx',
      'client/src/pages/Locations.tsx',
      'client/src/pages/not-found.tsx',
      
      // Hook files
      'client/src/hooks/useArticles.ts',
      'client/src/hooks/useLocations.ts',
      'client/src/hooks/use-mobile.tsx',
      'client/src/hooks/useScrollToTop.ts',
      'client/src/hooks/use-toast.ts',
      
      // Context files
      'client/src/context/AuthContext.tsx',
      
      // Library files
      'client/src/lib/queryClient.ts',
      'client/src/lib/utils.ts',
      'client/src/lib/animations.css',
      
      // Configuration files
      'package.json',
      'vite.config.ts',
      'tailwind.config.ts',
      'drizzle.config.ts',
      'tsconfig.json',
      'postcss.config.js',
      'theme.json'
    ];
    
    // Add all UI components
    const uiComponents = [
      'accordion.tsx', 'alert-dialog.tsx', 'alert.tsx', 'aspect-ratio.tsx',
      'avatar.tsx', 'badge.tsx', 'breadcrumb.tsx', 'button.tsx', 'calendar.tsx',
      'card.tsx', 'carousel.tsx', 'chart.tsx', 'checkbox.tsx', 'collapsible.tsx',
      'command.tsx', 'context-menu.tsx', 'dialog.tsx', 'drawer.tsx', 'dropdown-menu.tsx',
      'form.tsx', 'hover-card.tsx', 'input-otp.tsx', 'input.tsx', 'label.tsx',
      'menubar.tsx', 'navigation-menu.tsx', 'pagination.tsx', 'popover.tsx',
      'progress.tsx', 'radio-group.tsx', 'resizable.tsx', 'scroll-area.tsx',
      'select.tsx', 'separator.tsx', 'sheet.tsx', 'sidebar.tsx', 'skeleton.tsx',
      'slider.tsx', 'switch.tsx', 'table.tsx', 'tabs.tsx', 'textarea.tsx',
      'toast.tsx', 'toaster.tsx', 'toggle-group.tsx', 'toggle.tsx', 'tooltip.tsx'
    ];
    
    // Add UI components to the list
    uiComponents.forEach(component => {
      filesToInclude.push(`client/src/components/ui/${component}`);
    });
    
    // Add all files to zip with flat structure (no folders)
    filesToInclude.forEach(filePath => {
      const fullPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(fullPath)) {
        const fileData = fs.readFileSync(fullPath);
        const fileName = path.basename(filePath);
        
        // If there are duplicate names, prefix with directory name
        let finalFileName = fileName;
        if (filePath.includes('components/ui/')) {
          finalFileName = `ui-${fileName}`;
        } else if (filePath.includes('components/')) {
          finalFileName = `component-${fileName}`;
        } else if (filePath.includes('pages/')) {
          finalFileName = `page-${fileName}`;
        } else if (filePath.includes('hooks/')) {
          finalFileName = `hook-${fileName}`;
        } else if (filePath.includes('server/')) {
          finalFileName = `server-${fileName}`;
        } else if (filePath.includes('shared/')) {
          finalFileName = `shared-${fileName}`;
        } else if (filePath.includes('context/')) {
          finalFileName = `context-${fileName}`;
        } else if (filePath.includes('lib/')) {
          finalFileName = `lib-${fileName}`;
        }
        
        zip.file(finalFileName, fileData);
      }
    });
    
    // Generate the zip file
    const zipData = await zip.generateAsync({ type: 'nodebuffer' });
    
    // Set headers for file download
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', 'attachment; filename=megahand-website-flat.zip');
    res.set('Content-Length', zipData.length.toString());
    
    // Send the zip file
    res.send(zipData);
  } catch (error) {
    console.error('Error generating zip file:', error);
    res.status(500).send('Error generating download');
  }
}