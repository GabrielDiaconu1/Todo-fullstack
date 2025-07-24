import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})

export class Inventory {
  inventory = [
    { id: '001', name: 'Coffee Beans', category: 'Beverages', stock: 100, price: 15, supplier: 'Bean Roasters Co.', restockDate: '2025-02-01' },
    { id: '002', name: 'Espresso', category: 'Beverages', stock: 50, price: 12, supplier: 'Java Suppliers', restockDate: '2025-01-28' },
    { id: '003', name: 'Latte Mix', category: 'Beverages', stock: 80, price: 10, supplier: 'Coffee Essentials', restockDate: '2025-02-03' },
    { id: '004', name: 'Tea Leaves', category: 'Beverages', stock: 60, price: 8, supplier: 'Green Leaf Co.', restockDate: '2025-01-30' },
    { id: '005', name: 'Sugar', category: 'Ingredients', stock: 200, price: 5, supplier: 'Sweet Supply Ltd.', restockDate: '2025-02-02' },
    { id: '006', name: 'Milk', category: 'Dairy', stock: 30, price: 4, supplier: 'Dairy Farms Inc.', restockDate: '2025-02-04' },
    { id: '007', name: 'Croissant', category: 'Baked Goods', stock: 40, price: 3, supplier: 'Fresh Bakes Ltd.', restockDate: '2025-02-01' },
    { id: '008', name: 'Muffin', category: 'Baked Goods', stock: 35, price: 3, supplier: 'Fresh Bakes Ltd.', restockDate: '2025-02-02' },
    { id: '009', name: 'Bagel', category: 'Baked Goods', stock: 25, price: 4, supplier: 'Bread & Co.', restockDate: '2025-01-31' },
    { id: '010', name: 'Coffee Cups', category: 'Supplies', stock: 150, price: 2, supplier: 'Cafe Essentials', restockDate: '2025-02-03' }
  ];

  filteredInventory = [...this.inventory];

  // Filters
  searchText = '';
  dateFrom: string = '';
  dateTo: string = '';
  priceMin?: number;
  priceMax?: number;
  stockMin?: number;
  stockMax?: number;
  selectedCategory: string = '';
  selectedSupplier: string = '';

  categories = [...new Set(this.inventory.map(item => item.category))];
  suppliers = [...new Set(this.inventory.map(item => item.supplier))];

  applyFilters() {
    this.filteredInventory = this.inventory.filter(item => {
      const matchesText = this.searchText
        ? item.name.toLowerCase().includes(this.searchText.toLowerCase()) || item.id.includes(this.searchText)
        : true;

      const matchesDate =
        (!this.dateFrom || item.restockDate >= this.dateFrom) &&
        (!this.dateTo || item.restockDate <= this.dateTo);

      const matchesPrice =
        (!this.priceMin || item.price >= this.priceMin) &&
        (!this.priceMax || item.price <= this.priceMax);

      const matchesStock =
        (!this.stockMin || item.stock >= this.stockMin) &&
        (!this.stockMax || item.stock <= this.stockMax);

      const matchesCategory =
        !this.selectedCategory || item.category === this.selectedCategory;

      const matchesSupplier =
        !this.selectedSupplier || item.supplier === this.selectedSupplier;

      return matchesText && matchesDate && matchesPrice && matchesStock && matchesCategory && matchesSupplier;
    });
  }

  resetFilters() {
    this.searchText = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.priceMin = undefined;
    this.priceMax = undefined;
    this.stockMin = undefined;
    this.stockMax = undefined;
    this.selectedCategory = '';
    this.selectedSupplier = '';
    this.filteredInventory = [...this.inventory];
  }

  downloadCSV() {
    const csvRows = [
      ['Item ID', 'Item Name', 'Category', 'Stock Level', 'Price', 'Supplier', 'Last Restock Date'],
      ...this.filteredInventory.map(item =>
        [item.id, item.name, item.category, item.stock, `$${item.price}`, item.supplier, item.restockDate]
      )
    ];

    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'inventory_report.csv');
    link.click();
  }
}
