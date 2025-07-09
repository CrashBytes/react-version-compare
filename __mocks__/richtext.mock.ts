import { BLOCKS, type Document } from '@contentful/rich-text-types';

export const originalRichText: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_1,
      content: [{ nodeType: 'text', value: 'The Fellowship of the Ring', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.HEADING_2,
      content: [{ nodeType: 'text', value: 'The Two Towers', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.HEADING_3,
      content: [{ nodeType: 'text', value: 'The Return of the King', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.HEADING_4,
      content: [{ nodeType: 'text', value: 'The Shire', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.HEADING_5,
      content: [{ nodeType: 'text', value: 'Rivendell', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.HEADING_6,
      content: [{ nodeType: 'text', value: 'Mordor', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'One Ring to rule them all, One Ring to find them.', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'hyperlink' as any,
      content: [{ nodeType: 'text', value: 'The Council of Elrond', marks: [], data: {} }],
      data: { uri: 'https://lotr.fandom.com/wiki/Council_of_Elrond' }
    },
    {
      nodeType: BLOCKS.UL_LIST,
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          content: [{ nodeType: 'text', value: 'Frodo Baggins', marks: [], data: {} }],
          data: {}
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          content: [{ nodeType: 'text', value: 'Samwise Gamgee', marks: [], data: {} }],
          data: {}
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          content: [{ nodeType: 'text', value: 'Legolas Greenleaf', marks: [], data: {} }],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.OL_LIST,
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          content: [{ nodeType: 'text', value: 'Gandalf the Grey', marks: [], data: {} }],
          data: {}
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          content: [{ nodeType: 'text', value: 'Aragorn son of Arathorn', marks: [], data: {} }],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.QUOTE,
      content: [{ nodeType: 'text', value: 'Even the smallest person can change the course of the future.', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.TABLE,
      content: [
        {
          nodeType: BLOCKS.TABLE_ROW,
          content: [
            {
              nodeType: BLOCKS.TABLE_CELL,
              content: [{ nodeType: 'text', value: 'Gimli', marks: [], data: {} }],
              data: {}
            },
            {
              nodeType: BLOCKS.TABLE_CELL,
              content: [{ nodeType: 'text', value: 'Boromir', marks: [], data: {} }],
              data: {}
            }
          ],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'Not all those who wander are lost.', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'All we have to decide is what to do with the time that is given us.', marks: [{ type: 'bold' }], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'You shall not pass!', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'There is some good in this world, and it’s worth fighting for.', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'I am no man!', marks: [], data: {} }],
      data: {}
    }
  ]
};

export const modifiedRichText: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_1,
      content: [{ nodeType: 'text', value: 'The Fellowship of the Ring (Updated)', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.HEADING_2,
      content: [{ nodeType: 'text', value: 'The Two Towers', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.HEADING_3,
      content: [{ nodeType: 'text', value: 'The Return of the King', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.HEADING_4,
      content: [{ nodeType: 'text', value: 'The Shire', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.HEADING_5,
      content: [{ nodeType: 'text', value: 'Rivendell', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.HEADING_6,
      content: [{ nodeType: 'text', value: 'Mordor', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'One Ring to rule them all, One Ring to find them. (Updated)', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'hyperlink' as any,
      content: [{ nodeType: 'text', value: 'The Council of Elrond', marks: [], data: {} }],
      data: { uri: 'https://lotr.fandom.com/wiki/Council_of_Elrond' }
    },
    {
      nodeType: BLOCKS.UL_LIST,
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          content: [{ nodeType: 'text', value: 'Frodo Baggins', marks: [], data: {} }],
          data: {}
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          content: [{ nodeType: 'text', value: 'Samwise Gamgee (Updated)', marks: [], data: {} }],
          data: {}
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          content: [{ nodeType: 'text', value: 'Legolas Greenleaf (Updated)', marks: [], data: {} }],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.OL_LIST,
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          content: [{ nodeType: 'text', value: 'Gandalf the White', marks: [], data: {} }],
          data: {}
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          content: [{ nodeType: 'text', value: 'Aragorn son of Arathorn', marks: [], data: {} }],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.QUOTE,
      content: [{ nodeType: 'text', value: 'Even the smallest person can change the course of the future. (Updated)', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.TABLE,
      content: [
        {
          nodeType: BLOCKS.TABLE_ROW,
          content: [
            {
              nodeType: BLOCKS.TABLE_CELL,
              content: [{ nodeType: 'text', value: 'Gimli', marks: [], data: {} }],
              data: {}
            },
            {
              nodeType: BLOCKS.TABLE_CELL,
              content: [{ nodeType: 'text', value: 'Boromir (Updated)', marks: [], data: {} }],
              data: {}
            }
          ],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'Not all those who wander are lost.', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'All we have to decide is what to do with the time that is given us.', marks: [{ type: 'bold' }], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'You shall not pass!', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'There is some good in this world, and it’s worth fighting for. (Updated)', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [{ nodeType: 'text', value: 'I am no man!', marks: [], data: {} }],
      data: {}
    }
  ]
};