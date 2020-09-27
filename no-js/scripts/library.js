$(() => {
    let modalCreateNewFolder = document.getElementById("modalCreateNewFolder");
    let modalCreateNewFolderName = document.getElementById("modalCreateNewFolderName");
    let modalCreateNewFolderDesc = document.getElementById("modalCreateNewFolderDesc");
    let modalMoveToFolder = document.getElementById("modalMoveToFolder");

    let folders = document.getElementById("libraryFolderArray").getElementsByClassName("card-folder");
    let products = document.getElementById("libraryProductArray").getElementsByClassName("card-product");

    let libraryFoldersEditor = document.getElementById("libraryFoldersEditor");
    let libraryProductsEditor = document.getElementById("libraryProductsEditor");

    let modalMoveToFolderList = document.getElementById("modalMoveToFolderList");
    let modalMoveToFolderListItems = document.getElementById("modalMoveToFolderList").getElementsByTagName("li");

    let toggle_folder_editor_options = function(e) {
        /* Toggle editor options for a folder when a folder is clicked */
        /* rename, remove, and open folder */
        $(".folderSelected").removeClass("folderSelected");
        $(e.target).addClass("folderSelected");
        $(libraryFoldersEditor).removeClass("d-none");
    };

    let toggle_product_editor_options = function(e) {
        /* Toggle editor options for a product when a product is clicked */
        /* move to folder, remove, and open/install product */
        $(".productSelected").removeClass("productSelected");
        $(e.target).addClass("productSelected");
        $(libraryProductsEditor).removeClass("d-none");
        console.log("click product");
    };
    
    for (let i = 0; i < folders.length; ++i) {
        folders[i].addEventListener('click', toggle_folder_editor_options, false);
    }

    for (let i = 0; i < products.length; ++i) {
        products[i].addEventListener('click', toggle_product_editor_options, false);
    }

    for (let i = 0; i < modalMoveToFolderListItems.length; ++i) {
        modalMoveToFolderListItems[i].addEventListener("click", function(e) {
            /* Toggle 'active' selected state when a folder is clicked / tapped */
            $(modalMoveToFolderList).children().removeClass("active");
            $(e.target).addClass("active");
        }, false);
    }

    $(window).on("click", (e) => {
        /* If clicked element isn't a product or a folder, or any of the editor options, deselect product / folder */
        if( (!$(e.target).hasClass("card-folder") && !$(e.target).hasClass("folder-option")) && (!$(e.target).hasClass("card-product") && !$(e.target).hasClass("product-option")) ) {
            $(".folderSelected").removeClass("folderSelected");
            $(libraryFoldersEditor).addClass("d-none");

            $(".productSelected").removeClass("productSelected");
            $(libraryProductsEditor).addClass("d-none");
        }
    });

    $(modalCreateNewFolder).on('hidden.bs.modal', function(){
        $(modalCreateNewFolderName).val("");
        $(modalCreateNewFolderName).blur();
        $(modalCreateNewFolderDesc).val("");
        $(modalCreateNewFolderDesc).blur();
    });

    $(modalMoveToFolder).on('hidden.bs.modal', function() {
        $(modalMoveToFolderList).children().removeClass("active");
    });


});