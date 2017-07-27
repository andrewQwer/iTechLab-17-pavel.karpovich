USE master;
GO

CREATE DATABASE Company
GO

USE Company
GO

CREATE TABLE Department (
  Id      INT PRIMARY KEY IDENTITY (1, 1),
  Title   NVARCHAR(60) UNIQUE NOT NULL CHECK (Title != ''),
  Address NVARCHAR(60)        NOT NULL CHECK (Address != '')
);

CREATE TABLE Employee (
  Id        INT PRIMARY KEY IDENTITY (1, 1),
  FirstName NVARCHAR(60) NOT NULL CHECK (FirstName != ''),
  LastName  NVARCHAR(60) NOT NULL CHECK (LastName != ''),
  FullName                  AS FirstName + ' ' + LastName,
  Birthday  DATETIME     NOT NULL
);

CREATE TABLE Job (
  Id        INT PRIMARY KEY IDENTITY (1, 1),
  Position  NVARCHAR(100),
  MinSalary MONEY NOT NULL CHECK (MinSalary > 0)
);

CREATE TABLE Career (
  JobId          INT REFERENCES Job (Id),
  EmployeeId     INT REFERENCES Employee (Id),
  DepartmentId   INT REFERENCES Department (Id),
  EmploymentDate DATETIME NOT NULL,
  DismissalDate  DATETIME
);

CREATE TABLE Salary (
  EmployeeId INT REFERENCES Employee (Id),
  Month      TINYINT  NOT NULL CHECK (Month BETWEEN 1 AND 12),
  Year       SMALLINT NOT NULL CHECK (Year BETWEEN 2002 AND 2017),
  Salary     MONEY    NOT NULL
);
