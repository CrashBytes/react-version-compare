import Compare from '../src/components/Compare';

import React from 'react'

const CaseInsensitiveExample = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
            <h2>Example 5: Case Insensitive</h2>
            <p>Multiple changes highlighted</p>
            <Compare
                original={['Vulcan', 'Earth', "Romulus"]}
                modified={["romulus", 'vulcan', 'earth']}
                caseSensitive={false}
            />
        </div>
    )
}

export default CaseInsensitiveExample

