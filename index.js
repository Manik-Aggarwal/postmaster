// hide parameter box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = 'none';

// initialising parameters
let addParamCount = 0;

// utility functs
// 1 func to get DOM element from string
function getEleFromStr(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// if user clicks on json box hide params box and vice versa
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener("click", ()=>{
    document.getElementById('jsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener("click", ()=>{
    document.getElementById('jsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
});

// if user clocks on + it will add
let addParam = document.getElementById('addParam');
addParam.addEventListener("click", ()=>{
    let params = document.getElementById('params');
    let string = `<div class="row my-2">
                    <label for="url" class="col-sm-2 form-label">Parameter ${addParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addParamCount + 2}" placeholder="Enter the parameter key ${addParamCount + 2}">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addParamCount + 2}" placeholder="Enter the parameter value ${addParamCount + 2}">
                    </div>
                    <button class="btn btn-outline-primary col-md-1 deleteParam" style="height: 40px;">-</button>
                  </div>`;

    //convert element strinf to node
    let paramEle = getEleFromStr(string);
    console.log(paramEle);
    params.appendChild(paramEle);

    // to delete parameter
    let deleteParam = document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        item.addEventListener("click", (e)=>{
            e.target.parentElement.remove();
        })
    }
    addParamCount ++;
});

// if user clicks on submit
let submit = document.getElementById('submit');
submit.addEventListener("click", ()=>{
    //document.getElementById('responseText').value = "Please Wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please Wait.. Fetching response...";

    // to fetch from the url
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    // to collect all params
    if(contentType == 'params'){
        data = {};
        for(i=0; i<addParamCount+1; i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined){
            let key = document.getElementById('parameterKey' + (i+1)).value;
            let value = document.getElementById('parameterValue' + (i+1)).value;
            data[key] = value;}
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('jsonText').value;
    }

    console.log(url);
    console.log(contentType);
    console.log(requestType);
    console.log(data);

    // if requesttype is post
    if(requestType == 'GET'){
        fetch(url,{
            method: 'GET',
        })
        .then(response=> response.text())
        .then((text)=>{
            //document.getElementById('responseText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
        })
    }
    else{
        fetch(url,{
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then(response=> response.text())
        .then((text)=>{
            //document.getElementById('responseText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
        })
    }
});