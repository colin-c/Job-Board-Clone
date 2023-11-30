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


// Function to add a job position
async function addJobPosition(title, description, salary, jobBoardLink, jobPostingLink) {
  return await withOracleDB(async (connection) => {
    // Use parameterized query to insert job position into the JobBoard_PositionPay table
    const result = await connection.execute(
      `INSERT INTO JobBoard_PositionPay (JobTitle, Description, Salary, JobBoardLink, JobPostingLink) VALUES (:title, :description, :salary, :jobBoardLink, :jobPostingLink)`,
      [title, description, salary, jobBoardLink, jobPostingLink],
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
    const result = await connection.execute(`SELECT * FROM JOBBOARD_POSITIONPAY`);
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function getTables() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT table_name FROM user_tables`);
    return result.rows.map(row => row[0]);
  }).catch(() => {
    return [];
  });
}


// Add this function to get attributes of a specific table
async function getAttributes(table) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT DISTINCT column_name FROM all_tab_columns WHERE table_name = '${table}'`);

    console.log('Executing query:', result);
    return result.rows.map(row => row[0]);
  }).catch((error) => {
    console.error('Error during attribute fetch:', error);
    return [];
  });
}

async function processProjection(table, attributes) {
  return await withOracleDB(async (connection) => {
    // Constructing the SQL query dynamically
    const sqlQuery = `SELECT ${attributes.join(', ')} FROM ${table}`;
    console.log('Executing SQL Query:', sqlQuery);

    // Executing the SQL query
    const result = await connection.execute(sqlQuery);

    // Returning the result
    return result.rows;
  }).catch(() => {
    return [];
  });
}

// Function to calculate average salary for a given table
async function calculateAverageSalary(table) {
  try {
    console.log('Table:', table);
    // Use the withOracleDB function to handle Oracle Database connection
    return await withOracleDB(async (connection) => {
      // Execute the SQL query to calculate average salary
      const result = await connection.execute(`
        SELECT "JOBTITLE", AVG("SALARY") AS "AverageSalary"
        FROM "${table}"  -- Ensure that the table name is not empty or contains invalid characters
        WHERE "SALARY" IS NOT NULL  -- Add a condition to filter out null values
        GROUP BY "JOBTITLE"
      `);

      console.log("Service", result)
      // Return the query results
      return result.rows;
    });
  } catch (error) {
    // Handle any errors that occur during the query execution
    console.error('Error during aggregation query execution:', error);
    throw error; // Re-throw the error to be caught by the calling function or component
  }
}



module.exports = {
    testOracleConnection,
    signIn,
    signUp,
    addJobPosition,
    getNotes,
    getTables,
    getAttributes,
    processProjection,
    calculateAverageSalary,
};
