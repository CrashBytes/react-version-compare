import React from 'react';
import SimpleParagraphExample from '../../examples/SimpleParagraphExample';
import ComplexParagraphExample from '../../examples/ComplexParagraphExample';
import ArrayExample from '../../examples/ArrayExample';
import DisorderedArray from '../../examples/DisorderedArray';
import CaseInsensitiveExample from '../../examples/CaseInsensitiveExample';
import OrderInsensitiveExample from '../../examples/OrderInsensitiveExample';

export default {
  title: 'Examples/All',
};

interface SimpleParagraphArgs {
  original: string;
  modified: string;
  title: string;
  description?: string;
}

export const SimpleParagraph = (args: SimpleParagraphArgs) => <SimpleParagraphExample {...args} />;
SimpleParagraph.args = {
  original: "I am Captain Kirk, Captain of the USS Enterprise.",
  modified: "I am Captain Picard, Captain of the USS Enterprise.",
  title: "Example 1: Kirk vs Picard",
  description: 'Only "Kirk" and "Picard" should be highlighted',
};

interface ComplexParagraphArgs {
  original: string;
  modified: string;
  title: string;
  description?: string;
}

export const ComplexParagraph = (args: ComplexParagraphArgs) => <ComplexParagraphExample {...args} />;
ComplexParagraph.args = {
  original: "I am Captain Kirk, Captain of the USS Enterprise.",
  modified: "I am Commander Benjamin Sisko, Commander of Deep Space 9.",
  title: "Example 2: Kirk vs Sisko",
  description: "Multiple changes highlighted",
};

interface ExampleArgs {
  original: string;
  modified: string;
  title: string;
  description?: string;
}

interface ArrayExampleArgs {
  original: string[];
  modified: string[];
  title: string;
  description?: string;
}

interface CaseInsensitiveArgs extends ArrayExampleArgs {
  caseSensitive: boolean;
}

export const Array = (args: ArrayExampleArgs) => <ArrayExample {...args} />;
Array.args = {
  original: ['USS Enterprise', 'USS Voyager', 'USS Defiant'],
  modified: ['USS Discovery', 'USS Voyager', 'USS Cerritos'],
  title: "Example 3: Starship Array Comparison",
};

interface DisorderedArrayArgs {
  original: string[];
  modified: string[];
  title: string;
  description?: string;
}

export const Disordered = (args: DisorderedArrayArgs) => <DisorderedArray {...args} />;
Disordered.args = {
  original: ['Vulcan', 'Earth', 'Romulus'],
  modified: ['Earth', 'Romulus', 'Vulcan'],
  title: "Example 4: Disordered Array",
  description: "Order matters in this comparison",
};

export const CaseInsensitive = (args: CaseInsensitiveArgs) => <CaseInsensitiveExample {...args} />;
CaseInsensitive.args = {
  original: ['Vulcan', 'Earth', 'Romulus'],
  modified: ['romulus', 'vulcan', 'earth'],
  title: "Example 5: Case Insensitive",
  description: "Multiple changes highlighted",
  caseSensitive: false,
};

interface OrderInsensitiveArgs extends CaseInsensitiveArgs {}

export const OrderInsensitive = (args: OrderInsensitiveArgs) => <OrderInsensitiveExample {...args} />;
OrderInsensitive.args = {
  original: ['Vulcan', 'Earth', 'Romulus'],
  modified: ['romulus', 'vulcan', 'earth'],
  title: "Example 6: Order Insensitive Array",
  description: "Arrays are compared as sets (order does not matter, case-insensitive)",
  caseSensitive: false,
};