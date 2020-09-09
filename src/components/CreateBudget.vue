// CreateBudget.vue
<template>
 <div>
  <div>
    <h1>Create a new budget</h1>
    <form v-on:submit.prevent="addBudget">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Budet title:</label>
            <input type="text" class="form-control" v-model="budget.title">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Budget Limit:</label>
              <input type="text" class="form-control col-md-6" v-model="budget.limit">
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Add Budget</button>
        </div>
    </form>
  </div>
   <div>
        <h1>Budgets</h1>
        <div class="row">
          <div class="col-md-8"></div>
        </div><br />
        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Budget Title</td>
                <td>Limit</td>
                <td>Remaining</td>
                <td>Actions</td>
            </tr>
            </thead>
            <tbody>
                <tr v-for="budget in budgets">
                    <td>{{ budget.id }}</td>
                    <td>{{ budget.title }}</td>
                    <td>{{ budget.limit }}</td>
                    <td>{{ budget.remaining }}</td>
                    
                    <router-link :to="{name: 'BudgetDetails', params: { id: budget.id , budget: budget}}" class="btn btn-primary">Details</router-link></td>
                    <td><button class="btn btn-danger" v-on:click="deleteBudget(budget.id)">Delete</button></td>
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
         budget: { title: '', limit: '' },
         budgets:[]
        }
    },
    created: function()
        {
            this.fetchBudgets();
        },
    methods: {
      fetchBudgets(){
        console.log("created");
       // let uri = 'http://localhost:4000/budgets';
       let uri = 'https://budget-manager-rammonad.c9users.io/budgets'; 
        this.axios.get(uri).then((response) => {
                  this.budgets = response.data;
                  console.log(response);
              });
        },
      addBudget(){
     // let uri = 'http://localhost:4000/budgets';
      let uri = 'https://budget-manager-rammonad.c9users.io/budgets'; 

        this.axios.post(uri, this.budget).then((response) => {
          console.log(response)
          this.fetchBudgets();
        })
      },
       deleteBudget(id,budget)
            {
              let uri = 'https://budget-manager-rammonad.c9users.io/budgets/'+id;
              //this.budgets.splice(id, 1);
              this.axios.delete(uri).then(
                (response =>{
                  //this.budgets.splice(this.budgets.indexOf(budget),1);
                  this.fetchBudgets();
                })
              );
             //this.budgets.$remove(budget);
              
            }
}
}
</script>