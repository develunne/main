//Object that stores the data needed by "operationAjax" function
function dataConfig(objectAjax, directory, buttonAction, nameOperation, type) {
    this.objectAjax = objectAjax;
    this.directory = directory;
    this.buttonAction = buttonAction;
    this.nameOperation = nameOperation;
    this.type = type;
    this.execute = function () {
        operationAjax(this);
    }
    this.uploadFile = function () {
        uploadFileAjax(this);
    }
}

//Object that stores the data needed by "loadPartialView_Table" function
function dataConfigPartialView(table, buttonsArea, buttonAction, fadeTable, loading, textLoading, directory, objectAjax, scrollToRef, scrollSpeed, waitTimeAction, actionAfter, type) {
    this.table = table;
    this.buttonsArea = buttonsArea;
    this.buttonAction = buttonAction;
    this.fadeTable = fadeTable;
    this.loading = loading;
    this.textLoading = textLoading;
    this.directory = directory;
    this.objectAjax = objectAjax;
    this.scrollToRef = scrollToRef;
    this.scrollSpeed = scrollSpeed;
    this.waitTimeAction = waitTimeAction;
    this.actionAfter = actionAfter;
    this.type = type;
    this.execute = function () {
        loadPartialView_Table(this);
    }
}

//Object that stores the data needed by "setValueDinamic" function
function objectDDL(value, text, ref) {
    this.value = value;
    this.text = text;
    this.ref = ref;
    this.execute = function () {
        setValueDinamic(this);
    }
}
//Color Text
function getColorText(value) {
    // Convirtiendo String Hexadecimal a RGB
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    let rgb = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
    let colorText = "";
    C = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    for (var i = 0; i < C.length; ++i) {
        if (C[i] <= 0.03928) { C[i] = C[i] / 12.92 }
        else { C[i] = Math.pow((C[i] + 0.055) / 1.055, 2.4); }
    }
    L = 0.2126 * C[0] + 0.7152 * C[1] + 0.0722 * C[2];
    if (L > 0.279) {
        colorText = "black";
    }
    else {
        colorText = "white";
    }
    return colorText;
}


//Get JQuery selector
function getReference(ref) {
    let typeRef = typeof ref;
    if (typeRef == "object") {
        if (ref instanceof jQuery) {
            return ref;
        }
        else {
            return $(ref);
        }
    }
    else if (typeRef == "string") {
        ref = ref.trim();
        ref = ref.indexOf(".") == 0 ? $(ref) : (ref.indexOf("#") == 0 ? $(ref) : $("#" + ref));
        return ref;
    }
    else {
        return "No reference";
    }
}

//Clean Table Selection
function cleanSelection(tableRef, listButtonsTable) {
    $("#" + tableRef + " > tbody > tr").removeClass("table-info");
    for (var i = 0; i < listButtonsTable.length; i++) {
        let button = getReference(listButtonsTable[i]['refButton']);
        let attr = listButtonsTable[i]['attr'];
        let value = listButtonsTable[i]['value'];
        button.prop(attr, value);
    }
}
//Destroy Table
function destroyTable(suffix) {
    suffix = (suffix == undefined) ? suffix = "" : suffix = suffix;
    $("#divPartialView" + suffix).hide();
    //$("#divExportGeneral" + suffix).html('<div class="btn-group" role="group"> <div class="btn-group" role="group"> <button id="btnGroupExport' + suffix + '" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  <i class="fa fa-file-text"></i> </button> <div id="divExport' + suffix + '"> </div> </div> </div>')
    let htmlButton = $("#btnGroupExport" + suffix, "#divExportGeneral" + suffix).html();
    $("#divExportGeneral" + suffix).html('<div class="btn-group" role="group"> <div class="btn-group" role="group"> <button id="btnGroupExport' + suffix + '" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + htmlButton + '</button> <div id="divExport' + suffix + '"> </div> </div> </div>');
    $("#tablePartialView" + suffix).dataTable().fnDestroy();
}
// Validate Form
function validateForm(listObject) {
    let noError = 0;
    for (var i = 0; i < listObject.length; i++) {
        let value = (listObject[i]['value']).trim();
        let ref = getReference(listObject[i]['ref']);
        let emptyValue = listObject[i]['emptyValue'];
        ref.val(value);
        if (value === "" || value == emptyValue) {
            ref.addClass("form-control-error");
            noError++;
        }
    };
    return noError;
};
//Validate that the table is not empty
function tableSelection(tableRef, rowRef) {
    tableRef = getReference(tableRef);
    /*
        If rowRef is defined select or deselect the Row
            Return FALSE  if a row is not selected
            Return TRUE if a row is selected
        If rowRef in not defined, it is valid if a row is selected
            Return FALSE  if a row is not selected
            Return TRUE if a row is selected
    */
    if (rowRef != undefined) {
        rowRef = getReference(rowRef);
        if (rowRef.hasClass('table-info')) {
            rowRef.removeClass('table-info');
            return false;
            //Use "False" to trigger actions when a row is not selected
        }
        else {
            $("#" + tableRef.attr("id") + " tr.table-info").removeClass('table-info');
            rowRef.addClass('table-info');
            return true;
            //Use "True" to trigger actions when a row is selected
        }
    }
    else {
        //Validate if a row is selected
        if ($("#" + tableRef.attr("id") + " tr").hasClass('table-info')) {
            return true;
        }
        else {
            return false;
        }
    }
}
//Fill ddlAño
function fillYear(Ref, Start, End, DefaultOptions) {
    var today = new Date();
    var EndYear = End == undefined ? today.getFullYear() : End;
    $("#" + Ref).html("");
    DefaultOptions == true ? $("#" + Ref).append('<option value="6m">6 meses</option> ') : "";
    for (var i = Start; i < EndYear + 1; i++) {
        $("#" + Ref).append('<option value="' + i + '">' + i + '</option>');
    }
    DefaultOptions == true ? $("#" + Ref).append('<option value="All">Todo</option>') : "";
}
//Hide Preloader
$(window).on('load', function () {
    $("#preloader").delay(950).fadeOut();
});
//Scroll to
function scrollToRef(ref, speed) {
    ref = getReference(ref);
    if (speed == undefined) {
        speed = 1200;
    }
    $('html,body').animate({
        scrollTop: ref.offset().top
    }, speed);
}
//Hide Tooltip
$(document).ready(function () {
    $(".form-control").keyup(function () {
        $(".form-control").tooltip("hide");
    });
    $(".btn").click(function () {
        //Hide tooltip
        $(".btn").tooltip("hide");
    });
    $(".btn").focus(function () {
        setTimeout(function () {
            $(".btn").tooltip("hide");
        }, 10000);
    });
});
//initialize Tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
//Convert to Uppercase
function aMays(e, elemento) {
    tecla = (document.all) ? e.keyCode : e.which;
    elemento.value = elemento.value.toUpperCase();
    //onblur="aMays(event, this)"
}

//Alert Message
function alertMessage(ref, text, typeAlert, fadeout) {
    typeAlert = typeAlert == undefined ? "danger" : typeAlert;
    ref = getReference(ref);
    ref.hide();
    ref.html('<div class="alert alert-' + typeAlert + ' alert-dismissible fade show" role="alert">' + text + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> ').fadeIn();
    let characters = text.length;
    let time = characters * 5000 / 45;
    if (fadeout) {
        setTimeout(function () {
            ref.fadeOut();
        }, (time < 5000 ? 5000 : time));
    }
}

//Message
function message(text, title, typeMessage) {
    //Hide Modals
    $(".modal").modal("hide");
    //Clean classes
    $("#modalTitle").removeClass("text-danger").removeClass("text-warning").removeClass("text-success");
    //Add properties
    $("#divMessage").html(text)
    if (title == undefined || title.trim() == "") {
        if (typeMessage == "" | typeMessage == undefined | typeMessage == "danger" | typeMessage == "warning") {
            $("#divMessageTitle").html("¡Ups! Algo no ha ido bien.");
        }
        else if (typeMessage == "success") {
            $("#divMessageTitle").html("¡Se ha completado con éxito!");
        }
    }
    else {
        $("#divMessageTitle").html(title.trim())
    };
    if (typeMessage == undefined || typeMessage == "") {
        $("#modalTitle").addClass("text-danger");
    }
    else {
        switch (typeMessage.trim()) {
            case "danger":
                $("#modalTitle").addClass("text-danger");
                break;
            case "warning":
                $("#modalTitle").addClass("text-warning");
                break;
            case "success":
                $("#modalTitle").addClass("text-success");
                break;
            default:
                $("#modalTitle").addClass("text-danger");
                break;
        }
    }
    //Show modal
    $("#mdMessage").modal("show");
}

//Response (Ajax)
function messageExist(response) {
    var wordKey = ""
    var nameObject = ""
    bDefault = true
    switch (response.message.trim()) {
        case "Add":
            wordKey = "agregado"
            break;
        case "Update":
            wordKey = "modificado";
            break;
        case "Delete":
            wordKey = "eliminado";
            break;
        case undefined:
            wordKey = "procesado";
            break;
        case "Read":
            wordKey == "consultado";
            break;
        default:
            bDefault = false;
    }
    if (!(response.nameObject == "" | response.nameObject == undefined)) {
        nameObject = '<strong> "' + response.nameObject + '"</strong>';
    }
    if (bDefault == true) {
        message("No se ha " + wordKey + " el elemento" + nameObject + ", es posible que ya exista un registro con ese valor o no tenga permisos para realizar esta acción, por favor verifique la información, en caso de que no sea así comuníquese con el Administrador.", "", "warning");
    }
    else {
        //Use the resultAjax_Success () function to customize the action if the return of operationAjax is "Failed"
    }

}
function messageNew(response, dtc) {
    if (((response.message == undefined || response.message == "Add") || (response.message == "Update" || response.message == "Delete")) || response.message == "Read") {
        if (dtc.nameOperation == "" || dtc.nameOperation == undefined) {
            //Hide Modals
            $(".modal").modal("hide");
        }
    }
    else {
        //Use the resultAjax_Success () function to customize the action if the return of operationAjax is "Success"
    }
}
function messageError() {
    message("Se ha presentado un error, verifique su conexión a internet e intente de nuevo. En caso de que el error sea recurrente, por favor comuníquese con el Administrador.")
}
function messageActionInvalid() {
    message("En caso de que sea un error, favor de actualizar la página para proteger la integridad de la información y el registro de actividad de su usuario.", "¡Atención! Esta es una acción inválida.", "danger")
}
//Add - Update - Delete : Ajax
function operationAjax(dtc) { //objectAjax, directory, buttonAction,type
    var responseComp = undefined;
    if (dtc.buttonAction != undefined) {
        var htmlButtonAction = (dtc.buttonAction).html().trim();    //original HTML
        var textButtonAction = htmlButtonAction.split("\n");        //HTML content is divided using "\n"  as separator (Always use the first element(string-word))
        textButtonAction = textButtonAction[0].split(" ");          //HTML content (first element) is divided using " "  as separator
        textButtonAction = textButtonAction[0].split("&nbsp;")      //HTML content (first element) is divided using "&nbsp;" as separator
        textButtonAction = textButtonAction[0].split("<")           //HTML content (new fist element) is divided using "<"
        textButtonAction = textButtonAction[0];                     //This is the word that indicates the action in infinitive
        switch (textButtonAction.slice(-2)) {
            case "ar":  //If the word ends in "ar", replace "ar" with "ando..."
                textButtonAction = textButtonAction.slice(0, -2) + "ando...";
                break;
            case "ir":  //If the word ends in "ir", replace "ar" with "iendo..."
                textButtonAction = textButtonAction.slice(0, -2) + "iendo...";
                break;
            default:    //If the word ends at another termination, replace the word with "..."
                textButtonAction = "...";
                break;
            //textButtonAction =  New text of button
        }
    }
    $.ajax({
        type: (dtc.type != undefined ? dtc.type : "POST"),
        url: dtc.directory,
        data: JSON.stringify(dtc.objectAjax),
        contentType: 'application/json;',
        dataType: 'json',
        beforeSend: function () {
            if (dtc.buttonAction != undefined) {
                (dtc.buttonAction).html(textButtonAction);
                (dtc.buttonAction).prop("disabled", true);
            }
        },
        success: function (response) {
            responseComp = response;
            if (response.response == "Success") {
                //Show message New (If the message =! "Add" || "Update" |   "Delete", it shows the message of the response
                messageNew(response, dtc);
                resultAjax_Success(response, dtc)
            }
            if (response.response == "Failed") {
                messageExist(response, dtc);
                //Show message Exist(Failed) (If the message =! "Add" || "Update" |   "Delete", it shows the message of the response
                resultAjax_Success(response, dtc)
            }
        },
        error: function (response) {
            messageError();
        },
        complete: function (response) {
            if (response.status == 401) {
                //Hide Modals
                $(".modal").modal("hide");
                //Show Modal
                $("#mdMessageSession").modal("show");
            }
            else {
                //To catch controller errors
                if (responseComp != undefined) {
                    if (responseComp.response == "Unknown") {
                        messageError();
                    } else {
                        resultAjax_Complete(responseComp, dtc)
                    }
                }
                if (dtc.buttonAction != undefined) {
                    //If the HTML content changes in the "success" event, the HTML content is not modified again
                    if ((dtc.buttonAction).html() == textButtonAction) {
                        (dtc.buttonAction).html(htmlButtonAction);
                    }
                    (dtc.buttonAction).prop("disabled", false);
                }
            }
        }
    });
}
//UploadFile : Ajax
function uploadFileAjax(dtc) {//objectAjax, directory, buttonAction, type) {
    //Start ==> This is the same code as "addAjax", just change the declaration of "Ajax" 
    var responseComp = undefined;
    if (dtc.buttonAction != undefined) {
        var htmlButtonAction = (dtc.buttonAction).html().trim();    //original HTML
        var textButtonAction = htmlButtonAction.split(" ");         //HTML content is divided using " "  as separator (Always use the first element(string-word))
        textButtonAction = textButtonAction[0].split("&nbsp;")      //HTML content (first element) is divided using "&nbsp;" as separator
        textButtonAction = textButtonAction[0].split("<")           //HTML content (new fist element) is divided using "<"
        textButtonAction = textButtonAction[0];                     //This is the word that indicates the action in infinitive
        switch (textButtonAction.slice(-2)) {
            case "ar":  //If the word ends in "ar", replace "ar" with "ando..."
                textButtonAction = textButtonAction.slice(0, -2) + "ando...";
                break;
            case "ir":  //If the word ends in "ir", replace "ar" with "iendo..."
                textButtonAction = textButtonAction.slice(0, -2) + "iendo...";
                break;
            default:    //If the word ends at another termination, replace the word with "..."
                textButtonAction = "...";
                break;
            //textButtonAction =  New text of button
        }
    }
    //End ==> This is the same code as "addAjax", just change the declaration of "Ajax" 
    $.ajax({
        type: "POST",
        url: dtc.directory,
        data: dtc.objectAjax,
        //data:objectAdd,
        //data:{Porperty:value},
        contentType: false,
        processData: false,
        //async: false,
        beforeSend: function () {
            if (dtc.buttonAction != undefined) {
                (dtc.buttonAction).html(textButtonAction);
                (dtc.buttonAction).prop("disabled", true);
            }
        },
        success: function (response) {
            responseComp = response;
            //response.response == Success || Failed
            resultAjax_Success(response, dtc)
        },
        error: function (response) {
            messageError();
        },
        complete: function (response) {
            if (response.status == 401) {
                //Hide Modals
                $(".modal").modal("hide");
                //Show Modal
                $("#mdMessageSession").modal("show");
            }
            else {
                //To catch controller errors
                if (responseComp != undefined) {
                    if (responseComp.response == "Unknown") {
                        messageError();
                    } else {
                        resultAjax_Complete(responseComp, dtc)
                    }
                }
                if (dtc.buttonAction != undefined) {
                    //If the HTML content changes in the "success" event, the HTML content is not modified again
                    if ((dtc.buttonAction).html() == textButtonAction) {
                        (dtc.buttonAction).html(htmlButtonAction);
                    }
                    (dtc.buttonAction).prop("disabled", false);
                }
            }
        }
    });
}
//Load PartialView
function loadPartialView_Table(dtc) {//table, buttons, textLoading, urlPartialView, data) {
    var numberDate = Date.now();
    var numberRandom = Math.random();
    var arrayRandom = String(numberRandom).split(".");
    var refRandom = numberDate + arrayRandom[1];

    if (dtc.loading == undefined || dtc.loading == true) {
        if (dtc.textLoading == "" || dtc.textLoading == undefined) {
            dtc.textLoading = "Obteniendo datos...";
        }
    }

    $.ajax({
        type: (dtc.type != undefined ? dtc.type : "POST"),
        url: dtc.directory,
        data: dtc.objectAjax,
        beforeSend: function () {
            if (dtc.fadeTable == undefined || dtc.fadeTable == true) {
                (dtc.table).hide();
            }
            if (dtc.loading == undefined || dtc.loading == true) {
                (dtc.table).before("<div id='" + refRandom + "'></div>");
                $("#" + refRandom).html("<div class='row justify-content-center pt-3'><div class='spinner-border text-secondary' role='status'><span class='sr-only'></span></div></div><div class='row justify-content-center pt-2'><label class='text-secondary'>" + dtc.textLoading + "</label></div>");
            }
            if (!dtc.buttonsArea == "" || !dtc.buttonsArea == undefined) {
                (dtc.buttonsArea).hide();
            }
            if (!dtc.buttonAction == "" || !dtc.buttonAction == undefined) {
                dtc.buttonAction.prop("disabled", true);
            }
        },
        success: function (response) {
            responseComp = response;
            (dtc.table).html(response);
            if (dtc.actionAfter != undefined) {
                resultPartialView_Success(dtc.actionAfter)
            }
        },
        error: function () {
            message("No se han podido obtener los datos, por favor verifique su conexión a Internet e intente de nuevo, en caso de que sea un error recurrente, por favor comuníquese con el Administrador")
        },
        complete: function (response) {
            if (response.status == 401) {
                //Hide Modals
                $(".modal").modal("hide");
                //Show Modal
                $("#mdMessageSession").modal("show");
            }
            else {
                if (dtc.waitTimeAction == undefined) {
                    dtc.waitTimeAction = 0;
                }
                setTimeout(function () {
                    if (dtc.loading == undefined || dtc.loading == true) {
                        $("#" + refRandom).remove();
                    }
                    if (responseComp != undefined) {
                        if (dtc.fadeTable == undefined || dtc.fadeTable == true) {
                            (dtc.table).fadeIn(200);
                        }

                        if (!dtc.buttonsArea == "" || !dtc.buttonsArea == undefined) {
                            (dtc.buttonsArea).fadeIn(200);
                        }
                        if (!dtc.buttonAction == "" || !dtc.buttonAction == undefined) {
                            dtc.buttonAction.prop("disabled", false);
                        }
                        if (dtc.scrollToRef == true) {
                            refHTML = (dtc.buttonsArea != undefined ? dtc.buttonsArea : dtc.table);
                            scrollSpeed = (dtc.scrollSpeed != undefined ? dtc.scrollSpeed : 1200);
                            scrollToRef(refHTML, scrollSpeed);
                        }
                        if (dtc.actionAfter != undefined) {
                            resultPartialView_Complete(dtc.actionAfter)
                        }
                    }
                }, dtc.waitTimeAction)
            }
        }
    });
}
//Load DDL
function loadDDL(ref, urlDDL) {
    ref = getReference(ref);
    $.ajax({
        type: "POST",
        url: urlDDL,
        //data:{Porperty:value},
        beforeSend: function () {
        },
        success: function (response) {
            ref.html(response);
        },
        error: function (response) {
            messageError();
        },
        complete: function () {
            ref.val("0")
        }
    });
}


function clean(ref) {
    ref = getReference(ref);
    $(ref).each(function () {
        reference = $(this);
        let type = reference[0].tagName;
        if ((type == "INPUT") || (type == "TEXTAREA")) {
            if (reference[0].type == "radio" || reference[0].type == "checkbox") {
                reference.prop("checked", false);
            } else {
                reference.val("");
            }
        }
        else if (type == "SELECT") {
            reference[0].selectedIndex = 0
        }
    });
}

function cleanTable(ref) {
    ref = getReference(ref);
    $("#" + ref.attr("id") + " tr.table-info").removeClass('table-info');
}

function getValue(ref) {
    ref = getReference(ref);
    let value = $(ref).val().trim();
    return value;
}
function setValue(ref, value) {
    ref = getReference(ref);
    $(ref).val(value);
}

function setValueDinamic(objectDDL) {
    //Para funciones obsoletas
    if (objectDDL.ref == undefined) {
        objectDDl.ref = objectDDL.Ref;
    }
    //Fin para funciones obsoletas
    ref = getReference(objectDDL.ref);
    //Search and validate that the value exists in the options
    if (!$("#" + ref.attr("id") + " > option[value='" + objectDDL.value + "']").length) {
        ref.append('<option class="temporal-option" value="' + objectDDL.value + '">' + objectDDL.text + '</option>');
    }
    //Set value
    ref.val(objectDDL.value);
}

function loadNavBar(prefix) {
    //Add properties of dataConfig object and call function that load PartialView
    let load = new dataConfigPartialView();
    load.directory = (prefix == undefined ? "" : prefix) + "Shared/_Navbar";
    load.buttonsArea = $("#divBar");
    load.table = $("#divBar");
    load.loading = false;
    load.execute();
}
function loadNavBarPublic(prefix) {
    //Add properties of dataConfig object and call function that load PartialView
    let load = new dataConfigPartialView();
    load.directory = (prefix == undefined ? "" : prefix) + "Shared/_NavbarPublic";
    load.buttonsArea = $("#divBar");
    load.table = $("#divBar");
    load.loading = false;
    load.execute();
}

//funciones obsoletas
function formRequiredError(c, value, Ref) {
    var stringObject = "#".concat(Ref);
    var RefObject = $(stringObject)
    var type = RefObject[0].tagName;
    if ((type == "INPUT") || (type == "TEXTAREA")) {
        if (value == "") {
            clean(Ref)
            $(RefObject).addClass("form-control-error");
            c = c + 1;
        }
    }
    else if (type == "SELECT") {
        if (value == 0) {
            clean(Ref)
            $(RefObject).addClass("form-control-error");
            c = c + 1;
        }
    }
    return c;
}
function formRequiredErrorB(c, value, Ref) {
    var stringObject = "#".concat(Ref);
    var RefObject = $(stringObject)
    var type = RefObject[0].tagName;
    if (type == "SELECT") {
        if (value == "") {
            clean(Ref)
            $(RefObject).addClass("form-control-error");
            c = c + 1;
        }
    }
    return c;
}
//Fin funciones obsoletas
