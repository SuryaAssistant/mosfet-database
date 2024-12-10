# Mosfet Database
This repository is dedicated to collecting, organizing, and sharing MOSFET data parameters for engineers, hobbyists, and anyone working with MOSFETs in their projects. The goal is to provide a centralized and easy-to-navigate database for commonly used MOSFETs, including their key specifications and datasheets.

## Repository Structure
The repository is organized as follows:

```
|--- README.md                  # This file
|--- parameters/                # Directory for storing MOSFET parameter files
|    |--- n-channel/            # Directory for N-channel MOSFETs
|    |    |--- DPAK/            # Sorting MOSFET based on package
|    |    |--- D2PAK/
|    |    |---
|    |--- p-channel/            # Directory for P-channel MOSFETs
|--- scripts/                   # Any scripts used for processing or analyzing data
```

## Example File Format
Each MOSFET has its own .json file under the `parameters/` directory. For `json` template, please copy `template.json`.

Detailing the key parameters:

```
{
    "name": "SP010N02AGHTO",
    "manufacture": "Siliup Semicondctor",
    "type": "N-Channel",
    "package": "TOLL",
    "vds": 100,
    "ids": 340,
    "rds_typ": 1.3,
    "rds_max": 1.65,
    "vgs_min": -20,
    "vgs_max": 20,
    
    .
    .
    .

    "Td_on": 25,
    "Td_off": 89,
    "Tr": 75,
    "Tf": 29,
    "datasheet" : "https://wmsc.lcsc.com/wmsc/upload/file/pdf/v2/lcsc/2404191548_Siliup-SP010N02AGHTO_C22385351.pdf"
}
```

## MOSFET Parameters
This repository tracks MOSFET parameters, including:

| Parameter | Variant | Description | Test Condition | Unit |
| :---: | :---: | :--- | :--- | :---: |
| `name` | `name` | Product name from manufacture | | |
| `manufacture` | `manufacture` | MOSFET manufacture | | |
| `type` | `type` | MOSFET Type.<br/>Example : `N-channel`, `P-channel` | | |
| `package` | `package` | MOSFET Package.<br/>Example : `TO-220AB`, `D2PAK`, etc. | |
| `vds` | `vds` | Maximum drain-source voltage | | V |
| `ids` | `ids`, `ids_100` | Mosfet drain current | `ids` : @Tc 25°C <br/> `ids_100` : @Tc 25°C | A |
| `idm` | `idm` | Mosfet pulsed drain current | | A |
| `vgs` | `vgs_min`, `vgs_max` | Gate voltage | | | V |
| `eas` | `eas` | Single pulse avalanche energy | | mJ |
| `ias` | `ias` | Avalanche current | | A |
| `pd`  | `pd`  | Maximum power dissipation | @Tc 25°C | W |
| `derating` | `derating` | Mosfet linear derating factor | | W/°C |
| `rjc` | `rjc` | Junction-to-case thermal resistance | | °C/W |
| `rjs` | `rjs` | Junction-to-sink thermal resistance | | °C/W |
| `rja` | `rja` | Junction-to-ambient thermal resistance | | °C/W |
| `t_stg` | `t_stg_min`, `t_stg_max` | Storage temperature | | °C |
| `t_j` | `t_j_min`, `t_j_max` | Junction temperature | | °C |
| `bvdss` | `bvdss_min` | Minimum MOSFET breakdown voltage | @Vgs 0V | V |
| `bvdss_coeff` | `bvdss_coeff` | Breakdown voltage temperature coeffisien | @Tj 25°C | V/°C |
| `idss` | `idss_max` | Drain-to-Source leakage current | @Tj 25°C | uA |
| `igss` | `igss_max` | Gate-to-Source leakage current |  | +/- nA |
| `vgs_th` | `vgs_th_min`, `vgs_th_typ`, `vgs_th_max` | Gate-source voltage threshold | | V |
| `rds` | `rds_typ`, `rds_max` | MOSFET Rds(on) | @Vgs 10V | mΩ |
| `rg` | `rg`, `rg_max` | MOSFET gate internal resistance | | Ω |
| `gfs` | `gfs_min`, `gfs_typ`, `gfs_max` | Forward Transinductance | | S |
| `ciss` | `ciss_min`, `ciss`, `ciss_max` | Input capacitance | | pF |
| `coss` | `coss_min`, `coss`, `coss_max` | Output capacitance | | pF |
| `crss` | `crss_min`, `crss`, `crss_max` | Reverse transfer capacitance | | pF |
| `Qg` | `Qg_min`, `Qg`, `Qg_max` | Total gate charge | | nC |
| `Qgs` | `Qgs_min`, `Qgs`, `Qgs_max` | Gate-to-source charge | | nC |
| `Qgd` | `Qgd_min`, `Qgd`, `Qgd_max` | Gate-to-drain ("Miller") charge | | nC |
| `Qsw` | `Qsw_min`, `Qsw`, `Qsw_max` | Switching charge | | nC |
| `Qoss` | `Qoss_min`, `Qoss`, `Qoss_max` | Output charge | | nC |
| `vplateau` | `vplateau_min`, `vplateau`, `vplateau_max` | MOSFET plateau ("Miller") voltage | | V |
| `Td_on` | `Td_on` | Turn-on delay | | n sec |
| `Tr` | `Tr` | Rise time | | n sec |
| `Td_off` | `Td_off` | Turn-off delay | | n sec |
| `Tf` | `Tf` | Fall time | | n sec |
| `vsd` | `vsd_min`, `vsd_typ`, `vsd_max` | MOSFET internal diode forward voltage | | V |
| `is` | `is_max` | MOSFET internal diode forward current | | V |
| `is_pulse` | `is_pulse_max` | MOSFET internal diode pulsed current | | A |
| `Trr` | `Trr`,  `Trr_max` | Diode reverse recovery time | @Tj 25°C | n sec |
| `Qrr` | `Qrr`, `Qrr_max` | Diode reverse recovery charge | @Tj 25°C | n sec |
| `datasheet` | `datasheet` | Source of datasheet external link | | | 


## Usage
- Search the repository for the MOSFET part number.
- View the corresponding parameter file or datasheet.
- Use the data in your design calculations or simulations.

## Contributing
We welcome contributions! If you have MOSFET data or datasheets to add:

1. Fork the repository and create a branch for your contribution.
2. Add the MOSFET parameter file to the appropriate directory under `parameters/`.
3. Submit a pull request with a clear description of your changes.

## License
This repository is licensed under the MIT License. Feel free to use and distribute the content with proper attribution.
