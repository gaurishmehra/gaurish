import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ChevronRight, FileCode, Folder, 
  File, Terminal, RefreshCw, AlertCircle, Github, Copy
} from 'lucide-react';

const VSCodeInterface = ({ isOpen, onClose }) => {
  // GitHub repo config - fixed in code
  const GITHUB_REPO = {
    owner: 'gaurishmehra',
    repo: 'gaurish',
    branch: 'main'
  };
  
  const [explorerData, setExplorerData] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [currentPath, setCurrentPath] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const editorRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Use useEffect with a cleanup function to prevent memory leaks
  useEffect(() => {
    if (isOpen) {
      fetchRepoContents('');
    }
    return () => {
      // Cleanup function
      setFileContent('');
      setCurrentFile(null);
    };
  }, [isOpen]);

  // Add keyboard event listeners for cursor movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentFile) return;

      const lines = fileContent.split('\n');
      const maxLine = lines.length;
      const maxColumn = lines[cursorPosition.line - 1]?.length + 1 || 1;

      let newPos = { ...cursorPosition };

      switch (e.key) {
        case 'ArrowUp':
          newPos.line = Math.max(1, cursorPosition.line - 1);
          // Adjust column if the new line is shorter than the current column
          newPos.column = Math.min(cursorPosition.column, lines[newPos.line - 1]?.length + 1 || 1);
          break;
        case 'ArrowDown':
          newPos.line = Math.min(maxLine, cursorPosition.line + 1);
          // Adjust column if the new line is shorter than the current column
          newPos.column = Math.min(cursorPosition.column, lines[newPos.line - 1]?.length + 1 || 1);
          break;
        case 'ArrowLeft':
          if (cursorPosition.column > 1) {
            newPos.column = cursorPosition.column - 1;
          } else if (cursorPosition.line > 1) {
            // Move to the end of the previous line
            newPos.line = cursorPosition.line - 1;
            newPos.column = lines[newPos.line - 1]?.length + 1 || 1;
          }
          break;
        case 'ArrowRight':
          if (cursorPosition.column <= lines[cursorPosition.line - 1]?.length) {
            newPos.column = cursorPosition.column + 1;
          } else if (cursorPosition.line < maxLine) {
            // Move to the beginning of the next line
            newPos.line = cursorPosition.line + 1;
            newPos.column = 1;
          }
          break;
        default:
          return; // Don't update for other keys
      }

      setCursorPosition(newPos);
      e.preventDefault(); // Prevent scrolling
    };

    if (currentFile) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentFile, cursorPosition, fileContent]);

  const fetchRepoContents = useCallback(async (path) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `https://api.github.com/repos/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}/contents/${path}?ref=${GITHUB_REPO.branch}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error fetching repository contents: ${response.status}`);
      }
      
      const data = await response.json();
      setExplorerData(Array.isArray(data) ? data : [data]);
      setCurrentPath(path);
    } catch (err) {
      console.error('Failed to fetch repository contents:', err);
      setError(err.message);
      setExplorerData([]);
    } finally {
      setIsLoading(false);
    }
  }, [GITHUB_REPO]);

  const fetchFileContent = useCallback(async (path) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `https://api.github.com/repos/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}/contents/${path}?ref=${GITHUB_REPO.branch}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error fetching file: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.type !== 'file') {
        throw new Error('Not a file');
      }
      
      // GitHub API returns content as base64 encoded
      const content = atob(data.content);
      setFileContent(content);
      setCurrentFile({
        name: data.name,
        path: data.path,
        type: getFileType(data.name)
      });
      
      // Set cursor position to beginning of file
      setCursorPosition({ line: 1, column: 1 });
    } catch (err) {
      console.error('Failed to fetch file:', err);
      setError(err.message);
      setFileContent('');
    } finally {
      setIsLoading(false);
    }
  }, [GITHUB_REPO]);

  const toggleFolder = useCallback(async (path) => {
    if (expandedFolders[path]) {
      // Close folder
      setExpandedFolders(prev => {
        const updated = {...prev};
        delete updated[path];
        return updated;
      });
    } else {
      // Open folder and fetch contents
      setIsLoading(true);
      try {
        const url = `https://api.github.com/repos/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}/contents/${path}?ref=${GITHUB_REPO.branch}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error fetching folder contents: ${response.status}`);
        }
        
        const data = await response.json();
        setExpandedFolders(prev => ({
          ...prev,
          [path]: Array.isArray(data) ? data : [data]
        }));
      } catch (err) {
        console.error('Failed to fetch folder contents:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [expandedFolders, GITHUB_REPO]);

  const getFileType = useCallback((filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'plaintext';
    }
  }, []);

  const getFileIcon = useCallback((filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'js':
        return <FileCode size={14} className="text-yellow-500" />;
      case 'jsx':
        return <FileCode size={14} className="text-blue-500" />;
      case 'css':
        return <FileCode size={14} className="text-blue-400" />;
      case 'html':
        return <FileCode size={14} className="text-orange-500" />;
      case 'json':
        return <FileCode size={14} className="text-yellow-300" />;
      case 'md':
        return <File size={14} className="text-gray-400" />;
      default:
        return <File size={14} className="text-gray-400" />;
    }
  }, []);

  // Handle click in the editor to move cursor
  const handleEditorClick = useCallback((e) => {
    if (!editorRef.current || !currentFile) return;

    const editor = editorRef.current;
    const rect = editor.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Approximate character width (in pixels)
    const charWidth = 8; 
    const lineHeight = 24; // Line height in pixels
    
    // Calculate line number (1-based)
    const line = Math.floor(y / lineHeight) + 1;
    
    // Calculate column (1-based)
    // Account for line numbers width
    const lineNumbersWidth = 35;
    const column = Math.max(1, Math.floor((x - lineNumbersWidth) / charWidth));
    
    // Make sure we don't exceed file boundaries
    const lines = fileContent.split('\n');
    const maxLine = lines.length;
    let targetLine = Math.min(Math.max(1, line), maxLine);
    let targetColumn = Math.min(Math.max(1, column), (lines[targetLine - 1]?.length || 0) + 1);
    
    setCursorPosition({ line: targetLine, column: targetColumn });
  }, [currentFile, fileContent]);

  // Copy current file to clipboard
  const copyToClipboard = useCallback(() => {
    if (!currentFile || !fileContent) return;
    
    navigator.clipboard.writeText(fileContent).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      (err) => {
        console.error('Failed to copy content: ', err);
        setCopySuccess(false);
      }
    );
  }, [currentFile, fileContent]);

  // Memoize Explorer Item renderer to improve performance
  const ExplorerItem = React.memo(({ item }) => {
    if (item.type === 'dir') {
      const isExpanded = !!expandedFolders[item.path];
      return (
        <div key={item.path} className="ml-4">
          <div 
            className="flex items-center space-x-1 hover:bg-[#2a2d2e] p-1 rounded-sm cursor-pointer"
            onClick={() => toggleFolder(item.path)}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <Folder size={14} className="text-blue-400" />
            <span className="text-sm">{item.name}</span>
          </div>
          
          {isExpanded && expandedFolders[item.path] && (
            <div className="ml-2">
              {expandedFolders[item.path]
                .sort((a, b) => {
                  // Folders first, then files
                  if (a.type === 'dir' && b.type !== 'dir') return -1;
                  if (a.type !== 'dir' && b.type === 'dir') return 1;
                  return a.name.localeCompare(b.name);
                })
                .map(subItem => <ExplorerItem item={subItem} key={subItem.path} />)}
            </div>
          )}
        </div>
      );
    } else {
      const isSelected = currentFile && currentFile.path === item.path;
      return (
        <div 
          key={item.path}
          className={`ml-4 flex items-center space-x-2 hover:bg-[#2a2d2e] p-1 rounded-sm cursor-pointer ${
            isSelected ? 'bg-[#37373d] text-white' : ''
          }`}
          onClick={() => fetchFileContent(item.path)}
        >
          {getFileIcon(item.name)}
          <span className="text-sm">{item.name}</span>
        </div>
      );
    }
  });

  // Memoize file content rendering for better performance
  const CodeEditor = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <RefreshCw size={24} className="animate-spin text-blue-500" />
          <span className="ml-2">Loading...</span>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400">
          <AlertCircle size={32} />
          <p className="mt-2">Error: {error}</p>
        </div>
      );
    }
    
    if (!currentFile) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <Github size={48} />
          <p className="mt-2">Select a file from the explorer</p>
          <p className="text-xs mt-1">Repository: {GITHUB_REPO.owner}/{GITHUB_REPO.repo}</p>
        </div>
      );
    }
    
    // Process file content to add line numbers and cursor
    const lines = fileContent.split('\n');
    return (
      <div 
        className="relative font-mono text-gray-300" 
        onClick={handleEditorClick}
        ref={editorRef}
        tabIndex={0} // Make it focusable for keyboard navigation
      >
        <div className="flex">
          {/* Line numbers */}
          <div className="text-gray-500 pr-4 text-right select-none min-w-[30px]">
            {lines.map((_, i) => (
              <div key={i} className="h-[1.5rem] text-xs">
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Code content with cursor */}
          <div className="flex-1 relative">
            {lines.map((line, i) => (
              <div key={i} className="h-[1.5rem] relative whitespace-pre">
                {line || " "}
                
                {/* Render blinking cursor at the right position */}
                {cursorPosition.line === i + 1 && (
                  <span 
                    className="absolute h-[1.5rem] w-[2px] bg-white animate-pulse" 
                    style={{ 
                      left: `${cursorPosition.column * 0.6}ch`, // Approximate character width
                      animationDuration: '1s',
                      animationTimingFunction: 'steps(1)',
                    }}
                  ></span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, [currentFile, fileContent, isLoading, error, cursorPosition, handleEditorClick, GITHUB_REPO]);

  // If not open, don't render anything
  if (!isOpen) return null;

  // Sort function for explorer items is memoized
  const sortItems = (a, b) => {
    // Folders first, then files
    if (a.type === 'dir' && b.type !== 'dir') return -1;
    if (a.type !== 'dir' && b.type === 'dir') return 1;
    return a.name.localeCompare(b.name);
  };
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[3px]"
      >
        <motion.div 
          className="bg-[#1e1e1e]/70 backdrop-blur-[2px] text-gray-300 w-full max-w-6xl h-[80vh] rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-800"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          {/* VS Code header */}
          <div className="flex justify-between items-center px-4 py-2 bg-[#252526]/70 backdrop-blur-[2px] border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400"
                onClick={onClose}
              ></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-center text-sm font-medium">
              {currentFile 
                ? `${currentFile.name} - ${GITHUB_REPO.owner}/${GITHUB_REPO.repo}` 
                : `${GITHUB_REPO.owner}/${GITHUB_REPO.repo}`}
            </div>
            <div className="relative">
              <button 
                onClick={copyToClipboard} 
                disabled={!currentFile}
                className={`p-1 rounded hover:bg-gray-700 ${!currentFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Copy file to clipboard"
              >
                <Copy size={18} className={copySuccess ? 'text-green-400' : 'text-gray-400'} />
              </button>
              {copySuccess && (
                <span className="absolute -bottom-7 right-0 bg-gray-800 text-green-400 text-xs px-2 py-1 rounded">
                  Copied!
                </span>
              )}
            </div>
          </div>
          
          {/* VS Code body */}
          <div className="flex flex-1 overflow-hidden">
            {/* Explorer sidebar */}
            <div className="w-64 border-r border-gray-800 bg-[#252526]/70 backdrop-blur-[2px] flex flex-col overflow-hidden">
              <div className="p-2 text-gray-500 font-medium uppercase text-xs flex justify-between items-center">
                <span>Explorer</span>
                <RefreshCw 
                  size={14} 
                  className={`cursor-pointer hover:text-white ${isLoading ? 'animate-spin text-blue-400' : ''}`}
                  onClick={() => fetchRepoContents('')}
                />
              </div>
              <div className="overflow-auto flex-1 custom-scrollbar">
                <div className="p-2">
                  <div className="flex items-center space-x-1 hover:bg-[#2a2d2e] p-1 rounded-sm">
                    <ChevronDown size={16} />
                    <span className="text-sm uppercase font-semibold">
                      {GITHUB_REPO.repo}
                    </span>
                  </div>
                  
                  {isLoading && currentPath === '' ? (
                    <div className="flex items-center justify-center p-4">
                      <RefreshCw size={16} className="animate-spin text-blue-400" />
                    </div>
                  ) : (
                    explorerData
                      .sort(sortItems)
                      .map(item => <ExplorerItem item={item} key={item.path} />)
                  )}
                </div>
              </div>
            </div>
            
            {/* Code editor */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {currentFile && (
                <div className="flex border-b border-gray-800 bg-[#252526]/70 backdrop-blur-[2px]">
                  <div className="py-1 px-4 bg-[#1e1e1e]/70 text-sm border-r border-gray-800 flex items-center space-x-2">
                    {getFileIcon(currentFile.name)}
                    <span>{currentFile.name}</span>
                  </div>
                </div>
              )}
              <div className="flex-1 p-4 overflow-auto bg-[#1e1e1e]/70 backdrop-blur-[2px] custom-scrollbar">
                {CodeEditor}
              </div>
              <div className="p-2 bg-[#007acc]/70 backdrop-blur-[2px] text-white text-xs flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Terminal size={14} />
                  <span>READ ONLY MODE - GitHub: {GITHUB_REPO.owner}/{GITHUB_REPO.repo}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Branch: {GITHUB_REPO.branch}</span>
                  {currentFile && (
                    <>
                      <span>• {currentFile.type}</span>
                      <span>• Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Add custom scrollbar styles
const ScrollbarStyles = () => (
  <style jsx global>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #1e1e1e;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #3a3a3a;
      border-radius: 3px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #3a3a3a #1e1e1e;
    }
  `}</style>
);

// Export component with scrollbar styles
export default function VSCodeInterfaceWithStyles(props) {
  return (
    <>
      <ScrollbarStyles />
      <VSCodeInterface {...props} />
    </>
  );
}