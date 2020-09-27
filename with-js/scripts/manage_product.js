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

    let manageProductTagSearch = document.getElementById("manageProductTagSearch");
    let manageProductTagSearchLabel = document.getElementById("manageProductTagSearchLabel");
    let manageProductTagList = document.getElementById("manageProductTagList");
    let manageProductTagCount = document.getElementById("manageProductTagCount");
    let current_tags = $(manageProductTagList).attr("data-current-tags");

    let manageProductTitle = document.getElementById("manageProductTitle");
    let manageProductTitleLabel = document.getElementById("manageProductTitleLabel");
    let current_name = $(manageProductTitle).attr("data-current-name");
    let manageProductDesc = document.getElementById("manageProductDesc");
    let manageProductDescLabel = document.getElementById("manageProductDescLabel");
    let current_desc = $(manageProductDesc).attr("data-current-desc");

    let tags = $(manageProductTagSearch).attr("data-tags");
    let max_tag_length = 3;
    let num_tag = 0;

    let numeral_format = document.getElementsByClassName("numeral-format");

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


    let update_tag_restraint = function(e) {
      num_tag = $(manageProductTagList).find(".chosen-badge").length;
      $(manageProductTagCount).find("span").text(num_tag);
      if(num_tag >= max_tag_length) {
          $(manageProductTagSearch).prop("disabled", true);
          $(manageProductTagSearchLabel).addClass("disabled");
      } else {
          $(manageProductTagSearch).prop("disabled", false);
          $(manageProductTagSearchLabel).removeClass("disabled");
      }
    };

    jQuery.ui.autocomplete.prototype._resizeMenu = function () {
      var ul = this.menu.element;
      ul.outerWidth(this.element.outerWidth());
    }

    // Create a tag when an item from the autocomplete form is selected
    $(manageProductTagSearch).autocomplete({
      source: tags.split(" "),
      select: function( event, ui ) {
          event.preventDefault();
          
          // Prevent firing both the keyup event and the autocomplete select event
          if(event.key !== 'Enter' || event.keyCode !== 13) {
              let tag = $(".badge-dummy").clone(true, true);
              $(tag).text(ui.item.value);
              $(manageProductTagSearch).val("");
              $(manageProductTagSearch).autocomplete("close");
              $(tag).removeClass("badge-dummy").addClass("chosen-badge").appendTo(manageProductTagList);

              update_tag_restraint();
          }
      }
    });

    // Create a tag when the enter key is pressed on the tag input field
    $(manageProductTagSearch).on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            let tag = $(".badge-dummy").clone(true, true);
            $(tag).text($(manageProductTagSearch).val());
            $(manageProductTagSearch).val("");
            $(manageProductTagSearch).autocomplete("close");
            $(tag).removeClass("badge-dummy").addClass("chosen-badge").appendTo(manageProductTagList);

            update_tag_restraint();
        }
    });

    // Remove tag when one is clicked
    $(manageProductTagList).children().click((e) => {
        $(e.target).remove();

        update_tag_restraint();
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

    // Check for existing tags from attribute data-current-tags
    if (typeof current_tags !== typeof undefined && current_tags !== false && current_tags !== "") {
      current_tags = current_tags.split(" ");
      for(let i = 0; i < current_tags.length; ++i) {
        let tag = $(".badge-dummy").clone(true, true);
        $(tag).text(current_tags[i]);
        $(manageProductTagSearch).val("");
        $(manageProductTagSearch).autocomplete("close");
        $(tag).removeClass("badge-dummy").addClass("chosen-badge").appendTo(manageProductTagList);
      }
      update_tag_restraint();
    }

    // Check for existing name and description from data-current-name and data-current-desc
    if (typeof current_name !== typeof undefined && current_name !== false && current_name !== "") {
      $(manageProductTitle).attr("placeholder", current_name);
      $(manageProductTitleLabel).addClass("active");
    }

    if (typeof current_desc !== typeof undefined && current_desc !== false && current_desc !== "") {
      $(manageProductDesc).attr("placeholder", current_desc);
      $(manageProductDescLabel).addClass("active");
    }

    // Numeral.js metric number formatting
    let numeral_format_length = $(numeral_format).length;
    for (let i = 0; i < numeral_format_length; ++i) {
      parseInt($(numeral_format).eq(i).text()) < 1000 ? 0 : $(numeral_format).eq(i).text(numeral(parseInt($(numeral_format).eq(i).text())).format('0.0a'));
    }
});