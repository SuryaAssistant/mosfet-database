function menu(choosedMenu){
    console.log(choosedMenu)
    let menuButton = [];
    menuButton.push(document.getElementById('btn-menu-0'));
    menuButton.push(document.getElementById('btn-menu-1'));
    menuButton.push(document.getElementById('btn-menu-2'));


    let menuPage = [];
    menuPage.push(document.getElementById('mosfet-database'));
    menuPage.push(document.getElementById('power-calculator'));
    menuPage.push(document.getElementById('switching-calculator'));


    // deactival all button and page
    for(let i=0; i<menuPage.length; i++){
        menuButton[i].classList.remove('active');

        menuPage[i].style.display = 'none';
    }

    // only activate selected button
    //menuButton[choosedMenu].classList.remove('btn-sidebar');
    menuButton[choosedMenu].classList.add('active');

    menuPage[choosedMenu].style.display = 'block';
}