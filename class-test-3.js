'use strict';

function printReceipt() {
    var inputs = [
        'ITEM000000',
        'ITEM000000',
        'ITEM000000',
        'ITEM000000',
        'ITEM000000',
        'ITEM000001',
        'ITEM000001',
        'ITEM000004'
    ];

    var itemArry=getAllItem(inputs);
    itemArry=get_tol_price(itemArry);
    var  allPrice=getAllPrice(itemArry);

    var result='***<没钱赚商店>收据***\n';
    for(var i=0;i<itemArry.length;i++){
        result+='名称：'+itemArry[i].name+'，数量：'+itemArry[i].count+'，单价：'+itemArry[i].price+'(元)，小计：'+itemArry[i].tol_price+'(元)\n';
    }
    result+='----------------------\n';
    result+='总计：'+allPrice+'\n';
    result+='**********************';
    console.log(result);
}
function getAllItem(arry) {

    var item_arry=[];

    var allItem=loadAllItems();
    for(var i=0;i<arry.length;i++){
        var flag=i+1;
        var count=0;
        while(arry[i]===arry[flag]&&flag<arry.length){
            ++flag;
        }
        for (var j=0;j<allItem.length;j++){
            if (arry[i]===allItem[j].barcode){
                var item = [{}];
                count = flag - i;
                item.barcode=allItem[j].barcode;
                item.name=allItem[j].name;
                item.unit=allItem[j].unit;
                item.price=allItem[j].price;
                item.count=count;
                item.tol_price=null;
                item_arry.push(item);
            }

        }
        i=flag-1;
    }
    return item_arry;
}

function get_tol_price(wareArry) {
    for(var i=0;i<wareArry.length;i++){
        wareArry[i].tol_price=wareArry[i].price*wareArry[i].count;
    }
    return wareArry;
}
function getAllPrice(wareArry1) {
    var Price=0;
    for(var i=0;i<wareArry1.length;i++){
        Price+=wareArry1[i].tol_price;
    }
    return Price;
}
function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}
printReceipt();

