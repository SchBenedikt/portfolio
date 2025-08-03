
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

type FileSystemNode = {
    type: 'file';
    content: string;
} | {
    type: 'dir';
    children: { [key: string]: FileSystemNode };
};

const ViewPage = ({ params }: { params: { slug: string[] } }) => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedFileSystem = localStorage.getItem('terminalFileSystem');
        if (!savedFileSystem) {
          setIsLoading(false);
          return;
        }

        const fileSystem = JSON.parse(savedFileSystem);
        const path = params.slug;
        
        let current: any = { type: 'dir', children: fileSystem };
        for (const part of path) {
            if (current && current.type === 'dir' && current.children[part]) {
                current = current.children[part];
            } else {
                current = null;
                break;
            }
        }
        
        if (current && current.type === 'file') {
          setContent(current.content);
        }

      } catch (error) {
        console.error('Error loading file from localStorage', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [params.slug]);

  if (isLoading) {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 font-mono">
            <p>Lade Inhalt...</p>
        </div>
    );
  }

  if (content === null) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-mono">
      <pre className="whitespace-pre-wrap">{content}</pre>
    </div>
  );
};

export default ViewPage;
