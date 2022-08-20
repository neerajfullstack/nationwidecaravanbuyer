$(document).ready(function () {
    $("body").on("contextmenu", function (e) {
        //return false;
    });

    $('#btnSaveBlockedEmail').click(function () {
        var EmailAddress = $("#txtEmail").val();
        if (EmailAddress == '') {
            $("#saveMessage").html('Email Required !');
            return false;
        }
        var jsonStr = '{"email":"' + EmailAddress + '"}';
        jsonStr = JSON.parse(jsonStr);
        $.ajax({
            type: "POST",
            async: true,
            url: $("#url_SaveBlockEmail").val(),
            data: jsonStr,
            success: function (result) {
                $("#saveMessage").html('Saved');
                location.reload();
            },
            error: function (data) {
                console.log('Eror Found');
            }
        });
        //end
    });

    $('#btnSaveEmailRecipient').click(function () {
        $("#saveMessage").html('');
        //var sectionNo = $("#ddlSection").val();
        var Id = $("#hdnEmailRecipientId").val();
        var Name = $("#txtName").val();
        var Email = $("#txtEmail").val();
        var Phone = $("#txtPhone").val();
        var Location = $("#txtLocation").val();
        var Contact = $("#txtContact").val();
        var SendEmail =$("#chkSendEmail").is(':checked');
        var SendText =$("#chkSendText").is(':checked');
        var SendToAccountHome =$("#chkSendToAccountHome").is(':checked');
        var MainWebsiteId = $("#txtMainWebsiteId").val();

        //if (sectionNo == '') {
        //    $("#saveMessage").html('Please Select Section !');
        //    return false;
        //}
        $("#Declaration1").is(':checked')

        if (Name == '') {
            $("#saveMessage").html('Please Select Name !');
            return false;
        }
        if (Email == '') {
            $("#saveMessage").html('Please Select Email !');
            return false;
        }
        if (Phone == '') {
            $("#saveMessage").html('Please Select Phone !');
            return false;
        }

        //start section
        var section = '';
        $('input[name="chkSection"]:checked').each(function () {
            section += $(this).data('chkval') + ',';
        });
        if (section.slice(-1) == ',') { section = section.slice(0, -1); }
        if (section == '') {
            $("#saveMessage").html('Please Select section !');
            return false;
        }
        //end section

        var countys = '';
        $('input[name="chkCounty"]:checked').each(function () {
            countys += $(this).data('chkval') + ',';
        });
        if (countys.slice(-1) == ',') { countys = countys.slice(0, -1); }
        if (countys == '') {
            $("#saveMessage").html('Please Select countys !');
            return false;
        }
        //Create json str
        var jsonStr = '{'
            + '"Id": "' + Id
            + '","Stages": "' + section
            + '", "Name": "' + Name
            + '", "Email": "' + Email
            + '", "Phone": "' + Phone
            + '", "County": "' + countys
            + '", "Location": "' + Location
            + '", "Contact": "' + Contact
            + '", "SendEmail": "' + SendEmail
            + '", "SendText": "' + SendText
            + '", "SendToAccountHome": "' + SendToAccountHome
            + '", "MainWebsiteId": "' + MainWebsiteId
            + '"}';
        jsonStr = '{"emailRecipientRequest":' + jsonStr + '}';
        console.log(jsonStr);
        jsonStr = JSON.parse(jsonStr);
        var url = $("#url_SaveEmailRecipients").val();
        $.ajax({
            type: "POST",
            async: true,
            url: url,
            //dataType: "text",
            data: jsonStr,
            success: function (result) {
                $("#saveMessage").html('Saved');
                location.reload();
                return false;
            },
            error: function (data) {
                console.log('Eror Found');
            }
        });
        return;
    });


    $('#btnShowReport').click(function () {
        showReport(1);
    });
    $('#btnAdminValuationReset').click(function () {
        location.reload();
    });

    $('#btnShowEmailRecipient').click(function () {
        var stage = $("#ddlFilterStage").val() || null;
        var name = $("#ddlFilterName").val();
        var county = $("#ddlFilterCounty").val();

        //Create json str
        var jsonStr = '{'
            + '"stage": ' + stage
            + ', "name": "' + name
            + '", "county": "' + county
            + '"}';
        jsonStr = '{"request":' + jsonStr + '}';
        jsonStr = JSON.parse(jsonStr);
        var url = $("#url_ShowEmailRecipients").val();
        $.ajax({
            type: "POST",
            async: true,
            url: url,
            dataType: "text",
            data: jsonStr,
            success: function (result) {
                $("#divReportData").html(result);
            },
            error: function (data) {
                console.log('Eror Found');
            }
        });
    });//end btnShowEmailRecipient

});//end ready function;
function showReport(currentPageNo) {
    currentPageNo = currentPageNo || '1';
    var FormDate = $("#txtFormDate").val();
    var ToDate = $("#txtToDate").val();
    var Stage = $("#ddlStage").val();
    var PageId = $("#ddlPageId").val();
    var FirstName = $("#txtFirstName").val();
    var Phone = $("#txtPhone").val();
    var EmailAddress = $("#txtEmail").val();
    var County = $("#ddlCounty").val();
    var Year = $("#ddlYear").val();
    var BrandName = $("#ddlBrand").val();
    var Range = $("#ddlRange").val();
    var Model = $("#ddlModel").val();
    var CompanyName = $("#ddlEmailSentToCompany").val();
    //Create json str
    jsonStr = '{'
        + '"FormDate": "' + FormDate
        + '", "ToDate": "' + ToDate
        + '", "Stage": "' + Stage
        + '", "PageId": "' + PageId
        + '", "FirstName": "' + FirstName
        + '", "Phone": "' + Phone
        + '", "Email": "' + EmailAddress
        + '", "County": "' + County
        + '", "Year": "' + Year
        + '", "BrandName": "' + BrandName
        + '", "Range": "' + Range
        + '", "Model": "' + Model
        + '", "CurrentPageNo": ' + currentPageNo
        + ', "CompanyName": "' + CompanyName
        + '"}';
    jsonStr = '{"valuationReportRequest":' + jsonStr + '}';
    jsonStr = JSON.parse(jsonStr);
    var url = $("#url_showReport").val();
    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        async: true,
        url: url,
        //dataType: "text",
        data: jsonStr,
        success: function (result) {
            $("#divReportData").html(result);
            hideLoader();
            return false;
        },
        error: function (data) {
            hideLoader();
            console.log('Eror Found');
        }
    });
    //end
}
function getfilterCaravanReport(element) {
    var id = $(element).prop("id");
    var Year = $("#ddlYear").val();
    var BrandName = $("#ddlBrand").val();
    var Range = $("#ddlRange").val();
    var Model = $("#ddlModel").val();
    var County = $("#ddlCounty").val();
    var PageId = $("#ddlPageId").val();
    var Stage = $("#ddlStage").val();
    var CompanyName = $("#ddlEmailSentToCompany").val();
    var Dealer = '';// $("#ddlDealer").val();
    var Layout = '';//$("#ddlLayout").val();
    var Berth = '';// $("#ddlBerth").val();

    jsonStr = '{"Year": "' + Year
        + '", "BrandName": "' + BrandName
        + '", "Range": "' + Range
        + '", "Model": "' + Model
        + '", "Dealer": "' + Dealer
        + '", "LayoutCodeName": "' + Layout
        + '", "Berth": "' + Berth
        + '", "County": "' + County
        + '", "PageId": "' + PageId
        + '", "Stage": "' + Stage
        + '", "CompanyName": "' + CompanyName
        + '"}';
    jsonStr = '{"requestGuideCaravanFilter":' + jsonStr + '}';
    jsonStr = JSON.parse(jsonStr);
    $.ajax({
        type: "POST",
        async: true,
        url: $("#url_getGuideCaravanFilter").val(),
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        data: jsonStr,
        success: function (data) {
            if (id != "ddlYear") {
                $('#ddlYear').empty();
                $('#ddlYear').append($("<option></option>").attr("value", '').text('Please Select'));
                $.each(data.years, function (index, value) {
                    $('#ddlYear').append($("<option></option>").attr("value", value).text(value));
                });
                if (data.years.length == 1) {
                    $("#ddlYear").val(data.years[0]);
                }
                else {
                    $("#ddlYear").val(Year);
                }
            }

            if (id != "ddlBrand") {
                $('#ddlBrand').empty();
                $('#ddlBrand').append($("<option></option>").attr("value", '').text('Please Select'));
                $.each(data.brandNames, function (index, value) {
                    $('#ddlBrand').append($("<option></option>").attr("value", value).text(value));
                });
                if (data.brandNames.length == 1) {
                    $("#ddlBrand").val(data.brandNames[0]);
                }
                else {
                    $("#ddlBrand").val(BrandName);
                }
            }

            if (id != "ddlRange") {
                $('#ddlRange').empty();
                $('#ddlRange').append($("<option></option>").attr("value", '').text('Please Select'));
                $.each(data.ranges, function (index, value) {
                    $('#ddlRange').append($("<option></option>").attr("value", value).text(value));
                });
                if (data.ranges.length == 1) {
                    $("#ddlRange").val(data.ranges[0]);
                }
                else {
                    $("#ddlRange").val(Range);
                }
            }

            if (id != "ddlModel") {
                $('#ddlModel').empty();
                $('#ddlModel').append($("<option></option>").attr("value", '').text('Please Select'));
                $.each(data.models, function (index, value) {
                    $('#ddlModel').append($("<option></option>").attr("value", value).text(value));
                });
                if (data.models.length == 1) {
                    $("#ddlModel").val(data.models[0]);
                }
                else {
                    $("#ddlModel").val(Model);
                }
            }

            if (id != "ddlCounty") {
                $('#ddlCounty').empty();
                $('#ddlCounty').append($("<option></option>").attr("value", '').text('Please Select'));
                $.each(data.countys, function (index, value) {
                    $('#ddlCounty').append($("<option></option>").attr("value", value).text(value));
                });
                if (data.countys.length == 1) {
                    $("#ddlCounty").val(data.countys[0]);
                }
                else {
                    $("#ddlCounty").val(County);
                }
            }

            if (id != "ddlPageId") {
                //$('#ddlPageId').empty();
                //$('#ddlPageId').append($("<option></option>").attr("value", '0').text('Please Select'));
                //$.each(data.pageIds, function (index, value) {
                //    $('#ddlPageId').append($("<option></option>").attr("value", value).text(value));
                //});
                //if (data.pageIds.length == 1) {
                //    $("#ddlPageId").val(data.pageIds[0]);
                //}
                //else {
                //    $("#ddlPageId").val(PageId);
                //}
            }

            if (id != "ddlStage") {
                $('#ddlStage').empty();
                $('#ddlStage').append($("<option></option>").attr("value", '0').text('Please Select'));
                $.each(data.stages, function (index, value) {
                    $('#ddlStage').append($("<option></option>").attr("value", value).text(value));
                });
                if (data.stages.length == 1) {
                    $("#ddlStage").val(data.stages[0]);
                }
                else {
                    $("#ddlStage").val(Stage);
                }
            }
        },
        error: function (data) {
            console.log('Eror Found');
        }
    });
}

function delteBlockEmail(blockedId) {
    var jsonStr = '{"blockedId":"' + blockedId + '"}';
    jsonStr = JSON.parse(jsonStr);
    $.ajax({
        type: "POST",
        async: true,
        url: $("#url_DeleteBlockEmail").val(),
        data: jsonStr,
        success: function (result) {
            location.reload();
        },
        error: function (data) {
            console.log('Eror Found');
        }
    });
}

function delteEmailRecipient(Id) {
    var jsonStr = '{"Id":"' + Id + '"}';
    jsonStr = JSON.parse(jsonStr);
    $.ajax({
        type: "POST",
        async: true,
        url: $("#url_DeleteEmailRecipients").val(),
        data: jsonStr,
        success: function (result) {
            location.reload();
        },
        error: function (data) {
            console.log('Eror Found');
        }
    });
}