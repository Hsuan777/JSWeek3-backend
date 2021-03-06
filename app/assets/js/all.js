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
      origin_price:``,
      services:[],
      price:``,
      unit:`間`
    },
    listProduct:[
      {
        id:`456456`,
        imgUrl:`https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80`,
        title:`文青雙人房`,
        category:`雙人房`,
        content:``,
        imgAlt:`文青雙人房`,
        enabled:true,
        origin_price:`2500`,
        services:["早餐"],
        price:`1500`,
        unit:`間`
      },
      {
        id:`8781278`,
        imgUrl:`https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80`,
        title:`簡易單人房`,
        category:`單人房`,
        content:``,
        imgAlt:`簡易單人房`,
        enabled:true,
        origin_price:`1500`,
        services:["早餐", "禁菸"],
        price:`1000`,
        unit:`間`
      },

    ],
    // 暫存物件，不讓初始化資料被修改
    temporary:{},
  },
  methods:{
    /* 將物件清空會觸發 Vue執行渲染畫面，也就是 v-for會更新畫面 */
    // 關鍵字 : Vue Reactivity
    cleanDate(){
      this.temporary ={};
    },
    /* 亂數 */
    randomNum(){
      return parseInt( Math.random()*100);
    },
    /* 新增資料 */
    addProduct(){
      let vm = this; 
      
      // 亂數給 ID 
      vm.temporary.id = `${this.randomNum()}${this.randomNum()}`;
      
      // 若直接 push(vm.product)會變成參考原本位址
      // 所以先轉成字串再轉成物件就可以避免這樣的情況
      vm.listProduct.push(JSON.parse(JSON.stringify(vm.temporary)));
    },
    /* 新建資料 */
    initData(){
      this.temporary = Object.assign({}, this.product) ;
    },

    /* 複製資料 */
    copyData(item){
      let vm = this;
      // 修改欄位資料時會因為 v-model的雙向綁定直接顯示修改後的資料，這跟 v-model.lazy無關
      // vm.temporary = item

      // Object.assign({}, item)在新增多個屬性時，為什麼要用一個空物件來放入資料?
      // 新建一個空物件，會被 Vue的響應資料偵測到，也是 Vue響應原理的其中一個方式，同時不會被視為傳參考
      // 但是，單純的放入 item，像這樣 Object.assign(item)，就如同 vm.temporary = item
      vm.temporary = Object.assign({}, item) ;
    },
    /* 更新資料 */
    updateData(){
      let vm = this; 
      // 判斷是否有值
      if (vm.temporary.id){
        console.log(vm.product.id+`修改`);
        vm.listProduct.forEach((item, index) => {
          if (vm.temporary.id === item.id){
            // 為什麼這個不行? 因為只針對 forEach取出來的物件做替換資料
            // item = vm.temporary;
  
            // 重新讓 listProduct紀錄物件資料，但不會觸發 Vue的響應
            vm.listProduct[index] = vm.temporary;
          }
        })
      } else {
        console.log(vm.product.id+`新增`);
        vm.addProduct();
      }
      vm.cleanDate();
    },
    deleteData(){
      let vm = this; 
      vm.listProduct.forEach((item, index) => {
        if (vm.temporary.id === item.id){
          vm.listProduct.splice(index, 1);
        }
      })
      vm.cleanDate();
    },
    isUpFn(isUp){
      if(isUp){
        return `已開放`;
      } else{
        return `未開放`;
      }
    }
  }
})