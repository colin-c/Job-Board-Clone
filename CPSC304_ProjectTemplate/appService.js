const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
};


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

// TODO
async function signIn(email, password) {
    return await withOracleDB(async (connection) => {
        // Implement your logic to authenticate the user
        // For this example, checking against the in-memory array
        const user = users.find((user) => user.email === email && user.password === password);
        return !!user; // Return true if the user is found, false otherwise
    }).catch(() => {
        return false;
    });
}

// Function to insert into Users
async function signUp(email, password) {
    return await withOracleDB(async (connection) => {
        // Hash the password before saving it to the database (you should use a proper hashing library)
        // For simplicity, this example doesn't include actual password hashing.
        const hashedPassword = password;

        // Use parameterized query to insert user into the USERS table
        const result = await connection.execute(
            `INSERT INTO USERS (EMAIL, PASS) VALUES (:email, :password)`,
            [email, hashedPassword],
            { autoCommit: true }
        );

        // Check if the insertion was successful
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}


// Function to add a note
async function addNote(title, description, userEmail) {
  return await withOracleDB(async (connection) => {
    // Use parameterized query to insert note into the NOTES table
    const result = await connection.execute(
      `INSERT INTO NOTES (TITLE, DESCRIPTION, USEREMAIL) VALUES (:title, :description, :userEmail)`,
      [title, description, userEmail],
      { autoCommit: true }
    );

    // Check if the insertion was successful
    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}


// Function to get table
async function getNotes() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT * FROM NOTES`);
    return result.rows;
  }).catch(() => {
    return [];
  });
}

module.exports = {
    testOracleConnection,
    signIn,
    signUp,
    addNote,
    getNotes,
};
