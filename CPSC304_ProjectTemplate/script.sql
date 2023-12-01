DROP TABLE Users CASCADE CONSTRAINTS;
DROP TABLE Notes CASCADE CONSTRAINTS;
DROP TABLE Company CASCADE CONSTRAINTS;
DROP TABLE JobBoard CASCADE CONSTRAINTS;
DROP TABLE JobBoard_Position CASCADE CONSTRAINTS;
DROP TABLE JobBoard_PositionDescription CASCADE CONSTRAINTS;
DROP TABLE JobBoard_PositionStartDate CASCADE CONSTRAINTS;
DROP TABLE JobBoard_PositionTitle CASCADE CONSTRAINTS;
DROP TABLE JobBoard_PositionCompany CASCADE CONSTRAINTS;
DROP TABLE JobBoard_PositionPay CASCADE CONSTRAINTS;
DROP TABLE JobBoard_PositionBegins CASCADE CONSTRAINTS;
DROP TABLE ApplicationStatusLink CASCADE CONSTRAINTS;
DROP TABLE ApplicationStatus CASCADE CONSTRAINTS;
DROP TABLE ApplicationJobPostingLink CASCADE CONSTRAINTS;
DROP TABLE ApplicationUserEmail CASCADE CONSTRAINTS;
-- DROP TABLE ApplicationActionItem CASCADE CONSTRAINTS;
DROP TABLE AppliesTo CASCADE CONSTRAINTS;
DROP TABLE Documents CASCADE CONSTRAINTS;
DROP TABLE Interview CASCADE CONSTRAINTS;
DROP TABLE Interviewer CASCADE CONSTRAINTS;
DROP TABLE PostInterviewQuestion CASCADE CONSTRAINTS;
DROP TABLE OnlineAssessment CASCADE CONSTRAINTS;
DROP TABLE InPersonInterview CASCADE CONSTRAINTS;
DROP TABLE VirtualInterview CASCADE CONSTRAINTS;




CREATE TABLE Users (
  Email VARCHAR(100),
  Name VARCHAR(100),
  Pass VARCHAR(100),
  PRIMARY KEY (Email)
);
CREATE TABLE Notes (
  NoteID INT,
  Title VARCHAR(2000),
  Description VARCHAR(2000),
  UserEmail VARCHAR(100) NOT NULL,
  PRIMARY KEY (NoteID),
  FOREIGN KEY (UserEmail) REFERENCES Users(Email) ON DELETE CASCADE
);

CREATE TABLE Company (
  CompanyName VARCHAR(50),
  Website VARCHAR(2000),
  Email VARCHAR(50),
  Address VARCHAR(50),
  PhoneNumber VARCHAR(50),
  PRIMARY KEY (CompanyName)
);
CREATE TABLE JobBoard (
  JobBoardLink VARCHAR(2000),
  Name VARCHAR(50),
  CompanyName VARCHAR(50) NOT NULL,
  PRIMARY KEY (JobBoardLink),
  FOREIGN KEY (CompanyName) REFERENCES Company(CompanyName) ON DELETE CASCADE
);
CREATE TABLE JobBoard_Position (
  JobBoardLink VARCHAR(2000),
  JobPostingLink VARCHAR(2000),
  Deadline CHAR(15),
  PRIMARY KEY (JobBoardLink, JobPostingLink),
  FOREIGN KEY (JobBoardLink) REFERENCES JobBoard(JobBoardLink) ON DELETE CASCADE
);
CREATE TABLE JobBoard_PositionDescription (
  JobBoardLink VARCHAR(2000),
  JobPostingLink VARCHAR(2000),
  Description VARCHAR(2000),
  PRIMARY KEY (JobBoardLink, JobPostingLink),
  FOREIGN KEY (JobBoardLink) REFERENCES JobBoard(JobBoardLink) ON DELETE CASCADE
);
CREATE TABLE JobBoard_PositionStartDate (
  JobBoardLink VARCHAR(2000),
  JobPostingLink VARCHAR(2000),
  StartDate CHAR(15),
  PRIMARY KEY (JobBoardLink, JobPostingLink),
  FOREIGN KEY (JobBoardLink) REFERENCES JobBoard(JobBoardLink) ON DELETE CASCADE
);
CREATE TABLE JobBoard_PositionTitle (
  JobBoardLink VARCHAR(2000),
  JobPostingLink VARCHAR(2000),
  JobTitle VARCHAR(2000),
  PRIMARY KEY (JobBoardLink, JobPostingLink),
  FOREIGN KEY (JobBoardLink) REFERENCES JobBoard(JobBoardLink) ON DELETE CASCADE
);
CREATE TABLE JobBoard_PositionCompany (
  JobBoardLink VARCHAR(2000),
  JobPostingLink VARCHAR(2000),
  Company VARCHAR(2000),
  PRIMARY KEY (JobBoardLink, JobPostingLink),
  FOREIGN KEY (JobBoardLink) REFERENCES JobBoard(JobBoardLink) ON DELETE CASCADE
);

CREATE TABLE JobBoard_PositionPay (
  JobTitle VARCHAR(50),
  Description VARCHAR(2000),
  Salary INT CHECK (Salary > 0),
  JobBoardLink VARCHAR(2000),
  JobPostingLink VARCHAR(2000),
  PRIMARY KEY (JobTitle, JobPostingLink),
  FOREIGN KEY (JobPostingLink, JobBoardLink) REFERENCES JobBoard_Position(JobPostingLink, JobBoardLink) ON DELETE CASCADE
);
CREATE TABLE JobBoard_PositionBegins (
 JobStartDate CHAR(10),
 WorkTerm CHAR(10),
PRIMARY KEY (JobStartDate)
);
CREATE TABLE ApplicationStatusLink (
  ApplicationID INT,
  AppStatusLink VARCHAR(2000),
  PRIMARY KEY (ApplicationID)
);
CREATE TABLE ApplicationStatus (
  ApplicationID INT,
  AppStatus VARCHAR(20),
  PRIMARY KEY (ApplicationID)
);
CREATE TABLE ApplicationJobPostingLink (
  ApplicationID INT,
  JobPostingLink VARCHAR(2000),
  JobBoardLink VARCHAR(2000),
  PRIMARY KEY (ApplicationID),
  FOREIGN KEY (JobPostingLink, JobBoardLink) REFERENCES JobBoard_Position(JobPostingLink, JobBoardLink) ON DELETE CASCADE
);
CREATE TABLE ApplicationUserEmail (
  ApplicationID INT,
  UserEmail VARCHAR(100) NOT NULL,
  PRIMARY KEY (ApplicationID),
  FOREIGN KEY (UserEmail) REFERENCES Users(Email) ON DELETE CASCADE
);
-- CREATE TABLE ApplicationActionItem (
--   AppStatus VARCHAR(20),
--   ActionItem VARCHAR(2000),
--   PRIMARY KEY (AppStatus)
-- );
CREATE TABLE AppliesTo (
  ApplicationID INT,
  JobPostingLink VARCHAR(2000),
  JobBoardLink VARCHAR(2000),
  PRIMARY KEY (ApplicationID, JobPostingLink, JobBoardLink),
  FOREIGN KEY (ApplicationID) REFERENCES ApplicationStatus(ApplicationID) ON DELETE CASCADE,
  FOREIGN KEY (JobBoardLink, JobPostingLink) REFERENCES JobBoard_Position(JobBoardLink, JobPostingLink) ON DELETE CASCADE
);
CREATE TABLE Documents (
  Title VARCHAR(50),
  CoverLetter VARCHAR(2000),
  ResumeLetter VARCHAR(2000),
  Transcript VARCHAR(2000),
  ApplicationID INT NOT NULL,
  PRIMARY KEY (Title),
  FOREIGN KEY (ApplicationID) REFERENCES ApplicationStatus(ApplicationID) ON DELETE CASCADE
);
CREATE TABLE Interview (
  InterviewID INT,
  ApplicationID INT NOT NULL,
  StartTime CHAR(5),
  InterviewDate CHAR(10),
  PRIMARY KEY (InterviewID),
  FOREIGN KEY (ApplicationID) REFERENCES ApplicationStatus(ApplicationID) ON DELETE CASCADE
);
CREATE TABLE Interviewer (
  Email VARCHAR(50),
  Name VARCHAR(50),
  InterviewID INT NOT NULL,
  PRIMARY KEY (Email),
  FOREIGN KEY (InterviewID) REFERENCES Interview(InterviewID) ON DELETE CASCADE
);
CREATE TABLE PostInterviewQuestion (
  ApplicationID INT,
  ContactInformation VARCHAR(200),
  NoteID INT,
  InterviewID INT,
  PRIMARY KEY (ApplicationID),
  FOREIGN KEY (ApplicationID) REFERENCES ApplicationStatus(ApplicationID) ON DELETE CASCADE,
  FOREIGN KEY (NoteID) REFERENCES Notes(NoteID) ON DELETE CASCADE,
  FOREIGN KEY (InterviewID) REFERENCES Interview(InterviewID) ON DELETE CASCADE
);
CREATE TABLE OnlineAssessment (
  InterviewID INT,
  AssessmentType VARCHAR(50),
  Link VARCHAR(2000),
  PRIMARY KEY (InterviewID),
  FOREIGN KEY (InterviewID) REFERENCES Interview(InterviewID) ON DELETE CASCADE
);
CREATE TABLE InPersonInterview (
  InterviewID INT,
  Questions VARCHAR(2000),
  PRIMARY KEY (InterviewID),
  FOREIGN KEY (InterviewID) REFERENCES Interview(InterviewID) ON DELETE CASCADE
);
CREATE TABLE VirtualInterview (
  InterviewID INT,
  Link VARCHAR(2000),
  PRIMARY KEY (InterviewID),
  FOREIGN KEY (InterviewID) REFERENCES Interview(InterviewID) ON DELETE CASCADE
);

-----------------------
INSERT INTO Users (Email, Name, Pass)
SELECT 'colin@ubc.ca', 'Colin', 'Chen' FROM dual
UNION ALL
SELECT 'steven@ubc.ca', 'Steven', 'Huang' FROM dual
UNION ALL
SELECT 'alex@ubc.ca', 'Alex', 'Wu' FROM dual
UNION ALL
SELECT 'nathan@ubc.ca', 'Nathan', 'Lee' FROM dual
UNION ALL
SELECT 'kevin@ubc.ca', 'Kevin', 'Hu' FROM dual;

INSERT INTO Notes (NoteID, Title, Description, UserEmail)
SELECT 1, 'Todo List', 'Apply to Jobs, Prepare for Interview, Leetcode More', 'colin@ubc.ca' FROM dual
UNION ALL
SELECT 2, 'Homework', 'CPSC 304 Milestone 2 Project', 'steven@ubc.ca' FROM dual
UNION ALL
SELECT 3, 'Interviews', 'Oct 24th 2:00PM Amazon, Oct 30th 3:00PM Meta', 'alex@ubc.ca' FROM dual
UNION ALL
SELECT 4, 'Leetcode Practice', 'Fizzbuzz, Valid Parentheses', 'nathan@ubc.ca' FROM dual
UNION ALL
SELECT 5, 'Coffee Chat', 'Oct 30th Nathan Lee', 'kevin@ubc.ca' FROM dual;

INSERT INTO Company (CompanyName, Website, Address, Email, PhoneNumber)
SELECT 'Google', 'https://www.google.com', '5435 Robson St', 'googleemail@gmail.com', '778-111-1111' FROM dual
UNION ALL
SELECT 'Meta', 'https://www.meta.com', '2963 Kerr Ave', 'metaemail@gmail.com', '778-222-2222' FROM dual
UNION ALL
SELECT 'Apple', 'https://www.apple.com', '1014 Shelby Dr', 'appleemail@gmail.com', '778-333-3333' FROM dual
UNION ALL
SELECT 'Netflix', 'https://www.netflix.com', '3285 Silicon St', 'netflixemail@gmail.com', '778-444-4444' FROM dual
UNION ALL
SELECT 'Microsoft', 'https://www.microsoft.com', '5009 Hornby Ave', 'microsoftemail@gmail.com', '778-555-5555' FROM dual;

INSERT INTO JobBoard (JobBoardLink, Name, CompanyName)
SELECT 'https://www.apple.com', 'Apple', 'Apple' FROM dual
UNION ALL
SELECT 'https://www.meta.com', 'Meta', 'Meta' FROM dual
UNION ALL
SELECT 'https://www.microsoft.com', 'Microsoft', 'Microsoft' FROM dual
UNION ALL
SELECT 'https://www.netflix.com', 'Netflix', 'Netflix' FROM dual
UNION ALL
SELECT 'https://www.google.com', 'Google', 'Google' FROM dual;

INSERT INTO JobBoard_Position (JobBoardLink, JobPostingLink, Deadline)
SELECT 'https://www.apple.com', 'https://www.appledev.com', '2023/12/01' FROM dual
UNION ALL
SELECT 'https://www.meta.com', 'https://www.metadev.com', '2023/12/02' FROM dual
UNION ALL
SELECT 'https://www.microsoft.com', 'https://www.microsoftdev.com', '2023/12/03' FROM dual
UNION ALL
SELECT 'https://www.netflix.com', 'https://www.netflixdev.com', '2023/12/04' FROM dual
UNION ALL
SELECT 'https://www.google.com', 'https://www.googledev.com', '2023/12/05' FROM dual;

INSERT INTO JobBoard_PositionDescription (JobBoardLink, JobPostingLink, Description)
SELECT 'https://www.apple.com', 'https://www.appledev.com', 'something to do 1' FROM dual
UNION ALL
SELECT 'https://www.meta.com', 'https://www.metadev.com', 'something to do 1' FROM dual
UNION ALL
SELECT 'https://www.microsoft.com', 'https://www.microsoftdev.com', 'something to do 1' FROM dual
UNION ALL
SELECT 'https://www.netflix.com', 'https://www.netflixdev.com', 'something to do 1' FROM dual
UNION ALL
SELECT 'https://www.google.com', 'https://www.googledev.com', 'something to do 1' FROM dual;

INSERT INTO JobBoard_PositionStartDate (JobBoardLink, JobPostingLink, StartDate)
SELECT 'https://www.apple.com', 'https://www.appledev.com', '2023/12/01' FROM dual
UNION ALL
SELECT 'https://www.meta.com', 'https://www.metadev.com', '2023/12/02' FROM dual
UNION ALL
SELECT 'https://www.microsoft.com', 'https://www.microsoftdev.com', '2023/12/03' FROM dual
UNION ALL
SELECT 'https://www.netflix.com', 'https://www.netflixdev.com', '2023/12/04' FROM dual
UNION ALL
SELECT 'https://www.google.com', 'https://www.googledev.com', '2023/12/05' FROM dual;

INSERT INTO JobBoard_PositionTitle (JobBoardLink, JobPostingLink, JobTitle)
SELECT 'https://www.apple.com', 'https://www.appledev.com', 'Software Eng' FROM dual
UNION ALL
SELECT 'https://www.meta.com', 'https://www.metadev.com', 'Data Analytic' FROM dual
UNION ALL
SELECT 'https://www.microsoft.com', 'https://www.microsoftdev.com', 'Full Stack' FROM dual
UNION ALL
SELECT 'https://www.netflix.com', 'https://www.netflixdev.com', 'Front End' FROM dual
UNION ALL
SELECT 'https://www.google.com', 'https://www.googledev.com', 'Back End' FROM dual;

INSERT INTO JobBoard_PositionCompany (JobBoardLink, JobPostingLink, Company)
SELECT 'https://www.apple.com', 'https://www.appledev.com', 'Apple Inc' FROM dual
UNION ALL
SELECT 'https://www.meta.com', 'https://www.metadev.com', 'Meta Inc' FROM dual
UNION ALL
SELECT 'https://www.microsoft.com', 'https://www.microsoftdev.com', 'Microsoft Inc' FROM dual
UNION ALL
SELECT 'https://www.netflix.com', 'https://www.netflixdev.com', 'Netflix Inc' FROM dual
UNION ALL
SELECT 'https://www.google.com', 'https://www.googledev.com', 'Google Inc' FROM dual;


INSERT INTO JobBoard_PositionPay (JobTitle, Description, Salary, JobBoardLink, JobPostingLink)
SELECT 'SWE1', 'Level 1', 100000, 'https://www.apple.com', 'https://www.appledev.com' FROM dual
UNION ALL
SELECT 'SWE2', 'Level 2', 200000, 'https://www.meta.com', 'https://www.metadev.com' FROM dual
UNION ALL
SELECT 'SWE3', 'Level 3', 300000, 'https://www.microsoft.com', 'https://www.microsoftdev.com' FROM dual
UNION ALL
SELECT 'SWE4', 'Level 4', 400000, 'https://www.netflix.com', 'https://www.netflixdev.com' FROM dual
UNION ALL
SELECT 'SWE5', 'Level 5', 500000, 'https://www.google.com', 'https://www.googledev.com' FROM dual;

INSERT INTO JobBoard_PositionBegins (JobStartDate, WorkTerm)
SELECT '2023/11/01', 'Winter2024' FROM dual
UNION ALL
SELECT '2023/11/02', 'Winter2024' FROM dual
UNION ALL
SELECT '2023/11/03', 'Winter2024' FROM dual
UNION ALL
SELECT '2023/11/04', 'Winter2024' FROM dual
UNION ALL
SELECT '2023/11/05', 'Winter2024' FROM dual;

INSERT INTO ApplicationStatusLink (ApplicationID, AppStatusLink)
SELECT 1, 'https://www.appstatuslink1.com' FROM dual
UNION ALL
SELECT 2, 'https://www.appstatuslink2.com' FROM dual
UNION ALL
SELECT 3, 'https://www.appstatuslink3.com' FROM dual
UNION ALL
SELECT 4, 'https://www.appstatuslink4.com' FROM dual
UNION ALL
SELECT 5, 'https://www.appstatuslink5.com' FROM dual;

INSERT INTO ApplicationStatus (ApplicationID, AppStatus)
SELECT 1, 'Applied' FROM dual
UNION ALL
SELECT 2, 'Not Applied' FROM dual
UNION ALL
SELECT 3, 'Interview' FROM dual
UNION ALL
SELECT 4, 'Waiting for Response' FROM dual
UNION ALL
SELECT 5, 'Applied' FROM dual;

INSERT INTO ApplicationJobPostingLink (ApplicationID, JobPostingLink, JobBoardLink)
SELECT 1, 'https://www.appledev.com', 'https://www.apple.com' FROM dual
UNION ALL
SELECT 2, 'https://www.metadev.com', 'https://www.meta.com' FROM dual
UNION ALL
SELECT 3, 'https://www.microsoftdev.com', 'https://www.microsoft.com' FROM dual
UNION ALL
SELECT 4, 'https://www.netflixdev.com', 'https://www.netflix.com' FROM dual
UNION ALL
SELECT 5, 'https://www.googledev.com', 'https://www.google.com' FROM dual;

INSERT INTO ApplicationUserEmail (ApplicationID, UserEmail)
SELECT 1, 'colin@ubc.ca' FROM dual
UNION ALL
SELECT 2, 'steven@ubc.ca' FROM dual
UNION ALL
SELECT 3, 'alex@ubc.ca' FROM dual
UNION ALL
SELECT 4, 'nathan@ubc.ca' FROM dual
UNION ALL
SELECT 5, 'kevin@ubc.ca' FROM dual;

-- INSERT INTO ApplicationActionItem (AppStatus, ActionItem)
-- SELECT 'Applied', 'Complete Online Assessment' FROM dual
-- UNION ALL
-- SELECT 'Interview', 'Prepare for Interview' FROM dual
-- UNION ALL
-- SELECT 'Not Applied', 'Submit Application' FROM dual
-- UNION ALL
-- SELECT 'Applied', 'Offer Received' FROM dual
-- UNION ALL
-- SELECT 'Applied', 'Practice for Technical Interview' FROM dual;

INSERT INTO AppliesTo (ApplicationID, JobPostingLink, JobBoardLink)
SELECT 1, 'https://www.appledev.com', 'https://www.apple.com' FROM dual
UNION ALL
SELECT 2, 'https://www.metadev.com', 'https://www.meta.com' FROM dual
UNION ALL
SELECT 3, 'https://www.microsoftdev.com', 'https://www.microsoft.com' FROM dual
UNION ALL
SELECT 4, 'https://www.netflixdev.com', 'https://www.netflix.com' FROM dual
UNION ALL
SELECT 5, 'https://www.googledev.com', 'https://www.google.com' FROM dual;

INSERT INTO Documents (Title, CoverLetter, ResumeLetter, Transcript, ApplicationID)
SELECT 'CS Rough Draft', 'https://drive.google.com/file/1a', 'https://drive.google.com/file/1a', 'https://drive.google.com/file/1a', 1 FROM dual
UNION ALL
SELECT 'CS Final Copy', 'https://drive.google.com/file/2a', 'https://drive.google.com/file/2a', 'https://drive.google.com/file/2a', 1 FROM dual
UNION ALL
SELECT 'Finance Rough Draft', 'https://drive.google.com/file/3a', 'https://drive.google.com/file/3a', 'https://drive.google.com/file/3a', 2 FROM dual
UNION ALL
SELECT 'Finance Final Copy', 'https://drive.google.com/file/4a', 'https://drive.google.com/file/4a', 'https://drive.google.com/file/4a', 2 FROM dual
UNION ALL
SELECT 'Marketing Rough Draft', 'https://drive.google.com/file/4a', 'https://drive.google.com/file/4a', 'https://drive.google.com/file/4a', 3 FROM dual;

INSERT INTO Interview (InterviewID, InterviewDate, StartTime, ApplicationID)
SELECT 1, '11/10/2023', '02:00', 3 FROM dual
UNION ALL
SELECT 2, '11/12/2023', '02:00', 1 FROM dual
UNION ALL
SELECT 3, '11/15/2023', '12:00', 1 FROM dual
UNION ALL
SELECT 4, '11/22/2023', '11:00', 2 FROM dual
UNION ALL
SELECT 5, '11/27/2023', '01:00', 2 FROM dual;

INSERT INTO Interviewer (Email, Name, InterviewID)
SELECT 'recruiter1@gmail.com', 'John Smith', 2 FROM dual
UNION ALL
SELECT 'recruiter2@gmail.com', 'Nathan Suen', 3 FROM dual
UNION ALL
SELECT 'recruiter3@gmail.com', 'Tammy Goel', 3 FROM dual
UNION ALL
SELECT 'recruiter4@gmail.com', 'Rammy Hadyullath', 3 FROM dual
UNION ALL
SELECT 'recruiter5@gmail.com', 'Marcus Lai', 4 FROM dual;

INSERT INTO PostInterviewQuestion (ApplicationID, NoteID, ContactInformation, InterviewID)
SELECT 1, 1, 'recruiter1@gmail.com, 604-111-1111', 2 FROM dual
UNION ALL
SELECT 2, 2, 'recruiter2@gmail.com, 604-222-2222', 2 FROM dual
UNION ALL
SELECT 3, 3, 'recruiter3@gmail.com, 604-333-3333', 1 FROM dual
UNION ALL
SELECT 4, 4, 'recruiter4@gmail.com, 604-444-4444', 3 FROM dual
UNION ALL
SELECT 5, 5, 'recruiter5@gmail.com, 604-555-5555', 1 FROM dual;

INSERT INTO OnlineAssessment (InterviewID, AssessmentType, Link)
SELECT 1, 'Hackerrank', 'https://www.hackerrank.com' FROM dual
UNION ALL
SELECT 2, 'Leetcode', 'https://www.leetcode.com' FROM dual
UNION ALL
SELECT 3, 'IQTest', 'https://www.iqtest.com' FROM dual
UNION ALL
SELECT 4, 'PuzzleGames', 'https://www.puzzlegames.com' FROM dual
UNION ALL
SELECT 5, 'CodeReview', 'https://www.codereview.com' FROM dual;

INSERT INTO InPersonInterview (InterviewID, Questions)
SELECT 1, 'Tell me about yourself' FROM dual
UNION ALL
SELECT 2, 'Tell me a time you had conflict with a teammate and how you resolved it' FROM dual
UNION ALL
SELECT 3, 'What are your strengths and weaknesses' FROM dual
UNION ALL
SELECT 4, 'Why do you want to join our company?' FROM dual
UNION ALL
SELECT 5, 'What is your experience with Javascript?' FROM dual;

INSERT INTO VirtualInterview (InterviewID, Link)
SELECT 1, 'https://www.zoomus1.com' FROM dual
UNION ALL
SELECT 2, 'https://www.zoomus2.com' FROM dual
UNION ALL
SELECT 3, 'https://www.zoomus3.com' FROM dual
UNION ALL
SELECT 4, 'https://www.zoomus4.com' FROM dual
UNION ALL
SELECT 5, 'https://www.zoomus5.com' FROM dual;