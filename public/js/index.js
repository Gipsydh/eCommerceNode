document.querySelector('.navbar').outerHTML = `

<div class="searchScreen navStatus">
    <div class="searchBox">
        <div class="closeBtn">
            <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="searchBar">
            <span>What are you looking for</span>
            <input type="text" name="" id="searchInput" placeholder="Search" autocomplete="off">
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="outputBar">

        </div>
    </div>
</div>

<div class="navbarContainer">
    <div class="navbar">
        <div class="topBar">
            <div class="left">
                <div class="navbarInfo btn">
                    <i class="fa-solid fa-phone"></i>
                    <span>8436432955</span>
                </div>
                <div class="navbarInfo btn">
                    <i class="fa-regular fa-envelope-open"></i>
                    <span>admin@gmail.com</span>
                </div>
            </div>
            <div class="right">
                <div class="accounts btn">
                    <i class="fa-solid fa-user"></i>
                    <span>My Account</span>
                </div>
            </div>
        </div>
        <div class="bottomBar">
            <div class="logo">
                <span>TechTronics</span>
            </div>
            <div class="mobileNavbarMenu">
                <i class="fa-solid fa-bars btn"></i>
                <span>Logo</span>
            </div>
            <div class="bottomNavbar">
                <div class="option btn homeNavbar" onmouseenter="dropdownOptions()">
    
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
                <div class="search btn navbarElmOp">
                    <i class="fa-solid fa-lg fa-magnifying-glass"></i>
                </div>
                <div class="like btn">
                    <i class="fa-regular fa-lg fa-heart"></i>
                    <div class="count">
                        <span>0</span>
                    </div>
                </div>
                <div class="cart btn navbarElmOp">
                    <i class="fa-solid fa-lg fa-bag-shopping"></i>
                    <div class="count">
                        <span>0</span>
                    </div>
                </div>
                <div class="cartDD">
                    <div class="emptyCart" style="min-width:200px; margin:20px 0;">
                        <span style="margin:20px;font-size:13px;font-weight:400;color:#222; display:block; text-align:center;">Your cart is empty</span>
                    </div>
                    <div class="cartProd cartElm">
                        
                    </div>
                    <div class="bottomRes cartElm">
                        <div class="bill">
                            <table>
                                <tr>
                                    <td>Sub-total</td>
                                    <td>$20.00</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td class="totalCartPrice">$20.00</td>
                                </tr>
                            </table>
                        </div>
                        <div class="options">
                            <a class="btn cartDetails" href="../userCart/cartDetails.html">
                                <span>View Cart</span>
                            </a>
                            <div class="btn cartCheckout">
                                <span>Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
        <div class="checking mobileMoreOptns">
            <div class="option ddHomeInfo">
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
            <div class="option ddShopLink">
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
    
    </div>
</div>


<div class="cartBG navStatus"></div>
`