$(() => {
    
    /* Chart dates start X days ago from number of entries in dataSeries */
    let ts2 = Date.now()-(dataSeries.length*86400000);
    let dates_blue = [];
    let dates_red = [];
    let dates_yellow = [];
    let dates_green = [];
    for (let i = 0; i < dataSeries.length; i++) {
        dates_blue.push([ts2, dataSeries[i].value0]);
        dates_red.push([ts2, dataSeries[i].value1]);
        dates_yellow.push([ts2, dataSeries[i].value2]);
        dates_green.push([ts2, dataSeries[i].value3]);
        ts2 = ts2 + 86400000;
    }
    
    
    let options = {
        series: [
        {
            name: 'Product Views',
            data: dates_blue
        },
        {
            name: 'Open/Installs',
            data: dates_red
        },
        {
            name: 'Saved to Libraries',
            data: dates_yellow
        },
        {
            name: 'Total Ratings',
            data: dates_green
        }
        ],
        chart: {
        type: 'line',
        stacked: false,
        height: 425,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 5,
      },
      title: {
        text: "Product Analytics",
        align: 'left',
        style: {
            fontSize:  '18px',
            fontWeight:  'bold',
            fontFamily:  'Quicksand',
            color: '#212529'
        },
      },
      subtitle: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        align: 'left',
        style: {
            fontSize:  '14px',
            fontWeight:  'normal',
            fontFamily:  'Quicksand',
            color: '#9e9e9e'
        },
      },
      colors: ['#4285F4', "#ff4444", "#ffbb33", "#00C851"],
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: true,
        style: {
            fontSize: '0.8rem',
            fontFamily: 'Quicksand'
        },
      },
      legend: {
          fontSize: '13px',
          fontFamily: 'Quicksand',
          offsetY: 10,
          itemMargin: {
            horizontal: 10,
            vertical: 10
          },
      },
      };
      
    var chart = new ApexCharts(document.querySelector("#manageProductLargeChart"), options);
      
    chart.render();
});