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
        // Make sure to check
        // users before sign in
        const user = users.find((user) => user.email === email && user.password === password);
        return !!user; // Return true if the user is found, false otherwise
    }).catch(() => {
        return false;
    });
}

// Function to insert into Users
async function signUp(email, password) {
    return await withOracleDB(async (connection) => {
        // 
        // 
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

async function getJobBoard_PositionPay() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`SELECT * FROM JobBoard_PositionPay`);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function addJob(jobTitle, description, salary, jobBoardLink, jobPostingLink) {
    return await withOracleDB(async (connection) => {
        // Use parameterized query to insert job into the JobBoard_PositionPay table
        const result = await connection.execute(
            `INSERT INTO JobBoard_PositionPay (JobTitle, Description, Salary, JobBoardLink, JobPostingLink) VALUES (:jobTitle, :description, :salary, :jobBoardLink, :jobPostingLink)`,
            [jobTitle, description, salary, jobBoardLink, jobPostingLink],
            { autoCommit: true }
        );

        // Check if the insertion was successful
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function deleteJob(jobTitle, jobBoardLink, jobPostingLink) {
    return await withOracleDB(async (connection) => {
        // Use parameterized query to delete job from the JobBoard_PositionPay table
        const result = await connection.execute(
            `DELETE FROM JobBoard_PositionPay WHERE JobTitle = :jobTitle AND JobBoardLink = :jobBoardLink AND JobPostingLink = :jobPostingLink`,
            [jobTitle, jobBoardLink, jobPostingLink],
            { autoCommit: true }
        );

        // Check if the deletion was successful
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateJob(jobTitle, description, salary, jobBoardLink, jobPostingLink) {
    return await withOracleDB(async (connection) => {
        // Use named bind variables in the SQL statement
        const result = await connection.execute(
            `UPDATE JobBoard_PositionPay SET Description = :description, Salary = :salary WHERE JobTitle = :jobTitle AND JobPostingLink = :jobPostingLink`,
            { description, salary, jobTitle, jobPostingLink },
            { autoCommit: true }
        );

        // Check if the update was successful
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
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
        const result = await connection.execute(`
      SELECT COLUMN_NAME
      FROM ALL_TAB_COLUMNS
      WHERE TABLE_NAME = '${table}'
        AND OWNER = 'ORA_COLINC'
    `);

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

// Function to find job positions with an average salary above a certain threshold
async function findJobPositionsAboveSalaryThreshold(minSalaryThreshold) {
  try {
    return await withOracleDB(async (connection) => {
      const result = await connection.execute(`
        SELECT "JOBTITLE", AVG("SALARY") AS "AverageSalary"
        FROM "JOBBOARD_POSITIONPAY"
        GROUP BY "JOBTITLE"
        HAVING AVG("SALARY") > :minSalaryThreshold
      `, [minSalaryThreshold]);

      return result.rows;
    });
  } catch (error) {
    console.error('Error during HAVING salary query execution:', error);
    throw error;
  }
}

// Function to get table
async function getFilteredJobBoardPositionPay(filterConditions) {
    return await withOracleDB(async (connection) => {
        let query = "SELECT * FROM JobBoard_PositionPay";
        const params = [];
        let whereClauses = [];

        // Extract and remove the logical operator from filterConditions
        const logicalOperator = filterConditions.logicalOperator || 'AND';
        delete filterConditions.logicalOperator;

        for (const [key, value] of Object.entries(filterConditions)) {
            whereClauses.push(`${key} = :${key}`);
            params.push(value);
        }

        if (whereClauses.length) {
            query += " WHERE " + whereClauses.join(` ${logicalOperator} `);
        }

        try {
            const result = await connection.execute(query, params);
            return result.rows;
        } catch (err) {
            console.error("Error executing query:", query, "with params:", params, "Error:", err);
            throw err;
        }
    }).catch((err) => {
        console.error("Error fetching filtered JobBoard_PositionPay data:", err);
        return [];
    });
}

// Find the total number of job positions for each company, subject to the
// constraint that the company has at least one job position,
async function findTotalJobPositionsByCompanyWithConstraint(constraint) {
  try {
    return await withOracleDB(async (connection) => {
      const result = await connection.execute(`
        SELECT "COMPANY", COUNT("JOBPOSTINGLINK") AS "TotalJobPositions"
        FROM "JOBBOARD_POSITIONCOMPANY"
        WHERE "COMPANY" IN (
          SELECT DISTINCT "COMPANY"
          FROM "JOBBOARD_POSITIONCOMPANY"
          GROUP BY "COMPANY"
          HAVING COUNT("JOBPOSTINGLINK") >= :constraint
        )
        GROUP BY "COMPANY"
      `, [constraint]);
      console.log('Service:', result.rows);
      return result.rows;
    });
  } catch (error) {
    console.error('Error during nested aggregation query execution:', error);
    throw error;
  }
}

async function getCompaniesAllUsersAppliedTo() {
    return await withOracleDB(async (connection) => {
        const query = `
            SELECT C.CompanyName
            FROM Company C
            WHERE NOT EXISTS (
                SELECT U.Email
                FROM Users U
                WHERE NOT EXISTS (
                    SELECT AUE.UserEmail
                    FROM ApplicationUserEmail AUE
                    INNER JOIN ApplicationJobPostingLink AJPL ON AUE.ApplicationID = AJPL.ApplicationID
                    INNER JOIN JobBoard_Position JP ON AJPL.JobPostingLink = JP.JobPostingLink AND AJPL.JobBoardLink = JP.JobBoardLink
                    INNER JOIN JobBoard JB ON JP.JobBoardLink = JB.JobBoardLink
                    WHERE JB.CompanyName = C.CompanyName AND U.Email = AUE.UserEmail
                )
            )`;

        const result = await connection.execute(query);
        return result.rows;
    }).catch((err) => {
        console.error("Error executing getCompaniesAllUsersAppliedTo:", err);
        throw err;
    });
}

async function getJobPostingsByCompany(companyName) {
    return await withOracleDB(async (connection) => {
        const query = `
            SELECT
                JobBoard_Position.JobPostingLink,
                JobBoard_Position.Deadline,
                JobBoard.Name AS JobBoardName,
                Company.CompanyName,
                Company.Website,
                Company.Email,
                Company.Address,
                Company.PhoneNumber
            FROM
                JobBoard_Position
            JOIN
                JobBoard ON JobBoard_Position.JobBoardLink = JobBoard.JobBoardLink
            JOIN
                Company ON JobBoard.CompanyName = Company.CompanyName
            WHERE
                Company.CompanyName = :companyName`;

        const result = await connection.execute(query, [companyName]);
        return result.rows;
    }).catch((err) => {
        console.error("Error executing fetchJobPostingsByCompany:", err);
        throw err;
    });
};

module.exports = {
    testOracleConnection,
    signIn,
    signUp,
    getJobBoard_PositionPay,
    addJob,
    deleteJob,
    updateJob,
    getFilteredJobBoardPositionPay,
    getJobPostingsByCompany,
    getCompaniesAllUsersAppliedTo,
    getTables,
    getAttributes,
    processProjection,
    calculateAverageSalary,
    findJobPositionsAboveSalaryThreshold,
    findTotalJobPositionsByCompanyWithConstraint,
};
