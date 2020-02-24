export const showFixture = () => {
  const props = ({ resourceName = 'resource', utils }) => {
    return {
      fields: [
        {
          placeHolder: 'a resource name',
          label: 'resourceName',
          type: 'h2',
          tag: 'SimpleText',
        },
        {
          placeHolder: 'a fields array',
          label: 'fields',
          type: 'h3',
          tag: 'SimpleText',
        },
        {
          placeHolder: 'a va object',
          label: 'va',
          type: 'p',
          tag: 'SimpleText',
        },
      ],
      resourceName,
      title: 'My Resource',
      va: {
        ...utils,
      },
    }
  }
  const state = () => {
    return {
      entities: {
        '1': {
          resourceName: 'the name of a resource',
          fields: 'children nodes used in the Show component',
          va: 'an object containing methods',
        },
      },
    }
  }
  return {
    props,
    state,
  }
}
