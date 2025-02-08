UPDATE user:q203uz6rggj7yhw9h4w9 CONTENT {
  name: 'Persilee',
  email: 'i@lishaoy.net',
  mobile: '13023476588',
  password: crypto::argon2::generate('123456'),
  roles: ['role:standard', 'role:administrator']
};

UPDATE user:0w5ahc2wkgwe3zcpwcs1 CONTENT {
  name: 'zimu',
  email: 'zimu@lishaoy.net',
  mobile: '13087638297',
  password: crypto::argon2::generate('123456'),
  roles: ['role:standard', 'role:editor']
};

UPDATE user:6ue8i6fx3wf0vbs6kn45 CONTENT {
  name: 'tester001',
  email: 'tester001@lishaoy.net',
  mobile: '13009875367',
  password: crypto::argon2::generate('123456'),
  roles: ['role:standard']
};