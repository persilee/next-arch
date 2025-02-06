
/*
  定义了 startup 表的字段和索引，以及一个事件。

  - DEFINE FIELD created ON startup VALUE $before OR $value OR time::now();
    定义了 startup 表的 created 字段，值为 $before 或 $value 或当前时间。

  - DEFINE FIELD updated ON startup VALUE time::now();
    定义了 startup 表的 updated 字段，值为当前时间。

  - DEFINE INDEX slugIndex ON startup FIELDS slug UNIQUE;
    定义了 startup 表的 slug 字段的唯一索引。

  - DEFINE EVENT startupUpdated ON TABLE startup WHEN $event == 'CREATE' THEN {
      CREATE startup CONTENT {
        name: 'startupUpdated',
        created: time::now(),
        target: $after.id,
        data: $after.name
      };
    };
    定义了 startup 表的 startupUpdated 事件，当表中有新记录创建时，触发该事件，创建一条新的 startup 记录，记录事件名称、创建时间、目标 ID 和数据。
*/
DEFINE FIELD created ON startup VALUE $before OR $value OR time::now();
DEFINE FIELD updated ON startup VALUE time::now();
DEFINE INDEX slugIndex ON startup FIELDS slug UNIQUE;
DEFINE EVENT startupUpdated ON TABLE startup WHEN $event == 'CREATE' THEN {
  CREATE startup CONTENT {
    name: 'startupUpdated',
    created: time::now(),
    target: $after.id,
    data: $after.name
  };
};

DEFINE INDEX nameIndex ON user FIELDS name UNIQUE;