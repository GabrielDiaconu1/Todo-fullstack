import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, FormsModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})

export class Analytics {
  // Role-based access (could also use AuthService in real app)
  isAdmin = true;

  // Daily Sales Line Chart
  salesChartLabels = ['02/01/2025', '02/02/2025', '02/03/2025', '02/04/2025', '02/05/2025'];
  salesChartData = [
    { data: [18, 16, 17, 19, 18], label: 'Sales' }
  ];
  chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  };

  // Payment Methods Doughnut Chart
  paymentChartLabels = ['Credit', 'Cash', 'App'];
  paymentChartData = {
    labels: this.paymentChartLabels,
    datasets: [{ data: [49, 31, 27] }]
  };

  // Popular Items Bar Chart
  popularItemsLabels = ['Cappuccino', 'Coffee', 'Muffin', 'Tea', 'Espresso'];
  popularItemsData = [
    { data: [12, 10, 9, 9, 8], label: 'Units Sold' }
  ];

  // Summary Data
  totalSales = 75;
  avgSales = 15;
  bestItem = 'Cappuccino';
  topPayment = 'Credit';

  // Low Stock Items
  lowStockItems = [
    { name: 'Bagel', units: 25 },
    { name: 'Milk', units: 30 },
    { name: 'Muffin', units: 35 }
  ];
}
