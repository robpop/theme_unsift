"use strict";
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#manageProductUploadLogoAreaPreview')
        .attr('src', e.target.result)
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$(() => {

    let manageProductUploadLogoAreaInput = document.getElementById("manageProductUploadLogoAreaInput");
    let manageProductUploadLogoAreaPreview = document.getElementById("manageProductUploadLogoAreaPreview");

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
          offsetY: -5,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: true,
            customIcons: []
          },
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 5,
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
          position: 'bottom',
          itemMargin: {
            horizontal: 7,
            vertical: 5
          },
      },
      };
      
    var chart = new ApexCharts(document.querySelector("#manageProductLargeChart"), options);
      
    chart.render();

    manageProductUploadLogoAreaInput.addEventListener("change", function(e) {
      if (e.target.value) {
        $(".upload_logo").hide();
        $(".upload_logo_done").show();
        readURL(manageProductUploadLogoAreaInput);
      } else {
        $(".upload_logo").show();  
        $(".upload_logo_done").hide();
        $(manageProductUploadLogoAreaPreview).attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      }
    });
});