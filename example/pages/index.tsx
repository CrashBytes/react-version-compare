// example/pages/index.tsx
import { useState } from 'react';
import VersionCompare from '../../src';
import '../../src/styles/VersionCompare.css';

// Example data
const EXAMPLE_DATA = {
  code: {
    current: {
      id: 'current',
      name: 'Current Version',
      content: `function calculateTotalCost(package, options) {
  let totalCost = package.basePrice;
  
  // Add selected options
  if (options && options.length > 0) {
    options.forEach(option => {
      totalCost += option.price;
    });
  }
  
  // Apply any available discounts
  if (package.discounts) {
    package.discounts.forEach(discount => {
      if (discount.type === 'percentage') {
        totalCost = totalCost * (1 - discount.value / 100);
      } else if (discount.type === 'fixed') {
        totalCost -= discount.value;
      }
    });
  }
  
  // Add taxes
  const taxRate = 0.08; // 8% tax
  const taxes = totalCost * taxRate;
  
  return {
    subtotal: totalCost,
    taxes: taxes,
    total: totalCost + taxes
  };
}`,
      date: new Date()
    },
    previous: [
      {
        id: 'v2',
        name: 'Version 2',
        content: `function calculateTotalCost(package, options) {
  let totalCost = package.basePrice;
  
  // Add selected options
  if (options && options.length > 0) {
    options.forEach(option => {
      totalCost += option.price;
    });
  }
  
  // Apply any available discounts
  if (package.discounts) {
    package.discounts.forEach(discount => {
      if (discount.type === 'percentage') {
        totalCost = totalCost * (1 - discount.value / 100);
      } else if (discount.type === 'fixed') {
        totalCost -= discount.value;
      }
    });
  }
  
  return totalCost;
}`,
        date: new Date(Date.now() - 86400000), // 1 day ago
        changedSections: ['code']
      },
      {
        id: 'v1',
        name: 'Version 1',
        content: `function calculateTotalCost(package, options) {
  let totalCost = package.basePrice;
  
  // Add selected options
  if (options && options.length > 0) {
    options.forEach(option => {
      totalCost += option.price;
    });
  }
  
  return totalCost;
}`,
        date: new Date(Date.now() - 172800000), // 2 days ago
        changedSections: ['code']
      }
    ]
  }
};

export default function ExamplePage() {
  const [viewMode, setViewMode] = useState('side-by-side');
  
  const data = EXAMPLE_DATA.code;
  
  return (
    <div className="container">
      <h1>Version Compare Component</h1>
      
      <p className="description">
        This component allows users to compare different versions of content, similar to GitHub's diff view.
      </p>
      
      <div className="view-mode">
        <span>View mode:</span>
        <div className="toggle">
          <button 
            className={viewMode === 'side-by-side' ? 'active' : ''}
            onClick={() => setViewMode('side-by-side')}
          >
            Side by Side
          </button>
          <button 
            className={viewMode === 'unified' ? 'active' : ''}
            onClick={() => setViewMode('unified')}
          >
            Unified
          </button>
        </div>
      </div>
      
      <div className="component-wrapper">
        <VersionCompare 
          currentVersion={data.current}
          previousVersions={data.previous}
          contentType="code"
          viewMode={viewMode}
          filterVersions={true}
          sectionId="code"
        />
      </div>
      
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        h1 {
          margin-bottom: 10px;
          color: #24292e;
        }
        
        .description {
          color: #586069;
          margin-bottom: 30px;
        }
        
        .view-mode {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .view-mode span {
          margin-right: 10px;
          font-size: 14px;
        }
        
        .toggle {
          display: flex;
          border: 1px solid #e1e4e8;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .toggle button {
          padding: 5px 10px;
          background: none;
          border: none;
          font-size: 12px;
          cursor: pointer;
          background-color: #f6f8fa;
        }
        
        .toggle button.active {
          background-color: #0366d6;
          color: white;
        }
        
        .component-wrapper {
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}