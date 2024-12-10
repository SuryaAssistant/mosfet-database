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
    "vgs_max": 20,
    "vgs_min": -20,
    "idm": 1360,
    "eas": 558,
    "pd": 400,
    "rjc": 0.38,
    "rja": "-",
    "t_stg_min": -55,
    "t_stg_max": 150,
    "t_j_min": -55,
    "t_j_max": 150,
    "bvdss_min": 100,
    "idss_max": 1,
    "igss_max": 100,
    "vgs_th_min": 2,
    "vgs_tg_typ": 2.6,
    "vgs_th_max": 4,
    "ciss": 13531,
    "coss": 1889,
    "crss": 82,
    "Qg": 198,
    "Qgs": 51,
    "Qgd": 37,
    "Td_on": 25,
    "Td_off": 89,
    "Tr": 75,
    "Tf": 29,
    "datasheet" : "https://wmsc.lcsc.com/wmsc/upload/file/pdf/v2/lcsc/2404191548_Siliup-SP010N02AGHTO_C22385351.pdf"
}
```

## Contributing
We welcome contributions! If you have MOSFET data or datasheets to add:

1. Fork the repository and create a branch for your contribution.
2. Add the MOSFET parameter file to the appropriate directory under `parameters/`.
3. Submit a pull request with a clear description of your changes.

## MOSFET Parameters
This repository tracks MOSFET parameters, including:

- name: MOSFET name from manufacture
- manufacture: The source manufacture of MOSFET
- type: N-Channel or P-Channel of MOSFET
- vds: Maximum drain-source voltage (V)
- ids: Maximum drain current (A)
- rds_type, rds_max: MOSFET Rds(on) (mΩ)
- Vds_max: Maximum drain-source voltage (Volt)
- vgs_min, vgs_max: MOSFET gate voltage (Volt)
- idm: Maximum pulsed drain current (A)
- eas: Singel pulsed avalanche energy (mJ)
- pd: Power dissipasion (W)
- derating: Derating factor (W/°C)
- rjc: Thermal resistance junction-to-case (°C/W)
- rja: Thermal resistance junction-to-ambient (°C/W)
- t_stg_min, t_stg_max: Storage temperature (°C)
- t_j_min, t_j_max: Junction temperature (°C)
- bvdss_min: Minimum MOSFET breakdown voltage (V)
- idss_max: Maximum drain-source leakage current (uA)
- igss_max: Maximum gate-source leakage current (nA)
- vgs_th_min, vgs_th_typ, vgs_th_max: Gate threshold voltage (V)
- gfs_min: Forward transconductance (S)
- ciss, coss, crss: Capacitance between mosfet terminal (pF)
- Qg, Qgs, Qgd: MOSFET charge (nC)
- Td_on, Td_off: MOSFET delay (n sec)
- Tr, Tf: Mosfet rise and fall time (n sec)
- vsd_max: Maximum MOSFET diode forward voltage (V)
- is_max: Maximum diode forward current (A)
- Trr: Diode reverse recovery time (n sec)
- Qrr: Diode reverse recovery charge (nC)

## Usage
- Search the repository for the MOSFET part number.
- View the corresponding parameter file or datasheet.
- Use the data in your design calculations or simulations.

## License
This repository is licensed under the MIT License. Feel free to use and distribute the content with proper attribution.
