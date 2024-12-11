function menu(choosedMenu){
    let menuButton = [];
    menuButton.push(document.getElementById('btn-menu-0'));
    menuButton.push(document.getElementById('btn-menu-1'));
    menuButton.push(document.getElementById('btn-menu-2'));


    let menuPage = [];
    menuPage.push(document.getElementById('mosfet-database'));
    menuPage.push(document.getElementById('power-calculator'));
    menuPage.push(document.getElementById('switching-calculator'));


    // deactival all button and page
    for(let i=0; i<menuButton.length; i++){
        menuButton[i].classList.remove('btn-sidebar-active');
        menuButton[i].classList.add('btn-sidebar');

        menuPage[i].style.display = 'none';
    }

    // only activate selected button
    menuButton[choosedMenu].classList.remove('btn-sidebar');
    menuButton[choosedMenu].classList.add('btn-sidebar-active');

    menuPage[choosedMenu].style.display = 'block';
}