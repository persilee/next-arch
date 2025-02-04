-- TABLE: startup
DEFINE FIELD created ON startup VALUE $before OR $value OR time::now();
DEFINE FIELD updated ON startup VALUE time::now();
DEFINE INDEX slugIndex ON startup FIELDS slug UNIQUE;
DEFINE EVENT startupUpdated ON TABLE startup WHEN $event == 'UPDATE' THEN {
  CREATE event CONTENT {
    name: 'startupUpdated',
    created: time::now(),
    target: $after.id,
    data: $after.name
  };
};