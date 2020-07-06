let app = new Vue({
  el:`#app`,
  data:{
    product:{
      // id:``,
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
  },
  methods:{
    /* 新增產品時先將物件清空 */
    cleanDate(){
      this.product ={};
    },
    /* 亂數給 ID */
    randomNum(){
      return parseInt( Math.random()*100);
    },
    /* 新增 */
    addProduct(){
      let vm = this; 
      // 不能點了新增才執行清空，要在新增之前清空
      // vm.product ={};

      vm.product.id = `${this.randomNum()}${this.randomNum()}`;
      
      // 若直接 push(vm.product)會變成參考原本位址
      // 所以先轉成字串再轉成物件就可以避免這樣的情況
      vm.listProduct.push(JSON.parse(JSON.stringify(vm.product)));
      
    },
    /* 修改 */
    edit(item){
      let vm = this;
      // vm.product = item
      // 修改欄位資料時會因為 v-model的雙向綁定直接顯示修改後的資料，這跟 v-model.lazy無關

      vm.product = Object.assign({}, item) ;
      // Object.assign({}, item)在新增多個屬性時，為什麼要用一個空物件來放入資料?
      // 新建一個空物件，會被 Vue的響應資料偵測到，也是 Vue響應物件資料的其中一個方式，同時不會被視為傳參考
      // 但是，單純的放入 item，像這樣 Object.assign(item)，就如同 vm.product = item
    },
    /* 更新資料 */
    updateData(){
      let vm = this; 
      console.log(vm.product.id);
      // 判斷是否有值
      if (vm.product.id){
        console.log(vm.product.id+`修改`);
        vm.listProduct.forEach((itemProduct, index) => {
          if (vm.product.id === itemProduct.id){
            // itemProduct = vm.product;
            // 為什麼這個不行? 因為只針對 forEach取出來的物件做替換資料
  
            // 重新讓 listProduct紀錄物件資料
            vm.listProduct[index] = vm.product;
          }
        })
      } else {
        console.log(vm.product.id+`新增`);
        vm.addProduct();
      }
      vm.cleanDate();
      // 為什麼要清空暫存資料才會立刻顯示已更新的資料?
      // Vue沒有偵測到需要重新渲染畫面的動作，於是利用賦予空物件讓 Vue重新渲染畫面
    },
    
    remove(item){
      let vm = this; 
      vm.listProduct.forEach((itemProduct, index) => {
        if (item.id === itemProduct.id){
          vm.listProduct.splice(index, 1);
        }
      })
    },
    // 新增與修改欄位一樣，可以重複利用 modal
    // modal(operating, item){
    //   switch(operating){
    //     case `deleteData`:
    //       this.remove(item);
    //   }
    // }
    
  }
})