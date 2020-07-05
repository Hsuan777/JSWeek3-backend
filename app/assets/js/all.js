let app = new Vue({
  el:`#app`,
  data:{
    product:{
      id:``,
      imgUrl:``,
      title:``,
      category:``,
      content:``,
      imgAlt:``,
      enabled:true,
      origin_price:0,
      price:0,
      unit:`台`
    },
    listProduct:[],
    temp:{}
  },
  methods:{
    addProduct(){
      let vm = this; 
      this.product.id = `${this.randomNum()}${this.randomNum()}`;
      // 若直接 push(vm.product)會變成參考原本位址
      // 所以先轉成字串再轉成物件就可以避免這樣的情況
      vm.listProduct.push(JSON.parse(JSON.stringify(vm.product)));
    },
    randomNum(){
      return parseInt( Math.random()*100);
    },
    // TODO:修改更新
    // updateData(){
    //   let vm = this; 
    //   this.listProduct.forEach((itemProduct) => {
    //     if (vm.temp.id === itemProduct.id){
    //       itemProduct = JSON.parse(JSON.stringify(vm.temp));
    //     }
    //   })
    // },
    edit(item){
      let vm = this;
      vm.temp = JSON.parse(JSON.stringify(item));
      
    },
    remove(item){
      let vm = this; 
      this.listProduct.forEach((itemProduct, index) => {
        if (item.id === itemProduct.id){
          vm.listProduct.splice(index, 1);
        }
      })
    }
    
  }
})