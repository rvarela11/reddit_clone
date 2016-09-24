// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: //'postgres://localhost/reddit_clone',
    {
      host: 'localhost',
      database: 'reddit_clone',
    },
  },

  test: {
    client: 'pg',
    connection: //'postgres//localhost/reddit_clone_test',
    {
      host: 'localhost',
      database: 'test_reddit',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
