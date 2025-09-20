import { Component, OnInit } from '@angular/core';
import { SolicitudDashboardDTO } from '../../Models/cl-solicitud';
import { ClSolicitudService } from '../../Services/cl-solicitud.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-adm-dashboard',
  templateUrl: './adm-dashboard.component.html',
  styleUrls: ['./adm-dashboard.component.css']
})
export class AdmDashboardComponent implements OnInit {

  dashboardData?: SolicitudDashboardDTO;

  constructor(private dashboardService: ClSolicitudService) {}

  ngOnInit(): void {
    this.cargarDashboard('2025-01-01', '2025-12-31');
  }

  cargarDashboard(fechaInicio: string, fechaFin: string) {
    this.dashboardService.obtenerDashboard(fechaInicio, fechaFin).subscribe(res => {
      if (res.status === 1) {
        this.dashboardData = res.data;

        this.renderPie();
        this.renderBar();
        this.renderLine();
      }
    });
  }

  renderPie() {
    new Chart('chartPie', {
      type: 'pie',
      data: {
        labels: this.dashboardData?.solicitudesPorTipo.map(x => x.nombreTipo) || [],
        datasets: [{
          label: 'Solicitudes por tipo',
          data: this.dashboardData?.solicitudesPorTipo.map(x => x.cantidad) || [],
          backgroundColor: ['#4CAF50','#FF9800','#2196F3','#E91E63']
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontSize: 12,
            fontColor: '#333',
            generateLabels: (chart: any) => {   // 👈 uso any
              const data = chart.data;
              if (data.labels?.length) {
                return data.labels.map((label: string, i: number) => ({
                  text: label, // 👈 ahora muestra "Tipo X"
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden: false
                })) as any; // 👈 casteo final
              }
              return [];
            }
          }
        }
      }
    });
  }



  renderBar() {
    new Chart('chartBar', {
      type: 'bar',
      data: {
        labels: ['Aprobadas', 'Rechazadas'],
        datasets: [{
          label: 'Solicitudes',
          data: [this.dashboardData?.aprobadas || 0, this.dashboardData?.rechazadas || 0],
          backgroundColor: ['#4CAF50', '#F44336']
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'top'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value: number) {
                return Number.isInteger(value) ? value : null; // solo enteros
              }
            }
          }]
        }
      }
    });
  }



  renderLine() {
    new Chart('chartLine', {
      type: 'line',
      data: {
        labels: this.dashboardData?.solicitudesPorFecha.map(x => x.fecha) || [],
        datasets: [{
          label: 'Solicitudes ingresadas',
          data: this.dashboardData?.solicitudesPorFecha.map(x => x.cantidad) || [],
          borderColor: '#2196F3',
          fill: false
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'top'
        }
      }
    });
  }
}
