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
    let current_logo = $(manageProductUploadLogoAreaPreview).attr('data-current-logo');

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


    manageProductUploadLogoAreaInput.addEventListener("mouseover", function(e) {
      $(addProductUploadLogoAreaWrapper).css("background-color", "#f5f5f5");
    });
    manageProductUploadLogoAreaInput.addEventListener("mouseout", function(e) {
        $(addProductUploadLogoAreaWrapper).css("background-color", "");
    });
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

    // Check for existing logo from attribute data-current-logo
    if (typeof current_logo !== typeof undefined && current_logo !== false && current_logo !== "") {
      $(".upload_logo").hide();
      $(".upload_logo_done").show();
      $(manageProductUploadLogoAreaPreview).attr("src", current_logo);
    }
});