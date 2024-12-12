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
                        <span class="prime-color">MOSFET INFORMATION</span>
                    </div>
                </div>
                <div class="row param">
                    <div class="col">
                        <span>VDS Max (Datasheet)</span>
                    </div>
                    <div class="col" style="text-align:right" id="info-vds-${i}">
                    </div>
                </div>
                <div class="row param">
                    <div class="col">
                        <span>ID Max (Datasheet)</span>
                    </div>
                    <div class="col" style="text-align:right" id="info-id-${i}">
                    </div>
                </div>
                
                <br/>
                
                <div class="row param">
                    <div class="col">
                        <span class="prime-color">GATE CALCULATION</span>
                    </div>
                </div>
                <div class="row param">
                    <div class="col">
                        <span>Total Gate Charge (Datasheet)</span>
                    </div>
                    <div class="col" style="text-align:right" id="info-gc-${i}">
                    </div>
                </div>
                <div class="row param">
                    <div class="col">
                        <span>Gate Source Peak Current : </span>
                    </div>
                    <div class="col" style="text-align:right" id="result-ig-source-peak-${i}">
                    </div>
                </div>
                <div class="row param">
                    <div class="col">
                        <span>Gate Sink Peak Current : </span>
                    </div>
                    <div class="col" style="text-align:right" id="result-ig-sink-peak-${i}">
                    </div>
                </div>
                <div class="row param">
                    <div class="col">
                        <span>Max Gate Resistor : </span>
                    </div>
                    <div class="col" style="text-align:right" id="result-gate-res-${i}">
                    </div>
                </div>

                <br/>

                <div class="row param">
                    <div class="col">
                        <span class="prime-color">LOSS CALCULATION</span>
                    </div>
                </div>
                <div class="row param">
                    <div class="col">
                        <span>Conduction Loss / Pcond : </span>
                    </div>
                    <div class="col" style="text-align:right" id="result-cond-loss-${i}">
                    </div>
                </div>

                <div class="row  param">
                    <div class="col">
                        <span>Switching Loss / Psw : </span>
                    </div>
                    <div class="col" style="text-align:right" id="result-sw-loss-${i}">
                    </div>
                </div>

                <div class="row param">
                    <div class="col">
                        <span>Output Capacitance Loss / Pcoss : </span>
                    </div>
                    <div class="col" style="text-align:right" id="result-coss-loss-${i}">
                    </div>
                </div>

                <div class="row  param">
                    <div class="col">
                        <span>Gate charge Loss / Pgc : </span>
                    </div>
                    <div class="col" style="text-align:right" id="result-gc-loss-${i}">
                    </div>
                </div>

                <div class="row param">
                    <div class="col">
                        <span>Total Loss / Ptotal : </span>
                    </div>
                    <div class="col" style="text-align:right" id="result-total-loss-${i}">
                    </div>
                </div>
            </div>
        `;

        // calculate
        let igsourcepeak = (mosfetData[i].Qg/1000000000) / (inputRiseTimeValue / 1000000000);
        let igsinkpeak = (mosfetData[i].Qg/1000000000) / (inputFallTimeValue / 1000000000);
        let pcond = (inputOutputCurrentValue * inputOutputCurrentValue) * (mosfetData[0].rds_typ / 1000) * (inputDutyCycleValue/100);
        let psw = 0.5 * inputBusVoltageValue * inputOutputCurrentValue * ((inputRiseTimeValue + inputFallTimeValue) / 1000000000) * inputSwitchingFrequency;
        let pcoss = 0.5 * (mosfetData[i].coss/1000000000000) * (inputBusVoltageValue * inputBusVoltageValue) * inputSwitchingFrequency;
        let pgc = (mosfetData[i].Qg/1000000000) * inputVgsValue * inputSwitchingFrequency;
        let ptot = pcond + psw + pcoss + pgc;

        let higherPeakCurrent = igsourcepeak;
        if(igsinkpeak > igsourcepeak){higherPeakCurrent = igsinkpeak;}
        let gateResistor = inputVgsValue / higherPeakCurrent;

        // show value
        document.getElementById('result-mosfet-name-'+String(i)).textContent = mosfetData[i].name;
        document.getElementById('result-ig-source-peak-'+String(i)).textContent = String(igsourcepeak.toFixed(3)) + " A";
        document.getElementById('result-ig-sink-peak-'+String(i)).textContent = String(igsinkpeak.toFixed(3)) + " A";
        document.getElementById('result-gate-res-'+String(i)).textContent = String(gateResistor.toFixed(3)) + " Ω";
        document.getElementById('result-cond-loss-'+String(i)).textContent = String(pcond.toFixed(3)) + " W";
        document.getElementById('result-sw-loss-'+String(i)).textContent = String(psw.toFixed(3)) + " W";
        document.getElementById('result-coss-loss-'+String(i)).textContent = String(pcoss.toFixed(3)) + " W";
        document.getElementById('result-gc-loss-'+String(i)).textContent = String(pgc.toFixed(3)) + " W";
        document.getElementById('result-total-loss-'+String(i)).textContent = String(ptot.toFixed(3)) + " W";

        document.getElementById('info-vds-'+String(i)).textContent = String(mosfetData[i].vds.toFixed(0)) + " V";
        document.getElementById('info-id-'+String(i)).textContent = String(mosfetData[i].ids.toFixed(0)) + " A";
        document.getElementById('info-gc-'+String(i)).textContent = String(mosfetData[i].Qg.toFixed(0)) + " nC";



        // check eligibility of every parameter
        if(inputBusVoltageValue > mosfetData[i].vds){
            document.getElementById('info-vds-'+String(i)).style.backgroundColor = 'red';
            document.getElementById('info-vds-'+String(i)).style.color = '#ffffff';
        }

        if(inputOutputCurrentValue > mosfetData[i].ids){
            document.getElementById('info-id-'+String(i)).style.backgroundColor = 'red';
            document.getElementById('info-id-'+String(i)).style.color = '#ffffff';
        }

    }

}