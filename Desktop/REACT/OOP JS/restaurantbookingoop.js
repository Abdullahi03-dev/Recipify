// class Restaurant{
//     static Tables=[{nameOfCustomer:'tester',time:12,type:'Normal',money:500}];
//     constructor(name,NormalPrice=500,RegularPrice=2000,VipPrice=10000,seats=15){
//             this.name=name
//             this.NormalPrice=NormalPrice
//             this.RegularPrice=RegularPrice
//             this.VipPrice=VipPrice
//             this.seats=seats
//     }

//     bookTable(nameOfCustomer,time,type,money,tableNumber){
//         if(Restaurant.Tables.length==0&&Restaurant.Tables.find(each=>each.type===type)?.time!==time&&this.seats>tableNumber){
//             if(type!=='Normal'&&type!=='Vip'&&type!=='Regular') return alert('INCORRECT NAME IT SHOULD BE (Normal or Regular or Vip)')
//             if(type=='Normal'){
//               money===this.NormalPrice?(Restaurant.Tables.push({nameOfCustomer,time,type}),this.seats--,alert(`SUCCESSFULLY BOOKED A NORMAL TABLE ${this.seats} IS REMAINING`)):alert('INCORRECT MONEY FOR NORMAL CUSTOMERS')
//             }
//             else if(type=='Regular'){
//                 money===this.RegularPrice?(Restaurant.Tables.push({nameOfCustomer,time,type}),this.seats--,alert(`SUCCESSFULLY BOOKED A REGULAR TABLE ${this.seats} IS REMAINING`)):alert('INCORRECT MONEY FOR Regular CUSTOMERS')
//               }
//               else if(type=='Vip'){
//                 money===this.VipPrice?(Restaurant.Tables.push({nameOfCustomer,time,type}),this.seats--,alert(`SUCCESSFULLY BOOKED A VIP TABLE ${this.seats} IS REMAINING`)) :alert('INCORRECT MONEY FOR Vip CUSTOMERS')
//               }
//         }
//         else if(Restaurant.Tables.find(each=>each.type===type)?.time===time){
//             alert('THERE IS NOT AVAILABLE TIME FOR THIS SEAT')
//         }
//         else if(this.seats<tableNumber){
//                 alert(`THERE ARE NO AVAILABLE SEATS FOR YOUR REQUEST, AVAILABLE SEATS ARE ${this.seats}`)
//         }
//         return Restaurant.Tables
//     }
// }


// const restaurant=new Restaurant()
// // restaurant.bookTable('ABDULLAHI',12,'Normal',500)s
// console.log(restaurant.bookTable('ABDULLAHI',12,'Regular',2000,16))
// // console.log(restaurant.bookTable('ABDULLAHI',12,'Normal',500))
// // console.log(restaurant.bookTable('ABDULLAHI',12,'Normal',500))
// // console.log(restaurant.bookTable('ABDULLAHI',12,'Normal',500))



class Restaurant {
    // Load tables from localStorage or initialize with a default table
    static Tables = JSON.parse(localStorage.getItem('tables')) || [
        { nameOfCustomer: 'tester', time: 12, type: 'Normal', money: 500 }
    ];

    constructor(name, NormalPrice = 500, RegularPrice = 2000, VipPrice = 10000, seats = 15) {
        this.name = name;
        this.NormalPrice = NormalPrice;
        this.RegularPrice = RegularPrice;
        this.VipPrice = VipPrice;
        this.seats = seats;
    }

    // Helper method to save current bookings to localStorage
    static saveToLocalStorage() {
        localStorage.setItem('tables', JSON.stringify(Restaurant.Tables));
    }

    // Validate if type is valid
    static isValidType(type) {
        return ['Normal', 'Regular', 'Vip'].includes(type);
    }

    bookTable(nameOfCustomer, time, type, money, tableNumber) {
        // Validate table type
        if (!Restaurant.isValidType(type)) {
            alert('INCORRECT TYPE! It should be Normal, Regular, or Vip');
            return;
        }

        // Check if the requested time is already booked for that type
        const existingBooking = Restaurant.Tables.find(each => each.type === type && each.time === time);
        if (existingBooking) {
            alert('THERE IS NO AVAILABLE TIME FOR THIS TYPE');
            return;
        }

        // Check available seats
        if (this.seats < tableNumber) {
            alert(`NOT ENOUGH SEATS. ONLY ${this.seats} LEFT`);
            return;
        }

        // Determine correct price based on type
        let correctPrice = 0;
        if (type === 'Normal') correctPrice = this.NormalPrice;
        if (type === 'Regular') correctPrice = this.RegularPrice;
        if (type === 'Vip') correctPrice = this.VipPrice;

        // Validate money
        if (money !== correctPrice) {
            alert(`INCORRECT AMOUNT. ${type} costs ${correctPrice}`);
            return;
        }

        // Add booking
        Restaurant.Tables.push({ nameOfCustomer, time, type, money });
        this.seats--;

        // Save updated data to localStorage
        Restaurant.saveToLocalStorage();

        alert(`SUCCESSFULLY BOOKED A ${type.toUpperCase()} TABLE! ${this.seats} SEATS REMAINING`);

        return Restaurant.Tables;
    }

    // Method to clear all bookings (for testing or reset)
    static clearBookings() {
        Restaurant.Tables = [];
        Restaurant.saveToLocalStorage();
    }
}

// Example usage:
const restaurant = new Restaurant('My Restaurant');

// Try booking a table
console.log(restaurant.bookTable('ABDULLAHI', 14, 'Regular', 2000, 2));
