import React from 'react';
import Compare from '../src';
import '../src/styles/Compare.css';

const planetsOriginal = [
    'Vulcan',
    'Qo\'noS',
    'Earth',
    'Bajor',
    'Romulus'
];

const planetsReversed = [
    'Romulus',
    'Bajor',
    'Earth',
    'Qo\'noS',
    'Vulcan'
];

function diffArrays(planetsOriginal: string[], planetsReversed: string[]): { added: string[]; removed: string[]; moved: { item: string; from: number; to: number }[] } {
    const added = planetsReversed.filter(item => !planetsOriginal.includes(item));
    const removed = planetsOriginal.filter(item => !planetsReversed.includes(item));
    const moved: { item: string; from: number; to: number }[] = [];

    planetsOriginal.forEach((item, idx) => {
        const newIdx = planetsReversed.indexOf(item);
        if (newIdx !== -1 && newIdx !== idx) {
            moved.push({ item, from: idx, to: newIdx });
        }
    });

    return { added, removed, moved };
}

const DisorderedArray = () => {
    return (<div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
        <h2>Example 4: Star Trek Planets (Reversed Order)</h2>
        <Compare
            original={planetsOriginal}
            modified={planetsReversed}
        />
    </div>)
};

export default DisorderedArray;