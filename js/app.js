document.addEventListener('DOMContentLoaded',function () {
    let values = {
        product: 2,
        order: 1,
        package: {
            basic: 0,
            professional: 25,
            premium: 60,
        },
        accounting: 45,
        terminal : 100

    }

    let state = {
        productNumber : 0,
        ordersNumber: 0,
        packageOption: 0,
        accounting: false,
        rental: false

    }

    ////////////////final?////////////
    const reCalculate = function () {
        let total = 0
        total += state.productNumber
        total += state.ordersNumber
        if (state.packageOption === 0){
            total += 0
        }else if (state.packageOption == 1){
            total += values.package.professional

        }else{
            total += values.package.premium
        }
        if(state.accounting){
            total += values.accounting
        }
        if(state.rental){
            total += values.terminal
        }
        console.log(total);

        const totalPrice = document.querySelector(".total__price");
        totalPrice.innerText = "$" + total
    }


    ///////////Product///////////
    const productNumber = document.getElementById("products");
    productNumber.addEventListener('click',function () {
        const currProducts = this.value

        state.productNumber = parseInt(this.value)

        const liProducts = document.querySelector('[data-id=products]');
        liProducts.classList.add('open')
        const productCalc = liProducts.querySelector(".item__calc");
        let currentPriceProduct = `${currProducts} * ${values.product}`
        productCalc.innerText = currentPriceProduct;
        const totalyProduct = liProducts.querySelector('.item__price');
        let totalProductPrice = currProducts * values.product;
        totalyProduct.innerText = "$" + totalProductPrice;
        reCalculate()


    })
    ////////////Orders//////////////////
    const ordersNumber = document.getElementById('orders')
    ordersNumber.addEventListener('input',function () {
        const currOrders = parseInt(this.value)
        state.ordersNumber = currOrders

        const orderProducts = document.querySelector('[data-id=orders]');
        orderProducts.classList.add('open')
        const textProducts = orderProducts.querySelector(".item__calc");
        let currTextProducts = `${currOrders} * ${values.order}`
        textProducts.innerText = currTextProducts;
        const orderPrice = orderProducts.querySelector(".item__price");
        let currOrderPrice = currOrders * values.order
        orderPrice.innerText = "$" + currOrderPrice
        reCalculate()

    })
    //////////////////////SelectMenu///////////////////
    const calcOptionsSelect = document.querySelector("#package");
    calcOptionsSelect.addEventListener('click',function () {
        this.classList.toggle('open');
        reCalculate()

    })

    const selector = document.querySelector(".select__dropdown");
    const li = selector.querySelectorAll("li");
    li.forEach(function (element) {
        element.addEventListener('click',function () {
            const currOption = this.dataset.value
            const packageProducts = document.querySelector('[data-id=package]');
            packageProducts.classList.add('open')
            const currPackage = document.querySelector(".calc__summary");
            const ulSummary = currPackage.querySelector("ul");
            const currentLi = ulSummary.querySelector("[data-id=package]");
            const packageType = currentLi.querySelector('.item__calc');
            packageType.innerText = currOption
            if (currOption == "basic"){
                state.packageOption = 0
                const currPrice = currentLi.querySelector('.item__price')
                currPrice.innerText = "$" + values.package.basic
                reCalculate()
            }else if(currOption == "professional"){
                state.packageOption = 1
                const currPrice = currentLi.querySelector('.item__price')
                currPrice.innerText = "$" +  values.package.professional
                reCalculate()

            }else{
                state.packageOption = 2
                const currPrice = currentLi.querySelector('.item__price')
                currPrice.innerText = "$" +  values.package.premium
                reCalculate()

            }

        })

    })
    ///////////////////checkBoxy//////////////////////
    const firstCheckBox = document.querySelector("#accounting");
    firstCheckBox.addEventListener('click',function () {
        state.accounting = this.checked
        const account = document.querySelector("[data-id=accounting]");
        account.classList.toggle('open')
        const boxPrice = account.querySelector(".item__price");
        boxPrice.innerText = "$" +  values.accounting
        reCalculate()

    })

    const secondCheckBox = document.querySelector("#terminal");
    secondCheckBox.addEventListener('click',function () {
        state.rental = this.checked
        const  terminalBox = document.querySelector("[data-id=terminal]");
        terminalBox.classList.toggle('open');
        const terminalPrice = terminalBox.querySelector(".item__price")
        terminalPrice.innerText = "$" +  values.terminal
        reCalculate()
    })



})