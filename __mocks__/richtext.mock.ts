import { BLOCKS, type Document } from '@contentful/rich-text-types';

export const originalRichText: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'Test this paragraph 1', marks: [], data: {} }
      ],
      data: {}
    },
    {
      nodeType: 'hyperlink',
      content: [
        { nodeType: 'text', value: 'type', marks: [], data: {} }
      ],
      data: { uri: 'https://example.com' }
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'this is paragraph', marks: [], data: {} }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'As you’re deciding what to bring on your trip to Mackinac Island and the beautiful Great Lakes, we have a few suggestions for you.', marks: [{ type: 'bold' }], data: {} }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'hepp', marks: [], data: {} }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'Most of the tour is “smart casual.” Khakis, slacks, polo shirts and cotton tops are all appropriate. However, at the timeless Grand Hotel, an old-fashioned sensibility still defines the atmosphere. Eveningwear is required in all public areas of the hotel after 6:30 p.m. Ladies’ evening wear includes a dress, skirt and blouse, or a pantsuit. Eveningwear for gentlemen includes a suit or sport coat, a necktie and dress slacks—please, no denim.', marks: [], data: {} }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'We recommend dressing in layers. It’s much easier to maintain a level of comfort if you can add or remove a layer at a time. So always bring a light jacket or sweater. Fleece or wool is best. We recommend staying away from cotton sweaters or jackets as they won’t keep', marks: [], data: {} }
      ],
      data: {}
    }
  ]
};

export const modifiedRichText: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'Test this paragraph 1', marks: [], data: {} }
      ],
      data: {}
    },
    {
      nodeType: 'hyperlink',
      content: [
        { nodeType: 'text', value: 'type', marks: [], data: {} }
      ],
      data: { uri: 'https://example.com' }
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'this is paragraph', marks: [], data: {} }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'As you’re deciding what to bring on your trip to Mackinac Island Island and the beautiful beautiful Great Lakes, we have a few suggestions for you.', marks: [{ type: 'bold' }], data: {} }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'hep', marks: [], data: {} }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'trying to trip up the semantic compare', marks: [], data: {} }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'Most of the tour is “smart casual.” Khakis, slacks, polo shirts and cotton tops are all appropriate. However, at the timeless Grand Hotel, an old-fashioned sensibility still defines the atmosphere. Eveningwear is required in all public areas of the hotel after 6:30 p.m. Ladies’ evening wear includes a dress, skirt and blouse, or a pantsuit. Eveningwear for gentlemen includes a suit or sport coat, a necktie and dress slacks—please, no denim.', marks: [], data: {} }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        { nodeType: 'text', value: 'We recommend dressing in layers. It’s much easier to maintain a level of comfort if you can add or remove a layer at a time. So always bring a light jacket or sweater. Fleece or wool is best. We recommend staying away from cotton sweaters or jackets as they won’t keep', marks: [], data: {} }
      ],
      data: {}
    }
  ]
};