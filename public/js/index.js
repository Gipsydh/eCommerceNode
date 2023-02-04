document.querySelector('.navbar').outerHTML=`  <div class="navbar">
<div class="topBar">
    <div class="left">
        <div class="navbarInfo btn">
            <i class="fa-solid fa-phone"></i>
            <span>8016895112</span>
        </div>
        <div class="navbarInfo btn">
            <i class="fa-regular fa-envelope-open"></i>
            <span>admin@gmail.com</span>
        </div>
    </div>
    <div class="right">
        <div class="accounts btn">
            <i class="fa-solid fa-user"></i>
            <a href="../login"><span>My Account</span></a>
        </div>
    </div>
</div>
<div class="bottomBar">
    <div class="logo">
        <span>Logo</span>
    </div>
    <div class="mobileNavbarMenu">
        <i class="fa-solid fa-bars btn"></i>
        <span>Logo</span>
    </div>
    <div class="bottomNavbar">
        <div class="option btn homeNavbar"  onmouseenter="dropdownOptions()">
            <span>Home</span>
            <i class="fa-solid fa-caret-down"></i>
            <div class="resultDropDown ddHome">
                <div class="Doption"> 
                    <span>Option 1</span>
                </div>
                <div class="Doption">
                    <span>Option 2</span>
                </div>
                <div class="Doption">
                    <span>Option 3</span>
                </div>
                <div class="Doption">
                    <span>Option 4</span>
                </div>
                <div class="Doption">
                    <span>Option 5</span>
                </div>
            </div>
        </div>
        <div class="option shopNavbar btn">
            <span>Shop</span>
            <i class="fa-solid fa-caret-down"></i>
          
        </div>
        <div class="resultDropDown ddShop">
            <div class="ddShopInfo">
                

            </div>
        </div>
    </div>
    <div class="sideNavs">
        <div class="search btn">
            <i class="fa-solid fa-lg fa-magnifying-glass"></i>
        </div>
        <div class="like btn">
            <i class="fa-regular fa-lg fa-heart"></i>
            <div class="count">
                <span>0</span>
            </div>
        </div>
        <div class="cart btn">
            <i class="fa-solid fa-lg fa-bag-shopping"></i>     
            <div class="count">
                <span>0</span>
            </div>
        </div>
    </div>
</div>
<div class="checking mobileMoreOptns">
    <div class="option">
        <div class="optionName">
            <span>Home</span>
        </div>
        <div class="more">
            <i class="fa-solid fa-plus"></i>
        </div>
    </div>
    <div class="mobileViewMenu">
                <div class="Doption"> 
                    <span>Option 1</span>
                </div>
                <div class="Doption">
                    <span>Option 2</span>
                </div>
                <div class="Doption">
                    <span>Option 3</span>
                </div>
                <div class="Doption">
                    <span>Option 4</span>
                </div>
                <div class="Doption">
                    <span>Option 5</span>
                </div>
            </div>
    <div class="option">
    <div class="optionName">
        <span>Shop</span>
    </div>
    <div class="more">
        <i class="fa-solid fa-plus"></i>
    </div>
    </div>
    <div class="mobileViewMenu ddShopInfo">
   
</div>

</div>

</div>`