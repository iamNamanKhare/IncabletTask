$(function(){
    function populateCardDefault(cardArr){
        const cardContainer = $('#card-conatiner')
        cardContainer.empty();
        
        cardArr.map((item) => {
            var Card = document.createElement('div')

            var statusColor;
            if(item.status.toUpperCase() == 'ACTIVE'){
                statusColor = "greenStatus"
            }
            if(item.status.toUpperCase() == 'ONBOARDED'){
                statusColor = "blueStatus"
            }
            if(item.status.toUpperCase() == 'LEFT'){
                statusColor = "redStatus"
            }

            Card.innerHTML = `
                <div class="card-custom text-center" id="${item.id || item._id}">
                    <div class="row">
                        <div class="col-12">
                            <img class="card-image rounded-circle" src=${item.img} alt="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 position-title">
                            ${item.name} <div class="gender">| ${item.gender.toUpperCase()}</div>
                        </div>
                        <div class="col-12 age">
                            AGE :<div class="age-value"> ${item.age}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 status">
                            STATUS :<div class="status-value ${statusColor}"> ${item.status.toUpperCase()}</div>
                        </div>
                        <div class="col-12 date">
                            <i class="fa fa-calendar" aria-hidden="true"></i><div class="date-value"> &nbsp;${item.date}</div>
                        </div>
                    </div>
                </div>
            `
            cardContainer.append(Card);
        })
    }

    function populateCardCustom(cardArr){
        const cardContainer = $('#card-conatiner')
        cardContainer.empty();
        cardArr.map((item) => {
            var dateParts = item.date.split('-');
            var newDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
            var Card = document.createElement('div')
            var statusColor;
            if(item.status.toUpperCase() == 'ACTIVE'){
                statusColor = "greenStatus"
            }
            if(item.status.toUpperCase() == 'ONBOARDED'){
                statusColor = "blueStatus"
            }
            if(item.status.toUpperCase() == 'LEFT'){
                statusColor = "redStatus"
            }
            Card.innerHTML = `
                <div class="card-custom text-center" id="${item.id || item._id}">
                    <div class="row">
                        <div class="col-12">
                            <img class="card-image rounded-circle" src=${item.img} alt="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 position-title">
                            ${item.name} <div class="gender">| ${item.gender.toUpperCase()}</div>
                        </div>
                        <div class="col-12 age">
                            AGE :<div class="age-value"> ${item.age}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 status">
                            STATUS :<div class="status-value ${statusColor}"> ${item.status.toUpperCase()}</div>
                        </div>
                        <div class="col-12 date">
                            <i class="fa fa-calendar" aria-hidden="true"></i><div class="date-value"> &nbsp;${newDate}</div>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.append(Card);
        })
    }

    function sortCardsDefault(itemArr){
        itemArr.map((item) => {
            if(item.status.toUpperCase() == "ACTIVE"){
                item.prior = 1;
            } else if(item.status.toUpperCase() == "LEFT"){
                item.prior = 3;
            } else if(item.status.toUpperCase() == "ONBOARDED"){
                item.prior = 2;
            }

            var dateParts = item.date.split('/')
            var dayCount = +dateParts[0] + (+dateParts[1] * 30) + (+dateParts[2] * 365)
            item.daysCount = dayCount;
        })

        itemArr.sort((item1, item2) => {
            if(item1.prior > item2.prior) return 1;
            if(item1.prior < item2.prior) return -1;

            if(item1.daysCount < item2.daysCount) -1;
            if(item1.daysCount < item2.daysCount) 1;
        })

        return itemArr;
    }

    function sortCardsCustom(itemArr){
        itemArr.map((item) => {
            if(item.status.toUpperCase() == "ACTIVE"){
                item.prior = 1;
            } else if(item.status.toUpperCase() == "LEFT"){
                item.prior = 3;
            } else if(item.status.toUpperCase() == "ONBOARDED"){
                item.prior = 2;
            }

            var dateParts = item.date.split('-')
            var dayCount = +dateParts[2] + (+dateParts[1] * 30) + (+dateParts[0] * 365)
            item.daysCount = dayCount;
        })

        itemArr.sort((item1, item2) => {
            if(item1.prior > item2.prior) return 1;
            if(item1.prior < item2.prior) return -1;

            if(item1.daysCount < item2.daysCount) -1;
            if(item1.daysCount < item2.daysCount) 1;
        })

        return itemArr;
    }

    function fetchCardDefault(){
        $.ajax({
            url: '/default',
            method: 'GET',
            success: (data) => {
                var sortedData = sortCardsDefault(data.list);
                populateCardDefault(sortedData);
            }
        })
    }

    function fetchCardCustom(){
        $.ajax({
            url: '/profile',
            method: 'GET',
            success: (data) => {
                var sortedData = sortCardsCustom(data.list);
                populateCardCustom(sortedData);
            }
        })
    }

    $("#defaultAPIbtn").click(() => {
        fetchCardDefault();
    })

    $("#customAPIbtn").click(() => {
        fetchCardCustom();
    })

    $("form#data").submit(function(e) {
        e.preventDefault();    
        var formData = new FormData(this);
        $.ajax({
            url: '/profile',
            method: 'POST',
            data: formData,
            success: function (data) {
                alert('Item Successfully Added. Please Go back to Home or Add another Profile.')
            },
            processData: false,
            contentType: false
        });
    });

    fetchCardDefault();

})