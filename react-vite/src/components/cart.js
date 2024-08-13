export function initializeCart(){

    if(!localStorage.getItem('Cart')){localStorage.setItem('Cart', '')}
}

export function addToCart(id){
    let cart = localStorage.getItem('Cart')

    if(!cart) cart = ''

    cart += `+=${id}`

    localStorage.setItem('Cart', cart)
}

export function isInCart(id){
    let cart = localStorage.getItem('Cart')

    if(!cart) return false


    let cartArr = [...cart.split(`+=`).filter(num => num)]

    cartArr = cartArr.map(num => parseInt(num))

    return cartArr.includes(id)
}

export function allInCart(){
    let cart = localStorage.getItem('Cart')

    if(!cart) return false


    let cartArr = [...cart.split(`+=`).filter(num => num)]

    cartArr = cartArr.map(num => parseInt(num))

    return cartArr
}

export function calculateFunds(obj){
    let cart = localStorage.getItem('Cart')

    if(!cart) return false

    let cartArr = [...cart.split(`+=`).filter(num => num)]

    cartArr = cartArr.map(num => parseInt(num))

    let total = cartArr.reduce((accum, num) => {
        if(obj[num]?.price){
            return accum + obj[num].price
        }
    }, 0)
    return total.toFixed(2)
}

export function removeFromCart(id){
    let cart = allInCart()

    cart = cart.filter(num => num != id)

    localStorage.setItem('Cart', cart.join('+='))
}

export function clearCart(){
    localStorage.removeItem('Cart')
}
