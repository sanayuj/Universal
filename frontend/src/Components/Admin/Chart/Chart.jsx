import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './Chart.css';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import Sidebar from '../SideBar/SideBar';
import { AdminDashboard } from '../../../Services/adminApi';
import { useNavigate } from 'react-router-dom';

export default function ChartComponent() {
  const chartRef = useRef(null);
  const [totalOrder, setTotalOrder] = useState();
  const [totalCourse, setTotalCourse] = useState();
  const [totatCategory, setTotalCategory] = useState();
  const [totalUser, setTotalUser] = useState();
const navigate=useNavigate()
  useEffect(() => {
    try {
      AdminDashboard().then((response) => {
        try {
          if(response.data.loginfail){
            navigate("/admin/login")
          }
          if (response.data.status) {
            setTotalOrder(response.data.bookingCount);
            setTotalCourse(response.data.courseCount);
            setTotalCategory(response.data.categoryCount);
            setTotalUser(response.data.userCount);
          }
        } catch (error) {
          console.log('Internal server error');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (
      typeof totalOrder !== 'undefined' &&
      typeof totalCourse !== 'undefined' &&
      typeof totatCategory !== 'undefined' &&
      typeof totalUser !== 'undefined'
    ) {
      // Destroy the previous chart instance before creating a new one
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create the new chart instance
      const ctx = document.getElementById('labelChart').getContext('2d');
      const myPieChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'pie',
        data: {
          labels: ['Course', 'Customer', 'Category', 'Orders'],
          datasets: [
            {
              data: [totalCourse, totalUser, totatCategory, totalOrder],
              backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1'],
              hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5'],
            },
          ],
        },
        options: {
          // Your chart options here
          responsive: true,
          legend: {
            position: 'right',
            labels: {
              padding: 20,
              boxWidth: 10,
            },
          },
          plugins: {
            datalabels: {
              formatter: (value, ctx) => {
                let sum = 0;
                let dataArr = ctx.chart.data.datasets[0].data;
                dataArr.map((data) => {
                  sum += data;
                });
                let percentage = ((value * 100) / sum).toFixed(2) + '%';
                return percentage;
              },
              color: 'white',
              labels: {
                title: {
                  font: {
                    size: '16',
                  },
                },
              },
            },
          },
        },
      });

      // Save the chart instance to the ref for future cleanup
      chartRef.current = myPieChart;

      // Cleanup the chart instance when the component is unmounted
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }
  }, [totalOrder, totalCourse, totatCategory, totalUser]);

  return (
    <div>
      <AdminNavBar />
      <Sidebar />
     
      <div className="screen-container">
      <div>
    <p>Total Details:</p>
      <div className='blockOne'>User :<span className='Numbers'>{` ${totalUser}`}</span></div>
      <div className='blockTwo'>Course :<span className='Numbers'>{` ${totalCourse}`}</span></div>
      <div className='blockTwo'>Category :<span className='Numbers'>{` ${totatCategory}`}</span></div>
      <div className='blockTwo'>Orders :<span className='Numbers'>{` ${totalOrder}`}</span></div>
      </div>
     
      
        <div className="chart-container">
          <canvas id="labelChart" className="chart-canvas"></canvas>
        </div>
      </div>
    </div>
  );
}
