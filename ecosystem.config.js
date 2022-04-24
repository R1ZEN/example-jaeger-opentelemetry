module.exports = {
  apps: [
    {
      name: 'service-1',
      script: 'ts-node',
      args: 'services/service-1',
    },
    {
      name: 'service-2',
      script: 'ts-node',
      args: 'services/service-2',
    },
    {
      name: 'service-3',
      script: 'ts-node',
      args: 'services/service-3',
    },
  ],
};
