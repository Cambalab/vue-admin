const getSingle = () => {
  return {
    status: 200,
    statusText: 'OK',
    headers: {
      'content-length': '942',
      'content-type': 'application/json; charset=utf-8',
    },
    data: {
      id: 80,
      title: 'Hog Ma.',
      content: 'Im Gschicht dahoam See Leit des Freibia ewig hera, Hob auffi',
    },
  }
}

export default {
  getSingle,
}
