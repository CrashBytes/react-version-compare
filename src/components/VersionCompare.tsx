import { Change, diffJson, diffLines, diffWords } from 'diff';
import React, { useEffect, useMemo, useState } from 'react';
import '../styles/VersionCompare.css';

// Types
export interface VersionData {
  id: string;
  name?: string;
  content: string | Record<string, any>;
  date?: Date | string;
  changedSections?: string[];
}

export interface VersionCompareProps {
  /**
   * The current version object with content
   */
  currentVersion: VersionData;
  
  /**
   * Array of previous version objects
   */
  previousVersions: VersionData[];
  
  /**
   * Callback when a version is selected
   */
  onVersionSelect?: (versionId: string) => void;
  
  /**
   * Whether to filter versions by changed sections
   */
  filterVersions?: boolean;
  
  /**
   * ID of the section being compared (for filtering)
   */
  sectionId?: string;
  
  /**
   * Type of content: 'text', 'json', 'code', or 'word'
   */
  contentType?: 'text' | 'json' | 'code' | 'word';
  
  /**
   * How to display the diff: 'side-by-side' or 'unified'
   */
  viewMode?: 'side-by-side' | 'unified';
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Whether to show line numbers
   */
  showLineNumbers?: boolean;
  
  /**
   * Whether to enable the view mode toggle
   */
  enableViewModeToggle?: boolean;
}

/**
 * VersionCompare - A component for comparing different versions of content
 */
export const VersionCompare: React.FC<VersionCompareProps> = ({
  currentVersion,
  previousVersions = [],
  onVersionSelect,
  filterVersions = false,
  sectionId,
  contentType = 'text',
  viewMode: initialViewMode = 'side-by-side',
  className = '',
  showLineNumbers = true,
  enableViewModeToggle = true
}) => {
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
  const [diff, setDiff] = useState<Change[]>([]);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>(initialViewMode);
  
  // Filter versions based on whether they have changes in the current section
  const availableVersions = useMemo(() => {
    if (filterVersions && sectionId) {
      return previousVersions.filter(version => 
        version.changedSections?.includes(sectionId));
    }
    return previousVersions;
  }, [previousVersions, filterVersions, sectionId]);

  // Set first available version as default when component mounts
  useEffect(() => {
    if (availableVersions.length && !selectedVersionId) {
      setSelectedVersionId(availableVersions[0].id);
    }
  }, [availableVersions, selectedVersionId]);
  
  // Update viewMode if prop changes
  useEffect(() => {
    setViewMode(initialViewMode);
  }, [initialViewMode]);
  
  // Calculate diff when selected version changes
  useEffect(() => {
    if (!selectedVersionId || !currentVersion) return;
    
    const selectedVersion = availableVersions.find(v => v.id === selectedVersionId);
    if (!selectedVersion) return;
    
    let diffResult: Change[];
    const prevContent = selectedVersion.content;
    const currContent = currentVersion.content;
    
    // Generate diff based on content type
    if (contentType === 'json') {
      try {
        // Parse JSON strings if they're not already objects
        const prevJson = typeof prevContent === 'string' ? JSON.parse(prevContent as string) : prevContent;
        const currJson = typeof currContent === 'string' ? JSON.parse(currContent as string) : currContent;
        
        diffResult = diffJson(prevJson, currJson);
      } catch (error) {
        console.error('JSON parsing error:', error);
        diffResult = diffLines(String(prevContent), String(currContent));
      }
    } else if (contentType === 'word') {
      diffResult = diffWords(String(prevContent), String(currContent));
    } else {
      // Default to line diff for text and code
      diffResult = diffLines(String(prevContent), String(currContent));
    }
    
    setDiff(diffResult);
  }, [selectedVersionId, currentVersion, contentType, availableVersions]);
  
  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const versionId = e.target.value;
    setSelectedVersionId(versionId);
    if (onVersionSelect) {
      onVersionSelect(versionId);
    }
  };
  
  const handleViewModeToggle = (mode: 'side-by-side' | 'unified') => {
    setViewMode(mode);
  };
  
  const selectedVersion = availableVersions.find(v => v.id === selectedVersionId);
  
  if (!currentVersion || availableVersions.length === 0) {
    return <div className="version-compare-empty">No versions available for comparison</div>;
  }
  
  return (
    <div className={`version-compare ${className}`}>
      <div className="version-selector">
        <span className="compare-label">Compare with:</span>
        <select 
          className="version-select"
          value={selectedVersionId || ''}
          onChange={handleVersionChange}
        >
          {availableVersions.map(version => (
            <option key={version.id} value={version.id}>
              {version.name || `Version ${version.id}`} 
              {version.date && ` (${new Date(version.date).toLocaleDateString()})`}
            </option>
          ))}
        </select>
        
        {enableViewModeToggle && (
          <div className="view-mode-toggle">
            <button 
              type="button"
              className={`toggle-btn ${viewMode === 'side-by-side' ? 'active' : ''}`}
              title="Side by side view"
              onClick={() => handleViewModeToggle('side-by-side')}
            >
              Split
            </button>
            <button 
              type="button"
              className={`toggle-btn ${viewMode === 'unified' ? 'active' : ''}`}
              title="Unified view"
              onClick={() => handleViewModeToggle('unified')}
            >
              Unified
            </button>
          </div>
        )}
      </div>
      
      <div className="comparison-container">
        <div className="comparison-header">
          <div className="header-left">
            <span className="version-title">
              {selectedVersion?.name || `Version ${selectedVersionId}`}
              {selectedVersion?.date && ` (${new Date(selectedVersion.date).toLocaleDateString()})`}
            </span>
          </div>
          <div className="header-right">
            <span className="version-title">
              {currentVersion.name || 'Current Version'}
              {currentVersion.date && ` (${new Date(currentVersion.date).toLocaleDateString()})`}
            </span>
          </div>
        </div>
        
        <div className={`comparison-content ${viewMode}`}>
          {viewMode === 'side-by-side' ? (
            <SideBySideDiff diff={diff} contentType={contentType} showLineNumbers={showLineNumbers} />
          ) : (
            <UnifiedDiff diff={diff} contentType={contentType} showLineNumbers={showLineNumbers} />
          )}
        </div>
      </div>
    </div>
  );
};

interface DiffProps {
  diff: Change[];
  contentType: 'text' | 'json' | 'code' | 'word';
  showLineNumbers: boolean;
}

const SideBySideDiff: React.FC<DiffProps> = ({ diff, contentType, showLineNumbers }) => {
  let leftLineNumber = 1;
  let rightLineNumber = 1;
  
  return (
    <div className="side-by-side-container">
      {showLineNumbers && (
        <div className="line-numbers left-numbers">
          {diff.map((part, index) => {
            if (part.added) return null;
            
            return part.value.split('\n').map((line, i, array) => {
              // Don't increment on the last empty line
              if (i === array.length - 1 && line === '') return null;
              return <div key={`${index}-${i}`} className="line-number">{leftLineNumber++}</div>;
            });
          })}
        </div>
      )}
      
      <div className="diff-content left-content">
        {diff.map((part, index) => {
          if (part.added) return null;
          
          const className = part.removed ? 'diff-removed' : '';
          
          return (
            <pre key={index} className={className}>
              {part.value}
            </pre>
          );
        })}
      </div>
      
      {showLineNumbers && (
        <div className="line-numbers right-numbers">
          {diff.map((part, index) => {
            if (part.removed) return null;
            
            return part.value.split('\n').map((line, i, array) => {
              // Don't increment on the last empty line
              if (i === array.length - 1 && line === '') return null;
              return <div key={`${index}-${i}`} className="line-number">{rightLineNumber++}</div>;
            });
          })}
        </div>
      )}
      
      <div className="diff-content right-content">
        {diff.map((part, index) => {
          if (part.removed) return null;
          
          const className = part.added ? 'diff-added' : '';
          
          return (
            <pre key={index} className={className}>
              {part.value}
            </pre>
          );
        })}
      </div>
    </div>
  );
};

const UnifiedDiff: React.FC<DiffProps> = ({ diff, contentType, showLineNumbers }) => {
  let lineNumber = 1;
  
  return (
    <div className="unified-container">
      {showLineNumbers && (
        <div className="line-numbers">
          {diff.map((part, index) => (
            part.value.split('\n').map((line, i, array) => {
              // Don't increment on the last empty line
              if (i === array.length - 1 && line === '') return null;
              return <div key={`${index}-${i}`} className="line-number">{lineNumber++}</div>;
            })
          ))}
        </div>
      )}
      
      <div className="diff-content">
        {diff.map((part, index) => {
          const className = part.added ? 'diff-added' : part.removed ? 'diff-removed' : '';
          
          return (
            <pre key={index} className={className}>
              {part.value}
            </pre>
          );
        })}
      </div>
    </div>
  );
};

export default VersionCompare;