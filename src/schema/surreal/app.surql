
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

/*
  定义了 user 表的三个唯一索引：
  1. nameIndex：在 user 表的 name 字段上创建的唯一索引。
  2. mobileIndex：在 user 表的 mobile 字段上创建的唯一索引。
  3. emailIndex：在 user 表的 email 字段上创建的唯一索引。
*/
DEFINE INDEX nameIndex ON user FIELDS name UNIQUE;
DEFINE INDEX mobileIndex ON user FIELDS mobile UNIQUE;
DEFINE INDEX emailIndex ON user FIELDS email UNIQUE;

/*
  定义了一个名为 `created` 的字段在 `verification` 表上。
  该字段的值将会是以下三者之一：
  1. `$before` 的值（如果存在）
  2. `$value` 的值（如果存在）
  3. 当前时间（如果前两者都不存在）
*/
DEFINE FIELD created ON verification VALUE $before OR $value OR time::now();

DEFINE INDEX nameIndex ON role FIELDS name UNIQUE;

CREATE role:administrator CONTENT {
  name: 'administrator',
  title: '管理'
};

CREATE role:editor CONTENT {
  name: 'editor',
  title: '编辑'
};

CREATE role:standard CONTENT {
  name: 'standard',
  title: '标准'
};