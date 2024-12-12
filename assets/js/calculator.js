var inputBusVoltageValue = 0;
var inputOutputCurrentValue = 0;
var inputDutyCycleValue = 0;
var inputVgsValue = 0;
var inputSwitchingFrequency = 0;
var inputRiseTimeValue = 0;
var inputFallTimeValue = 0;

function calculateLoss(mosfets){

    // copy mosfet data from database
    let mosfetData = [];
    for(let i=0; i<database.length; i++){
        if(database[i].isChecked){
            mosfetData.push(database[i]);
        }
    }

    // Fetch input from user
    inputBusVoltageValue = Number(document.getElementById('input-bus-voltage').value);
    inputOutputCurrentValue = Number(document.getElementById('input-output-current').value);
    inputDutyCycleValue = Number(document.getElementById('input-duty-cycle').value);
    inputVgsValue = Number(document.getElementById('input-vgs').value);
    inputSwitchingFrequency = Number(document.getElementById('input-switching-frequency').value);
    inputRiseTimeValue = Number(document.getElementById('input-rise-time').value);
    inputFallTimeValue = Number(document.getElementById('input-fall-time').value);

    let resultElement = document.getElementById('result-field');
    resultElement.innerHTML = ``;
    for(let i=0; i<mosfetData.length; i++){
        resultElement.innerHTML += `
            <h5>Results <span id="result-mosfet-name-${i}"></span></h5>

            <div class="col">
                <div class="row param">
                    <div class="col">
                        <span>MOSFET INFORMATION</span>
                    </div>
                </div>
                <div class="row param">
                    <div class="col">
                        <span>VDS Max</span>
                    </div>
                    <div class="col" style="text-align:right">
                        <span id="info-vds-${i}"></span><span> V</span>
                    </div>
                </div>
                <div class="row param">
                    <div class="col">
                        <span>ID Max</span>
                    </div>
                    <div class="col" style="text-align:right">
                        <span id="info-id-${i}"></span><span> A</span>
                    </div>
                </div>
                
                <br/>
                
                <div class="row param">
                    <div class="col">
                        <span>GATE CALCULATION</span>
                    </div>
                </div>
                <div class="row param">
                    <div class="col">
                        <span>Gate peak current : </span>
                    </div>
                    <div class="col" style="text-align:right">
                        <span id="result-ig-peak-${i}"></span><span> A</span>
                    </div>
                </div>

                <br/>

                <div class="row param">
                    <div class="col">
                        <span>LOSS CALCULATION</span>
                    </div>
                </div>
                <div class="row param">
                    <div class="col">
                        <span>Conduction Loss / Pcond : </span>
                    </div>
                    <div class="col" style="text-align:right">
                        <span id="result-cond-loss-${i}"></span><span> W</span>
                    </div>
                </div>

                <div class="row  param">
                    <div class="col">
                        <span>Switching Loss / Psw : </span>
                    </div>
                    <div class="col" style="text-align:right">
                        <span id="result-sw-loss-${i}"></span><span> W</span>
                    </div>
                </div>

                <div class="row param">
                    <div class="col">
                        <span>Output Capacitance Loss / Pcoss : </span>
                    </div>
                    <div class="col" style="text-align:right">
                        <span id="result-coss-loss-${i}"></span><span> W</span>
                    </div>
                </div>

                <div class="row  param">
                    <div class="col">
                        <span>Gate charge Loss / Pgc : </span>
                    </div>
                    <div class="col" style="text-align:right">
                        <span id="result-gc-loss-${i}"></span><span> W</span>
                    </div>
                </div>

                <div class="row param">
                    <div class="col">
                        <span>Total Loss / Ptotal : </span>
                    </div>
                    <div class="col" style="text-align:right">
                        <span id="result-total-loss-${i}"></span><span> W</span>
                    </div>
                </div>
            </div>
        `;

        // calculate
        let igpeak = (mosfetData[i].Qg/1000000000) / (inputRiseTimeValue / 1000000000);
        let pcond = (inputOutputCurrentValue * inputOutputCurrentValue) * (mosfetData[0].rds_typ / 1000) * (inputDutyCycleValue/100);
        let psw = 0.5 * inputBusVoltageValue * inputOutputCurrentValue * ((inputRiseTimeValue + inputFallTimeValue) / 1000000000) * inputSwitchingFrequency;
        let pcoss = 0.5 * (mosfetData[i].coss/1000000000000) * (inputBusVoltageValue * inputBusVoltageValue) * inputSwitchingFrequency;
        let pgc = (mosfetData[i].Qg/1000000000) * inputVgsValue * inputSwitchingFrequency;
        let ptot = pcond + psw + pcoss + pgc;

        // show value
        document.getElementById('result-mosfet-name-'+String(i)).textContent = mosfetData[i].name;
        document.getElementById('result-ig-peak-'+String(i)).textContent = igpeak.toFixed(3);
        document.getElementById('result-cond-loss-'+String(i)).textContent = pcond.toFixed(3);
        document.getElementById('result-sw-loss-'+String(i)).textContent = psw.toFixed(3);
        document.getElementById('result-coss-loss-'+String(i)).textContent = pcoss.toFixed(3);
        document.getElementById('result-gc-loss-'+String(i)).textContent = pgc.toFixed(3);
        document.getElementById('result-total-loss-'+String(i)).textContent = ptot.toFixed(3);
        document.getElementById('info-vds-'+String(i)).textContent = mosfetData[i].vds.toFixed(0);
        document.getElementById('info-id-'+String(i)).textContent = mosfetData[i].ids.toFixed(0);

    }

}