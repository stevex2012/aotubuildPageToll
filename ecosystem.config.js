module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   * 多个服务，依次放到apps对应的数组里
   */
  apps : [

    // First application
    {
      name      : 'AutoBuild-client',
      script    : './client/server.js',
	  instances  : 4,
	  exec_mode  : "cluster",	  
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // Second application
    {
      name      : 'AutoBuild-server',
      script    : './server/server.js',
      out_file : "./logs/abserver_out.log",
	  error_file : "./logs/abserver_error.log",
	  exec_mode  : "cluster",
	  max_memory_restart: "2048M",
	  max_restarts: "8",
      env: {
        COMMON_VARIABLE: 'true'
      },
	  env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'node',
      host : '10.64.14.107',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '127.0.0.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
