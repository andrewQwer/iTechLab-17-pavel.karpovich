USE Company;
GO ;

BEGIN /*1. Простейшие запросы*/
  -- a. Получить всё содержимое таблицы Employee
  SELECT *
  FROM Employee

  -- b. Получить коды и названия должностей, чья минимальная заработная плата не превышает 500;
  SELECT
    Id,
    Position
  FROM Job
  WHERE MinSalary < 500

  -- c. Получить среднюю заработную плату начисленную в январе 2015 года.
  SELECT avg(Salary) AS avgSalary
  FROM Salary
  WHERE Month = 1 AND Year = 2015

END

BEGIN /*2. Вложенные подзапросы*/
  -- a. Получить имя самого немолодого сотрудника, а также его дату рождения
  SELECT
    FirstName,
    Birthday
  FROM Employee
  WHERE Birthday = (SELECT min(Birthday)
                    FROM Employee)

  -- b. Найти фамилии работников, которым была начислена заработная плата в январе 2015 года;
  SELECT LastName
  FROM Employee
  WHERE Id = ANY (SELECT EmployeeId
                  FROM Salary
                  WHERE Month = 01 AND Year = 2015)

  -- c. Найти коды работников, заработная плата которых в мае 2015 года
  -- снизилась по сравнению с каким-либо предыдущим месяцем этого же года;
  SELECT EmployeeId
  FROM (SELECT *
        FROM Salary
        WHERE Year = 2015 AND Month = 5) AS Actual
  WHERE Actual.EmployeeId = ANY (SELECT EmployeeId
                                 FROM Salary
                                 WHERE Salary.Year = 2015 AND Salary.Month < 5 AND Salary.Salary > Actual.Salary)

  -- d. Получить информацию о кодах, названиях отделов и числе работающих в них в настоящее время сотрудников.
  SELECT
    DepartmentId,
    working.Title,
    count(DepartmentId) AS EmployeeCount
  FROM (SELECT *
        FROM Career
          INNER JOIN Department ON Career.DepartmentId = Department.Id
        WHERE DismissalDate IS NULL) AS working
  GROUP BY DepartmentId, Title

END

BEGIN /*3. Группировка данных:*/
  -- a. Найти среднюю начисленную заработную плату за 2015 год в разрезе работников;
  SELECT
    avg(Salary) AS avgSalary,
    FullName
  FROM Salary
    INNER JOIN Employee ON Salary.EmployeeId = Employee.Id
  WHERE Year = 2015
  GROUP BY FullName

  -- b. Найти среднюю заработную плату за 2015 год в разрезе работников. Включать в результат только тех работников,
  --  начисления которым проводились не менее двух раз.
  SELECT avg(salaryIn2015.avgPersonSalary) AS avgSalaryIn2015
  FROM (SELECT avg(Salary) AS avgPersonSalary
        FROM Salary
        WHERE Year = 2015
        GROUP BY EmployeeId
        HAVING count(*) > 1) AS salaryIn2015

END

BEGIN /*4. Соединения таблиц:*/
  -- a. Найти имена тех работников, начисленная заработная плата которых за январь 2015 превысила 1000;
  SELECT
    FullName,
    Salary
  FROM Employee
    INNER JOIN Salary ON Employee.Id = Salary.EmployeeId
  WHERE Year = 2015 AND Month = 1 AND Salary > 1000

  -- b. Найти имена работников и стаж их непрерывной работы (на одной должности и в одном отделе).
  SELECT
    FullName,
    DATEDIFF(YY, EmploymentDate, ISNULL(DismissalDate, GETDATE())) AS Experience
  FROM Employee
    INNER JOIN Career ON Employee.Id = Career.EmployeeId

END

BEGIN /* 5. Модификация данных:*/
  -- a. Увеличить минимальную заработную плату для всех должностей в 1.5 раза;
  UPDATE Job
  SET MinSalary = MinSalary * 1.5;

  -- b. Удалить из таблицы salary все записи старше 2015 года.
  DELETE FROM Salary
  WHERE Year > 2015

END
