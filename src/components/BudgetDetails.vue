// BudgetDetails.vue
<template>
 <div>
 <div class="budget-details">
    <h5 id="budget-title"> {{ budget.title }} </h5>
    <p class="list-group-item-text" v-if="budget.limit">Budget limit {{budget.limit}}</p>
    <p class="list-group-item-text" v-if="budget.remaining">Money left in budget {{ budget.remaining }}</p>

  </div>
  <div>
    <h5>Add a new expense </h5>
    <form v-on:submit.prevent="addExpense">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Expense name:</label>
            <input type="text" class="form-control" v-model="expense.name">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Price:</label>
              <input type="text" class="form-control col-md-6" v-model="expense.price">
            </div>
          </div>
           <div class="col-md-6">
            <div class="form-group">
              <label>Type:</label>
              <input type="text" class="form-control col-md-6" v-model="expense.type">
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Add Expense</button>
        </div>
    </form>
  </div>
   <div>
        <h1>Expenses</h1>
        <div class="row">
          <div class="col-md-8"></div>
        </div><br />
        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Price</td>
                <td>Type</td>
            </tr>
            </thead>
            <tbody>
                <tr v-for="expense in expenses">
                    <td>{{ expense.id }}</td>
                    <td>{{ expense.name }}</td>
                    <td>{{ expense.price }}</td>
                    <td>{{ expense.type }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
         budget: { title: '', limit: '' ,remaining:'',expenses:[]},
         budgets:[],
         expenses:[],
         expense: {name:'',price:'',type:''}
        }
    },
    created: function()
        {
            this.fetchBudgetDetails();
        },
    methods: {
      fetchBudgetDetails(){
        console.log("created");
       // let uri = 'http://localhost:4000/budgets';
       let uri = 'https://budget-manager-rammonad.c9users.io/budgets/'+this.$route.params.id;; 
        this.axios.get(uri).then((response) => {
                  this.budget = response.data;
                  this.expenses = this.budget.expenses;
                  console.log(response.data);
              });
        },
      addExpense(){
      //let uri = 'http://localhost:4000/budgets/id';
       let uri = 'https://budget-manager-rammonad.c9users.io/budget/'+this.$route.params.id
        this.axios.put(uri, this.expense).then((response) => {
          console.log(response);
          this.fetchBudgetDetails();
        });
      },
      editBudget(){

      }
}
}
</script>