const routes = [
  {
    method: 'GET',
    path: '/count',
    handler: 'controller.getContentCounts',
    config: {
      policies: [],
    },
  },
];

export default routes;
