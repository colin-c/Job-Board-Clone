INSERT INTO Users (Email, Name, Pass)
SELECT 'colin@ubc.ca', 'Colin', 'Chen' FROM dual
UNION ALL
SELECT 'steven@ubc.ca', 'Steven', 'Huang' FROM dual
UNION ALL
SELECT 'alex@ubc.ca', 'Alex', 'Wu' FROM dual
UNION ALL
SELECT 'extra1@ubc.ca', 'Extra', '1' FROM dual
UNION ALL
SELECT 'extra2@ubc.ca', 'Extra', '2' FROM dual;
