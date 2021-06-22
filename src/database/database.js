function setCurrentDate(){
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds

  //'2021-08-01 00:00:00'
  let _month = month > 9 ? month : '0' + month
  let _day = date > 9 ? date : '0' + date
  let _min = min > 9 ? min : '0' + min

  let _return = `${year}-${_month}-${_day} ${hours}:${_min}:${sec}`

  //let _return = `${year}-${_month}-06 13:${_min}:${sec}`

  return _return.toString()
}
    

function CreateTableUsers(db) {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
      [],
      function (tx, res) {
        console.log('item table users: ', res.rows.length);
        if (res.rows.length == 0) {
          //txn.executeSql('DROP TABLE IF EXISTS users', []);
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS users 
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              name VARCHAR(50), 
              email VARCHAR(50), 
              password VARCHAR(250),
              login VARCHAR(20)
            )`,
            [],
          );
          console.log('Table created users');
        }
      },
    );
  });
}

function CreateTableRecords(db) {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='records'",
      [],
      function (tx, res) {
        console.log('item table records: ', res.rows.length);
        if (res.rows.length == 0) {
          //txn.executeSql('DROP TABLE IF EXISTS records', []);
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS records 
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              spin VARCHAR(50), 
              fuerza VARCHAR(50), 
              velocidad VARCHAR(50), 
              date VARCHAR(200),
              lap VARCHAR(200)
            )`,
            [],
          );
          console.log('Table created Records ');
        }
      },
    );
  });
}

function InsertQueryUsers(callback, db, name, email, password) {
  let dataUser = {
    id: '',
    name: '',
    pass: '',
    email: '',
    login: '',
  };

  let _return = {
    status: false,
    msg: '',
    user: dataUser,
  };

  try {
    db.transaction(function (txn) {
      txn.executeSql(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        function (tx, res) {
          let user = res.rows.item(0);

          console.log('User registered? : users : ', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              `INSERT INTO users 
                  (
                    name, 
                    email, 
                    password, 
                    login
                  ) 
                VALUES (?, ?, ?, ?)`,
              [name, email, password, 'v'],
            );
            console.log('User registered');
            dataUser.id = 1;
            dataUser.name = name;
            dataUser.pass = password;
            dataUser.email = email;
            dataUser.login = 'v';

            _return.status = true;
            _return.msg = 'Inicio de sesion, actualizado';
            _return.user = dataUser;

            callback(_return);
          } else if (res.rows.length > 0) {
            dataUser.id = user.id;
            dataUser.name = user.name;
            dataUser.pass = user.password;
            dataUser.email = user.email;
            dataUser.login = 'v';

            txn.executeSql(
              `UPDATE users 
                  SET login=?,
                  password=?,
                  email=?
                  WHERE email=?
                `,
              ['v', password, email, email],
              function (tx, res1) {
                console.log('User registered and updated');
                if (res1.rowsAffected > 0) {
                  _return.status = true;
                  _return.msg = 'Inicio de sesion, actualizado';
                  _return.user = dataUser;
                  callback(_return);
                }
              },
            );
          }
        },
      );
    });
  } catch (error) {
    _return.status = false;
    _return.msg = 'Fallo en inicio de sesion';
    _return.user = dataUser;

    callback(_return);
  }
  // single insert query
  /**
   * Si no existe el usuario, se crea
   * Si existe, entonces valida y pone en verdadero la sesion del usuario
   */
}

function InsertQueryRecords(db, spin, fuerza, velocidad) {
  // single insert query
  db.transaction(function (txn) {
    txn.executeSql(
      `INSERT INTO records 
        ( 
          spin, 
          fuerza, 
          velocidad,
          date,
          lap
        ) 
        VALUES (?, ?, ?, ?, ?)`,
      [spin, fuerza, velocidad, setCurrentDate(), ""],
    );
  });
  console.log('Record inserted', setCurrentDate());
}

function UpdateUserLogin(db){
  db.transaction(function (txn) {
    txn.executeSql(
      `UPDATE users SET login=?`,
      ['f'],
    );
  });
  console.log('Sing out user');
}

function SelectRecords(callback, db, start, end) {
  db.transaction(function (txn) {
    txn.executeSql(
      `SELECT * FROM records 
      WHERE 
      date BETWEEN 
      ? AND ?
      ORDER BY date ASC`,
      [start, end],
      function (tx, res) {
        callback(res.rows)
      }
    );
  });
}

export const Database = {
  CreateTableUsers,
  CreateTableRecords,
  InsertQueryUsers,
  InsertQueryRecords,
  UpdateUserLogin,
  SelectRecords
};
