# WeddingWise-EM-Backend
    Used Nodejs, Expressjs and mongoose for MongoDB Schema and Controllers

    Render URL - https://weddingwise-em-backend.onrender.com

    APIs
    User APIs
        -> /api/user/signup
        -> /api/user/login

        <!-- Vendor Details and Adding and Removing Favourites -->
        -> /api/user/master/get/vendors
        -> /api/user/add/favouritevendor
        -> /api/user/get/myfavouritevendors
        -> /api/user/vendor/deletefavourite/:removeId

        <!--  Main Event Details Regarding Planning CRUD Operation-->
        -> /api/user/add/eventplanning
        -> /api/user/get/eventplanning
        -> /api/user/update/eventplanning/:mainEventId
        -> /api/user/delete/eventplanning/:deleteId

        <!-- Vendors Planning to Arrange the Event CRUD Operation -->
        -> /api/user/add/eventplanningvendor
        -> /api/user/get/eventplanningvendor
        -> /api/user/update/eventplanningvendor/:updateId
        -> /api/user/delete/eventplanningvendor/:deleteId

        <!-- Vendor wise Payment Details CRUD Operation -->
        -> /api/user/add/vendorpayment
        -> /api/user/update/vendorpayment/:updateId
        -> /api/user/get/vendorpayment
        -> /api/user/delete/vendorpayment/:deleteId

        <!-- Package Details and Payment Terms to show Vendor Detail Page -->
        -> /api/user/get/packagedetails
        -> /api/user/get/paymentterms

        <!-- User Preference description Input Regarding event CRUD Operation -->
        -> /api/user/add/preference
        -> /api/user/update/preference/:updateId
        -> /api/user/get/preference
        -> /api/user/delete/preference/:deleteId

    Vendor APIs
        -> /api/vendor/signup
        -> /api/vendor/login

        <!-- Get Loggedin vendor Masterdata -->
        -> /api/vendor/get/mymasterdata

        <!-- Vendor Adding Their Package Details  -->
        -> /api/vendor/add/packagedetails
        -> /api/vendor/update/packagedetails/:updateId
        -> /api/vendor/get/packagedetails

        <!-- Vendor Adding Their Payment Terms -->
        -> /api/vendor/add/paymentterms
        -> /api/vendor/update/paymentterms/:updateId
        -> /api/vendor/get/paymentterms
    
    Admin APIs
        -> /api/admin/master/add/eventcategory
        -> /api/admin/master/add/eventservice
        -> /api/admin/master/add/eventsubservice
        -> /api/admin/master/add/state
        -> /api/admin/master/get/eventcategory
        -> /api/admin/master/get/eventservice
        -> /api/admin/master/get/eventsubservice
        -> /api/admin/master/get/countries
        -> /api/admin/master/get/states
        -> /api/admin/master/get/cities