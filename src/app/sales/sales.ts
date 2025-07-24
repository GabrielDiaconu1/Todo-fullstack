import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales',
  imports: [CommonModule, FormsModule],
  templateUrl: './sales.html',
  styleUrl: './sales.css'
})

export class Sales{
  sales = [
    { id: '001', customer: 'John Doe', item: 'Coffee', date: '2025-02-01', qty: 2, price: 5, total: 10, type: 'Cash' },
    { id: '002', customer: 'Jane Doe', item: 'Sandwich', date: '2025-02-01', qty: 1, price: 7, total: 7, type: 'Credit' },
    { id: '003', customer: 'Alice Smith', item: 'Latte', date: '2025-02-02', qty: 1, price: 6, total: 6, type: 'App' },
    { id: '004', customer: 'Bob Johnson', item: 'Muffin', date: '2025-02-02', qty: 3, price: 3, total: 9, type: 'Cash' },
    { id: '005', customer: 'Charlie Brown', item: 'Espresso', date: '2025-02-03', qty: 2, price: 4, total: 8, type: 'Credit' },
    { id: '006', customer: 'Daniel White', item: 'Croissant', date: '2025-02-03', qty: 1, price: 5, total: 5, type: 'App' },
    { id: '007', customer: 'Emma Davis', item: 'Cappuccino', date: '2025-02-04', qty: 2, price: 6, total: 12, type: 'Credit' },
    { id: '008', customer: 'Frank Miller', item: 'Bagel', date: '2025-02-04', qty: 1, price: 4, total: 4, type: 'Cash' },
    { id: '009', customer: 'Grace Lee', item: 'Tea', date: '2025-02-05', qty: 3, price: 3, total: 9, type: 'App' },
    { id: '010', customer: 'Henry Adams', item: 'Brownie', date: '2025-02-05', qty: 1, price: 5, total: 5, type: 'Credit' }
  ];

  filteredSales = [...this.sales];

  // Filters
  searchText = '';
  dateFrom: string = '';
  dateTo: string = '';
  priceMin?: number;
  priceMax?: number;
  selectedPaymentType = '';

  paymentTypes = [...new Set(this.sales.map(order => order.type))];

  applyFilters() {
    this.filteredSales = this.sales.filter(order => {
      const matchesText = this.searchText
        ? order.customer.toLowerCase().includes(this.searchText.toLowerCase()) ||
          order.item.toLowerCase().includes(this.searchText.toLowerCase())
        : true;

      const matchesDate =
        (!this.dateFrom || order.date >= this.dateFrom) &&
        (!this.dateTo || order.date <= this.dateTo);

      const matchesPrice =
        (!this.priceMin || order.price >= this.priceMin) &&
        (!this.priceMax || order.price <= this.priceMax);

      const matchesType =
        !this.selectedPaymentType || order.type === this.selectedPaymentType;

      return matchesText && matchesDate && matchesPrice && matchesType;
    });
  }

  resetFilters() {
    this.searchText = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.priceMin = undefined;
    this.priceMax = undefined;
    this.selectedPaymentType = '';
    this.filteredSales = [...this.sales];
  }

  downloadCSV() {
    const csvRows = [
      ['Order ID', 'Customer', 'Item', 'Date', 'Qty', 'Price', 'Total', 'Type'],
      ...this.filteredSales.map(order =>
        [order.id, order.customer, order.item, order.date, order.qty, `$${order.price}`, `$${order.total}`, order.type]
      )
    ];

    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'sales_report.csv');
    link.click();
  }
}
