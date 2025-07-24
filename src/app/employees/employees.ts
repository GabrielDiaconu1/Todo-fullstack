import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})

export class Employees {
  employees = [
    { id: '1001', name: 'Alice Johnson', position: 'Barista', department: 'Front of House', supervisor: 'Sarah Thompson', salary: 38000, hireDate: '2022-05-12', contact: 'alice@email.com' },
    { id: '1002', name: 'Mark Smith', position: 'Shift Supervisor', department: 'Front of House', supervisor: 'Sarah Thompson', salary: 45000, hireDate: '2021-08-21', contact: 'mark@email.com' },
    { id: '1003', name: 'Emily Davis', position: 'Cashier', department: 'Front of House', supervisor: 'Mark Smith', salary: 36000, hireDate: '2023-01-15', contact: 'emily@email.com' },
    { id: '1004', name: 'James Wilson', position: 'Head Chef', department: 'Kitchen', supervisor: 'Michael Carter', salary: 55000, hireDate: '2019-03-30', contact: 'james@email.com' },
    { id: '1005', name: 'Laura White', position: 'Pastry Chef', department: 'Kitchen', supervisor: 'James Wilson', salary: 50000, hireDate: '2019-10-06', contact: 'laura@email.com' },
    { id: '1006', name: 'Daniel Brown', position: 'Dishwasher', department: 'Kitchen', supervisor: 'James Wilson', salary: 32000, hireDate: '2024-01-04', contact: 'daniel@email.com' },
    { id: '1007', name: 'Sophia Martin', position: 'General Manager', department: 'Management', supervisor: '', salary: 65000, hireDate: '2017-02-24', contact: 'sophia@email.com' },
    { id: '1008', name: 'Robert Lee', position: 'Delivery Driver', department: 'Logistics', supervisor: 'Sophia Martin', salary: 40000, hireDate: '2021-11-18', contact: 'robert@email.com' },
    { id: '1009', name: 'Olivia Harris', position: 'Marketing Lead', department: 'Marketing', supervisor: 'Sophia Martin', salary: 48000, hireDate: '2022-07-05', contact: 'olivia@email.com' },
    { id: '1010', name: 'Michael Carter', position: 'Operations Head', department: 'Management', supervisor: '', salary: 75000, hireDate: '2015-02-28', contact: 'michael@email.com' }
  ];

  filteredEmployees = [...this.employees];

  // Filters
  searchText = '';
  dateFrom: string = '';
  dateTo: string = '';
  salaryMin?: number;
  salaryMax?: number;
  selectedDepartment = '';
  selectedPosition = '';
  selectedSupervisor = '';

  departments = [...new Set(this.employees.map(e => e.department))];
  positions = [...new Set(this.employees.map(e => e.position))];
  supervisors = [...new Set(this.employees.map(e => e.supervisor).filter(s => s))];

  applyFilters() {
    this.filteredEmployees = this.employees.filter(emp => {
      const matchesText = this.searchText
        ? emp.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          emp.id.includes(this.searchText)
        : true;

      const matchesDate =
        (!this.dateFrom || emp.hireDate >= this.dateFrom) &&
        (!this.dateTo || emp.hireDate <= this.dateTo);

      const matchesSalary =
        (!this.salaryMin || emp.salary >= this.salaryMin) &&
        (!this.salaryMax || emp.salary <= this.salaryMax);

      const matchesDepartment =
        !this.selectedDepartment || emp.department === this.selectedDepartment;

      const matchesPosition =
        !this.selectedPosition || emp.position === this.selectedPosition;

      const matchesSupervisor =
        !this.selectedSupervisor || emp.supervisor === this.selectedSupervisor;

      return matchesText && matchesDate && matchesSalary && matchesDepartment && matchesPosition && matchesSupervisor;
    });
  }

  resetFilters() {
    this.searchText = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.salaryMin = undefined;
    this.salaryMax = undefined;
    this.selectedDepartment = '';
    this.selectedPosition = '';
    this.selectedSupervisor = '';
    this.filteredEmployees = [...this.employees];
  }

  downloadCSV() {
    const csvRows = [
      ['Employee ID', 'Name', 'Position', 'Department', 'Supervisor', 'Salary', 'Hire Date', 'Contact Info'],
      ...this.filteredEmployees.map(emp =>
        [emp.id, emp.name, emp.position, emp.department, emp.supervisor || '-', `$${emp.salary}`, emp.hireDate, emp.contact]
      )
    ];

    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'employee_report.csv');
    link.click();
  }
}
