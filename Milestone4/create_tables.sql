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
CREATE TABLE JobBoard_PositionPay (
  JobTitle VARCHAR(50),
  Description VARCHAR(2000),
  Salary INT CHECK (Salary > 0),
  PRIMARY KEY (JobTitle, Description)
);
CREATE TABLE JobBoard_PositionBegins (
 JobStartDate CHAR(15),
 WorkTerm CHAR(15),
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
  PRIMARY KEY (ApplicationID),
  FOREIGN KEY (JobPostingLink) REFERENCES JobBoard_Position(JobPostingLink) ON DELETE CASCADE
);
CREATE TABLE ApplicationUserEmail (
  ApplicationID INT,
  UserEmail VARCHAR(100) NOT NULL,
  PRIMARY KEY (ApplicationID),
  FOREIGN KEY (UserEmail) REFERENCES Users(Email) ON DELETE CASCADE
);
CREATE TABLE ApplicationActionItem (
  AppStatus VARCHAR(20),
  ActionItem VARCHAR(2000),
  PRIMARY KEY (AppStatus)
);
CREATE TABLE AppliesTo (
  ApplicationID INT,
  JobPostingLink VARCHAR(2000),
  JobBoardLink VARCHAR(2000),
  PRIMARY KEY (ApplicationID, JobPostingLink, JobBoardLink),
  FOREIGN KEY (ApplicationID) REFERENCES ApplicationStatus(ApplicationID) ON DELETE CASCADE,
  FOREIGN KEY (JobBoardLink) REFERENCES JobBoard(JobBoardLink) ON DELETE CASCADE,
  FOREIGN KEY (JobPostingLink) REFERENCES JobBoard_Position(JobPostingLink) ON DELETE CASCADE
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
  InterviewDate CHAR(15),
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

