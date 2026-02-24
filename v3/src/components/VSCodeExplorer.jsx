import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronDown, ChevronRight, FileCode, Folder, 
  File, RefreshCw, Copy, X, Github
} from 'lucide-react';

const VSCodeExplorer = ({ onClose }) => {
  const GITHUB_REPO = useMemo(() => ({
    owner: 'gaurishmehra',
    repo: 'gaurish',
    branch: 'main'
  }), []);

  const [explorerData, setExplorerData] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [copySuccess, setCopySuccess] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const sanitizeEntries = useCallback((data) => {
    if (!Array.isArray(data)) return [];
    return data.filter((entry) => (
      entry
      && (entry.type === 'dir' || entry.type === 'file')
      && typeof entry.name === 'string'
      && typeof entry.path === 'string'
    ));
  }, []);

  const fetchRepoContents = useCallback(async (path) => {
    setIsLoading(true);
    setFetchError('');
    try {
      const url = `https://api.github.com/repos/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}/contents/${path}?ref=${GITHUB_REPO.branch}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Failed to load repository contents');
      }
      setExplorerData(sanitizeEntries(data));
    } catch (err) {
      console.error('Failed to fetch:', err);
      setExplorerData([]);
      setFetchError('Unable to load repository contents right now.');
    } finally {
      setIsLoading(false);
    }
  }, [GITHUB_REPO, sanitizeEntries]);

  useEffect(() => {
    fetchRepoContents('');
  }, [fetchRepoContents]);

  const fetchFileContent = useCallback(async (path, name) => {
    if (!path || !name) return;
    setIsLoading(true);
    setFetchError('');
    try {
      const url = `https://api.github.com/repos/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}/contents/${path}?ref=${GITHUB_REPO.branch}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Failed to load file');
      }
      if (data.type === 'file' && typeof data.content === 'string') {
        const content = atob(data.content);
        setFileContent(content);
        setCurrentFile({ name, path, type: getFileType(name) });
      }
    } catch (err) {
      console.error('Failed to fetch file:', err);
      setFetchError('Unable to load this file right now.');
    } finally {
      setIsLoading(false);
    }
  }, [GITHUB_REPO]);

  const toggleFolder = useCallback(async (path) => {
    if (expandedFolders[path]) {
      setExpandedFolders(prev => {
        const updated = { ...prev };
        delete updated[path];
        return updated;
      });
    } else {
      try {
        const url = `https://api.github.com/repos/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}/contents/${path}?ref=${GITHUB_REPO.branch}`;
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.message || 'Failed to load folder');
        }
        setExpandedFolders(prev => ({
          ...prev,
          [path]: sanitizeEntries(data)
        }));
      } catch (err) {
        console.error('Failed to fetch folder:', err);
        setFetchError('Unable to expand this folder right now.');
      }
    }
  }, [expandedFolders, GITHUB_REPO, sanitizeEntries]);

  const getFileType = (filename) => {
    if (typeof filename !== 'string') return 'plaintext';
    const ext = filename.split('.').pop().toLowerCase();
    const types = {
      js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
      css: 'css', html: 'html', json: 'json', md: 'markdown'
    };
    return types[ext] || 'plaintext';
  };

  const getFileIcon = (filename) => {
    if (typeof filename !== 'string') {
      return <File size={14} className="text-gray-400" />;
    }
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
      js: 'text-yellow-400', jsx: 'text-blue-400', ts: 'text-blue-500', tsx: 'text-blue-500',
      css: 'text-pink-400', html: 'text-orange-400', json: 'text-yellow-300'
    };
    return <FileCode size={14} className={icons[ext] || 'text-gray-400'} />;
  };

  const copyToClipboard = useCallback(() => {
    if (!fileContent) return;
    navigator.clipboard.writeText(fileContent);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  }, [fileContent]);

  const sortItems = (a, b) => {
    const aType = a?.type;
    const bType = b?.type;
    if (aType === 'dir' && bType !== 'dir') return -1;
    if (aType !== 'dir' && bType === 'dir') return 1;
    const aName = typeof a?.name === 'string' ? a.name : '';
    const bName = typeof b?.name === 'string' ? b.name : '';
    return aName.localeCompare(bName);
  };

  const ExplorerItem = ({ item, level = 0 }) => {
    if (!item || typeof item.name !== 'string' || typeof item.path !== 'string') {
      return null;
    }

    if (item.type === 'dir') {
      const isExpanded = !!expandedFolders[item.path];
      return (
        <div style={{ marginLeft: `${level * 12}px` }}>
          <div
            className="flex items-center gap-1 py-1 px-2 hover:bg-nebula-deep/30 rounded cursor-pointer text-star-dim hover:text-star-white transition-colors"
            onClick={() => toggleFolder(item.path)}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <Folder size={14} className="text-rose-soft" />
            <span className="text-sm">{item.name}</span>
          </div>
          {isExpanded && expandedFolders[item.path] && (
            <div>
              {[...(expandedFolders[item.path] || [])].sort(sortItems).map((subItem, subIndex) => (
                <ExplorerItem
                  key={subItem.path || `${item.path}-${subItem.name || 'entry'}-${subIndex}`}
                  item={subItem}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    const isSelected = currentFile?.path === item.path;
    return (
      <div
        className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors ${
          isSelected ? 'bg-nebula-deep/50 text-star-white' : 'text-star-dim hover:text-star-white hover:bg-nebula-deep/30'
        }`}
        style={{ marginLeft: `${level * 12}px` }}
        onClick={() => fetchFileContent(item.path, item.name)}
      >
        {getFileIcon(item.name)}
        <span className="text-sm">{item.name}</span>
      </div>
    );
  };

  const lines = fileContent.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-cosmic-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-6xl h-[85vh] glass-card rounded-xl overflow-hidden border border-rose-soft/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-rose-soft/10 bg-cosmic-darker/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-400" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
          </div>
          
          <div className="text-sm font-mono text-star-muted">
            {currentFile ? `${currentFile.name} — ` : ''}{GITHUB_REPO.owner}/{GITHUB_REPO.repo}
          </div>
          
          <div className="flex items-center gap-2">
            {currentFile && (
              <button
                onClick={copyToClipboard}
                className="p-1.5 rounded hover:bg-nebula-deep/50 text-star-muted hover:text-star-white transition-colors"
                title="Copy to clipboard"
              >
                <Copy size={16} className={copySuccess ? 'text-rose-soft' : ''} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-nebula-deep/50 text-star-muted hover:text-star-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(100%-48px)]">
          <div className="w-64 border-r border-rose-soft/10 bg-cosmic-darker/30 overflow-y-auto">
            <div className="p-2 text-xs font-mono text-star-muted uppercase tracking-wider">
              Explorer
            </div>
            <div className="p-2">
              <div className="flex items-center gap-1 py-1 px-2 text-star-white font-medium">
                <ChevronDown size={14} />
                <span className="text-sm uppercase">{GITHUB_REPO.repo}</span>
              </div>
              {isLoading && explorerData.length === 0 ? (
                <div className="flex items-center justify-center p-4">
                  <RefreshCw size={16} className="animate-spin text-rose-soft" />
                </div>
              ) : fetchError && explorerData.length === 0 ? (
                <div className="p-3 text-xs text-star-muted">
                  {fetchError}
                </div>
              ) : (
                [...explorerData].sort(sortItems).map((item, index) => (
                  <ExplorerItem key={item.path || `${item.name || 'entry'}-${index}`} item={item} />
                ))
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden bg-cosmic-black/50">
            {currentFile && (
              <div className="px-4 py-2 border-b border-rose-soft/10 bg-cosmic-darker/30 flex items-center gap-2">
                {getFileIcon(currentFile.name)}
                <span className="text-sm text-star-white">{currentFile.name}</span>
              </div>
            )}
            
            <div className="flex-1 overflow-auto p-4 font-mono text-sm">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <RefreshCw size={24} className="animate-spin text-rose-soft" />
                </div>
              ) : currentFile ? (
                <div className="flex">
                  <div className="pr-4 text-right text-star-muted/50 select-none min-w-[40px]">
                    {lines.map((_, i) => (
                      <div key={i} className="leading-6">{i + 1}</div>
                    ))}
                  </div>
                  <pre className="flex-1 text-star-dim leading-6 whitespace-pre-wrap break-all">
                    {fileContent}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-star-muted">
                  <Github size={48} className="mb-4 opacity-50" />
                  <p>Select a file to view its contents</p>
                  <p className="text-xs mt-1 opacity-50">{GITHUB_REPO.owner}/{GITHUB_REPO.repo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VSCodeExplorer;
