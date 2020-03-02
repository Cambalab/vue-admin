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

export const createFixture = () => {
  const props = ({ resourceName = 'resource', utils }) => {
    return {
      fields: [
        {
          placeHolder: 'a resource name',
          label: 'resourceName',
          tag: 'TextField',
        },
        {
          placeHolder: 'a fields array',
          label: 'fields',
          tag: 'TextField',
        },
        {
          placeHolder: 'a va object',
          label: 'va',
          tag: 'TextField',
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

export const listFixture = () => {
  const props = ({ resourceName = 'resource', utils }) => {
    return {
      hasShow: true,
      hasCreate: true,
      hasEdit: true,
      fields: [
        {
          placeHolder: 'a resource name',
          label: 'resourceName',
          tag: 'SimpleText',
        },
        {
          placeHolder: 'a fields array',
          label: 'fields',
          tag: 'SimpleText',
        },
        {
          placeHolder: 'a va object',
          label: 'va',
          tag: 'SimpleText',
        },
      ],
      resourceIdName: 'id',
      resourceName,
      title: 'My Resource',
      va: {
        ...utils,
      },
    }
  }
  const state = () => {
    return {
      list: [1, 2, 3],
      entities: {
        '1': {
          id: 1,
          resourceName: 'the name of a resource',
          fields: 'children nodes used in the Show component',
          va: 'an object containing methods',
        },
        '2': {
          id: 2,
          resourceName: 'the name of another resource',
          fields: 'children nodes used in the Create component',
          va: 'an object containing methods',
        },
        '3': {
          id: 3,
          resourceName: 'the name of a resource',
          fields: 'children nodes used in the Edit component',
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
