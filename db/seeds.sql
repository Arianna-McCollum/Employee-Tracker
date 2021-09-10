INSERT INTO department(department_name)
VALUES("Engineering"), ("Legal"), ("Finance"), ("Marketing"), ("Human Resources");

INSERT INTO role(title, salary, department_id)
VALUES("Engineer", 90000, 1), ("Senior Engineer", 130000, 1), ("Lawyer", 200000, 2), ("Front-End Developer", 70000, 1), ("HR Representative", 80000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 2), ('Jane', 'Smith', 1, null), ('Susan', 'Smart', 1, 2), ('Beth', 'Spark', 2, 2), ('Nick', 'James', 4, null);