var inputBusVoltageValue = 0;
var inputOutputCurrentValue = 0;
var inputDutyCycleValue = 0;
var inputVgsValue = 0;
var inputSwitchingFrequency = 0;
var inputRiseTimeValue = 0;
var inputFallTimeValue = 0;

function calculateLoss(){

    // Reset chart data
    powerLossData.labels = [];
    powerLossData.datasets[0].data = [];
    powerLossData.datasets[1].data = [];
    powerLossData.datasets[2].data = [];
    powerLossData.datasets[3].data = [];

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
        let igsourcepeak;
        let igsinkpeak;
        let pcond;
        let psw;
        let pgc;
        let ptot;

        // allways use max number first
        let mosfetQg;
        let mosfetRds;
        let mosfetCoss;
        if(mosfetData[i].Qg_max != null){
            mosfetQg = mosfetData[i].Qg_max;
        } else {
            mosfetQg = mosfetData[i].Qg;
        }
        if(mosfetData[i].rds_max != null){
            mosfetRds = mosfetData[i].rds_max;
        } else{
            mosfetRds = mosfetData[i].rds_typ;
        }
        if(mosfetData[i].coss_max != null){
            mosfetCoss = mosfetData[i].coss_max;
        } else{
            mosfetCoss  =mosfetData[i].coss;
        }

        igsourcepeak = (mosfetQg/1000000000) / (inputRiseTimeValue / 1000000000);
        igsinkpeak = (mosfetQg/1000000000) / (inputFallTimeValue / 1000000000);
        pcond = (inputOutputCurrentValue * inputOutputCurrentValue) * (mosfetRds / 1000) * (inputDutyCycleValue/100);
        psw = 0.5 * inputBusVoltageValue * inputOutputCurrentValue * ((inputRiseTimeValue + inputFallTimeValue) / 1000000000) * inputSwitchingFrequency;
        pcoss = 0.5 * (mosfetCoss/1000000000000) * (inputBusVoltageValue * inputBusVoltageValue) * inputSwitchingFrequency;
        pgc = (mosfetQg/1000000000) * inputVgsValue * inputSwitchingFrequency;
        ptot = pcond + psw + pcoss + pgc;

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


        // Add to chart
        powerLossData.labels.push(mosfetData[i].name);
        powerLossData.datasets[0].data.push(pcond);
        powerLossData.datasets[1].data.push(psw);
        powerLossData.datasets[2].data.push(pcoss);
        powerLossData.datasets[3].data.push(pgc);

        powerLossChart.update();
    }

}

// Power Loss Chart
const powerLossData = {
    labels: [],
    datasets: [
        {
            label: 'Conduction Loss',
            data: [],
            backgroundColor: '#1e2749',
        },
        {
            label: 'Switching Loss',
            data: [],
            backgroundColor: '#f46d43',
        },
        {
            label: 'Coss Loss',
            data: [],
            backgroundColor: '#66bd63',
        },
        {
            label: 'Gate Charge Loss',
            data: [],
            backgroundColor: '#ae7dac',
        }
    ]
}; 

const lossChart = document.getElementById('loss-chart');
const powerLossChart = new Chart(lossChart, {
    type: 'bar',
    data: powerLossData,
    options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        animation: false, // Disable animation
        maintainAspectRatio: false,

        plugins: {
            title: {
                display: true,
                text: "MOSFET Power Loss"
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: {display: false},
                ticks: {autoSkip: true},
                title: {
                    display: true,
                    text: 'Power Loss (W)'
                }
            },
            y: {
                stacked: true,
                grid: {display: false},
            }
        }
    }
});


